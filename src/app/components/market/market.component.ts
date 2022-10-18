import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Profession } from 'src/app/models/Profession';
import { Market } from 'src/app/models/Market';
import { ProfessionService } from 'src/app/services/profession.service';
import { MarketService } from 'src/app/services/market.service';
import { BusinessSectorService } from 'src/app/services/business-sector.service';
import { BusinessSector } from 'src/app/models/BusinessSector';
import { UserService } from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';
import { OrganizationService } from 'src/app/services/organization.service';
import { currency_options, type_options, budget_options } from 'src/assets/data/Options';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss'],
  providers: [MessageService]
})
export class MarketComponent implements OnInit {

  myForm: FormGroup;
  cols: any[];
  marketDialog: boolean;
  deleteMarketDialog: boolean = false;
  deleteMarketsDialog: boolean = false;
  market : Market;
  markets : Market[];
  mc: Market[];
  mp: Market[];
  selectedMarkets: Market[];
  professions: Profession[];
  sectors : BusinessSector[];
  selectedSector : BusinessSector;

  currency_options = currency_options;
  budget_options = budget_options;
  type_options = type_options;

  currentUser: User;

  selectedUnit : any = "TND";


  constructor(private businessSectorService: BusinessSectorService,
    private organizationService: OrganizationService,
    private marketService: MarketService,
    private professionService: ProfessionService,
    private userService: UserService,
    private router: Router,
    private messageService: MessageService) {


     }

  ngOnInit(): void {

    this.getMarkets();
    this.getSectors();
    this.getUser();

    this.cols = [
      { field: 'name', header: 'name' },
      { field: 'profession', header: 'profession' },
    ];

    this.myForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.pattern("[A-Za-z1-9 _àâéêèëìïîôùçæœÀÂÉÊÈËÌÏÎÔÙÛÇÆŒ-]+"), Validators.required]),
      code: new FormControl('', [Validators.pattern("[A-Za-z1-9 _àâéêèëìïîôùçæœÀÂÉÊÈËÌÏÎÔÙÛÇÆŒ-]+"), Validators.required]),
      budget: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      unit: new FormControl(this.selectedUnit, [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      limit: new FormControl('', [Validators.required]),
      profession: new FormControl('', [Validators.required]),
      selectedSector: new FormControl('', [Validators.required]),
    })
  }

  getUser(){
    this.userService.getUserByToken().subscribe({
      next: (response: User) =>
        {this.currentUser = response
        this.getOrganizationByAdmin(this.currentUser.id);
        console.log(this.currentUser)},
        error : (e) =>
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Chargement échoué', life: 3000 })
    })
  }
  getOrganizationByAdmin(id){
    this.organizationService.getOrganizationByAdminId(id).subscribe({
      next:(response: any) =>
        this.currentUser.organization = response,
        error: (e) =>
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Chargement échoué', life: 3000 })
        }
      )
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

  openNew() {
    this.myForm.reset()
    this.market = {};
    this.marketDialog = true;
  }

  deleteSelectedMarkets() {
    this.deleteMarketsDialog = true;
  }

  editMarket(market: Market) {
    this.myForm.reset()
    this.market = { ...market };
    this.myForm.get('id').setValue(market.id)
    this.myForm.get('name').setValue(market.name)
    this.myForm.get('profession').setValue(market.profession)
    this.marketDialog = true;
  }

  deleteMarket(Market: Market) {
    this.deleteMarketDialog = true;
    this.market = { ...Market };
  }

  hideDialog() {
    this.marketDialog = false;
    this.myForm.reset()
  }

  onSectorSelect(){
    this.getProfessionsBySector(this.myForm.get('selectedSector').value.id)
  }

  getMarkets() {
      this.marketService.getMarkets().subscribe({
        next: (response: Market[]) => {
          this.markets = response
          this.mc = this.markets.filter(i => i.type == "MC")
          this.mp = this.markets.filter(i => i.type == "Projet")
        },
        error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Chargement échoué', life: 3000 }),
      })
  }

  saveMarket() {
    this.market = {
      'id': this.myForm.get('id').value,
      'name': this.myForm.get('name').value,
      'code': this.myForm.get('code').value,
      'budget': this.myForm.get('budget').value,
      'type': this.myForm.get('type').value,
      'unit': this.myForm.get('unit').value,
      'amount': this.myForm.get('amount').value,
      'limit': this.myForm.get('limit').value,
      'profession': this.myForm.get('profession').value,
    }

    if(this.currentUser.organization != null){
      this.market.organization = this.currentUser.organization
    }

    console.log(this.market)

    this.marketService.saveMarket(this.market).subscribe({
      next: (response: Market) => {
        this.myForm.reset();
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: "Marché Enregistré", life: 3000 });
        this.getMarkets();
      },
      error: (e) => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Enregistrement échoué', life: 3000 });
      },
      complete: () => this.marketDialog = false
    })

  }

  confirmDeleteSelected() {
    this.deleteMarketsDialog = false;
    for (let s of this.selectedMarkets) {
      this.marketService.deleteMarket(s.id).subscribe({
        next: (v) => this.getMarkets(),
        error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Suppréssion Echouée', life: 3000 }),
      })
    }

    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Les marchés sélectionnés ont été supprimés', life: 3000 });
    this.selectedMarkets = null;
  }

  confirmDelete() {
    this.deleteMarketDialog = false;

    this.marketService.deleteMarket(this.market.id).subscribe({
      next: (v) => this.getMarkets(),
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Suppréssion Echouée', life: 3000 }),
    })

    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Marché a été Supprimés', life: 3000 });
    this.market = {};
  }

  viewMarket(market){
    this.router.navigate(['cpm/markets/',market.id]);
  }

  onChangerCurrency(){
    this.selectedUnit = this.myForm.get('unit').value
  }

}
