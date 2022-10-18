import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BusinessSector } from 'src/app/models/BusinessSector';
import { Organization } from 'src/app/models/Organization';
import { User } from 'src/app/models/User';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BusinessSectorService } from 'src/app/services/business-sector.service';
import { CountryService } from 'src/app/services/local/country.service';
import { OrganizationService } from 'src/app/services/organization.service';
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
  if (control.get('username')?.dirty) {
    const username = control.get('username')?.value;
    let check = USERS_LIST.find(i => i.username === username);
    return check == null ? null : { usernameTaken: true };
  } else
    return null;
};

let ORGANIZATIONS_LIST: Organization[] = [];

export const codeExistsValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  if (control.get('organizationCode')?.dirty) {
    const code = control.get('organizationCode')?.value;
    let check = ORGANIZATIONS_LIST.find(i => i.code === code);
    return check == null ? null : { codeTaken: true };
  } else
    return null;
};

export const nameExistsValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  if (control.get('organizationName')?.dirty) {
    const name = control.get('organizationName')?.value;
    let check = ORGANIZATIONS_LIST.find(i => i.name === name);
    return check == null ? null : { nameTaken: true };
  } else
    return null;
};


@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.scss'],
  providers: [MessageService],

})
export class RegisterAdminComponent implements OnInit {

  myForm: FormGroup;

  countries: any[] = [];
  selectedCountry: any;

  document_file : File;

  sectors : BusinessSector[];

  showLoading : boolean;


  constructor(private countryService: CountryService, private messageService : MessageService,
    private businessSectorService: BusinessSectorService, private authenticationService : AuthenticationService, private router: Router,
     private userService : UserService, private organizationService : OrganizationService) { }

  ngOnInit(): void {

    document.documentElement.style.fontSize = '14px';

    this.getCountries();
    this.getSectors();
    this.getUsers();
    this.getOranizations();

    this.myForm = new FormGroup({
      id: new FormControl(''),
      organizationName: new FormControl('testing', [Validators.required]),
      organizationCode: new FormControl('testing', [Validators.required, codeExistsValidator]),
      sector: new FormControl('', [Validators.required]),
      organizationEmail: new FormControl('testing@testing', [Validators.required, Validators.email]),
      country: new FormControl('testing', [Validators.required]),
      region: new FormControl('testingz', [Validators.required]),
      address: new FormControl('testingtestingtesting', [Validators.required]),
      phone: new FormControl('12345678', [Validators.required,Validators.min(1),Validators.pattern('^[0-9]{8}$')]),

      directorFirstName: new FormControl('z', [Validators.pattern("[A-Za-z _àâéêèëìïîôùçæœÀÂÉÊÈËÌÏÎÔÙÛÇÆŒ-]+"),Validators.required]),
      directorLastName: new FormControl('a', [Validators.pattern("[A-Za-z _àâéêèëìïîôùçæœÀÂÉÊÈËÌÏÎÔÙÛÇÆŒ-]+"),Validators.required]),
      directorPhone: new FormControl('12345678', [Validators.required,Validators.min(1),Validators.pattern('^[0-9]{8}$')]),
      directorEmail: new FormControl('testing@testing', [Validators.required,Validators.email]),

      adminFirstName: new FormControl('i', [Validators.pattern("[A-Za-z _àâéêèëìïîôùçæœÀÂÉÊÈËÌÏÎÔÙÛÇÆŒ-]+"),Validators.required]),
      adminLastName : new FormControl('o', [Validators.pattern("[A-Za-z _àâéêèëìïîôùçæœÀÂÉÊÈËÌÏÎÔÙÛÇÆŒ-]+"),Validators.required]),
      adminPhone: new FormControl('12345678', [Validators.required,Validators.min(1),Validators.pattern('^[0-9]{8}$')]),
      adminEmail: new FormControl('testing@testing', [Validators.required,Validators.email]),
      username: new FormControl('', [Validators.required, usernameExistsValidator]),
      password: new FormControl('testing', [Validators.required]),
      confirmPassword: new FormControl('testing'),

      document_file: new FormControl(''),

    }, { validators: [passwordMatchingValidator, usernameExistsValidator, codeExistsValidator, nameExistsValidator] });


  }

  getUsers() {
    this.userService.getUsers().subscribe(
      (data) => {
        USERS_LIST = data;
      }
    );
  }

