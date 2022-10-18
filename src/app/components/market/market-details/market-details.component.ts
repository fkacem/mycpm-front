import { PurchaseOrder } from './../../../models/PurchaseOrder';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Market } from 'src/app/models/Market';
import { MarketService } from 'src/app/services/market.service';
import { PurchaseOrderService } from 'src/app/services/purchaseOrder.service';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/app/models/Item';
import { currency_options, type_options, budget_options } from 'src/assets/data/Options';
import { ProfessionService } from 'src/app/services/profession.service';
import { Profession } from 'src/app/models/Profession';
import { BusinessSectorService } from 'src/app/services/business-sector.service';
import { BusinessSector } from 'src/app/models/BusinessSector';
import { ItemUsedService } from 'src/app/services/item-used.service';
import { ItemUsed } from 'src/app/models/ItemUsed';

@Component({
  selector: 'app-market-details',
  templateUrl: './market-details.component.html',
  styleUrls: ['./market-details.component.scss'],
  providers: [MessageService],

})
export class MarketDetailsComponent implements OnInit {

  market : Market = {};
  pathId : number;

  selectedOrders : any[];

  orderForm: FormGroup;

  orderDialog : boolean = false;

  order: PurchaseOrder

  deleteOrderDialog: boolean = false;
  deleteOrdersDialog: boolean = false;
  marketDialog : boolean = false;
  articlesDialog : boolean = false;

  itemForm: FormGroup;
  items: Item[];

  detailsForm : FormGroup;
  usedItemForm : FormGroup;

  currency_options = currency_options;
  budget_options = budget_options;
  type_options = type_options;
  professions: Profession[] = [];
  sectors: BusinessSector[] = [];
  cols: { field: string; header: string; }[];

  selectedUnit : any;
  spendedBudget: number;

  budgetControl: boolean = false;

  usedItems : any[];

  constructor(private marketService: MarketService,
              private route : ActivatedRoute,
              private purchaseOrderService : PurchaseOrderService,
              private itemService: ItemService,
              private messageService: MessageService,
              private router: Router,
              private professionService: ProfessionService,
              private businessSectorService: BusinessSectorService,
              private itemUsedService: ItemUsedService,) { }


  ngOnInit(): void {

    this.pathId = parseInt(this.route.snapshot.paramMap.get('id'));

    this.getMarket();
    this.getSectors();
    this.getItems();

    // function budgetAmountValidator(control: AbstractControl): { [key: string]: boolean } | null {

    //   let amount = control.value
    //   let remaining = this.getRemainedBudget()

    //   console.log(amount)
    //   if (amount !== undefined && (amount > remaining)) {
    //     return { 'budgetAmount': true };
    //   }
    //   return null;
    // }

    this.detailsForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.pattern("[A-Za-z1-9 _àâéêèëìïîôùçæœÀÂÉÊÈËÌÏÎÔÙÛÇÆŒ-]+"), Validators.required]),
      code: new FormControl('', [Validators.pattern("[A-Za-z1-9 _àâéêèëìïîôùçæœÀÂÉÊÈËÌÏÎÔÙÛÇÆŒ-]+"), Validators.required]),
      budget: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      unit: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      limit: new FormControl('', [Validators.required]),
      profession: new FormControl('', [Validators.required]),
      selectedSector: new FormControl('', [Validators.required]),
    })

    this.orderForm = new FormGroup({
      id: new FormControl(''),
      code: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      limit: new FormControl('', [Validators.required]),
    })

    this.itemForm = new FormGroup({
      id: new FormControl(''),
      quantity: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      item: new FormControl('', [Validators.required]),
    })

    this.usedItemForm = new FormGroup({
      quantity: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
    })
  }

  getMarket(){
    this.marketService.getMarketById(this.pathId).subscribe
      ((response: Market) => {
        this.market = response;
        console.log(this.market);
        this.selectedUnit = this.market.unit;
      },
        (error: HttpErrorResponse) => {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Chargement échoué', life: 3000 });
        }
      )
  }

  getItems() {
    this.itemService.getItems().subscribe({
      next: (response: Item[]) => this.items = response,
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Chargement échoué', life: 3000 }),
    })
  }

  getProfessionsBySector(id: number) {
    this.professionService.getProfessionBySector(id).subscribe({
      next: (response: Profession[]) => this.professions = response,
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Chargement échoué', life: 3000 }),
    })
  }

  getSectors() {
  this.businessSectorService.getSectors().subscribe({
    next: (response: BusinessSector[]) => this.sectors = response,
    error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Chargement échoué', life: 3000 }),
  })
  }

  saveOrder(){

    this.order = {
      'id': this.orderForm.get('id').value,
      'code': this.orderForm.get('code').value,
      'amount': this.orderForm.get('amount').value,
      'limit': this.orderForm.get('limit').value,
      'startDate': this.orderForm.get('startDate').value,
    }

    if(this.order.amount > this.getRemainedBudget()){
      this.budgetControl = true;
    }else{
      this.budgetControl = false;
      this.purchaseOrderService.savePurchaseOrder(this.order,this.market.id).subscribe({
        next: (response: Market) => {
          this.orderForm.reset();
          this.messageService.add({ severity: 'success', summary: 'Succès', detail: "Bon de Commande Enregistré", life: 3000 });
          this.getMarket();
        },
        error: (e) => {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Enregistrement échoué', life: 3000 });
        },
        complete: () => this.orderDialog = false
      })
    }
  }

  confirmDelete() {
    this.deleteOrderDialog = false;

    this.purchaseOrderService.deletePurchaseOrder(this.order.id).subscribe({
      next: (v) => this.getMarket(),
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Suppréssion Echouée', life: 3000 }),
    })

    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Bon de Commande a été Supprimés', life: 3000 });
    this.order = {};
  }

  confirmDeleteSelected() {
    this.deleteOrdersDialog = false;
    for (let s of this.selectedOrders) {
      this.purchaseOrderService.deletePurchaseOrder(s.id).subscribe({
        next: (v) => this.getMarket(),
        error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Suppréssion Echouée', life: 3000 }),
      })
    }

    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Les Bons de Commande sélectionnés ont été supprimés', life: 3000 });
    this.selectedOrders = null;
  }

  openNew(){
    this.orderForm.reset();
    this.orderDialog = true;

  }

  editPurchaseOrder(order: PurchaseOrder) {
    this.orderForm.reset()
    this.order = { ...order };
    this.orderForm.get('id').setValue(order.id)
    this.orderForm.get('code').setValue(order.code)
    this.orderForm.get('amount').setValue(order.amount)
    this.orderForm.get('limit').setValue(order.limit)
    this.orderForm.get('startDate').setValue(new Date(order.startDate))
    this.orderDialog = true;
  }

  hideOrderDialog(){
    this.orderDialog = false;
  }

  deletePurchaseOrder(order: PurchaseOrder) {
    this.deleteOrderDialog = true;
    this.order = { ...order };
  }

  deletePurchaseOrders() {
    this.deleteOrdersDialog = true;
  }

  openArticles(order: PurchaseOrder){
    this.order = { ...order };
    this.getItems()
    this.articlesDialog = true;
  }

  openEditMarket(){
    console.log(this.market)
    this.detailsForm.get('id').setValue(this.market.id)
    this.detailsForm.get('name').setValue(this.market.name)
    this.detailsForm.get('code').setValue(this.market.code)
    this.detailsForm.get('budget').setValue(this.market.budget)
    this.detailsForm.get('type').setValue(this.market.type)
    this.detailsForm.get('unit').setValue(this.market.unit)
    this.detailsForm.get('amount').setValue(this.market.amount)
    this.detailsForm.get('limit').setValue(this.market.limit)
    this.detailsForm.get('selectedSector').setValue(this.market.profession.sector)
    this.onSectorSelect()
    this.detailsForm.get('profession').setValue(this.market.profession)

    this.marketDialog = true;
    this.getSectors();
    console.log(this.detailsForm.get('unit').value)
  }

  hideMarketDialog(){
    this.marketDialog = false;
  }

  editMarket(){

    let market = {
      'id': this.detailsForm.get('id').value,
      'name': this.detailsForm.get('name').value,
      'code': this.detailsForm.get('code').value,
      'budget': this.detailsForm.get('budget').value,
      'type': this.detailsForm.get('type').value,
      'unit': this.detailsForm.get('unit').value,
      'amount': this.detailsForm.get('amount').value,
      'limit': this.detailsForm.get('limit').value,
      'profession': this.detailsForm.get('profession').value,
      'organization': this.market.organization,
    }
    console.log(market)

    this.marketService.saveMarket(market).subscribe({
      next: (response: Market) => {
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: "Marché Modifié", life: 3000 });
        this.getMarket();
      },
      error: (e) => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Modification échouée', life: 3000 });
      },
      complete: () => this.marketDialog = false
    })
  }

  onSectorSelect(){
    if(this.detailsForm.get('selectedSector').value){
      this.getProfessionsBySector(this.detailsForm.get('selectedSector').value.id)
    }else{
      this.professions = []
    }
  }


  onChangerCurrency(){
    this.selectedUnit = this.detailsForm.get('unit').value
  }

