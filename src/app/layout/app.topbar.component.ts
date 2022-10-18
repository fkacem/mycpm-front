import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthenticationService } from '../services/authentication.service';
import { LayoutService } from "./service/app.layout.service";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];

    constructor(public layoutService: LayoutService, private authenticationService : AuthenticationService, private router : Router) { }

    public onLogout(){
        this.authenticationService.logOut();
        this.router.navigateByUrl('/login');
    }

    public onProfile(){
    this.router.navigateByUrl('/cpm/profile');
    }
}
