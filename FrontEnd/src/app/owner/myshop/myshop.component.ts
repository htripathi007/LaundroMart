import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';



import { NgxPaginationModule } from 'ngx-pagination';
import { NgForm } from '@angular/forms';
import { Shop } from 'src/app/model/Shop.Model';
import { RestDataSource } from 'src/app/model/rest.datasource';
import { User } from 'src/app/model/user.model';
import { SharedataService } from 'src/app/sharedata.service';
import { Bookings } from 'src/app/model/bookings.model';

@Component({
  selector: 'myshop',
  templateUrl: './myshop.component.html',
  styleUrls: ['./myshop.component.css']
})
export class MyshopComponent {
  formModal: any;
  public shops: Shop[] = [];
  public shop = new Shop()
  public shopelement = new Shop()
  public user = new User()
  public userPhoneNo: string | null = sessionStorage.getItem("userPhoneNumber");
  public status :any;
  // pagination
  title = 'pagination';
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];
  public shopele=new Shop()
  public toggle?:boolean;
  allBookings:Bookings[]=[] 
  FormattedBookingStartTime:any 

  //filter
  searchText: any;

  constructor(private datasource: RestDataSource, private router: Router, private sharedata:SharedataService) {

    datasource.GetUserInfo(this.userPhoneNo).subscribe(data => {
      this.user = data;
      console.log(this.user);
      datasource.GetShopsByUserId(this.user.userId).subscribe(data => {
        this.shops = data;
        console.log(this.shops);
      })
    });

    // this.datasource.GetAllShops().subscribe(data=>{
    //   this.shops=data;
    //   console.log(this.shops);
    // })
  }

  ngOnInit(): void { 
    this.sharedata.currentToggle.subscribe(t=>{
      this.toggle= t;
      console.log(this.toggle)
    })

    // this.shopList();

  }
  shopList():void{
    this.datasource.GetAllShops().subscribe(data=>{
      this.shops=data;
      console.log(this.shops);
  });
}

changeShopStatus(shopWorkingStatus:any){
  this.shopelement.shopWorkingStatus=!shopWorkingStatus;  
}

  addShop(form: NgForm) {
    if (form.valid) {
      if(this.shop.shopCity!=undefined){
        this.shop.shopCity=this.shop.shopCity[0].toUpperCase()+this.shop.shopCity.slice(1)
      }
      this.datasource.AddShop(this.shop, this.user.userId).subscribe(reponse => {
        console.log("Reached reload");        
      });
      window.location.reload();
    }
  }

  updateid(shop:any){
    console.log(shop);
    this.shopelement = shop;
    console.log(this.shopelement.shopWorkingStatus);
    console.log(this.shopelement.shopStartTime)
    
    
  }

  updateshopid(id: any) {
    // console.log(this.shopelement);
    //wehn selector Used    
    // if(this.shopelement.shopWorkingStatus === "true"){
    //   this.shopelement.shopWorkingStatus=true;
    //   console.log(this.shopelement.shopWorkingStatus)

    // }
    // else if(this.shopelement.shopWorkingStatus === "false"){
    //   this.shopelement.shopWorkingStatus=false;
    //   console.log(this.shopelement.shopWorkingStatus)
    // }
    console.log(this.shopele.shopStartTime);
    this.shopelement.shopStartTime=this.shopele.shopStartTime
    this.shopelement.shopEndTime=this.shopele.shopEndTime
    this.datasource.UpdateShop(this.shopelement.shopId, this.shopelement).subscribe(reponse => {
        window.location.reload();
      });
  }

  patchshopid(id: any) {
    this.datasource.UpdateShop(this.shopelement.shopId, this.shopelement).subscribe(reponse => {
      console.log(this.shopelement.shopWorkingStatus);
      if(this.shopelement.shopWorkingStatus==false){ 

        this.datasource.GetAllBookings().subscribe(data=>{ 

          this.allBookings=data; 

          for(let i=0;i<this.allBookings.length;i++){ 

            //console.log("yfy") 

            if(this.allBookings[i].shopId==this.shopelement.shopId){ 

              //console.log("yfy") 

              this.FormattedBookingStartTime=new Date(this.allBookings[i].bookingStartTime) 

              console.log(this.FormattedBookingStartTime.getDate()) 

              console.log(new Date().getDate()) 

               

              if(this.FormattedBookingStartTime.getFullYear()==new Date().getFullYear()&& 
              this.FormattedBookingStartTime.getMonth()==new Date().getMonth()&& 
              this.FormattedBookingStartTime.getDate()==new Date().getDate() 
              &&this.FormattedBookingStartTime.getHours()>new Date().getHours()){ 

                console.log("yfy") 
                this.datasource.DeleteSlotBookingByShopId(this.allBookings[i].bookingId).subscribe(data=>{ 

                  console.log("hello") 

                  console.log(data); 
                }) 
              } 
            } 
          } 
        }) 
      } 
      
      });
  }

  deleteid(shop:any){
    this.shopelement=shop;
    console.log(this.shopelement.shopId)

  }

  deleteshopid(id: any) {
    this.datasource.DeleteShop(this.shopelement.shopId).subscribe(reponse => {
      window.location.reload();

    });
  }

  setshop(shop:Shop){

    this.router.navigate(['/sidebar/shopmachinedetail', shop.shopId]);

  }

  // openModal(){
  //   this.formModal.show();
  // }

  // closeModal() {
  //   this.formModal.hide();
  //   // this.myModal.modal('hide');
  // }

  // pagination code
  onTableDataChange(event: any) {
    this.page = event;
    console.log(this.page);
    this.shopList();
  }

  logout() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("username");
    this.router.navigateByUrl("/");
  }
}