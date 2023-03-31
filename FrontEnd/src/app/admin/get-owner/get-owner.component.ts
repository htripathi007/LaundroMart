import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { RestDataSource } from 'src/app/model/rest.datasource';
import { User } from 'src/app/model/user.model';
import { OwnerModule } from 'src/app/owner/owner/owner.module';
import { SharedataService } from 'src/app/sharedata.service';

@Component({
  selector: 'app-get-owner',
  templateUrl: './get-owner.component.html',
  styleUrls: ['./get-owner.component.css']
})
export class GetOwnerComponent implements OnInit {
  page: number=1;
  count:number=0;
  tableSize:number=5;

  tableSizes:any =[5,10,15,20];
  public toggle?:boolean;
  

  
  public users:User[]=[];
  
  
required:any;
role:string;
public userElement = new User

     constructor(private dataSource:RestDataSource,private  router:Router,private sharedata:SharedataService){
        this.role='Owner';

        this.dataSource.GetUsersByRole(this.role).subscribe(data =>{
          console.log(data);
            this.users = data;
           //this.required=data[0].userFirstName;
           //console.log(this.required);
        });
        
      } 
      ngOnInit(): void {
        this.sharedata.currentToggle.subscribe(t=>{
          this.toggle= t;
          console.log(this.toggle)
        })
      }
      OwnersList():void{

        this.dataSource.GetUsersByRole(this.role).subscribe(data=>{
          
    
           this.users=data;
    
    
         });
    
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
onTableDataChange(event:any){



  this.page=event;



  console.log(this.page);



  this.OwnersList();



}
changeApproveStatus(approveStatus:any){
  this.userElement.approveStatus=!approveStatus;  
}
updateid(user:any){
  console.log(user);
  this.userElement = user;
  console.log(this.userElement.approveStatus);
}
patchuserid(id: any) {
  this.dataSource.UpdateUser(this.userElement.userId, this.userElement).subscribe(reponse => {
    console.log(this.userElement.approveStatus);
    
    });
}

}

