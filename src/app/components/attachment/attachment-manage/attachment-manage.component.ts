import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Market } from 'src/app/models/Market';
import { MarketService } from 'src/app/services/market.service';

@Component({
  selector: 'app-attachment-manage',
  templateUrl: './attachment-manage.component.html',
  styleUrls: ['./attachment-manage.component.scss'],
  providers: [MessageService]
})
export class AttachmentManageComponent implements OnInit {
  mp: Market[];
  mc: Market[];

  constructor(
    private marketService: MarketService,
    private messageService: MessageService,) { }

  ngOnInit(): void {
    this.getMCs()
    this.getMPs()
  }

  getMCs() {
    this.marketService.getMarketsByType("MC").subscribe({
      next: (response: Market[]) => {
        this.mc = response
      },
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Chargement échoué', life: 3000 }),
    })
  }

  getMPs() {
    this.marketService.getMarketsByType("Projet").subscribe({
      next: (response: Market[]) => {
        this.mp = response
      },
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Chargement échoué', life: 3000 }),
    })
  }




}
