import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LocationService } from 'src/app/location.service';
import { RestDataSource } from 'src/app/model/rest.datasource';
import { User } from 'src/app/model/user.model';


@Component({
  selector: 'app-Owerregistration',
  templateUrl: './Ownerregistration.component.html',
  styleUrls: ['./Ownerregistration.component.css']
})
export class OwnerregistrationComponent {

  visible: boolean = true;
  changetype: boolean = true;
  public user = new User();
  public users: User[] = [];
  public submitted: boolean = true;
  public passwordConf: boolean = false;
  public duplicateUserPhoneNumber: boolean = false;
  public duplicateEmail: boolean = false;
  
  public states: any;
  public country: string = "IN";
  public state: any;
  public stateChosen: any;
  public stateCode: any;
  public cities: any;
  public cityChosen: any;

  constructor(private datasource: RestDataSource, private router: Router, private service: LocationService) { }

  onFileSelected(event: any) {
    
    console.log(event);
  }

  ngOnInit() {
    this.datasource.GetUserForValidation()
      .subscribe(data => {
        this.users = data;
      })


    // this.country.valueChanges.subscribe((country) => {
    //   this.state.reset();
    //   this.state.disable();
    // if (country) {
    this.states = this.service.getStatesByCountry(this.country);
    //console.log(this.states)

    //  this.state.enable();

    // });
  }
  ngDoCheck() {
    // console.log(this.stateChosen)
    for (let i = 0; i < this.states.length; i++) {
      //console.log(this.states[i])
      if (this.states[i].name == this.stateChosen) {
        this.stateCode = this.states[i].isoCode;
      }
    }

    // console.log(this.stateCode)
  }

  viewpass() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }

  // addUser(form: NgForm) {
  //   if (form.valid) {
  //     this.datasource.addUser(this.user)
  //       .subscribe(response => {
  //         this.router.navigateByUrl("/users");
  //       });
  //   }
  // }

  handleConfirmPasswordChange(form: NgForm) {
    if (this.user.userPassword != this.user.userConfirmPassword) {
      this.passwordConf = true;
      return;
    }
    else {
      this.passwordConf = false;
    }
  }

  sendCode() {
    this.cities = this.service.getCitiesByState('IN', this.stateCode);
    this.user.userState = this.stateChosen;
  }

  changeCity() {
    this.user.userCity = this.cityChosen;
    console.log(this.user.userCity);
    
  }
  //c

  userPhoneNoCheck(form: NgForm) {
      var empList = this.users.map(x => x.userPhoneNumber)
      console.log("HI");
      
      for (let i = 0; i < empList.length; i++) {
        if (empList[i] != this.user.userPhoneNumber) {
          this.duplicateUserPhoneNumber = false;
        }
        else {
          this.duplicateUserPhoneNumber = true;
          return;
        }
      }
  }

  
  userEmailCheck(form: NgForm) {
    var empList = this.users.map(x => x.userEmail)    
    for (let i = 0; i < empList.length; i++) {
      if (empList[i] != this.user.userEmail) {
        this.duplicateEmail = false;
      }
      else {
        this.duplicateEmail = true;
        return;
      }
    }
}

  registerUser(form: NgForm) {
    console.log(form.value);
    console.log("form entery");
    this.submitted = false;

    if (this.user.userPassword != this.user.userConfirmPassword) {
      this.passwordConf = true;
      return;
    }
    else {
      this.passwordConf = false;
    }
    if (form.valid) {

      this.user.userRole = "Owner";
      console.log(this.user);
      
      this.datasource.registerUser(this.user).subscribe(response => {
console.log(response.userId);

          if (response.userId != undefined) {
            this.duplicateUserPhoneNumber = false;
            this.duplicateEmail = false;
            this.router.navigateByUrl("/");
          }
          else {
            this.duplicateUserPhoneNumber = true;
            this.duplicateEmail = true;
          }
        })
      this.submitted = true;
    }
  }
}
