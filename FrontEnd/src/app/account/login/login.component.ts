import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RestDataSource } from 'src/app/model/rest.datasource';
import { NgForm } from '@angular/forms';
import { Shop } from 'src/app/model/Shop.Model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public userPhoneNumber?: string;
  public password?: string;
  public token?: string;
  public errorMessage?: string;
  public role: string = "";
  public _userPhoneNumber: string = ""
  public allShops:Shop[]=[]
  public shopCities:any[]=[]
  public uniqueCity:any[]=[]
  public shopByCity:Shop[]=[]

  constructor(private router: Router, private datasource: RestDataSource){

    this.datasource.GetAllShop().subscribe(data=>{
      this.allShops=data
      console.log(this.allShops);
      for(let i = 0;i< this.allShops.length;i++){
        this.shopCities[i]=this.allShops[i].shopCity

      }
      console.log(this.shopCities)
      function removewithfilter(arr:any[]) {
        let outputArray = arr.filter(function(v, i, self)
        {
             
            // It returns the index of the first
            // instance of each value
            return i == self.indexOf(v);
        });
         
        return outputArray;
    }
    this.uniqueCity=removewithfilter(this.shopCities)
     
      
    })
    

    
  }
  displayShops(city:any){
    console.log(city);
    
    this.datasource.GetShopByCity(city).subscribe(data=>{
      this.shopByCity=data
      console.log(this.shopByCity);
      
    })
    
  }

  authenticate(form: NgForm) {
    if (form.valid) {
      this.datasource.authenticate(this.userPhoneNumber ?? "", this.password ?? "")
        .subscribe(response => {
          this.token = response.jwtToken;
          this.role = response.role;
          this._userPhoneNumber = response.userPhoneNumber;
          if (this.token != null) {
            sessionStorage.setItem("token", this.token);
            sessionStorage.setItem("role", this.role);
            sessionStorage.setItem("userPhoneNumber", this._userPhoneNumber);

            if (this.role == "Owner") {
              this.router.navigateByUrl("/sidebar/myshop");
            }
            else if(this.role=="Admin"){
              this.router.navigateByUrl("/adminsidebar/viewusers")
            }
            else if(this.role=="Client"){
              this.router.navigateByUrl("/clientsidebar/getshopsbycity");
            }
          }
          else {
            this.errorMessage = "Invalid username or password!";
          }
        })
    }
    else {
      this.errorMessage = "Both the fields are required";
    }
  }



}
