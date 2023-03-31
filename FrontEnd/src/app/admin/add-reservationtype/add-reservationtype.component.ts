import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestDataSource } from 'src/app/model/rest.datasource';
import Swal from "sweetalert2";
import { NgForm } from '@angular/forms';
import { Reservation } from 'src/app/model/reservation.model';
import { SharedataService } from 'src/app/sharedata.service';

@Component({
  selector: 'app-add-reservationtype',
  templateUrl: './add-reservationtype.component.html',
  styleUrls: ['./add-reservationtype.component.css']
})
export class AddReservationtypeComponent implements OnInit {
  public reservation=new Reservation()
  public toggle?:boolean;
  

  constructor(private dataSource:RestDataSource,private router: Router,private sharedata:SharedataService){}
  ngOnInit(): void {
    this.sharedata.currentToggle.subscribe(t=>{
      this.toggle= t;
      console.log(this.toggle)
    })
  }
  AddBookingType(form:NgForm){
    
    //alert("hello");
  if (form.valid){


this.submit();

  } 
  else{
    window.alert("Please Fill the details  ")
  } 

 }

 submit(){

  Swal.fire({

      title:"Are You Sure?",
      icon:"success",

      showCancelButton:true,

      confirmButtonText:"Yes Add it!",

      cancelButtonText:"No, Cancel"

  }).then((result)=>

  {

      if(result.value){

       this.dataSource.AddReservation(this.reservation)
    
      .subscribe(response=>{

          this.router.navigateByUrl("/adminsidebar/getreservation")

      })
          //this.router.navigate(["/"]);

          Swal.fire(
            'Added Successfully!',
            'Your record has been Added.',
               'success'
               )

      }
      else if(result.dismiss===Swal.DismissReason.cancel){
            Swal.fire(
      'Cancelled',
      'record not Added:',
      'error'
    )
      }

  })

}


}