  getOranizations() {
    this.organizationService.getOrganizations().subscribe(
      (data) => {
        console.log(data);
        ORGANIZATIONS_LIST = data;
      }
    );
  }

  getCountries(){
    this.countryService.getCountries().then(countries => {
      this.countries = countries;
  });
  }

  getSectors() {
    this.businessSectorService.getSectors().subscribe
      ((response: BusinessSector[]) => {
        this.sectors = response;
      },
        (error: HttpErrorResponse) => {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Chargement échoué', life: 3000 });
        }
      )
  }

  onRegister() {
    this.showLoading = true;
    //touch all fields to trigger validation messages
    for(let i in this.myForm.controls) {
      this.myForm.get(i).markAsDirty();
    }

    if(!this.myForm.valid){
      this.messageService.add({severity:'error', summary:'Erreur', detail:'Veuillez remplir tous les champs'});
      this.showLoading = false;
      return;
    }


    let user : User = {
      username: this.myForm.value.username,
      password: this.myForm.value.password,
      firstName: this.myForm.value.adminFirstName,
      lastName: this.myForm.value.adminLastName,
      email: this.myForm.value.adminEmail,
      phone: this.myForm.value.adminPhone,
    }

    this.userService.saveUser(user).subscribe(
      (response: User) => {
        this.messageService.add({ severity: 'success', summary: 'Succèss', detail: 'Utilisateur Enregistré!', life: 3000 });
        let userId = response.id;
        const formData: FormData = new FormData();

        formData.append('name', this.myForm.get('organizationName').value);
        formData.append('code', this.myForm.get('organizationCode').value);
        formData.append('email', this.myForm.get('organizationEmail').value);
        formData.append('sectorId', this.myForm.get('sector').value.id);
        formData.append('adminId', userId + "");
        formData.append('phone', this.myForm.get('phone').value);
        formData.append('country', this.myForm.get('country').value);
        formData.append('region', this.myForm.get('region').value);
        formData.append('address', this.myForm.get('address').value);
        formData.append('directorFirstName', this.myForm.get('directorFirstName').value);
        formData.append('directorLastName', this.myForm.get('directorLastName').value);
        formData.append('directorPhone', this.myForm.get('directorPhone').value);
        formData.append('directorEmail', this.myForm.get('directorEmail').value);
    
    
        if (this.document_file != null) {
          formData.append('document', this.document_file, this.document_file?.name);
        }
        
    
        this.organizationService.saveOrganization(formData).subscribe(
          (response: Organization) => {
            this.messageService.add({ severity: 'success', summary: 'Succèss', detail: 'Organisation Enregistré', life: 3000});
            //login
            console.log("thats before loging " + user);
            this.login(user.username, user.password);
            
            
          },
          (error: HttpErrorResponse) => {
            this.showLoading = false;
            this.messageService.add({severity: 'error',summary: 'Enregistrement Organisation échoué', detail:error.message ,life: 3000});
          }
        )
        

      },
      (error: HttpErrorResponse) => {
        this.showLoading = false;
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Enregistrement échoué', life: 3000 });
      }
    );

  }

  login(username, password) {
    console.log("hi");

    console.log(username);
    console.log(password);

    let user = {
      'username': username,
      'password': password,
    }

      this.authenticationService.login(user).subscribe(
        (response: any) => {
          const token = response.body["access_token"];
          this.authenticationService.saveToken(token);
          const refreshtoken = response.body["refresh_token"];
          this.authenticationService.saveRefreshToken(refreshtoken);
          this.authenticationService.addUserRoleToLocalCache()
          this.authenticationService.expiredMsg = null
          this.router.navigateByUrl('/cpm');
        },
        (error: HttpErrorResponse) => {
          this.showLoading = false;
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Authentification échoué', life: 3000 });
        }
    )
    }

  onSelectDocument(event) {
    this.document_file = event.files[0];
    if(this.document_file.size < 10000000){
      this.myForm.get('document_file').setValue('valid');
      this.messageService.add({severity: 'info', summary: 'Success', detail: 'Ficher selectionneé'});
    }else{
      this.myForm.get('document_file').reset();
    }
  }

  onRemoveDocument() {
    this.document_file = null
    this.myForm.get('document_file').reset();
  }



}
