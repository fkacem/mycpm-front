import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StyleClassModule } from 'primeng/styleclass';
import { DividerModule } from 'primeng/divider';
import { ChartModule } from 'primeng/chart';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { LandingComponent } from './components/landing/landing.component';
import { TimelineModule } from 'primeng/timeline';
import { TabViewModule } from 'primeng/tabview';
import { CheckboxModule } from 'primeng/checkbox';
import { AppLayoutModule } from './layout/app.layout.module';
import { LoginComponent } from './components/login/login.component';
import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { ChipsModule } from "primeng/chips";
import { ChipModule } from "primeng/chip";
import { DropdownModule } from "primeng/dropdown";
import { InputMaskModule } from "primeng/inputmask";
import { InputNumberModule } from "primeng/inputnumber";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { MultiSelectModule } from "primeng/multiselect";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputTextModule } from "primeng/inputtext";
import { RatingModule } from 'primeng/rating';
import { KnobModule } from 'primeng/knob';
import { ListboxModule } from 'primeng/listbox';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { PasswordModule } from 'primeng/password';
import { SliderModule } from 'primeng/slider';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MenuModule } from 'primeng/menu';
import { FileUploadModule } from 'primeng/fileupload';
import { RegisterAdminComponent } from './components/register/register-admin/register-admin.component';
import { RegisterEmployeeComponent } from './components/register/register-employee/register-employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CountryService } from './services/local/country.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SkeletonModule } from 'primeng/skeleton';
import { OrganizationComponent } from './components/organization/organization.component';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {AccordionModule} from 'primeng/accordion';
import { OrganizationDetailsComponent } from './components/organization/organization-details/organization-details.component';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SplitterModule } from 'primeng/splitter';
import { BusinessSectorComponent } from './components/business-sector/business-sector.component';
import { TableModule } from 'primeng/table';
import { ProfessionComponent } from './components/profession/profession.component';
import { ApprovedRequestsComponent } from './components/requests/approved-requests/approved-requests.component';
import { WaitingRequestsComponent } from './components/requests/waiting-requests/waiting-requests.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { RejectedRequestsComponent } from './components/requests/rejected-requests/rejected-requests.component';
import { UserComponent } from './components/user/user.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AppTopBarComponent } from './layout/app.topbar.component';
import { UserDetailsComponent } from './components/user/user-details/user-details.component';
import { ItemComponent } from './components/item/item.component';
import { TypeComponent } from './components/type/type.component';
import { MarketComponent } from './components/market/market.component';
import { TokenInterceptor } from './services/token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MarketDetailsComponent } from './components/market/market-details/market-details.component';
import { WorkOrderComponent } from './components/work-order/work-order.component';
import { AttachmentComponent } from './components/attachment/attachment.component';
import { WorkOrderConsultComponent } from './components/work-order/work-order-consult/work-order-consult.component';
import { WorkOrderManageComponent } from './components/work-order/work-order-manage/work-order-manage.component';
import {BadgeModule} from 'primeng/badge';
import { AttachmentManageComponent } from './components/attachment/attachment-manage/attachment-manage.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LoginComponent,
    RegisterAdminComponent,
    RegisterEmployeeComponent,
    OrganizationComponent,
    OrganizationDetailsComponent,
    BusinessSectorComponent,
    ProfessionComponent,
    ApprovedRequestsComponent,
    WaitingRequestsComponent,
    RejectedRequestsComponent,
    UserComponent,
    ProfileComponent,
    UserDetailsComponent,
    ItemComponent,
    TypeComponent,
    MarketComponent,
    MarketDetailsComponent,
    WorkOrderComponent,
    AttachmentComponent,
    WorkOrderConsultComponent,
    WorkOrderManageComponent,
    AttachmentManageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    SkeletonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    DividerModule,
    CommonModule,
    StyleClassModule,
    ChartModule,
    PanelModule,
    ButtonModule,
    TimelineModule,
    TabViewModule,
    CheckboxModule,
    AutoCompleteModule,
    CalendarModule,
    ChipsModule,
    DropdownModule,
    InputMaskModule,
    InputNumberModule,
    ColorPickerModule,
    CascadeSelectModule,
    MultiSelectModule,
    ToggleButtonModule,
    SliderModule,
    InputTextareaModule,
    RadioButtonModule,
    InputTextModule,
    RatingModule,
    ChipModule,
    KnobModule,
    InputSwitchModule,
    ListboxModule,
    SelectButtonModule,
    AppLayoutModule,
    OverlayPanelModule,
    PasswordModule,
    MenuModule,
    FileUploadModule,
    ToastModule,
    ToolbarModule,
    TooltipModule,
    DataViewModule,
    DialogModule,
    ConfirmDialogModule,
    AccordionModule,
    SplitterModule,
    SplitButtonModule,
    TableModule,
    PdfViewerModule,
    BadgeModule

  ],
  providers: [{ provide: LocationStrategy, useClass: PathLocationStrategy },{provide : HTTP_INTERCEPTORS, useClass : TokenInterceptor, multi : true}, CountryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
