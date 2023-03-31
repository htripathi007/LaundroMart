import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedataService } from 'src/app/sharedata.service';

@Component({
  selector: 'app-clientsidebar',
  templateUrl: './clientsidebar.component.html',
  styleUrls: ['./clientsidebar.component.css']
})
export class ClientsidebarComponent {
  opened= false;

  constructor(private router:Router, private sharedata: SharedataService){}


  logout() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("userPhoneNumber");
    this.router.navigateByUrl("/");
    }

  toggleSidebar(){
    this.opened = !this.opened
  }

  toggle(opened:boolean){
    this.sharedata.changeToggle(opened)
  }


}
