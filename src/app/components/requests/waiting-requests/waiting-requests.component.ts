import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Organization } from 'src/app/models/Organization';
import { OrganizationService } from 'src/app/services/organization.service';

@Component({
  selector: 'app-waiting-requests',
  templateUrl: './waiting-requests.component.html',
  styleUrls: ['./waiting-requests.component.scss'],
  providers: [MessageService],

})
export class WaitingRequestsComponent implements OnInit {

  organizations : Organization[] = [];
  organization : Organization;

  organizationDialog : boolean;

  dataLoaded : boolean = false;

  document_pdfSrc : any;
  document_fileUrl : any;

  pdfView : boolean = false;
  
  validationSelect : any[];
  selectValue : any;

  hideField : Boolean = false;

  constructor( private organizationService : OrganizationService, private messageService: MessageService,
    private router: Router, private sanitizer: DomSanitizer ) { }

  ngOnInit(): void {

    this.getWaitingOrganisations();

    this.validationSelect = [
      {icon: 'pi pi-check', name: 'Valider', value: true},
      {icon: 'pi pi-times', name: 'Rejeter', value: false},
    ];
  }

  getWaitingOrganisations() {
    this.organizationService.getWaitingOrganizations().subscribe(
      (data) => {
        this.organizations = data;
      }
    );
  }

  hideDialog(){
    this.organizationDialog = false;
  }

  dataToSRC(data){
    return new Uint8Array(atob(data).split("").map(char => char.charCodeAt(0)));
  }

  srcToURL(src){
    let dwn = new Blob([src], {type: 'application/pdf'})
    return this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(dwn));
  }

  viewRequest(organization){
    this.dataLoaded = false;
    this.organizationDialog = true;
    this.organization = organization;
    if(this.organization.document){
      this.document_pdfSrc = this.dataToSRC(this.organization.document.data);
      this.document_fileUrl = this.srcToURL(this.document_pdfSrc);
    }
    this.selectValue = this.validationSelect.find(i=>i.value == this.organization.status)

    this.dataLoaded = true;
  }

  viewpdf(){
    this.pdfView = true;
  }

  onOptionClick(event){
    this.hideField = event.option.value;
  }

  save(id){
    
    if(this.selectValue.value){
      this.organizationService.activateOrganization(id).subscribe(
        (data) => {
          this.messageService.add({severity:'success', summary:'Organisation activée', detail:'L\'organisation a été activée avec succès'});
          this.getWaitingOrganisations();
        }
      );
    }else if(!this.selectValue.value){
      this.organizationService.rejectOrganization(id).subscribe(
        (data) => {
          this.messageService.add({severity:'success', summary:'Organisation rejetée', detail:'L\'organisation a été rejetée avec succès'});
          this.getWaitingOrganisations();
        }
      );
    }

    this.organizationDialog = false;

  }

}
