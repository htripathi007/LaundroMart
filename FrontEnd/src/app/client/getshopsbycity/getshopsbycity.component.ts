import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestDataSource } from 'src/app/model/rest.datasource';
import { Shop } from 'src/app/model/Shop.Model';
import { User } from 'src/app/model/user.model';
import { SharedataService } from 'src/app/sharedata.service';
// import * as moment from 'moment';


@Component({
  selector: 'app-getshopsbycity',
  templateUrl: './getshopsbycity.component.html',
  styleUrls: ['./getshopsbycity.component.css']
})
export class GetshopsbycityComponent implements OnInit {
  public shops:Shop[]=[];

  public shop=new Shop();
  public user = new User();
  public userPhoneNo : string | null = sessionStorage.getItem("userPhoneNumber");
  // public shopinfo = new Shop();
  public toggle?:boolean;
  openTime:any;

  closeTime:any;
  currentHour: number=new Date().getHours();
  currentMinutes=new Date().getMinutes();
  boolArray:boolean[]=[]
  temp:any=new Date('2023-03-16 05:00:00.0000000');
  ownerUsers:User[]=[]
  approveStatusArray:any[]=[]
  allShops:Shop[]=[]
  public shopCities:any[]=[]
  public uniqueCity:any[]=[]
  public shopByCity:Shop[]=[]


  
  
  workingstatus=this.shop.shopWorkingStatus;
  

  constructor(private datasource:RestDataSource, private router:Router, private sharedata: SharedataService){
    console.log(this.userPhoneNo);
    console.log(this.temp);
    console.log(this.temp.getHours())
    datasource.GetUserInfo(this.userPhoneNo).subscribe(data=>{
      this.user = data;
      console.log(this.userPhoneNo)
      console.log(this.user);
      datasource.GetShopByCity(this.user.userCity).subscribe(data=>{
           this.shops=data;
           
        
            console.log(this.shops)  
            
          
          
          
          for(let v of this.shops){

            
            if(v.shopStartTime!=undefined && v.shopEndTime!=undefined){

              console.log('hwd');
              let FormattedStartTime=new Date(v.shopStartTime);
              let FormattedEndTime=new Date(v.shopEndTime)
             
              
              if(FormattedStartTime.getHours()==this.currentHour&&FormattedEndTime.getHours()==this.currentHour){
                if(FormattedStartTime.getMinutes()<=this.currentMinutes&&FormattedEndTime.getMinutes()>this.currentMinutes){
                  this.boolArray.push(true)
                }
                else{
                  this.boolArray.push(false)
                }
              }
              else if(FormattedStartTime.getHours()==this.currentHour&&FormattedEndTime.getHours()!=this.currentHour){
                if(FormattedStartTime.getMinutes()<=this.currentMinutes){
                  this.boolArray.push(true)
                }
                else{
                  this.boolArray.push(false)
                }
              }
              else if(FormattedStartTime.getHours()!=this.currentHour&&FormattedEndTime.getHours()==this.currentHour){
                if(FormattedEndTime.getMinutes()>this.currentMinutes){
                  this.boolArray.push(true)
                }
                else{
                  this.boolArray.push(false)
                }
              }
              else if(FormattedStartTime.getHours()<this.currentHour&&FormattedEndTime.getHours()>this.currentHour){
                this.boolArray.push(true);
              }
              else{
                this.boolArray.push(false)
              }
              console.log(this.boolArray)
            }
           
          }
          for(let i=0;i<this.shops.length;i++ ){
            datasource.GetUserByUserId(this.shops[i].userId).subscribe(data=>{
              this.ownerUsers[i]=data;
              
              console.log(this.ownerUsers)
              for(let i=0;i<this.ownerUsers.length;i++){
                this.approveStatusArray[i]=this.ownerUsers[i].approveStatus
                console.log(this.approveStatusArray[i])
              }
            })
 
          }
      })
    
      
    })

    
    

    // this.router.navigate(['/clientsidebar/getshopsbycity', this.shop.shopId]);
    this.datasource.GetAllShop().subscribe(data=>{
      this.allShops=data
      console.log(this.allShops);
      for(let i = 0;i< this.allShops.length;i++){
        this.shopCities[i]=this.allShops[i].shopCity

      }
      console.log(this.shopCities)
      function removewithfilter(arr:any[]) {
        let outputArray = arr.filter(function(v, i, self)
        {
             
            // It returns the index of the first
            // instance of each value
            return i == self.indexOf(v);
        });
         
        return outputArray;
    }
    this.uniqueCity=removewithfilter(this.shopCities)
     
      
    })
    
    

  }

showShops(city:any){
  console.log(city)
  this.datasource.GetShopByCity(city).subscribe(data=>{
    this.shops=data;
    
 
     console.log(this.shops)  
     
   
   
   
   for(let v of this.shops){

     
     if(v.shopStartTime!=undefined && v.shopEndTime!=undefined){

       console.log('hwd');
       let FormattedStartTime=new Date(v.shopStartTime);
       let FormattedEndTime=new Date(v.shopEndTime)
       
       
       if(FormattedStartTime.getHours()==this.currentHour&&FormattedEndTime.getHours()==this.currentHour){
         if(FormattedStartTime.getMinutes()<=this.currentMinutes&&FormattedEndTime.getMinutes()>this.currentMinutes){
           this.boolArray.push(true)
         }
         else{
           this.boolArray.push(false)
         }
       }
       else if(FormattedStartTime.getHours()==this.currentHour&&FormattedEndTime.getHours()!=this.currentHour){
         if(FormattedStartTime.getMinutes()<=this.currentMinutes){
           this.boolArray.push(true)
         }
         else{
           this.boolArray.push(false)
         }
       }
       else if(FormattedStartTime.getHours()!=this.currentHour&&FormattedEndTime.getHours()==this.currentHour){
         if(FormattedEndTime.getMinutes()>this.currentMinutes){
           this.boolArray.push(true)
         }
         else{
           this.boolArray.push(false)
         }
       }
       else if(FormattedStartTime.getHours()<this.currentHour&&FormattedEndTime.getHours()>this.currentHour){
         this.boolArray.push(true);
       }
       else{
         this.boolArray.push(false)
       }
       console.log(this.boolArray)
     }
    
   }
   
   for(let i=0;i<this.shops.length;i++ ){
     this.datasource.GetUserByUserId(this.shops[i].userId).subscribe(data=>{
       this.ownerUsers[i]=data;
       
       console.log(this.ownerUsers)
       for(let i=0;i<this.ownerUsers.length;i++){
         this.approveStatusArray[i]=this.ownerUsers[i].approveStatus
         console.log(this.approveStatusArray[i])
       }
     })

   }
})
this.boolArray=[]
  
  

  
  
}



  bookShop(shop:any){
    console.log(shop.shopId);
    this.router.navigate(['/clientsidebar/bookingwindow',shop.shopId]);
    

  }
  
  ngOnInit(): void {
    this.sharedata.currentToggle.subscribe(t=>{
      this.toggle= t;
      console.log(this.toggle)
    })
    
    
    
  }
  

}
