import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';
import { ScheduleService } from 'src/schedule.service';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from 'src/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  fullName = '';
  email = '';
  password = '';
  phoneNumber = '';
  payPalId = '';
  certified = 0;
  teamNames: any;
  roleId = [];
  paymentMethodId = [];
  //teamNameList: any;
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();
  roles: Role[] = [
    {value: '1', viewValue: 'Admin'},
    {value: '2', viewValue: 'Umpire'},
    {value: '3', viewValue: 'Player'}

  ];
  paymentMethods: PaymentMethod[] = [
    {value: '1', viewValue: 'Pay Now'},
    {value: '2', viewValue: 'Deduct from First Umpiring'}
  ];
  // tslint:disable-next-line: max-line-length
  constructor(private scheduleService: ScheduleService, private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      fullName : [null, Validators.required],
      email : [null, Validators.required],
      password : [null, Validators.required],
      phoneNumber : [null, Validators.required],
       certified: [null],
      paymentMethods: [null],
      payPalId : [null, Validators.required],
      roleId: [null],
      paymentMethodId : [null],
      teamNames: this.formBuilder.array([])
    });
    this.getTeams();
  }
  getTeams(): void {
    this.scheduleService.getTeams()
      .subscribe(schedule => {
        this.teamNames = schedule;
        console.log(this.teamNames);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }
  onChange(event, index, item) {

    const teamNames = this.registerForm.get('teamNames') as FormArray;

    if (event.checked) {
      teamNames.push(new FormControl(item));
    } else {
      const i = teamNames.controls.findIndex(x => x.value === event.source.value);
      teamNames.removeAt(i);
    }
  }
  onFormSubmit(form: NgForm) {

    this.authService.register(form)
      .subscribe(res => {
        this.router.navigate(['login']);
      }, (err) => {
        console.log(err);
        alert(err.error);
      });
  }

}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
export interface Role {
  value: string;
  viewValue: string;
}
export interface PaymentMethod {
  value: string;
  viewValue: string;
}

export interface IRegister {
  FullName: string;
  Email: string;
  Password: string;
  RoleId: string;
}
