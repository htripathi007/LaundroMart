import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestDataSource } from 'src/app/model/rest.datasource';
import { User } from 'src/app/model/user.model';
import { SharedataService } from 'src/app/sharedata.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {

 toggle?:boolean;

 ngOnInit(): void {
  this.shareData.currentToggle.subscribe(t=>{
    this.toggle= t;
    console.log(this.toggle)
  })
}

  public users:User[]=[];
  
  
required:any;
page: number=1;
  count:number=0;
  tableSize:number=5;

  tableSizes:any =[5,10,15,20];

    constructor(private dataSource:RestDataSource,private  router:Router,private shareData:SharedataService){

        this.dataSource.GetAllUsers().subscribe(data =>{
          console.log(data);
            this.users = data;
           this.required=data[0].userFirstName;
           console.log(this.required);
        });
        this.shareData.currentToggle.subscribe(t=>{
          this.toggle=t;
          console.log(this.toggle);
        })
        
        
    } 
    
    deleteone(userId:number){
      Swal.fire({
        title:'Are you sure?',
        text:'you will not be able to recover deleted record',
        icon:'warning',
        showCancelButton:true,
        confirmButtonText:'Yes,delete it!',
        cancelButtonText:'No,keep it'
      }).then((result)=>{
        if(result.value){

                  this.dataSource.DeleteUser(userId).subscribe(response=>{
                
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
UsersList():void{

  this.dataSource.GetAllUsers().subscribe(data=>{
    

     this.users=data;


   });

 }
onTableDataChange(event:any){



  this.page=event;



  console.log(this.page);



  this.UsersList();



}

}