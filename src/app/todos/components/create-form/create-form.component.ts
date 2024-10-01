import {Component, EventEmitter, Output} from '@angular/core';
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
import {createTodo} from "../../store/todos.actions";

@Component({
  selector: 'app-create-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatInputModule, MatListModule, MatButtonModule, MatIconModule],
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent {
  todoForm: FormGroup;
  @Output() submitted = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private store: Store) {
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      deadline: ['', [Validators.required, this.dateValidator()]],
      people: this.fb.array([])
    });
  }

  get people(): FormArray {
    return this.todoForm.get('people') as FormArray;
  }

  createPerson(): FormGroup {
    return this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(5), this.uniqueNameValidator.bind(this)]],
      age: ['', [Validators.required, Validators.min(18)]],
      skills: this.fb.array([this.createSkill()], this.minSkillsValidator(1))
    });
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
    const peopleArray = this.people.value;

    const duplicateName = peopleArray.some((person: any, index: number) => {
      return person.fullName === fullName;
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
      this.store.dispatch(createTodo({todo: {...this.todoForm.value, completed: false}}))
      this.submitted.emit()
    } else {
      console.log("Wrong data");
    }
  }

  skillControls(person: AbstractControl) {
    return (person.get('skills') as FormArray).controls
  }
}
