import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { BusinessSector } from 'src/app/models/BusinessSector';
import { Profession } from 'src/app/models/Profession';
import { BusinessSectorService } from 'src/app/services/business-sector.service';
import { ProfessionService } from 'src/app/services/profession.service';

@Component({
  selector: 'app-profession',
  templateUrl: './profession.component.html',
  styleUrls: ['./profession.component.scss'],
  providers: [MessageService],

})
export class ProfessionComponent implements OnInit {

  sectors: BusinessSector[];
  profession : Profession;
  professions: Profession[];
  myForm: FormGroup;
  cols: any[];
  professionDialog: boolean;
  deleteProfessionsDialog: boolean;
  deleteProfessionDialog: boolean;
  selectedProfessions: Profession[];

  constructor(private professionService: ProfessionService, 
    private businessSectorService: BusinessSectorService, 
    private messageService: MessageService) { }

  ngOnInit(): void {

    this.getProfessions();

    this.cols = [
      { field: 'sector', header: 'sector' },
      { field: 'name', header: 'name' },
    ];

    this.myForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.pattern("[A-Za-z1-9 _àâéêèëìïîôùçæœÀÂÉÊÈËÌÏÎÔÙÛÇÆŒ-]+"),Validators.required]),
      sector : new FormControl('',Validators.required),
    })

  }

  
  getProfessions() {
    this.professionService.getProfessions().subscribe
      ((response: Profession[]) => {
        this.professions = response;
      },
        (error: HttpErrorResponse) => {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Chargement échoué', life: 3000 });
        }
      )
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

  saveProfession() {
    this.profession = {
      'id' : this.myForm.get('id').value,
      'name' : this.myForm.get('name').value,
      'sector' : this.myForm.get('sector').value,
    }
    console.log(this.profession)
    this.professionService.saveProfession(this.profession).subscribe(
      (response: Profession) => {
        this.myForm.reset()
        this.getProfessions();
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Métier Enregistrée', life: 3000 });
      },
      (error: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Enregistrement échoué', life: 3000 });
      }
    );
    this.professionDialog = false;

  }

  openNew() {
    this.getSectors();
    this.myForm.reset()
    this.profession = {};
    this.professionDialog = true;
  }

  deleteSelectedProfessions() {
    this.deleteProfessionsDialog = true;
  }

  editProfession(profession: Profession) {
    this.getSectors();
    this.myForm.reset()
    this.profession = { ...profession };
    this.myForm.get('id').setValue(profession.id)
    this.myForm.get('name').setValue(profession.name)
    this.myForm.get('sector').setValue(profession.sector)
    this.professionDialog = true;
  }

  deleteProfession(profession: Profession) {
    this.deleteProfessionDialog = true;
    this.profession = { ...profession };
  }

  hideDialog() {
    this.professionDialog = false;
  }

  confirmDeleteSelected() {
    this.deleteProfessionsDialog = false;
    for(let p of this.selectedProfessions) {
      this.professionService.deleteProfession(p.id).subscribe(
        (event) => {
          this.getProfessions();
        },
        (error: HttpErrorResponse) => {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Suppréssion Echouée', life: 3000 });
        }
      )
    }

    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Les métiers a été  Supprimés', life: 3000 });
    this.selectedProfessions = null;
  }

  confirmDelete() {
    this.deleteProfessionDialog = false;
    this.professionService.deleteProfession(this.profession.id).subscribe(
      (event) => {
        this.getProfessions();
      },
      (error: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Suppréssion Echouée', life: 3000 });
      }
    )
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Métier  Supprimés', life: 3000 });
    this.profession = {};
  }

}
