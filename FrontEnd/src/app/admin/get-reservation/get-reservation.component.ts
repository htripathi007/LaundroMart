import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Reservation } from 'src/app/model/reservation.model';
import { RestDataSource } from 'src/app/model/rest.datasource';
import { SharedataService } from 'src/app/sharedata.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get-reservation',
  templateUrl: './get-reservation.component.html',
  styleUrls: ['./get-reservation.component.css']
})
export class GetReservationComponent implements OnInit {
  public reservation:Reservation[]=[];
  @ViewChild('exampleModal') myModal: any;
  
  public reservationElement= new Reservation();
  page: number=1;
  count:number=0;
  tableSize:number=5;
  public reserEle=new Reservation()

  tableSizes:any =[5,10,15,20];
  public toggle?:boolean;
  

  constructor(private dataSource:RestDataSource,private  router:Router,private sharedata:SharedataService) {
    this.dataSource.GetAllReservation().subscribe(data =>{
      console.log(data);
        this.reservation = data;
       
    });
  }
  
  ngOnInit(): void {
    this.sharedata.currentToggle.subscribe(t=>{
      this.toggle= t;
      console.log(this.toggle)
    })
  }
  updateid(reser:any){
    this.reservationElement = reser;
    console.log(reser);
    //console.log(this.employeeelement.empId);
  }

  openModal(){
    console.log('modal opened!');
    // this.myModal.modal('show');
    
    (<any>document.getElementById('#exampleModal')).modal('show');
  }

  updateempid(empId:any){

    this.dataSource.UpdateReservation(this.reservationElement.reservationId,this.reservationElement).subscribe(reponse=>{
    this.router.navigateByUrl("/getreservation");
    window.location.reload();
    console.log('hello')

    });
  }
  closereservation(){
    this.router.navigateByUrl("/adminsidebar/getreservation");
  }
  deleteone(reservationId:number){
    Swal.fire({
      title:'Are you sure?',
      text:'you will not be able to recover deleted record',
      icon:'warning',
      showCancelButton:true,
      confirmButtonText:'Yes,delete it!',
      cancelButtonText:'No,keep it'
    }).then((result)=>{
      if(result.value){

                this.dataSource.DeleteReservation(reservationId).subscribe(response=>{
              
                this.router.navigateByUrl("")

            })
      Swal.fire(
        'Deleted!',
        'Your record has been deleted.',
        'success'
      )}
      else if(result.dismiss===Swal.DismissReason.cancel){
        Swal.fire(
          'Cancelled',
          'record not deleted:',
          'error'
        )
      }
      window.location.reload();
    })
  }
  ReservationsList():void{

    this.dataSource.GetAllReservation().subscribe(data=>{
      
  
       this.reservation=data;
  
  
     });
  
   }
  onTableDataChange(event:any){
    this.page=event;
  
    console.log(this.page);
  
    this.ReservationsList();
  }
  addReservation(form:NgForm){
    
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
        console.log(this.reserEle)

       this.dataSource.AddReservation(this.reserEle)
       
    
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
