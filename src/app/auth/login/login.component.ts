import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor( private fb: FormBuilder,
               private authService: AuthService,
               private router: Router ) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })

  }

  validateUser() {
    if (this.loginForm.invalid) {return;}

    const { email, password } = this.loginForm.value;

    this.authService.loginUser(email, password)
      .then( credentials => {
        console.log('Credentials ', credentials)
        this.router.navigate(['/'])
      })
      .catch(error => console.log(error))
  }

}
