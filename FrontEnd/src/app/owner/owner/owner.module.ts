import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarModule } from 'ng-sidebar';

import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

import { MyshopComponent } from '../myshop/myshop.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { OwnermachinedetailComponent } from '../ownermachinedetail/ownermachinedetail.component';
import { ShopmachinedetailComponent } from '../shopmachinedetail/shopmachinedetail.component';
import { OwnerprofileComponent } from '../OwnerProfile/ownerprofile.component';
import { AppRoutingModule } from 'src/app/app-routing.module';




@NgModule({
  declarations: [SidebarComponent,OwnerprofileComponent, MyshopComponent,OwnermachinedetailComponent, ShopmachinedetailComponent ],
  imports: [
    CommonModule,AppRoutingModule,SidebarModule.forRoot(),NgxPaginationModule,FormsModule
  ]
})
export class OwnerModule { }
