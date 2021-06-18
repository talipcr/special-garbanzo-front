import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  email = '';
  password = '';
  result = null;
  error = false;
  success = false;

  constructor(private authService: AuthService, private router: Router) {}

  init(): void {
    this.result = null;
    this.error = false;
    this.success = false;
  }

  login(): void {
    this.init();

    if (this.email && this.password) {
      this.authService.login(this.email, this.password).subscribe(
        async (res: any) => {
          this.result = res;
          this.success = true;
          localStorage.setItem(
            'currentUser.uid',
            JSON.stringify(res?.user?.user?.uid)
          );
          localStorage.setItem(
            'currentUser.accessToken',
            JSON.stringify(res?.user?.user?.stsTokenManager.accessToken)
          );
          localStorage.setItem(
            'currentUser.refreshToken',
            JSON.stringify(res?.user?.user?.stsTokenManager.refreshToken)
          );

          await this.router.navigate(['/item']);
        },
        (err) => (this.error = true)
      );
    }
  }

  signup(): void {
    this.init();

    if (this.email && this.password) {
      this.authService.signup(this.email, this.password).subscribe(
        async (res: any) => {
          this.result = res;
          this.success = true;
          localStorage.setItem(
            'currentUser.uid',
            JSON.stringify(res?.user?.user?.uid)
          );
          localStorage.setItem(
            'currentUser.accessToken',
            JSON.stringify(res?.user?.user?.stsTokenManager.accessToken)
          );
          localStorage.setItem(
            'currentUser.refreshToken',
            JSON.stringify(res?.user?.user?.stsTokenManager.refreshToken)
          );

          await this.router.navigate(['/item']);
        },
        (err) => (this.error = true)
      );
    }
  }

  reset(): void {
    this.init();

    if (this.email) {
      this.authService.reset(this.email).subscribe(
        (res) => {
          console.log(res);
          this.success = true;
        },
        (err) => (this.error = true)
      );
    }
  }
}
