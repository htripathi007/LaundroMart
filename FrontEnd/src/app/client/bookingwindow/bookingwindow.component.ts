import { Component, DoCheck, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Bookings } from 'src/app/model/bookings.model';
import { Machine } from 'src/app/model/machine.model';
import { Reservation } from 'src/app/model/reservation.model';
import { RestDataSource } from 'src/app/model/rest.datasource';
import { Shop } from 'src/app/model/Shop.Model';
import { User } from 'src/app/model/user.model';
import { SharedataService } from 'src/app/sharedata.service';
import Swal from 'sweetalert2';
// import { MdInputModule } from '@angular/material';


@Component({
  selector: 'app-bookingwindow',
  templateUrl: './bookingwindow.component.html',
  styleUrls: ['./bookingwindow.component.css']
})
export class BookingwindowComponent implements OnInit,DoCheck{

  public shop = new Shop;
  public toggle?:boolean;
  public reservations:Reservation[]=[];
  public id:any;
  public shopDetails= new Shop;
  public booking=new Bookings(new Date(),new Date());
  selectedvalue:any
  public bookingList:any[]=[];
  public machineList:any
  public errorMessage:string=''
  public allMachinesId:number[]=[]
  public machinesOccupiedId:number[]=[]
  public availableMachineId:number[]=[]
  public assignedMachine:any=null
  public user=new User()
  public startTime=new Date()
  public endTime=new Date()
  public bookingStartTime_:any
  public _bookingStartTime:any
  public dateNow = "";
  public date_:any;
 public date = new Date();
public finalMonth:any;
public finalDay: any;
public finalMinute:any;
public finalHour:any;
public month = this.date.getUTCMonth()+1
public day = this.date.getDate();
 public minute = this.date.getMinutes()
 public hour = this.date.getHours()
 public boolArray?:boolean
 machineName:string=''
 machinedetails=new Machine('')
 bookingStatus?:boolean=true;
 public msg?:string

  
  public userPhoneNo : string | null = sessionStorage.getItem("userPhoneNumber");


  constructor(private router:Router,private sharedata:SharedataService,private datasource:RestDataSource,private route: ActivatedRoute){
    
    
  }
  ngDoCheck(): void {
  }
 
  
  
  ngOnInit(): void {
    this.msg = ""
    if(this.month<10){
      this.finalMonth = "0"+this.month
  }
  else{
    this.finalMonth = this.month
  }
  if(this.hour<10){
    this.finalHour = "0"+(this.hour+1)
}
else{
  this.finalHour = (this.hour+1)
}


  if(this.day<10){
    this.finalDay = "0"+this.day
}
else{
  this.finalDay = this.day
}

if(this.minute<10){
  this.finalMinute = "0"+this.minute
}
else{
this.finalMinute = this.minute
}

this.dateNow  = this.date.getUTCFullYear()+"-"+this.finalMonth+"-"+
this.finalDay+" "+this.finalHour+":"+"00"
    this.date_ = new Date(this.dateNow)
    console.log(this.dateNow)
    this.datasource.GetUserInfo(this.userPhoneNo).subscribe(data=>{
      this.user = data;

      this.booking.userId=this.user.userId;
    })
    console.log(this.userPhoneNo, "user");
    

    

    
    this.id=this.route.snapshot.paramMap.get('id');
    this.id=parseInt(this.id);

    //this.booking.userId=this.user.userId;
    
    
    this.booking.shopId=this.id
    

    console.log(this.id);
    

    
    this.sharedata.currentToggle.subscribe(t=>{
      this.toggle= t;
      console.log(this.toggle)
    })
    this.datasource.GetAllReservation().subscribe(data=>{
      this.reservations=data;
      //console.log(this.reservations)
    })

    this.datasource.GetShopByShopId(this.id).subscribe(data=>{
      this.shopDetails=data
    })
    this.datasource.GetMachinesByShopId(this.id).subscribe(data=>{
      this.machineList=data;
      
     
     for(let i=0;i<this.machineList.length;i++){
      if(this.machineList[i].workingStatus==true){this.allMachinesId.push(this.machineList[i].machineId);}
      
     }
     console.log(this.machineList)
      //console.log(this.machineList)
      //console.log(this.machineList.length); 
      //console.log(this.allMachinesId)
    })



    

    

    
  }
  CheckBooking(bookingStartTime:any){


    //this.datasource.
  // console.log(this.shopDetails.shopStartTime)
  console.log(this.bookingStartTime_,"yes")





  if(this.shopDetails.shopStartTime!=undefined && this.shopDetails.shopEndTime!=undefined){

    console.log('hwd');
    let FormattedStartTime=new Date(this.shopDetails.shopStartTime);
    let FormattedEndTime=new Date(this.shopDetails.shopEndTime)
    let FormattedBookingStartTime=new Date(bookingStartTime)
   
    
    if(FormattedStartTime.getHours()==FormattedBookingStartTime.getHours()&&FormattedEndTime.getHours()==FormattedBookingStartTime.getHours()){
      if(FormattedStartTime.getMinutes()<=FormattedBookingStartTime.getMinutes()&&FormattedEndTime.getMinutes()>FormattedBookingStartTime.getMinutes()){
       
       this.boolArray=true;
      }
      else{
        
        this.boolArray=false;
      }
    }
    else if(FormattedStartTime.getHours()==FormattedBookingStartTime.getHours()&&FormattedEndTime.getHours()!=FormattedBookingStartTime.getHours()){
      if(FormattedStartTime.getMinutes()<=FormattedBookingStartTime.getMinutes()){
        this.boolArray=true;
      }
      else{
        this.boolArray=false;
      }
    }
    else if(FormattedStartTime.getHours()!=FormattedBookingStartTime.getHours()&&FormattedEndTime.getHours()==FormattedBookingStartTime.getHours()){
      if(FormattedEndTime.getMinutes()>FormattedBookingStartTime.getMinutes()){
        this.boolArray=true;
      }
      else{
        this.boolArray=false;
      }
    }
    else if(FormattedStartTime.getHours()<FormattedBookingStartTime.getHours()&&FormattedEndTime.getHours()>FormattedBookingStartTime.getHours()){
      this.boolArray=true;
    }
    else{
      this.boolArray=false;
    }
    console.log(this.boolArray)

    if(!this.boolArray && this.bookingStartTime_!= undefined){
      this.msg = "The shop is closed at this time"
    }
  }

    
    

  // this.booking.bookingStartTime = this.bookingStartTime_;

  this.bookingStartTime_.setTime(this.bookingStartTime_.getTime()+3600000*5.5)
  this.startTime = new Date(this.bookingStartTime_)
  console.log(this.bookingStartTime_,"NO")
  //  this.booking.bookingStartTime.setTime(this.booking.bookingStartTime.getTime()+3600000*5.5)
    // console.log(this.startTime);
    this.datasource.GetBookingsByShopId(this.id,this.startTime.toISOString()).subscribe(data=>{
      this.bookingList=data;

      

      //this.endTime=new Date(this.endTime.setHours(this.startTime.getHours()+1))
      this.booking.bookingStartTime = this.startTime
      this.endTime.setTime(this.startTime.getTime()+3600000*1)
      // console.log(this.endTime)
      //this.booking.bookingEndTime= new Date(this.endTime.getFullYear(),this.endTime.getMonth(),this.endTime.getDay(),this.endTime.getHours(),this.endTime.getMinutes(),this.endTime.getSeconds(),this.endTime.getMilliseconds())
      this.booking.bookingEndTime= this.endTime
      // console.log(this.startTime)
      // console.log(this.bookingList)
      // console.log(this.booking.bookingEndTime,"uheiuhwiq");
      
      
       //console.log(this.machinesOccupiedId)
      //  console.log(this.availableMachineId)
      

    });
    
    
    
  }

  
  
