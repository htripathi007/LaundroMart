import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedataService } from 'src/app/sharedata.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit  {
  constructor(private router:Router, private sharedata:SharedataService) { }
  searchText:any;
  
  opened= false;
  logout() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("userPhoneNumber");
    this.router.navigateByUrl("/");
    }

  toggleSidebar(){
    this.opened = !this.opened
    console.log("ude");
  }
  toggle(opened:boolean){
    this.sharedata.changeToggle(opened)
  }
  

  ngOnInit(): void {
  }
}
