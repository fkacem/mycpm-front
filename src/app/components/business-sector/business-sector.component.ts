import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { BusinessSector } from 'src/app/models/BusinessSector';
import { BusinessSectorService } from 'src/app/services/business-sector.service';

@Component({
  selector: 'app-business-sector',
  templateUrl: './business-sector.component.html',
  styleUrls: ['./business-sector.component.scss'],
  providers: [MessageService],

})
export class BusinessSectorComponent implements OnInit {

  myForm: FormGroup;
  cols: any[];
  sectorDialog: boolean;
  deleteSectorDialog: boolean = false;
  deleteSectorsDialog: boolean = false;
  sector : BusinessSector;
  sectors : BusinessSector[];
  selectedSectors: BusinessSector[];


  constructor(private businessSectorService: BusinessSectorService, private messageService: MessageService) { }

  ngOnInit(): void {

    this.getSectors();

    this.cols = [
      { field: 'name', header: 'name' },
    ];

    this.myForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.pattern("[A-Za-z1-9 _àâéêèëìïîôùçæœÀÂÉÊÈËÌÏÎÔÙÛÇÆŒ-]+"), Validators.required]),
    })
  }

  openNew() {
    this.myForm.reset()
    this.sector = {};
    this.sectorDialog = true;
  }

  deleteSelectedSectors() {
    this.deleteSectorsDialog = true;
  }

  editSector(BusinessSector: BusinessSector) {
    this.myForm.reset()
    this.sector = { ...BusinessSector };
    this.myForm.get('id').setValue(BusinessSector.id)
    this.myForm.get('name').setValue(BusinessSector.name)
    this.sectorDialog = true;
  }

  deleteSector(BusinessSector: BusinessSector) {
    this.deleteSectorDialog = true;
    this.sector = { ...BusinessSector };
  }

  hideDialog() {
    this.sectorDialog = false;
    this.myForm.reset()
  }

  getSectors() {
    this.businessSectorService.getSectors().subscribe
      ((response: BusinessSector[]) => {
        this.sectors = response;
      },
        (error: HttpErrorResponse) => {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Chargement échoué', life: 3000 });
        }
      )
  }

  saveSector() {
    this.sector = {
      'id': this.myForm.get('id').value,
      'name': this.myForm.get('name').value,
    }

    this.businessSectorService.saveSector(this.sector).subscribe(
      (response: BusinessSector) => {
        this.myForm.reset();
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: "Secteur d'activité Enregistrée", life: 3000 });
        this.getSectors();
      },
      (error: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Enregistrement échoué', life: 3000 });
      }
    );
    this.sectorDialog = false;
  }

  confirmDeleteSelected() {
    this.deleteSectorsDialog = false;
    for (let s of this.selectedSectors) {
      this.businessSectorService.deleteSector(s.id).subscribe(
        (event) => {
          this.getSectors()
        },
        (error: HttpErrorResponse) => {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Suppréssion Echouée', life: 3000 });
        }
      )
    }

    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Les secteur a été Supprimés', life: 3000 });
    this.selectedSectors = null;
  }

  confirmDelete() {
    this.deleteSectorDialog = false;
    this.businessSectorService.deleteSector(this.sector.id).subscribe(
      (event) => {
        this.getSectors()
      },
      (error: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Suppréssion Echouée', life: 3000 });
      }
    )
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Secteur a été Supprimés', life: 3000 });
    this.sector = {};
  }

}
