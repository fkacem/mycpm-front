import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Organization } from 'src/app/models/Organization';
import { OrganizationService } from 'src/app/services/organization.service';

@Component({
  selector: 'app-organization-details',
  templateUrl: './organization-details.component.html',
  styleUrls: ['./organization-details.component.scss'],
  providers: [MessageService],

})
export class OrganizationDetailsComponent implements OnInit {

  pathId : number;


  organization : Organization;

  constructor(private route : ActivatedRoute, private organizationService : OrganizationService,
    private messageService: MessageService) { }

  ngOnInit(): void {

    this.pathId = parseInt(this.route.snapshot.paramMap.get('id'));
    this.getOrganization()

  }

  getOrganization() {
    this.organizationService.getOrganizationById(this.pathId).subscribe
      ((response: Organization) => {
        this.organization = response;
        console.log(this.organization);
      },
        (error: HttpErrorResponse) => {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Chargement échoué', life: 3000 });
        }
      )
  }

}
