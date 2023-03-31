import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Bookings } from 'src/app/model/bookings.model';
import { Machine } from 'src/app/model/machine.model';
import { RestDataSource } from 'src/app/model/rest.datasource';
import { Shop } from 'src/app/model/Shop.Model';
import { User } from 'src/app/model/user.model';
import { SharedataService } from 'src/app/sharedata.service';




@Component({
  selector: 'app-shopmachinedetail',
  templateUrl: './shopmachinedetail.component.html',
  styleUrls: ['./shopmachinedetail.component.css']
})
export class ShopmachinedetailComponent {

  formModal: any;
  public machines: Machine[] = [];
  public machine= new Machine('');
  public shop = new Shop();
  public shopName?:string;
  public shops :Shop[]=[];
  public id:any;
  public machineelement = new Machine('')
  public user = new User()
  public userPhoneNo: string | null = sessionStorage.getItem("userPhoneNumber");
  FormattedBookingStartTime:any; 
   value:any; 
   bookingIdList:any[]=[] 

  // pagination
  title = 'pagination';
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];
  public toggle?:boolean
  allBookings:Bookings[]=[];
  //filter
  searchText: any;

  constructor(private datasource: RestDataSource, private router: Router,private route :ActivatedRoute,private sharedata:SharedataService) {
    this.id = this.route.snapshot.paramMap.get('id');
      this.id=parseInt(this.id);
    this.datasource.GetAllShops().subscribe(data=>{
      this.shops=data;
      this.datasource.GetMachinesByShopId(this.id).subscribe(data => {
        this.machines = data;
        console.log(this.machines);
        console.log(this.id)
        this.shop.shopId=this.id
  
        for(let i=0;i<this.shops.length;i++){
          if(this.shops[i].shopId==this.shop.shopId){
            this.shopName=this.shops[i].shopName;
          }
        }
      });
    })

    }
    ngOnInit(){
      

      this.sharedata.currentToggle.subscribe(t=>{
        this.toggle= t;
        console.log(this.toggle)
      })
  
        
          
    }

    changeWorkingStatus(workingStatus:any){
      console.log(workingStatus);
      
      this.machineelement.workingStatus=!workingStatus;
      console.log(this.machineelement.workingStatus);
        
    }
    changeLockingStatus(lockStatus:any){
      this.machineelement.lockStatus=!lockStatus; 
    }

  machineList():void{
    this.datasource.GetMachinesByShopId(this.shop.shopId).subscribe(data => {
      this.machines = data;
      console.log(this.shop.shopId);

  });
}

    updateid( machine : any){
      this.machineelement = machine;
      console.log(this.machineelement.workingStatus);
    }

    deleteid(machine:any){

      this.machineelement=machine;
      console.log(this.machineelement.shopId)
  
    }

    addMachine(form: NgForm) {
      
      if (form.valid) {
        this.datasource.GetUserInfo(this.userPhoneNo).subscribe(data=>{
          this.user=data;

          this.machineelement.userId=this.user.userId
        this.machineelement.shopId=this.shop.shopId;
        // this.machineelement.userId=this.shop.userId;
        console.log(this.machineelement.userId)
        this.datasource.AddMachine(this.machineelement).subscribe(reponse => {
          
          console.log(this.machineelement);
          window.location.reload();  
          // this.router.navigateByUrl(`sidebar/shopmachinedetail/`+${this.machineelement.userId}`)
        })
        });
      }
    }

    updatemachineid(id: any) {

      this.datasource.UpdateMachine(this.machineelement.machineId, this.machineelement).subscribe(reponse => {
          window.location.reload();
      });
    }


    patchmachineid(id: any) {
      this.datasource.UpdateMachine(this.machineelement.machineId, this.machineelement).subscribe(reponse => {
        console.log(this.machineelement.workingStatus);
        if(this.machineelement.workingStatus==false){ 

          this.datasource.GetAllBookings().subscribe(data=>{ 

            this.allBookings=data; 

            for(let i=0;i<this.allBookings.length;i++){ 

              //console.log("yfy") 

              if(this.allBookings[i].machineId==this.machineelement.machineId){ 

                //console.log("yfy") 

                this.FormattedBookingStartTime=new Date(this.allBookings[i].bookingStartTime) 

                console.log(this.FormattedBookingStartTime.getDate()) 

                console.log(new Date().getDate()) 

                 

                if(this.FormattedBookingStartTime.getFullYear()==new Date().getFullYear()&& 

                this.FormattedBookingStartTime.getMonth()==(new Date().getMonth())&& 

                this.FormattedBookingStartTime.getDate()==new Date().getDate() 

                &&this.FormattedBookingStartTime.getHours()>new Date().getHours()){ 

                  console.log(this.FormattedBookingStartTime.getDate(),this.FormattedBookingStartTime.getMonth(),this.FormattedBookingStartTime.getFullYear()) 

                  console.log(new Date().getDate(),new Date().getMonth(),new Date().getFullYear()) 

                    

                   

                   this.datasource.DeleteSlotBookingByMachineId(this.allBookings[i].bookingId).subscribe(data=>{ 

                    console.log("hello") 

                    console.log(data); 

                    this.value=false; 

     

                  }) 

                   

                } 

              } 
            } 
          }) 
        } 
        });

    }
    deletemachineid(id: any) {
      this.datasource.DeleteMachine(this.machineelement.machineId).subscribe(reponse => {
        window.location.reload();
  
      });
    }

    openModal(){
      this.formModal.show();
    }
  
    closeModal() {
      this.formModal.hide();
    }
  
    // pagination code
    onTableDataChange(event: any) {
      this.page = event;
      console.log(this.page);
      this.machineList();
    }
  
    logout() {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("role");
      sessionStorage.removeItem("username");
      this.router.navigateByUrl("/");
    }


}
