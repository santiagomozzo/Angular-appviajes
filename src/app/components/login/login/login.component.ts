import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage: string;

  constructor(public authService: AuthService) {
    this.errorMessage = '';
   }

  ngOnInit(): void {
  }

  login(username: string, password: string):boolean {
    this.errorMessage = '';
    if (!this.authService.login(username, password)) {
      this.errorMessage = 'Login Incorrecto.';
      setTimeout(function() {
        this.errorMessage = '';
      }.bind(this), 2500);
    }
    return false;
  }

  logout():boolean {
    this.authService.logout();
    return false;
  }

}
