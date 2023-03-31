import { Component, DoCheck } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { VirtualTimeScheduler } from 'rxjs';

import { FormsModule } from '@angular/forms';
import { RestDataSource } from 'src/app/model/rest.datasource';
import { Bookings } from 'src/app/model/bookings.model';

@Component({
  selector: 'app-machine-lock',
  templateUrl: './machine-lock.component.html',
  styleUrls: ['./machine-lock.component.css']
})
export class MachineLockComponent implements DoCheck{
  public machineName: string = "";
  public userOtp: number = 0;
  public message?: string;
  public errorMessage?: string;
  public status?:boolean;
  public show:boolean=true;
  public date:any;
  public bookings:Bookings[]=[]
  public endDate:any;
  public startDate:any;


  constructor(private datasource: RestDataSource, private router: Router) {
    
  }

  ngDoCheck(): void {
  }

  onFileSelected(event: any) {
    
    console.log(event);
  }

  unlock(){
    this.errorMessage=''
    console.log(this.machineName,this.userOtp)
    this.date = new Date()
    this.datasource.GetAllBookings().subscribe(data=>{
      this.bookings = data;
      console.log(this.bookings)
      for(let i=0;i<this.bookings.length;i++){
        if(this.bookings[i].pin == this.userOtp){
          this.startDate = new Date(this.bookings[i].bookingStartTime)
          this.endDate = new Date(this.bookings[i].bookingEndTime)

          if((this.date.getTime() <= this.endDate.getTime() && this.date.getTime() >=  this.startDate.getTime())){{
            
      if(this.machineName==''||this.userOtp == 0){
          this.errorMessage = "Please enter both the values";
      }
      else{
        this.datasource.UnlockMachine(this.machineName,this.userOtp).subscribe(data=>{
          this.status = data;
          console.log(this.status)
          if(this.status==true){
            this.message = "Your Machine Has Been Unlocked For Washing !!!"
            this.status = false;
          }
      })
      }
          }
        }
        else{
          this.message = "Please Try Again Later at Your Alloted Time Slot"
        }
        }
      }
    })

          
  }

}
