import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { OwnerregistrationComponent } from './account/ownerregistration/ownerregistration.component';
import { UserregistrationComponent } from './account/userregistration/userregistration.component';

import { AddReservationtypeComponent } from './admin/add-reservationtype/add-reservationtype.component';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { AdminSidebarComponent } from './admin/admin-sidebar/admin-sidebar.component';
import { GetClientComponent } from './admin/get-client/get-client.component';
import { GetOwnerComponent } from './admin/get-owner/get-owner.component';
import { GetReservationComponent } from './admin/get-reservation/get-reservation.component';


import { ViewUsersComponent } from './admin/view-users/view-users.component';
import { BookingwindowComponent } from './client/bookingwindow/bookingwindow.component';
import { ClientbookingsComponent } from './client/clientbookings/clientbookings.component';
import { ClientprofileComponent } from './client/clientprofile/clientprofile.component';
import { ClientsidebarComponent } from './client/clientsidebar/clientsidebar.component';
import { GetshopsbycityComponent } from './client/getshopsbycity/getshopsbycity.component';
import { MachineLockComponent } from './machine-lock/machine-lock/machine-lock.component';

import { NavbarComponent } from './navbar/navbar.component';

import { MyshopComponent } from './owner/myshop/myshop.component';
import { OwnermachinedetailComponent } from './owner/ownermachinedetail/ownermachinedetail.component';
import { OwnerprofileComponent } from './owner/OwnerProfile/ownerprofile.component';
import { ShopmachinedetailComponent } from './owner/shopmachinedetail/shopmachinedetail.component';
import { SidebarComponent } from './owner/sidebar/sidebar.component';

const routes: Routes = [
  {
    path:'',
    component: NavbarComponent,
    children:[
      {
        path:'',
        component:LoginComponent
      },
      {
        path:'machinelock',
        component:MachineLockComponent
      },
      {
        path:'ownerregistration',
        component:OwnerregistrationComponent
      },
      {
        path:'userregistration',
        component:UserregistrationComponent
      },
      {
        path:'sidebar',
        component:SidebarComponent,
        children:[
          {
            path:'myshop',
            component:MyshopComponent
          },
          {
            path:'ownerprofile',
            component:OwnerprofileComponent
          },
          {
            path:'ownermachinedetail',
            component:OwnermachinedetailComponent
          },
          {
            path:'shopmachinedetail/:id',
            component:ShopmachinedetailComponent
          }
        ]
      },
      {
        path:'adminsidebar',
        component:AdminSidebarComponent,
        children:[
          {
            path:'viewusers',
            component:ViewUsersComponent
          },
          {
            path:'getreservation',
            component:GetReservationComponent
          },
          {
            path:'addreservationtype',
            component:AddReservationtypeComponent
          },
          {
            path:'getowner',
            component:GetOwnerComponent
          },
          {
            path:'getclient',
            component:GetClientComponent
          },
          {
            path:'adminprofile',
            component:AdminProfileComponent
          }
        ]
      },
      {
        path:'clientsidebar',
        component:ClientsidebarComponent,
        children:[
          {
            path:'getshopsbycity',
            component:GetshopsbycityComponent
          },
          {
            path:'bookingwindow/:id',
            component:BookingwindowComponent
          },
          {
            path:'clientbookings',
            component:ClientbookingsComponent
          },
          {
            path:'clientprofile',
            component:ClientprofileComponent
          }

        ]
      }     
    ]
  
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
