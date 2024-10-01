import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {Store} from "@ngrx/store";
import {createTodo, updateTodo} from "../../store/todos.actions";
import {Todo} from "../../todos.models";

@Component({
  selector: 'app-create-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatInputModule, MatListModule, MatButtonModule, MatIconModule],
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent {
  get todo(): Todo | undefined | null {
    return this._todo;
  }

  @Input()
  set todo(value: Todo | undefined | null) {
    this._todo = value;
    if (value) {
      this.todoForm.controls['title'].disable()
      if (value.deadline) {
        this.todoForm.controls['deadline'].disable()
      }
      this.populateForm(value)
    }
  }

  todoForm: FormGroup;
  @Output() submitted = new EventEmitter<void>();
  private _todo: Todo | undefined | null;

  constructor(private fb: FormBuilder, private store: Store) {
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      deadline: ['', [Validators.required, this.dateValidator()]],
      people: this.fb.array([])
    });
  }

  populateForm(data: any) {
    this.todoForm.patchValue({
      title: data.title,
      deadline: data.deadline
    });

    const peopleArray = this.todoForm.get('people') as FormArray;
    if (data.people)
      data.people.forEach((person: any) => {
        const personGroup = this.createPerson(person);
        peopleArray.push(personGroup);
      });
  }

  get people(): FormArray {
    return this.todoForm.get('people') as FormArray;
  }

  createPerson(person: any = {fullName: '', age: '', skills: []}): FormGroup {
    return this.fb.group({
      fullName: [person.fullName || '', [Validators.required, Validators.minLength(5), this.uniqueNameValidator.bind(this)]],
      age: [person.age || '', [Validators.required, Validators.min(18)]],
      skills: this.fb.array(this.populateSkills(person.skills), this.minSkillsValidator(1))
    });
  }

  populateSkills(skills: string[]): FormControl[] {
    return (skills && skills.length > 0) ? skills.map(skill => this.fb.control(skill, Validators.required)) : [this.createSkill()];
  }

  createSkill(): FormControl {
    return this.fb.control('', Validators.required);
  }

  minSkillsValidator(min: number): Validators {
    return (formArray: FormArray) => {
      return formArray.length >= min ? null : {minSkills: true};
    };
  }

  addPerson() {
    this.people.push(this.createPerson());
  }

  addSkill(personIndex: number) {
    const skills = this.people.at(personIndex).get('skills') as FormArray;
    skills.push(this.createSkill());
  }

  removePerson(index: number) {
    this.people.removeAt(index);
  }

  removeSkill(personIndex: number, skillIndex: number) {
    const skills = this.people.at(personIndex).get('skills') as FormArray;
    skills.removeAt(skillIndex);
  }

  uniqueNameValidator(control: FormControl): { [key: string]: boolean } | null {
    const fullName = control.value;

    const peopleArray = (control.parent?.parent as FormArray)?.value;

    if (!peopleArray || !Array.isArray(peopleArray)) {
      return null;
    }

    const currentIndex = control.parent ? (control.parent?.parent as FormArray).controls.indexOf(control.parent) : -1;

    const duplicateName = peopleArray.some((person: any, index: number) => {
      return index !== currentIndex && person.fullName === fullName;
    });

    return duplicateName ? {uniqueName: true} : null;
  }

  dateValidator(): Validators {
    return (control: FormControl) => {
      const datePattern = /^\d{4}-\d{2}-\d{2}$/;
      if (!control.value || datePattern.test(control.value)) {
        return null;
      }
      return {invalidDate: true};
    };
  }

  onSubmit() {
    if (this.todoForm.valid) {
      this.store.dispatch(
        this.todo ? updateTodo(
          {todo: {...this.todo, ...this.todoForm.value}}) : createTodo(
          {todo: {...this.todoForm.value, completed: false}}))
      this.submitted.emit()
    } else {
      console.log("Wrong data");
    }
  }

  skillControls(person: AbstractControl) {
    return (person.get('skills') as FormArray).controls
  }


}
