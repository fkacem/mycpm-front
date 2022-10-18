import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Organization } from 'src/app/models/Organization';
import { OrganizationService } from 'src/app/services/organization.service';

@Component({
  selector: 'app-approved-requests',
  templateUrl: './approved-requests.component.html',
  providers: [MessageService],
  styleUrls: ['./approved-requests.component.scss']
})
export class ApprovedRequestsComponent implements OnInit {

  organizations : Organization[] = [];
  organization : Organization;

  organizationDialog : boolean;


  constructor(private organizationService : OrganizationService, private messageService: MessageService,) { }

  ngOnInit(): void {
    this.getWaitingOrganisations();
  }

  getWaitingOrganisations() {
    this.organizationService.getActiveOrganizations().subscribe(
      (data) => {
        this.organizations = data;
      }
    );
  }

  hideDialog(){
    this.organizationDialog = false;
  }

}