//count remained budget
  getRemainedBudget(){
    this.spendedBudget = 0;
    if(this.market?.purchaseOrders != null){
      for(let order of this.market?.purchaseOrders){
        this.spendedBudget += order.amount
      }
    }
    return this.market?.amount - this.spendedBudget
  }

  //count used budget in percentage
  getUsedBudget(){
    this.spendedBudget = this.market?.amount - this.getRemainedBudget();
    // return (this.spendedBudget/this.market.amount)*100
    return Math.round((this.spendedBudget/this.market?.amount)*100  ) + "%"
  }

  openOverlayPanel(){
    console.log("overlay opened")
  }

  submitUsedItem(item : Item){

    let itemUsed : ItemUsed = {
      'id': null,
      'item': item,
      'quantity': this.usedItemForm.get('quantity').value,
      // 'purchaseOrder': this.order,
      'price': this.usedItemForm.get('price').value,
    }
    console.log(itemUsed)

    this.itemUsedService.saveItemUsed(this.order.id, itemUsed).subscribe({
      next: (response: ItemUsed) => {
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: "Article Ajouté", life: 3000 });
        this.getMarket();
      },
      error: (e) => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Ajout échoué', life: 3000 });
      },
      // complete: () => this.overlayPanel = false
    })

  }

  getItemsUsed(){
    this.itemUsedService.getItemUsedByPurchaseOrder(this.order.id).subscribe({
      next: (response: ItemUsed[]) => {
        this.usedItems = response
      },
      error: (e) => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Récupération échouée', life: 3000 });
      },
      // complete: () => this.overlayPanel = false
    })
  }

  deleteItemUsed(item : Item){
    this.itemUsedService.deleteItemUsed(item.id).subscribe({
      next: (response: ItemUsed) => {
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: "Article Supprimé", life: 3000 });
        this.getMarket();
        //find order in market.purchaseOrders
        this.order
        this.order
      },
      error: (e) => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Suppression échouée', life: 3000 });
      },
      // complete: () => this.overlayPanel = false
    })
  }

  viewAttachment(order){
    this.router.navigate(['cpm/attachment/order/',order.id]);
  }

  viewWorkOrder(order){
    this.router.navigate(['cpm/workorder/order/',order.id]);
  }

}
