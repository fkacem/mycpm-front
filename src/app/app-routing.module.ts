import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ItemComponent } from './components/item/item.component';
import { TypeComponent } from './components/type/type.component';
import { BusinessSectorComponent } from './components/business-sector/business-sector.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { OrganizationDetailsComponent } from './components/organization/organization-details/organization-details.component';
import { OrganizationComponent } from './components/organization/organization.component';
import { ProfessionComponent } from './components/profession/profession.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterAdminComponent } from './components/register/register-admin/register-admin.component';
import { RegisterEmployeeComponent } from './components/register/register-employee/register-employee.component';
import { ApprovedRequestsComponent } from './components/requests/approved-requests/approved-requests.component';
import { RejectedRequestsComponent } from './components/requests/rejected-requests/rejected-requests.component';
import { WaitingRequestsComponent } from './components/requests/waiting-requests/waiting-requests.component';
import { UserDetailsComponent } from './components/user/user-details/user-details.component';
import { UserComponent } from './components/user/user.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { MarketComponent } from './components/market/market.component';
import { MarketDetailsComponent } from './components/market/market-details/market-details.component';
import { WorkOrderComponent } from './components/work-order/work-order.component';
import { AttachmentComponent } from './components/attachment/attachment.component';
import { WorkOrderConsultComponent } from './components/work-order/work-order-consult/work-order-consult.component';
import { WorkOrderManageComponent } from './components/work-order/work-order-manage/work-order-manage.component';
import { AttachmentManageComponent } from './components/attachment/attachment-manage/attachment-manage.component';


@NgModule({
  imports: [
    RouterModule.forRoot([
        {path: '', component: LandingComponent},
        {path: 'login', component: LoginComponent},
        {path: 'registerAdmin', component: RegisterAdminComponent},
        {path: 'registerEmployee', component: RegisterEmployeeComponent},

        {
          path: 'cpm', component: AppLayoutComponent,
          children:[
            { path:'items',component:ItemComponent},
            { path:'types',component:TypeComponent},
            { path:'markets',component:MarketComponent},
            { path:'markets/:id',component:MarketDetailsComponent},
            { path:'organizations/manage',component:OrganizationComponent},
            { path:'organizations/manage/:id',component:OrganizationDetailsComponent},
            { path:'business_sectors',component:BusinessSectorComponent},
            { path:'professions',component:ProfessionComponent},
            { path:'requests/approved',component:ApprovedRequestsComponent},
            { path:'requests/waiting',component:WaitingRequestsComponent},
            { path:'requests/rejected',component:RejectedRequestsComponent},
            { path:'users',component:UserComponent},
            { path:'users/:id',component:UserDetailsComponent},
            { path:'attachment/order/:id',component:AttachmentComponent},
            { path:'attachments',component:AttachmentManageComponent},

            { path:'workorder/order/:id',component:WorkOrderComponent},
            { path:'workorders/consult',component:WorkOrderConsultComponent},
            { path:'workorders/manage',component:WorkOrderManageComponent},

            {path: 'profile', component: ProfileComponent},

          ]
        },
    ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
