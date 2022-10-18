import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Profession } from 'src/app/models/Profession';
import { Type } from 'src/app/models/Type';
import { ProfessionService } from 'src/app/services/profession.service';
import { TypeService } from 'src/app/services/type.service';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss'],
  providers: [MessageService]
})
export class TypeComponent implements OnInit {

  myForm: FormGroup;
  cols: any[];
  typeDialog: boolean;
  deleteTypeDialog: boolean = false;
  deleteTypesDialog: boolean = false;
  type : Type;
  types : Type[];
  selectedTypes: Type[];
  professions: Profession[];


  constructor(private typeService: TypeService,private professionService: ProfessionService, private messageService: MessageService) { }

  ngOnInit(): void {

    this.getTypes();
    this.getProfessions()

    this.cols = [
      { field: 'name', header: 'name' },
      { field: 'profession', header: 'profession' },
    ];

    this.myForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.pattern("[A-Za-z1-9 _àâéêèëìïîôùçæœÀÂÉÊÈËÌÏÎÔÙÛÇÆŒ-]+"), Validators.required]),
      profession: new FormControl('', [Validators.required]),
    })
  }

  getProfessions() {
      this.professionService.getProfessions().subscribe({
        next: (response: Profession[]) => this.professions = response,
        error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Chargement échoué', life: 3000 }),
      })
  }

  openNew() {
    this.myForm.reset()
    this.type = {};
    this.typeDialog = true;
  }

  deleteSelectedTypes() {
    this.deleteTypesDialog = true;
  }

  editType(type: Type) {
    this.myForm.reset()
    this.type = { ...type };
    this.myForm.get('id').setValue(type.id)
    this.myForm.get('name').setValue(type.name)
    this.myForm.get('profession').setValue(type.profession)
    this.typeDialog = true;
  }

  deleteType(Type: Type) {
    this.deleteTypeDialog = true;
    this.type = { ...Type };
  }

  hideDialog() {
    this.typeDialog = false;
    this.myForm.reset()
  }

  getTypes() {
      this.typeService.getTypes().subscribe({
        next: (response: Type[]) => this.types = response,
        error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Chargement échoué', life: 3000 }),
      })
  }

  saveType() {
    this.type = {
      'id': this.myForm.get('id').value,
      'name': this.myForm.get('name').value,
      'profession': this.myForm.get('profession').value,
    }

    this.typeService.saveType(this.type).subscribe({
      next: (response: Type) => {
        this.myForm.reset();
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: "Type Enregistré", life: 3000 });
        this.getTypes();
      },
      error: (e) => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Enregistrement échoué', life: 3000 });
      },
      complete: () => this.typeDialog = false
    })

  }

  confirmDeleteSelected() {
    this.deleteTypesDialog = false;
    for (let s of this.selectedTypes) {
      this.typeService.deleteType(s.id).subscribe({
        next: (v) => this.getTypes(),
        error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Suppréssion Echouée', life: 3000 }),
      })
    }

    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Les types sélectionnés ont été supprimés', life: 3000 });
    this.selectedTypes = null;
  }

  confirmDelete() {
    this.deleteTypeDialog = false;

    this.typeService.deleteType(this.type.id).subscribe({
      next: (v) => this.getTypes(),
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Suppréssion Echouée', life: 3000 }),
    })

    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Type a été Supprimés', life: 3000 });
    this.type = {};
  }

}
