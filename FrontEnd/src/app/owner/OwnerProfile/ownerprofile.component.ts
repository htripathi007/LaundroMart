import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { DomSanitizer } from '@angular/platform-browser';
import { RestDataSource } from 'src/app/model/rest.datasource';
import { User } from 'src/app/model/user.model';
import { SharedataService } from 'src/app/sharedata.service';


@Component({
  selector: 'ownerprofile',
  templateUrl: './ownerprofile.component.html',
  styleUrls: ['./ownerprofile.component.css']
})
export class OwnerprofileComponent implements OnInit  {

  public user = new User()
  public userPhoneNo : string | null = sessionStorage.getItem("userPhoneNumber");
  public fieldTextType?: boolean;

  public toggle?:boolean

  constructor(private datasource:RestDataSource, private router:Router,private sharedata:SharedataService) {
    
    
  }
    ngOnInit():void{
      this.datasource.GetUserInfo(this.userPhoneNo).subscribe(data=>{
        this.user = data;
          // this.imagePath = this.domSanitizer.bypassSecurityTrustUrl(this.user.actualFileUrl!);
         
        }
      )
      this.sharedata.currentToggle.subscribe(t=>{
        this.toggle= t;
        console.log(this.toggle)
      })

    }
  
  updateuser(id: any) {

    this.datasource.UpdateUser(this.user.userId, this.user).subscribe(reponse => {
      console.log(this.user.userPhoneNumber);
      window.location.reload();

    });
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }


  logout() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("userphoneno");
    this.router.navigateByUrl("/");
    }


}
