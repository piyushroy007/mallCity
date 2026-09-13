import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.parent?.get('password')?.value;
  const confirmPassword = control.value;
  return password === confirmPassword ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  isSignup = false;
  loading = false;
  hidePassword = true;
  authForm!: FormGroup;
  returnUrl = '/';

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.buildForm();
  }

  buildForm(): void {
    if (this.isSignup) {
      this.authForm = this.fb.group({
        name: ['', [Validators.required]],
        username: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, (ctrl: AbstractControl) => {
          if (!this.authForm) return null;
          return ctrl.value === this.authForm.get('password')?.value ? null : { passwordMismatch: true };
        }]],
      });
    } else {
      this.authForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
      });
    }
  }

  toggleMode(): void {
    this.isSignup = !this.isSignup;
    this.buildForm();
  }

  onSubmit(): void {
    if (this.authForm.invalid) {
      this.authForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const val = this.authForm.value;

    if (this.isSignup) {
      this.authService.signUp(val).subscribe({
        next: (res) => {
          this.toastr.success(`Account created! Welcome, ${res.user.name}`, 'Success');
          this.loading = false;
          const targetUrl =
            this.returnUrl && this.returnUrl !== '/'
              ? this.returnUrl
              : res.user.role?.toLowerCase() === 'admin'
              ? '/admin'
              : '/';
          this.router.navigateByUrl(targetUrl);
        },
        error: (err) => {
          this.toastr.error(err.error?.message || 'Signup failed', 'Error');
          this.loading = false;
        },
      });
    } else {
      this.authService.login(val).subscribe({
        next: (res) => {
          this.toastr.success(`Welcome back, ${res.user.name}!`, 'Logged In');
          this.loading = false;
          const targetUrl =
            this.returnUrl && this.returnUrl !== '/'
              ? this.returnUrl
              : res.user.role?.toLowerCase() === 'admin'
              ? '/admin'
              : '/';
          this.router.navigateByUrl(targetUrl);
        },
        error: (err) => {
          this.toastr.error(err.error?.message || 'Login failed. Check email or password.', 'Error');
          this.loading = false;
        },
      });
    }
  }
}
