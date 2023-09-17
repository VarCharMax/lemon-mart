import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { Role } from '../auth/role.enum';
import { EmailValidation, PasswordValidation } from '../common/validations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
    `
      .error {
        color: red;
      }
    `,
    `
      div[fxLayout] {
        margin-top: 32px;
      }
    `,
  ],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = <FormGroup>{};
  loginError = '';
  redirectUrl: string | null = '';
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    route.paramMap.subscribe((params) => (this.redirectUrl = params.get('redirectUrl')));
  }

  buildLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.minLength(8), Validators.maxLength(50)],
      ],
    });
  }

  async login(submittedForm: FormGroup) {
    this.authService
      .login(submittedForm.value.email, submittedForm.value.password)
      .subscribe(
        (authStatus) => {
          if (authStatus.isAuthenticated) {
            this.router.navigate([this.redirectUrl || '/manager']);
          }
        },
        (error) => (this.loginError = error)
      );
  }

  ngOnInit(): void {
    this.buildLoginForm();
  }
}
