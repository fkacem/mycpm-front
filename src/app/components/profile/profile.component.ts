import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { User } from 'src/app/models/User';
import { OrganizationService } from 'src/app/services/organization.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [MessageService],
})
export class ProfileComponent implements OnInit {

  user : User;

  constructor(private userService: UserService,
              private organizationService : OrganizationService,
              private layoutService: LayoutService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.layoutService.colapseMenu();
    this.getUser()
  }

  getUser(){
    this.userService.getUserByToken().subscribe
      ((response: User) => {
        this.user = response;
        this.getOrganizationByAdmin(this.user.id);
        console.log(this.user)
      },
        (error: HttpErrorResponse) => {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Chargement échoué', life: 3000 });
        }
      )
  }

  //get organization by admin
  getOrganizationByAdmin(id){
    this.organizationService.getOrganizationByAdminId(id).subscribe
      ((response: any) => {
        this.user.organization = response;
      },
        (error: HttpErrorResponse) => {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Chargement échoué', life: 3000 });
        }
      )
  }

}
