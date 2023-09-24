import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Role as UserRole } from 'src/app/auth/role.enum';
import {
  AUPostCodeValidation,
  BirthDateValidation,
  EmailValidation,
  OptionalTextValidation,
  RequiredTextValidation,
} from 'src/app/common/validations';
import { $enum } from 'ts-enum-util';

import { IUser } from '../user';
import { UserService } from '../user.service';
import { IAUState, PhoneType } from './data';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  Role = UserRole;
  PhoneTypes = $enum(PhoneType).getKeys();
  userForm: FormGroup = <FormGroup>{};
  states: Observable<IAUState> = <Observable<IAUState>>{};
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
    });
  }
}
