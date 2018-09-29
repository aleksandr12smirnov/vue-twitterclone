import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// import Joi from 'joi';
import * as Joi from 'joi'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  // Rules for the validation of inputs
  schema = Joi.object().keys({
    email: Joi.string().email().required(),
    username: Joi.string().regex(/(^[a-zA-Z0-9_]*$)/).min(8).max(20).required(),
    password: Joi.string().trim().min(8).required()
  });


  signupForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor() { }

  onSubmit() {
    console.log(this.signupForm.value);
  }

}
