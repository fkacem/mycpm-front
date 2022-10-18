import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Gender } from 'src/app/enums/Gender';
import { Organization } from 'src/app/models/Organization';
import { Role } from 'src/app/models/Role';
import { User } from 'src/app/models/User';
import { OrganizationService } from 'src/app/services/organization.service';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';


//password confirm validator
export const passwordMatchingValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;
  return password === confirmPassword ? null : { notmatched: true };
};
//unique username validator
let USERS_LIST: User[] = [];
export const usernameExistsValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  if (control.get('username').dirty) {
    const username = control.get('username')?.value;
    let check = USERS_LIST.find(i => i.username === username);
    return check == null ? null : { usernameTaken: true };
  } else
    return null;
};


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class UserComponent implements OnInit {

  user : User;
  users : User[];
  selectedUsers : User[];

  organizations : Organization[];
  selectedOrganization : Organization;

  userDialog : boolean;

  gender = Gender;
  genders = [];

  roles = [];
  selectedRoles : Role[] = [];

  cols: any[];

  myForm: FormGroup;
  pwdForm: FormGroup;

  
  constructor(private messageService: MessageService,
     private router: Router,
     private organizationService : OrganizationService,
     private roleService : RoleService,
     private userService : UserService) { 
    }

  ngOnInit(): void {

    this.genders = Object.keys(this.gender);

    this.getUsers();
    this.getOrganisations();
    this.getRoles();

    this.cols = [
      { field: 'lastName', header: 'lastName' },
      { field: 'firstName', header: 'firstName' },
      { field: 'gender', header: 'gender' },
      { field: 'email', header: 'email' },
      { field: 'phone', header: 'phone' },
      { field: 'address', header: 'address' },
      { field: 'role', header: 'role' },
    ];


    function ageRangeValidator(control: AbstractControl): { [key: string]: boolean } | null {

      let age = new Date().getFullYear() - new Date(control.value).getFullYear()

      if (age !== undefined && (age < 18)) {
        return { 'ageRange': true };
      }
      return null;
    }


    this.myForm = new FormGroup({
      id: new FormControl(''),
      firstName: new FormControl('', [Validators.pattern("[A-Za-z _àâéêèëìïîôùçæœÀÂÉÊÈËÌÏÎÔÙÛÇÆŒ-]+"), Validators.required]),
      lastName: new FormControl('', [Validators.pattern("[A-Za-z _àâéêèëìïîôùçæœÀÂÉÊÈËÌÏÎÔÙÛÇÆŒ-]+"), Validators.required]),
      gender: new FormControl('', Validators.required),
      dob: new FormControl('', [ageRangeValidator, Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      phone: new FormControl('', [Validators.pattern("[0-9]{8}"), Validators.required]),
      address : new FormControl(''),
      organization : new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      roles: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl(''),
    }, { validators: [passwordMatchingValidator, usernameExistsValidator] })

    this.pwdForm = new FormGroup({
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
    }, { validators: [passwordMatchingValidator] })


  }

  getUsers() {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
      }
    );
  }

  getOrganisations() {
    this.organizationService.getOrganizations().subscribe(
      (data) => {
        this.organizations = data;
      }
    );
  }

  openNew(){
    this.userDialog = true;
  }

  getRoles(){
    this.roleService.getRoles().subscribe(
      (data) => {
        this.roles = data;
      }
    );
  }


  userSelected(){
    this.myForm.get("organization").setValue("VALID");
  }

  saveUser() {
    console.log(this.myForm.value);

    let user : User = {
      id: null,
      isActive : null,
      firstName: this.myForm.value.firstName,
      lastName: this.myForm.value.lastName,
      gender : this.myForm.value.gender,
      dob : this.myForm.value.dob,
      email : this.myForm.value.email,
      phone : this.myForm.value.phone,
      address : this.myForm.value.address,
      organization : this.selectedOrganization,
      username : this.myForm.value.username,
      roles : this.myForm.value.roles,
      password : this.myForm.value.password,
      
    }
    console.log(user);
    this.userService.saveUser(this.user).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Utilisateur Enregistrer' });
        this.getUsers();
      },
      (error: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Enregistrement échoué', life: 3000 });
      }
    );
    this.userDialog = false;

  }

  viewUser(user){
    this.router.navigate(['cpm/users/',user.id]);

  }

}
