import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Attachment } from 'src/app/models/Attachment';
import { Item } from 'src/app/models/Item';
import { PurchaseOrder } from 'src/app/models/PurchaseOrder';
import { AttachmentService } from 'src/app/services/attachment.service';
import { ItemService } from 'src/app/services/item.service';
import { PurchaseOrderService } from 'src/app/services/purchaseOrder.service';

@Component({
  selector: 'app-attachment',
  templateUrl: './attachment.component.html',
  styleUrls: ['./attachment.component.scss'],
  providers: [MessageService]

})
export class AttachmentComponent implements OnInit {

  myForm: FormGroup;
  attachmentDialog: boolean;
  deleteAttachmentDialog: boolean = false;
  deleteAttachmentsDialog: boolean = false;
  attachment : Attachment;
  attachments : Attachment[];
  selectedAttachments: Attachment[];
  pathId : number;
  order: PurchaseOrder
  articlesDialog : boolean = false;
  items: Item[];

  constructor(
    private attachmentService: AttachmentService,
    private route : ActivatedRoute,
    private itemService: ItemService,
    private purchaseOrderService : PurchaseOrderService,
    private messageService: MessageService) { }

  ngOnInit(): void {

    this.pathId = parseInt(this.route.snapshot.paramMap.get('id'));
    this.attachments = [];

    this.getOrderByID()
    this.getAttachmentByOrder();

    this.myForm = new FormGroup({
      id: new FormControl(''),
      code: new FormControl('',[Validators.required]),
      date: new FormControl('',[Validators.required]),
    })
  }

  /* getAttachments() {
    this.attachmentService.getAttachments().subscribe({
      next: (response: Attachment[]) => this.attachments = response,
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Chargement échoué', life: 3000 }),
    })
  } */

  getAttachmentByOrder() {
    this.attachmentService.getAttachmentByOrderId(this.pathId).subscribe({
      next: (response: Attachment[]) => this.attachments = response,
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Chargement échoué', life: 3000 }),
    })
  }

  getOrderByID() {
    this.purchaseOrderService.getPurchaseOrderById(this.pathId).subscribe({
      next: (response: PurchaseOrder) => this.order = response,
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Chargement échoué', life: 3000 }),
    })
  }

  getItems() {
    this.itemService.getItems().subscribe({
      next: (response: Item[]) => this.items = response,
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Chargement échoué', life: 3000 }),
    })
  }

  openNew() {
    this.myForm.reset()
    this.attachment = {};
    this.attachmentDialog = true;
  }

  deleteSelectedAttachments() {
    this.deleteAttachmentsDialog = true;
  }

  editAttachment(attachment: Attachment) {
    this.myForm.reset()
    this.attachment = { ...attachment };
    this.myForm.get('id').setValue(attachment.id)
    this.myForm.get('code').setValue(attachment.code)
    this.myForm.get('date').setValue(new Date(attachment.attachmentDate))
    this.attachmentDialog = true;
  }

  deleteAttachment(attachment: Attachment) {
    this.deleteAttachmentDialog = true;
    this.attachment = { ...attachment };
  }

  hideDialog() {
    this.attachmentDialog = false;
    this.myForm.reset()
  }

  saveAttachment() {
    this.attachment = {
      'id': this.myForm.get('id').value,
      'code': this.myForm.get('code').value,
      'attachmentDate': this.myForm.get('date').value,
      'purchaseOrder': this.order
    }

    console.log(this.attachment);

    this.attachmentService.saveAttachment(this.attachment).subscribe({
      next: (response: Attachment) => {
        this.myForm.reset();
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: "Attachement Enregistré", life: 3000 });
        this.getAttachmentByOrder();
      },
      error: (e) => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Enregistrement échoué', life: 3000 });
      },
      complete: () => this.attachmentDialog = false
    })
  }

  confirmDeleteSelected() {
    this.deleteAttachmentsDialog = false;
    for (let s of this.selectedAttachments) {
      this.attachmentService.deleteAttachment(s.id).subscribe({
        next: (v) => this.getAttachmentByOrder(),
        error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Suppréssion Echouée', life: 3000 }),
      })
    }
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Les Attachement sélectionnés ont été supprimés', life: 3000 });
    this.selectedAttachments = null;
  }

  confirmDelete() {
    this.deleteAttachmentDialog = false;

    this.attachmentService.deleteAttachment(this.attachment.id).subscribe({
      next: (v) => this.getAttachmentByOrder(),
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Suppréssion Echouée', life: 3000 }),
    })

    this.messageService.add({ severity: 'success', summary: 'Successful', detail: "L'Attachement a été Supprimés", life: 3000 });
    this.attachment = {};
  }

  openArticles(attachment: Attachment){
    this.attachment = { ...attachment };
    this.getItems()
    this.articlesDialog = true;
  }

}
