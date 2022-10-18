import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                items: [
                    { label: 'Tableau de bord', icon: 'pi pi-fw pi-th-large', routerLink: ['/cpm'] },

                    {
                        label: 'Administration',
                        icon: 'pi pi-fw pi-shield',
                        items: [
                            {
                                label: "Secteur d\'activité",
                                icon: 'pi pi-fw pi-circle',
                                routerLink: ['/cpm/business_sectors']
                            },
                            {
                                label: "Metiers",
                                icon: 'pi pi-fw pi-circle',
                                routerLink: ['/cpm/professions']
                            },
                            {
                              label: "Gestion des Types d'Articles",
                              icon: 'pi pi-fw pi-circle',
                              routerLink: ['/cpm/types']
                            },
                        ]
                    },
                    {
                      label: 'Articles',
                      icon: 'pi pi-fw pi-clone',
                      routerLink: ['/cpm/items']
                    },
                    {
                        label: 'Marchés',
                        icon: 'pi pi-fw pi-shopping-bag',
                        routerLink: ['/cpm/markets']
                    },
                    {
                        label: 'Attachement',
                        icon: 'pi pi-fw pi-shopping-bag',
                        routerLink: ['/cpm/attachments']
                    },
                    {
                        label: 'Ordres des Travaux',
                        icon: 'pi pi-fw pi-sitemap',
                        routerLink: ['/cpm/workorders/manage']
                    },
                    {
                        label: 'Comptes',
                        icon: 'pi pi-fw pi-briefcase',
                        items: [
                            {
                                label: 'Gérer',
                                icon: 'pi pi-fw pi-circle',
                                routerLink: ['/cpm/users']
                            },

                        ]
                    },

                    {
                        label: 'Organisations',
                        icon: 'pi pi-fw pi-building',
                        items: [
                            {
                                label: 'Gérer',
                                icon: 'pi pi-fw pi-circle',
                                routerLink: ['/cpm/organizations/manage']
                            },
                            {
                                label: 'Abonnements',
                                icon: 'pi pi-fw pi-circle',
                                routerLink: ['/auth/error']
                            },
                        ]
                    },
                    {
                        label: 'Demandes',
                        icon: 'pi pi-fw pi-book',
                        items: [
                            {
                                label: 'Approuvées',
                                icon: 'pi pi-fw pi-check-circle',
                                routerLink: ['/cpm/requests/approved']
                            },
                            {
                                label: "En Attente",
                                icon: 'pi pi-fw pi-info-circle',
                                routerLink: ['/cpm/requests/waiting']
                            },
                            {
                                label: "Rejetées",
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/cpm/requests/rejected']
                            },

                        ]
                    },



                ]
            },

        ];


/*
        this.model = [
            {
                items: [
                    { label: 'Tableau de bord', icon: 'pi pi-fw pi-th-large', routerLink: ['/cpm'] },

                    {
                        label: 'Organisations',
                        icon: 'pi pi-fw pi-building',
                        items: [
                            {
                                label: 'Gérer',
                                icon: 'pi pi-fw pi-circle',
                                routerLink: ['/mycpm/organizations/manage']
                            },
                            {
                                label: 'Metiers',
                                icon: 'pi pi-fw pi-circle',
                                routerLink: ['/auth/error']
                            },
                            {
                                label: 'Entreprises',
                                icon: 'pi pi-fw pi-circle',
                                routerLink: ['/auth/access']
                            },
                            {
                                label: 'Configurations',
                                icon: 'pi pi-fw pi-circle',
                                routerLink: ['/auth/access']
                            }
                        ]
                    },
                    {
                        label: 'Articles',
                        icon: 'pi pi-fw pi-book',
                        items: [
                            {
                                label: 'Gestion des articles ',
                                icon: 'pi pi-fw pi-circle',
                                routerLink: ['/mycpm/articles']
                            },
                            {
                                label: "Gestion des types d'articles",
                                icon: 'pi pi-fw pi-circle',
                                routerLink: ['/auth/error']
                            },

                        ]
                    },
                    {
                        label: 'Marchés',
                        icon: 'pi pi-fw pi-briefcase',
                        items: [
                            {
                                label: 'Ajouter un marché ',
                                icon: 'pi pi-fw pi-circle',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: "Consulter les marchés",
                                icon: 'pi pi-fw pi-circle',
                                routerLink: ['/auth/error']
                            },

                        ]
                    },
                    {
                        label: 'Facturations',
                        icon: 'pi pi-fw pi-credit-card',
                        items: [
                            {
                                label: 'Chart.js ',
                                icon: 'pi pi-fw pi-circle',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: "ApexCharts",
                                icon: 'pi pi-fw pi-circle',
                                routerLink: ['/auth/error']
                            },
                            {
                                label: "ECharts",
                                icon: 'pi pi-fw pi-circle',
                                routerLink: ['/auth/error']
                            },

                        ]
                    },
                    {
                        label: 'Suivis et exécutions des projets',
                        icon: 'pi pi-fw pi-chart-line',
                        items: [
                            {
                                label: 'Gérer les bons de livrasison ',
                                icon: 'pi pi-fw pi-circle',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: "Ajouter un attachement",
                                icon: 'pi pi-fw pi-circle',
                                routerLink: ['/auth/error']
                            },
                            {
                                label: "Consulter les attachements",
                                icon: 'pi pi-fw pi-circle',
                                routerLink: ['/auth/error']
                            },
                            {
                                label: "Statistiques",
                                icon: 'pi pi-fw pi-circle',
                                routerLink: ['/auth/error']
                            },

                        ]
                    },
                    {
                        label: 'Suivis et exécutions des MC',
                        icon: 'pi pi-fw pi-shield',
                        items: [
                            {
                                label: 'Ajouter des OT ',
                                icon: 'pi pi-fw pi-circle',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: "Consulter les OTs",
                                icon: 'pi pi-fw pi-circle',
                                routerLink: ['/auth/error']
                            },
                            {
                                label: "Gérer les bons de livraison",
                                icon: 'pi pi-fw pi-circle',
                                routerLink: ['/auth/error']
                            },
                            {
                                label: "Ajouter un attachement",
                                icon: 'pi pi-fw pi-circle',
                                routerLink: ['/auth/error']
                            },
                            {
                                label: "Consulter les attachements",
                                icon: 'pi pi-fw pi-circle',
                                routerLink: ['/auth/error']
                            },
                            {
                                label: "Statistiques",
                                icon: 'pi pi-fw pi-circle',
                                routerLink: ['/auth/error']
                            },

                        ]
                    },
                    {
                        label: 'Gestion RH',
                        icon: 'pi pi-fw pi-users',
                        items: [
                            {
                                label: 'Listes des Employées ',
                                icon: 'pi pi-fw pi-circle',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: "Listes des nouveaux comptes",
                                icon: 'pi pi-fw pi-circle',
                                routerLink: ['/auth/error']
                            },
                            {
                                label: "Ajouter un ouvrier",
                                icon: 'pi pi-fw pi-circle',
                                routerLink: ['/auth/error']
                            },
                        ]
                    },
                    { label: 'Profile', icon: 'pi pi-fw pi-user', routerLink: ['/t'] },


                ]
            },

        ]; */
    }
}
