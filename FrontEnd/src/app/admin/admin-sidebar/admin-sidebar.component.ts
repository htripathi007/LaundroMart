import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedataService } from 'src/app/sharedata.service';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {
  constructor(private router:Router,private sharedata: SharedataService) { }
  opened= false;

  toggleSidebar(){
    this.opened = !this.opened
    
  }
  logout() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("userPhoneNumber");
    this.router.navigateByUrl("/");
    }
    toggle(opened:boolean){
      this.sharedata.changeToggle(opened)
    }

  ngOnInit(): void {
  }

}
