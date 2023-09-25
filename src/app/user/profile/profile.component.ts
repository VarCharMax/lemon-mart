import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Role as UserRole } from 'src/app/auth/role.enum';
import {
  AUPhoneNumberValidation,
  AUPostCodeValidation,
  BirthDateValidation,
  EmailValidation,
  OptionalTextValidation,
  RequiredTextValidation,
} from 'src/app/common/validations';
import { $enum } from 'ts-enum-util';

import { IPhone, IUser } from '../user';
import { UserService } from '../user.service';
import { AUStateFilter, IAUState, PhoneType } from './data';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  Role = UserRole;
  PhoneTypes = $enum(PhoneType).getKeys();
  userForm: FormGroup = <FormGroup>{};
  states: Observable<IAUState[]> = <Observable<IAUState[]>>{};
  userError = '';
  currentUserRole = this.Role.None;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.authStatus.subscribe(
      (authStatus) => (this.currentUserRole = authStatus.userRole)
    );

    this.userService.getCurrentUser().subscribe((user) => {
      this.buildUserForm(user);
    });

    this.buildUserForm();
  }

  get phonesArray(): FormArray {
    return <FormArray>this.userForm.get('phones');
  }

  get addressFormGroup(): FormGroup {
    return this.userForm?.get('address') as FormGroup;
  }

  get nameFormGroup(): FormGroup {
    return this.userForm?.get('name') as FormGroup;
  }

  get dateOfBirth() {
    return this.userForm!.get('dateOfBirth')?.value || new Date();
  }

  addPhone() {
    this.phonesArray.push(
      this.buildPhoneFormControl(this.userForm!.get('phones')!.value.length + 1)
    );
  }

  get age() {
    return new Date().getFullYear() - this.dateOfBirth.getFullYear();
  }

  private buildPhoneArray(phones: IPhone[]) {
    const groups = [];

    if (!phones || (phones && phones.length === 0)) {
      groups.push(this.buildPhoneFormControl(1));
    } else {
      phones.forEach((p) => {
        groups.push(this.buildPhoneFormControl(p.id, p.type, p.number));
      });
    }
    return groups;
  }

  private buildPhoneFormControl(id: number, type?: string, number?: string) {
    return this.formBuilder.group({
      id: [id],
      type: [type || '', Validators.required],
      number: [number || '', AUPhoneNumberValidation],
    });
  }

  buildUserForm(user?: IUser) {
    this.userForm = this.formBuilder.group({
      email: [
        {
          value: (user && user.email) || '',
          disabled: this.currentUserRole !== this.Role.Manager,
        },
        EmailValidation,
      ],
      name: this.formBuilder.group({}),
      role: [
        {
          value: (user && user.role) || '',
          disabled: this.currentUserRole !== this.Role.Manager,
        },
        [Validators.required],
      ],
      dateOfBirth: [(user && user.dateOfBirth) || '', BirthDateValidation],
      address: this.formBuilder.group({
        line1: [
          (user && user.address && user.address.line1) || '',
          RequiredTextValidation,
        ],
        line2: [
          (user && user.address && user.address.line2) || '',
          OptionalTextValidation,
        ],
        city: [(user && user.address && user.address.city) || '', RequiredTextValidation],
        state: [
          (user && user.address && user.address.state) || '',
          RequiredTextValidation,
        ],
        zip: [(user && user.address && user.address.zip) || '', AUPostCodeValidation],
      }),
      phones: this.formBuilder.array(this.buildPhoneArray(user ? user.phones : [])),
    });

    this.states = this.userForm!.get('address')!
      .get('state')!
      .valueChanges.pipe(
        startWith(''),
        map((value) => AUStateFilter(value))
      );
  }

  async save(form: FormGroup) {
    this.userService.updateUser(form.value).subscribe({
      next: (res) => this.buildUserForm(res),
      error: (err) => (this.userError = err),
    });
  }
}
