import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewUsersComponent } from '../view-users/view-users.component';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';

import { SidebarModule } from 'ng-sidebar';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { GetReservationComponent } from '../get-reservation/get-reservation.component';
import { AddReservationtypeComponent } from '../add-reservationtype/add-reservationtype.component';
import { FormsModule } from '@angular/forms';
import { GetOwnerComponent } from '../get-owner/get-owner.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { GetClientComponent } from '../get-client/get-client.component';
import {AdminProfileComponent} from '../admin-profile/admin-profile.component';




@NgModule({
  declarations: [ViewUsersComponent,AdminSidebarComponent,GetReservationComponent,AddReservationtypeComponent,GetOwnerComponent,GetClientComponent,
    AdminProfileComponent],
  imports: [
    CommonModule,SidebarModule.forRoot(),AppRoutingModule,FormsModule,NgxPaginationModule
  ]
})
export class AdminModule { }
