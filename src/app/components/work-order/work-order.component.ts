import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PurchaseOrder } from 'src/app/models/PurchaseOrder';
import { WorkOrder } from 'src/app/models/WorkOrder';
import { PurchaseOrderService } from 'src/app/services/purchaseOrder.service';
import { WorkOrderService } from 'src/app/services/work-order.service';

@Component({
  selector: 'app-work-order',
  templateUrl: './work-order.component.html',
  styleUrls: ['./work-order.component.scss'],
  providers: [MessageService]
})
export class WorkOrderComponent implements OnInit {

  myForm: FormGroup;
  workOrderDialog: boolean;
  deleteWorkOrderDialog: boolean = false;
  deleteWorkOrdersDialog: boolean = false;
  selectedWorkOrders: WorkOrder[];
  workOrder : WorkOrder;
  workOrders : WorkOrder[];
  order: PurchaseOrder;
  pathId: number;


  constructor(
    private workOrderService: WorkOrderService,
    private purchaseOrderService : PurchaseOrderService,
    private messageService: MessageService,
    private route : ActivatedRoute,) { }

  ngOnInit(): void {
    this.pathId = parseInt(this.route.snapshot.paramMap.get('id'));
    this.getOrderByID();
    // this.getWorkOrdersByOrder()
    this.myForm = new FormGroup({
      id: new FormControl(''),
      code: new FormControl('',[Validators.required]),
      startDate: new FormControl('',[Validators.required]),
      limit: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
    })
  }

  

  openNew() {
    this.myForm.reset()
    this.workOrder = {};
    this.workOrderDialog = true;
  }

  deleteSelectedWorkOrders() {
    this.deleteWorkOrdersDialog = true;
  }

  editWorkOrder(workOrder: WorkOrder) {
    this.myForm.reset()
    this.workOrder = { ...workOrder };
    this.myForm.get('id').setValue(workOrder.id)
    this.myForm.get('code').setValue(workOrder.code)
    this.myForm.get('startDate').setValue(new Date(workOrder.startDate))
    this.myForm.get('limit').setValue(workOrder.limit)
    this.myForm.get('amount').setValue(workOrder.amount)
    this.workOrderDialog = true;
  }

  deleteWorkOrder(workOrder: WorkOrder) {
    this.deleteWorkOrderDialog = true;
    this.workOrder = { ...workOrder };
  }

  hideDialog() {
    this.workOrderDialog = false;
    this.myForm.reset()
  }

  saveWorkOrder() {
    this.workOrder = {
      'id': this.myForm.get('id').value,
      'code': this.myForm.get('code').value,
      'startDate': this.myForm.get('startDate').value,
      'limit': this.myForm.get('limit').value,
      'amount': this.myForm.get('amount').value,
      'purchaseOrder': this.order
    }

    console.log(this.workOrder);

    

    // this.workOrderService.saveWorkOrder(this.workOrder).subscribe({
    //   next: (response: WorkOrder) => {
    //     this.myForm.reset();
    //     this.messageService.add({ severity: 'success', summary: 'Succès', detail: "Ordre de Travaux Enregistré", life: 3000 });
    //     this.getWorkOrdersByOrder();
    //   },
    //   error: (e) => {
    //     this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Enregistrement échoué', life: 3000 });
    //   },
    //   complete: () => this.workOrderDialog = false
    // })
  }

  confirmDeleteSelected() {
    this.deleteWorkOrdersDialog = false;
    for (let s of this.selectedWorkOrders) {
      this.workOrderService.deleteWorkOrder(s.id).subscribe({
        // next: (v) => this.getWorkOrdersByOrder(),
        error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Suppréssion Echouée', life: 3000 }),
      })
    }
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Les Ordres de Travaux sélectionnés ont été supprimés', life: 3000 });
    this.selectedWorkOrders = null;
  }

  confirmDelete() {
    this.deleteWorkOrderDialog = false;

    this.workOrderService.deleteWorkOrder(this.workOrder.id).subscribe({
      // next: (v) => this.getWorkOrdersByOrder(),
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Suppréssion Echouée', life: 3000 }),
    })

    this.messageService.add({ severity: 'success', summary: 'Successful', detail: "l'Ordre de Travaux a été Supprimés", life: 3000 });
    this.workOrder = {};
  }

  getOrderByID() {
    this.purchaseOrderService.getPurchaseOrderById(this.pathId).subscribe({
      next: (response: PurchaseOrder) => this.order = response,
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Chargement échoué', life: 3000 }),
    })
  }

  // getWorkOrdersByOrder() {
  //   this.workOrderService.getWorkOrdersByOrderId(this.pathId).subscribe({
  //     next: (response: WorkOrder[]) => this.workOrders = response,
  //     error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Chargement échoué', life: 3000 }),
  //   })
  // }
}
