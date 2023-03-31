import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestDataSource } from 'src/app/model/rest.datasource';
import { User } from 'src/app/model/user.model';
import { SharedataService } from 'src/app/sharedata.service';

@Component({
  selector: 'app-clientprofile',
  templateUrl: './clientprofile.component.html',
  styleUrls: ['./clientprofile.component.css']
})
export class ClientprofileComponent implements OnInit {
  public user = new User()
  public userPhoneNo : string | null = sessionStorage.getItem("userPhoneNumber");
  public toggle?:boolean;
  public fieldTextType?: boolean;
  

  constructor(private dataSource:RestDataSource, private router:Router, private sharedata:SharedataService) { 
    dataSource.GetUserInfo(this.userPhoneNo).subscribe(data=>{
      this.user = data;
    }
    )
  }
  ngOnInit():void{
    this.dataSource.GetUserInfo(this.userPhoneNo).subscribe(data=>{
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

  this.dataSource.UpdateUser(this.user.userId, this.user).subscribe(reponse => {
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
