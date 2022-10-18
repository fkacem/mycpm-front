import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Market } from 'src/app/models/Market';
import { PurchaseOrder } from 'src/app/models/PurchaseOrder';
import { WorkOrder } from 'src/app/models/WorkOrder';
import { MarketService } from 'src/app/services/market.service';
import { PurchaseOrderService } from 'src/app/services/purchaseOrder.service';
import { WorkOrderService } from 'src/app/services/work-order.service';

@Component({
  selector: 'app-work-order-manage',
  templateUrl: './work-order-manage.component.html',
  styleUrls: ['./work-order-manage.component.scss'],
  providers: [MessageService]

})
export class WorkOrderManageComponent implements OnInit {
  markets: Market[];
  myForm: FormGroup;

  workOrder : WorkOrder;
  purchaseOrdersDialog : boolean = false;
  workOrderDialog : boolean = false;
  deleteWorkOrderDialog: boolean = false;
  deleteWorkOrdersDialog: boolean = false;
  selectedWorkOrders: WorkOrder[];
  
  order: PurchaseOrder;
  market: any;

  workOrders : WorkOrder[];

  constructor(
    private marketService: MarketService,
    private messageService: MessageService,
    private workOrderService : WorkOrderService) { }

  ngOnInit(): void {
    this.getMarkets();

    this.myForm = new FormGroup({
      id: new FormControl(''),
      code: new FormControl('',[Validators.required]),
      startDate: new FormControl('',[Validators.required]),
      limit: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
    })
  }

  getMarkets() {
    this.marketService.getMarketsByType('MC').subscribe({
      next: (response: Market[]) => {
        this.markets = response
        console.log(this.markets);
      },
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Chargement échoué', life: 3000 }),
    })
  }

  openPurchaseOrdersDialog(market, order) {
    this.market = market;
    this.order = { ...order };
    this.purchaseOrdersDialog = true;
    this.workOrders = this.order.workOrders;
  }

  hidePurchaseOrdersDialog(){
    this.getMarkets();
    this.purchaseOrdersDialog = false;
  }

  openNew() {
    this.myForm.reset()
    this.workOrder = {};
    this.workOrderDialog = true;
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
    }

    console.log(this.workOrder);

    this.workOrderService.saveWorkOrder(this.workOrder, this.order.id).subscribe({
      next: (response: WorkOrder) => {
        this.myForm.reset();
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: "Ordre de Travaux Enregistré", life: 3000 });
        //refresh
        this.getWorkOrdersByPurchaseOrder();
      },
      error: (e) => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Enregistrement échoué', life: 3000 });
      },
      complete: () => this.workOrderDialog = false
    })
  }

  getWorkOrdersByPurchaseOrder(){
    this.workOrderService.getWorkOrdersByPurchaseOrder(this.order.id).subscribe({
      next: (response: WorkOrder[]) => {
        this.workOrders = response
      },
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Chargement échoué', life: 3000 }),
    })
  }

  confirmDeleteSelected() {
    this.deleteWorkOrdersDialog = false;
    for (let s of this.selectedWorkOrders) {
      this.workOrderService.deleteWorkOrder(s.id).subscribe({
        next: (v) => {
        this.getWorkOrdersByPurchaseOrder()
        },
        error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Suppréssion Echouée', life: 3000 }),
      })
    }
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Les Ordres de Travaux sélectionnés ont été supprimés', life: 3000 });
    this.selectedWorkOrders = null;
  }

  confirmDelete() {
    this.deleteWorkOrderDialog = false;

    this.workOrderService.deleteWorkOrder(this.workOrder.id).subscribe({
      next: (v) => {
       this.getWorkOrdersByPurchaseOrder()
      },
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Suppréssion Echouée', life: 3000 }),
    })

    this.messageService.add({ severity: 'success', summary: 'Successful', detail: "l'Ordre de Travaux a été Supprimés", life: 3000 });
    this.workOrder = {};
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

  deleteSelectedWorkOrders() {
    this.deleteWorkOrdersDialog = true;
  }

}
