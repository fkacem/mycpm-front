import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Item } from 'src/app/models/Item';
import { Type } from 'src/app/models/Type';
import { ItemService } from 'src/app/services/item.service';
import { TypeService } from 'src/app/services/type.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  providers: [MessageService]
})
export class ItemComponent implements OnInit {

  myForm: FormGroup;
  cols: any[];
  itemDialog: boolean;
  deleteItemDialog: boolean = false;
  deleteItemsDialog: boolean = false;
  item : Item;
  items : Item[];
  selectedItems: Item[];
  types : Type[];

  selectedClass: any = null;

  classes: any[] = ['Prestation','Matériel Fournisseur','Matériel en Regie'];


  constructor(
    private typeService: TypeService,
    private itemService: ItemService, 
    private messageService: MessageService) { }

  ngOnInit(): void {

    this.getItems();
    this.getTypes();

    this.cols = [
      { field: 'name', header: 'name' },
      { field: 'profession', header: 'profession' },
    ];

    this.myForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.pattern("[A-Za-z1-9 _àâéêèëìïîôùçæœÀÂÉÊÈËÌÏÎÔÙÛÇÆŒ-]+"), Validators.required]),
      code: new FormControl('', [Validators.pattern("[A-Za-z1-9 _àâéêèëìïîôùçæœÀÂÉÊÈËÌÏÎÔÙÛÇÆŒ-]+"),Validators.required]),
      item_class: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
    })
  }

  getTypes() {
    this.typeService.getTypes().subscribe({
      next: (response: Type[]) => this.types = response,
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Chargement échoué', life: 3000 }),
    })
  }

  openNew() {
    this.myForm.reset()
    this.item = {};
    this.itemDialog = true;
  }

  deleteSelectedItems() {
    this.deleteItemsDialog = true;
  }

  editItem(item: Item) {
    this.myForm.reset()
    this.item = { ...item };
    this.myForm.get('id').setValue(item.id)
    this.myForm.get('name').setValue(item.name)
    this.myForm.get('code').setValue(item.code)
    this.myForm.get('item_class').setValue(item.item_class)
    this.myForm.get('type').setValue(item.type)
    this.itemDialog = true;
  }

  deleteItem(item: Item) {
    this.deleteItemDialog = true;
    this.item = { ...item };
  }

  hideDialog() {
    this.itemDialog = false;
    this.myForm.reset()
  }

  getItems() {
      this.itemService.getItems().subscribe({
        next: (response: Item[]) => this.items = response,
        error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Chargement échoué', life: 3000 }),
      })
  }

  saveItem() {
    this.item = {
      'id': this.myForm.get('id').value,
      'name': this.myForm.get('name').value,
      'code': this.myForm.get('code').value,
      'item_class': this.myForm.get('item_class').value,
      'type': this.myForm.get('type').value,
    }

    console.log(this.item);

    this.itemService.saveItem(this.item).subscribe({
      next: (response: Item) => {
        this.myForm.reset();
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: "Article Enregistré", life: 3000 });
        this.getItems();
      },
      error: (e) => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Enregistrement échoué', life: 3000 });
      },
      complete: () => this.itemDialog = false
    })

  }

  confirmDeleteSelected() {
    this.deleteItemsDialog = false;
    for (let s of this.selectedItems) {
      this.itemService.deleteItem(s.id).subscribe({
        next: (v) => this.getItems(),
        error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Suppréssion Echouée', life: 3000 }),
      })
    }

    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Les articles sélectionnés ont été supprimés', life: 3000 });
    this.selectedItems = null;
  }

  confirmDelete() {
    this.deleteItemDialog = false;

    this.itemService.deleteItem(this.item.id).subscribe({
      next: (v) => this.getItems(),
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Suppréssion Echouée', life: 3000 }),
    })

    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Article a été Supprimés', life: 3000 });
    this.item = {};
  }

}
