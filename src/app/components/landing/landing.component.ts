import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(public layoutService: LayoutService, public router: Router) { }

  ngOnInit(): void {
    document.documentElement.style.fontSize = '16px';

  }

  login() {
    this.router.navigate(['/login']);
  }
  
  cpm() {
    this.router.navigate(['/cpm']);
  }

}
