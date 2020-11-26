import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from './api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'bitcoin';
  form: FormGroup;
  minAge = new Date();
  today = new Date();
  price;
  total = 0;

  contactFormControl = new FormControl('', [Validators.required, Validators.pattern("^[0-9 ()+-]*$")]);
  nameFormControl = new FormControl('', [Validators.required]);
  genderFormControl = new FormControl('', [Validators.required]);
  dobFormControl = new FormControl('', [Validators.required]);
  orderDateFormControl = new FormControl('', [Validators.required]);
  orderTypeFormControl = new FormControl('', [Validators.required]);
  orderUnitFormControl = new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]);

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
    
    this.minAge.setFullYear(this.minAge.getFullYear() -21);
    this.apiService.getPrice().subscribe((data)=>{
      console.log(data);
      this.price = data[0].price;
      console.log(this.price);
    })
  }

  ngOnInit(){
    this.form = this.fb.group({
      contact: this.contactFormControl,
      name: this.nameFormControl,
      gender: this.genderFormControl,
      dob: this.dobFormControl,
      orderDate: this.orderDateFormControl,
      orderType: this.orderTypeFormControl,
      orderUnit: this.orderUnitFormControl,
    })
  }

  confirmOrder(){
    this.router.navigate(['/confirmation']);
  }

  updateTotal(){
    this.total = this.price * parseInt(this.form.value.orderUnit);
  }

}
