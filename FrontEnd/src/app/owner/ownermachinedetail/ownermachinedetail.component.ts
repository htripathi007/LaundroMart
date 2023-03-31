import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { VirtualTimeScheduler } from 'rxjs';
import { Machine } from 'src/app/model/machine.model';
import { RestDataSource } from 'src/app/model/rest.datasource';
import { Shop } from 'src/app/model/Shop.Model';
import { User } from 'src/app/model/user.model';
import { SharedataService } from 'src/app/sharedata.service';



@Component({
  selector: 'ownermachinedetail',
  templateUrl: './ownermachinedetail.component.html',
  styleUrls: ['./ownermachinedetail.component.css']
})
export class OwnermachinedetailComponent {

  formModal: any;
  public machines: Machine[] = [];
  public machine = new Machine('');
  public shops: Shop[]=[];
  public shopName?:string;
  public wmcount = 0;
  public lmcount = 0;
  public length = 0;

  public machineelement = new Machine('')

  public user = new User()
  public userPhoneNo: string | null = sessionStorage.getItem("userPhoneNumber");

  // pagination
  title = 'pagination';
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];
  public toggle?:boolean

  //filter
  searchText: any;

  constructor(private datasource: RestDataSource, private router: Router,private sharedata:SharedataService) {

    datasource.GetUserInfo(this.userPhoneNo).subscribe(data => {
      this.user = data;
      console.log(this.user);

      datasource.GetMachinesByUserId(this.user.userId).subscribe(data => {
        this.machines = data;
        console.log(this.machines);

        this.length = this.machines.length;
        for (var i = 0; i < this.length; i++) {
          if (this.machines[i].workingStatus == true) {
            this.wmcount++;
          };
          if (this.machines[i].lockStatus == true) {
            this.lmcount++;
          };
        };
      });
    });
  }

  ngOnInit(): void {
    this.sharedata.currentToggle.subscribe(t=>{
      this.toggle= t;
      console.log(this.toggle)
    })
    // this.shopList();

  }

  getShopName(shopId:any){
    console.log(shopId);
    this.datasource.GetShopsByUserId(this.machineelement.userId).subscribe(data => {
      this.shops = data;
      console.log(this.shops);
      
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

  machineList(): void {
    this.datasource.GetAllMachines().subscribe(data => {
      this.machines = data;
      console.log(this.machines);
    });
  }


  updateid(machine: any) {
    this.machineelement = machine;
    console.log(this.machineelement.userId);
  }

  deleteid(machine: any) {

    this.machineelement = machine;
    console.log(this.machineelement.shopId)

  }

  addMachine(form: NgForm) {
    if (form.valid) {
      this.machineelement.shopId = this.machine.shopId;
      this.machineelement.userId = this.user.userId;
      // if (this.machineelement.workingStatus === "true") {
      //   this.machineelement.workingStatus = true;
      // }
      // else {
      //   this.machineelement.workingStatus = false;
      // };

      // if (this.machineelement.lockStatus === "true") {
      //   this.machineelement.lockStatus = true;
      // }
      // else {
      //   this.machineelement.lockStatus = false;
      // };
      this.datasource.AddMachine(this.machineelement).subscribe(reponse => {
        window.location.reload();
      });
    }
  }

  updatemachineid(id: any) {
    console.log(this.machineelement)

    // if (this.machineelement.workingStatus === "true") {
    //   this.machineelement.workingStatus = true;
    // }
    // else if(this.machineelement.workingStatus === "false") {
    //   this.machineelement.workingStatus = false;
    // };

    // if (this.machineelement.lockStatus === "true") {
    //   this.machineelement.lockStatus = true;
    // }
    // else if (this.machineelement.workingStatus === "false") {
    //   this.machineelement.lockStatus = false;
    // };

    this.datasource.UpdateMachine(this.machineelement.machineId, this.machineelement).subscribe(reponse => {
        window.location.reload();      
    });
  }

  deletemachineid(id: any) {
    this.datasource.DeleteMachine(this.machineelement.machineId).subscribe(reponse => {
      window.location.reload();

    });
  }

  openModal() {
    this.formModal.show();
  }

  closeModal() {
    this.formModal.hide();
  }

  // pagination code
  onTableDataChange(event: any) {
    this.page = event;
    console.log(this.page);
  }

  logout() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("username");
    this.router.navigateByUrl("/");
  }




}
