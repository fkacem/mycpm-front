import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  providers: [MessageService],

})
export class UserDetailsComponent implements OnInit {

  user : User;
  pathId : number;
  
  constructor(private userService: UserService,
              private route : ActivatedRoute,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.pathId = parseInt(this.route.snapshot.paramMap.get('id'));

    this.getUser()
  }

  getUser(){
    this.userService.getUserById(this.pathId).subscribe
      ((response: User) => {
        this.user = response;
        console.log(this.user)
      },
        (error: HttpErrorResponse) => {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Chargement échoué', life: 3000 });
        }
      )
  }


}
