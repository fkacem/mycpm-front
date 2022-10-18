import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Organization } from 'src/app/models/Organization';
import { OrganizationService } from 'src/app/services/organization.service';

@Component({
  selector: 'app-rejected-requests',
  templateUrl: './rejected-requests.component.html',
  providers: [MessageService],
  styleUrls: ['./rejected-requests.component.scss']
})
export class RejectedRequestsComponent implements OnInit {

  organizations : Organization[] = [];
  organization : Organization;

  organizationDialog : boolean;


  constructor(private organizationService : OrganizationService, private messageService: MessageService,) { }

  ngOnInit(): void {
    this.getRejectedOrganizations();
  }

  getRejectedOrganizations() {
    this.organizationService.getRejectedOrganizations().subscribe(
      (data) => {
        this.organizations = data;
      }
    );
  }

  hideDialog(){
    this.organizationDialog = false;
  }


}
