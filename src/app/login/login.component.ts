import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import Validation from 'src/app/utils/Validation';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  submitted = false; 

  constructor(private formBuilder: FormBuilder,
              private userService: UserService
              ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      identifiant: ['', Validators.required],
      pwd: ['', Validators.required,],
    }
    );
  }

  get f(): { [key: string]: AbstractControl } { 
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted=true;
    if (this.form.invalid) { 
      return;
    }
    var data = JSON.stringify(this.form.value, null, 2);
    console.log(data);
    this.userService.connexion(data);
  }

}
