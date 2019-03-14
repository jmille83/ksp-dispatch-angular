import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  newUser: boolean = false;
  passwordsMatch: boolean = true;
  alreadyLoggedIn: boolean = false;
  hadLoginError: boolean = false;
  loginError = '';
  currentUserEmail = '';
  authSubscription: Subscription;
  registerForm: FormGroup;
  
  existingUser = {
    'email': '',
    'password': ''
  };

  formErrors = {
    'email': '',
    'password': '',
  };

  validationMessages = {
    'email': {
      'required':      'Email is required.',
      'email':         'Email must be a valid email.'
    },
    'password': {
      'required':      'Password is required.',
      'pattern':       'Password must be include at one letter and one number.',
      'minlength':     'Password must be at least 6 characters long.',
      'maxlength':     'Password cannot be more than 25 characters long.',
    },
  };

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForms();
    this.authSubscription = this.authService.getAuthState$().subscribe((auth) => {
      this.alreadyLoggedIn = auth !== null;
      if (auth !== null) {
        this.currentUserEmail = auth.email;
      }
    });
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  buildForms(): void {
    this.registerForm = this.fb.group({
      'email': ['', [
          Validators.required,
          Validators.email
        ]
      ],
      'password': ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25)
        ]
      ],
      'confirmedPassword': []});

    this.registerForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // Reset validation messages.
  }

  // Updates validation state on form changes.
  onValueChanged(data?: any) {
    if (!this.registerForm) { return; }
    const form = this.registerForm;
    for (const field in this.formErrors) {
      // Clear previous error message.
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  signUpWithEmail() {
    let email = this.registerForm.get("email").value
    let password = this.registerForm.get("password").value;
    if (password != this.registerForm.get("confirmedPassword").value) {
      this.passwordsMatch = false;
      return;
    } else {
      this.passwordsMatch = true;
    }
    
    this.authService.signUpWithEmail(email, password)
      .then((res) => {
        console.log("Login success: " + res);
        this.router.navigate(['dashboard']);
      })
      .catch((err) => console.log(err));
  }

  loginWithEmail() {
    console.log("Email: " + this.existingUser.email + " Pass: " + this.existingUser.password);
    this.authService.loginWithEmail(this.existingUser.email, this.existingUser.password)
      .then((res) => {
        console.log("Login success: " + res);
        this.hadLoginError = false;
        this.router.navigate(['dashboard']);
      })
      .catch((err) => {
        console.log('LoginComponent: ' + err);
        this.hadLoginError = true;
        this.loginError = err;
      });
  }

  toggleForm() {
    this.newUser = !this.newUser;
  }

  logoutClicked() {
    this.currentUserEmail = '';
    this.authService.logout();
  }
}
