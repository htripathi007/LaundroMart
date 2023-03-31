import { Component } from '@angular/core'; 

import { Router } from '@angular/router'; 

import { Bookings } from 'src/app/model/bookings.model'; 

import { Machine } from 'src/app/model/machine.model'; 

import { Reservation } from 'src/app/model/reservation.model'; 

 
 

import { RestDataSource } from 'src/app/model/rest.datasource'; 

import { Shop } from 'src/app/model/Shop.Model'; 

import { User } from 'src/app/model/user.model'; 

import { SharedataService } from 'src/app/sharedata.service'; 

 
 

@Component({ 

  selector: 'app-clientbookings', 

  templateUrl: './clientbookings.component.html', 

  styleUrls: ['./clientbookings.component.css'] 

}) 

export class ClientbookingsComponent { 

  public bookings: Bookings[] = []; 

  public user = new User() 

  public userPhoneNo: string | null = sessionStorage.getItem("userPhoneNumber"); 

  public status: any; 

  public shopDetails: any[] = [] 

  public book: any[] = []; 

  public Names: any[] = [] 

  public temp: any[] = [] 

  // pagination 

  title = 'pagination'; 

  page: number = 1; 

  count: number = 0; 

  tableSize: number = 5; 

  tableSizes: any = [5, 10, 15, 20]; 

  public toggle?: boolean; 

  ReservationArray: Reservation[] = [] 

  ReservationName: any[] = [] 

  MachineArray: Machine[] = [] 

  MachineName: any[] = [] 

  public booking: Bookings[] = [] 

  currentTime = new Date(); 

  cancelBool: boolean[] = []; 

  //FormattedBookingStartTime: any[] = [] 

  FormattedBookingStartTime:any 

 
 
 

  //filter 

  searchText: any; 

 
 

  constructor(private datasource: RestDataSource, private sharedata: SharedataService, private router: Router) { 

 
 

    console.log(this.currentTime); 

    console.log(this.currentTime.getDate()); 

 
 

    datasource.GetUserInfo(this.userPhoneNo).subscribe(data => { 

      this.user = data; 

      //console.log(this.user); 

      datasource.GetBookingsByUserId(this.user.userId).subscribe(data => { 

 
 

        this.bookings = data; 

        console.log(this.bookings); 

 
 

        for (let i = 0; i < this.bookings.length; i++) { 

          this.book[i]=this.bookings[i].shopId 

          console.log(this.book) 

 
 
 

        } 

        console.log(this.book) 

        for (let i = 0; i < this.book.length; i++) { 

          console.log(this.book[i])
          this.datasource.GetShopByShopId(this.book[i]).subscribe(data => { 

            console.log("data", data) 

            this.shopDetails[i] = data 

            console.log(this.shopDetails) 

            for (let i = 0; i < this.shopDetails.length; i++) { 

              this.Names[i] = this.shopDetails[i].shopName 

              console.log(this.Names) 

            } 

 
 
 

          }) 

 
 
 

        } 

 
 

        for (let i = 0; i < this.bookings.length; i++) { 

          this.datasource.GetReservationById(this.bookings[i].reservationId).subscribe(data => { 

            this.ReservationArray[i] = data; 

            for (let i = 0; i < this.ReservationArray.length; i++) { 

              this.ReservationName[i] = this.ReservationArray[i].reservationType; 

 
 

            } 

 
 

          }) 

        } 

        for (let i = 0; i < this.bookings.length; i++) { 

          this.datasource.GetMachineByMachineId(this.bookings[i].machineId).subscribe(data => { 

            this.MachineArray[i] = data; 

            for (let i = 0; i < this.MachineArray.length; i++) { 

              this.MachineName[i] = this.MachineArray[i].machineName; 

 
 

            } 

 
 

          }) 

        } 

        for(let i=0;i<this.bookings.length;i++){ 

             

          if(this.bookings[i].bookingStartTime!=undefined){ 

             this.FormattedBookingStartTime=new Date(this.bookings[i]?.bookingStartTime); 

             this.currentTime=new Date(this.currentTime) 

              

             // console.log() 

            // if(FormattedBookingStartTime.getMonth()==this.currentTime.getMonth()&&FormattedBookingStartTime.getDate()==this.currentTime.getDate()&&FormattedBookingStartTime.getHours()==this.currentTime.getHours()){ 

            //   this.cancelBool=false; 

            // } 

             console.log(this.FormattedBookingStartTime) 

            if((this.FormattedBookingStartTime.valueOf()-this.currentTime.valueOf())<7200000 ){ 

              this.cancelBool[i]=true; 

            } 

            else{ 

              this.cancelBool[i]=false; 

            } 

            // console.log(FormattedBookingStartTime.getMonth()+"FMonthC "+this.currentTime.getMonth()) 

            // console.log(FormattedBookingStartTime.getDate()+"FDateC"+this.currentTime.getDate()) 

            // console.log(FormattedBookingStartTime.getHours()+"FHourC"+this.currentTime.getHours()) 

            console.log(this.cancelBool) 

          } 

           

           

        } 

 
 
 
 

      }) 

 
 

    }); 

 
 
 
 
 
 
 
 
 
 

    // this.datasource.GetShopByShopId(this.book.shopId).subscribe(data=>{ 

    //   console.log(this.book.shopId) 

    //   this.shopDetails=data 

    // }) 

 
 

    //console.log(this.bookings.reservationId); 

 
 

    // this.datasource.GetAllShops().subscribe(data=>{ 

    //   this.shops=data; 

    //   console.log(this.shops); 

    // }) 

 
 

  } 

 
 
 
 

  ngOnInit(): void { 

 
 

    this.sharedata.currentToggle.subscribe(t => { 

      this.toggle = t; 

      console.log(this.toggle) 

    }) 

 
 

  } 

  deleteone(bookingid: any) { 

    this.datasource.DeleteSlotBooking(bookingid).subscribe(data => { 

      console.log(data); 

 
 

    }) 

 
 
 

    window.location.reload(); 

 
 

  } 

 
 
 

  logout() { 

    sessionStorage.removeItem("token"); 

    sessionStorage.removeItem("role"); 

    sessionStorage.removeItem("username"); 

    this.router.navigateByUrl("/"); 

  } 
  onTableDataChange(event: any) {
    this.page = event;
    console.log(this.page);
    
  }

 
 

} 

 
 
 
 
 

 