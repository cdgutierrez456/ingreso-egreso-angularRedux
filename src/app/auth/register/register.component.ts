import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor( private fb: FormBuilder,
               private authService: AuthService,
               private router: Router ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  createUser() {
    if(this.registerForm.invalid) return;

    const { name, email, password } = this.registerForm.value;
    this.authService.createUser(name, email, password)
      .then( credentials => {
        console.log('Credentials ', credentials)
        this.router.navigate(['/'])
      })
      .catch(error => console.log(error))
  }

}
