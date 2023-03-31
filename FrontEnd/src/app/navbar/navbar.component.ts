import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  public token : string | null = sessionStorage.getItem("token");
  onClick(){
    this.token = sessionStorage.getItem("token");
  }
  constructor(public router:Router){
    this.token = sessionStorage.getItem("token");
    

  }
  ngOnInit(): void {
    this.token = sessionStorage.getItem("token");
  }
}

