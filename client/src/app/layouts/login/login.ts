import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../core/services/auth';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  private auth = inject(AuthService);

  private router = inject(Router);

  email = '';

  password = '';

  login() {

    this.auth.login({

      email: this.email,

      password: this.password

    }).subscribe({

      next: (res: any) => {

        localStorage.setItem("token", res.token);

        localStorage.setItem(
          "user",
          JSON.stringify(res.user)
        );

        this.router.navigate(['/dashboard']);

      },

      error: (err) => {
        console.log(err);
        console.log(err.error);
        alert(JSON.stringify(err.error.message));

      }

    });

  }

}