  BookSlot(form:NgForm){
    this.booking.bookingDateTime=new Date()
    //console.log(reservation.reservationId);
    console.log(this.booking.reservationId);
    this.CheckBooking(this.bookingStartTime_)
    
    this.datasource.GetBookingsByShopId(this.id,this.startTime.toISOString()).subscribe(data=>{
      this.bookingList=data;
    

    this.availableMachineId=[]
    
    this.machinesOccupiedId=[]


    for(let i=0;i<this.bookingList.length;i++){
      this.machinesOccupiedId.push(this.bookingList[i].machineId);
     }
    
     console.log(this.allMachinesId)
     this.availableMachineId=this.allMachinesId.filter(item =>this.machinesOccupiedId.indexOf(item) < 0);
     console.log(this.machinesOccupiedId)

    
    
    console.log(this.availableMachineId)
    console.log(Math.floor(Math.random() * 10));

    this.assignedMachine=this.availableMachineId[Math.floor(Math.random() * this.availableMachineId.length)]
    console.log(this.assignedMachine,"assigned")
    this.booking.machineId=this.assignedMachine

    
    
    
    
    this.datasource.GetReservationById(this.booking.reservationId).subscribe(data=>{
      this.booking.bill=data.charges;
      console.log(data.charges)

    })
    
    

    this.booking.pin=Math.floor(Math.random() * 999999)

    console.log(this.booking);
    
    if(this.allMachinesId.length>this.bookingList.length){
      if(form.valid){
        console.log(this.booking);
        this.datasource.GetMachineByMachineId(this.booking.machineId).subscribe(data=>{
          console.log(this.booking.machineId)
          this.machinedetails=data;
          console.log(this.machinedetails)
          this.machineName=this.machinedetails.machineName
          console.log(this.machineName);
          //this.booking.reservationId=1

          if(this.boolArray){
            this.datasource.AddSlotBooking(this.booking,this.machineName).subscribe(Response=>{
              console.log("booking done");
              
              console.log(this.booking)
              console.log(this.errorMessage)
      
                
            })
            console.log("uhwi")
            this.errorMessage="Slot Booked"
          }
          
          
        })
        
      }
        
    }
    else{
      this.errorMessage="This slot is occupied"
      this.bookingStatus=false;
      console.log(this.bookingStatus)
      
    }
    this.bookingStartTime_=null
  })
  }
  hello(value:any){
   this.selectedvalue=value;
   console.log(this.selectedvalue) 
   console.log("juhwi")
   

  }

}
