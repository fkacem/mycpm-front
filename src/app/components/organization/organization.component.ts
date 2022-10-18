import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BusinessSector } from 'src/app/models/BusinessSector';
import { CustomFile } from 'src/app/models/CustomFile';
import { Organization } from 'src/app/models/Organization';
import { Role } from 'src/app/models/Role';
import { User } from 'src/app/models/User';
import { BusinessSectorService } from 'src/app/services/business-sector.service';
import { CountryService } from 'src/app/services/local/country.service';
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
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  providers: [MessageService],
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {

  organizations : Organization[] = [];
  organization : Organization;

  deleteOrganizationDialog: boolean = false;

  deleteOrganizationsDialog: boolean = false;

  myForm: FormGroup;
  editForm: FormGroup;

  countries: any[] = [];
  selectedCountry: any;

  editDialog : boolean = false;

  formData: FormData;

  sectors: BusinessSector[];

  document_file : File;
  modalDocument_file : File;

  //so docs is an array of files to get arround the file uploader table when editing an organization
  docs : CustomFile[] = [];

  adminRole : Role;

  documentAvailability  : boolean = false;

  countryListAllIsoData = [
    {"code": "AF", "code3": "AFG", "name": "Afghanistan", "number": "004"},
    {"code": "AL", "code3": "ALB", "name": "Albania", "number": "008"},
    {"code": "DZ", "code3": "DZA", "name": "Algeria", "number": "012"},
    {"code": "AS", "code3": "ASM", "name": "American Samoa", "number": "016"},
    {"code": "AD", "code3": "AND", "name": "Andorra", "number": "020"},
    {"code": "AO", "code3": "AGO", "name": "Angola", "number": "024"},
    {"code": "AI", "code3": "AIA", "name": "Anguilla", "number": "660"},
    {"code": "AQ", "code3": "ATA", "name": "Antarctica", "number": "010"},
    {"code": "AG", "code3": "ATG", "name": "Antigua and Barbuda", "number": "028"},
    {"code": "AR", "code3": "ARG", "name": "Argentina", "number": "032"},
    {"code": "AM", "code3": "ARM", "name": "Armenia", "number": "051"},
    {"code": "AW", "code3": "ABW", "name": "Aruba", "number": "533"},
    {"code": "AU", "code3": "AUS", "name": "Australia", "number": "036"},
    {"code": "AT", "code3": "AUT", "name": "Austria", "number": "040"},
    {"code": "AZ", "code3": "AZE", "name": "Azerbaijan", "number": "031"},
    {"code": "BS", "code3": "BHS", "name": "Bahamas (the)", "number": "044"},
    {"code": "BH", "code3": "BHR", "name": "Bahrain", "number": "048"},
    {"code": "BD", "code3": "BGD", "name": "Bangladesh", "number": "050"},
    {"code": "BB", "code3": "BRB", "name": "Barbados", "number": "052"},
    {"code": "BY", "code3": "BLR", "name": "Belarus", "number": "112"},
    {"code": "BE", "code3": "BEL", "name": "Belgium", "number": "056"},
    {"code": "BZ", "code3": "BLZ", "name": "Belize", "number": "084"},
    {"code": "BJ", "code3": "BEN", "name": "Benin", "number": "204"},
    {"code": "BM", "code3": "BMU", "name": "Bermuda", "number": "060"},
    {"code": "BT", "code3": "BTN", "name": "Bhutan", "number": "064"},
    {"code": "BO", "code3": "BOL", "name": "Bolivia (Plurinational State of)", "number": "068"},
    {"code": "BQ", "code3": "BES", "name": "Bonaire, Sint Eustatius and Saba", "number": "535"},
    {"code": "BA", "code3": "BIH", "name": "Bosnia and Herzegovina", "number": "070"},
    {"code": "BW", "code3": "BWA", "name": "Botswana", "number": "072"},
    {"code": "BV", "code3": "BVT", "name": "Bouvet Island", "number": "074"},
    {"code": "BR", "code3": "BRA", "name": "Brazil", "number": "076"},
    {"code": "IO", "code3": "IOT", "name": "British Indian Ocean Territory (the)", "number": "086"},
    {"code": "BN", "code3": "BRN", "name": "Brunei Darussalam", "number": "096"},
    {"code": "BG", "code3": "BGR", "name": "Bulgaria", "number": "100"},
    {"code": "BF", "code3": "BFA", "name": "Burkina Faso", "number": "854"},
    {"code": "BI", "code3": "BDI", "name": "Burundi", "number": "108"},
    {"code": "CV", "code3": "CPV", "name": "Cabo Verde", "number": "132"},
    {"code": "KH", "code3": "KHM", "name": "Cambodia", "number": "116"},
    {"code": "CM", "code3": "CMR", "name": "Cameroon", "number": "120"},
    {"code": "CA", "code3": "CAN", "name": "Canada", "number": "124"},
    {"code": "KY", "code3": "CYM", "name": "Cayman Islands (the)", "number": "136"},
    {"code": "CF", "code3": "CAF", "name": "Central African Republic (the)", "number": "140"},
    {"code": "TD", "code3": "TCD", "name": "Chad", "number": "148"},
    {"code": "CL", "code3": "CHL", "name": "Chile", "number": "152"},
    {"code": "CN", "code3": "CHN", "name": "China", "number": "156"},
    {"code": "CX", "code3": "CXR", "name": "Christmas Island", "number": "162"},
    {"code": "CC", "code3": "CCK", "name": "Cocos (Keeling) Islands (the)", "number": "166"},
    {"code": "CO", "code3": "COL", "name": "Colombia", "number": "170"},
    {"code": "KM", "code3": "COM", "name": "Comoros (the)", "number": "174"},
    {"code": "CD", "code3": "COD", "name": "Congo (the Democratic Republic of the)", "number": "180"},
    {"code": "CG", "code3": "COG", "name": "Congo (the)", "number": "178"},
    {"code": "CK", "code3": "COK", "name": "Cook Islands (the)", "number": "184"},
    {"code": "CR", "code3": "CRI", "name": "Costa Rica", "number": "188"},
    {"code": "HR", "code3": "HRV", "name": "Croatia", "number": "191"},
    {"code": "CU", "code3": "CUB", "name": "Cuba", "number": "192"},
    {"code": "CW", "code3": "CUW", "name": "Curaçao", "number": "531"},
    {"code": "CY", "code3": "CYP", "name": "Cyprus", "number": "196"},
    {"code": "CZ", "code3": "CZE", "name": "Czechia", "number": "203"},
    {"code": "CI", "code3": "CIV", "name": "Côte d'Ivoire", "number": "384"},
    {"code": "DK", "code3": "DNK", "name": "Denmark", "number": "208"},
    {"code": "DJ", "code3": "DJI", "name": "Djibouti", "number": "262"},
    {"code": "DM", "code3": "DMA", "name": "Dominica", "number": "212"},
    {"code": "DO", "code3": "DOM", "name": "Dominican Republic (the)", "number": "214"},
    {"code": "EC", "code3": "ECU", "name": "Ecuador", "number": "218"},
    {"code": "EG", "code3": "EGY", "name": "Egypt", "number": "818"},
    {"code": "SV", "code3": "SLV", "name": "El Salvador", "number": "222"},
    {"code": "GQ", "code3": "GNQ", "name": "Equatorial Guinea", "number": "226"},
    {"code": "ER", "code3": "ERI", "name": "Eritrea", "number": "232"},
    {"code": "EE", "code3": "EST", "name": "Estonia", "number": "233"},
    {"code": "SZ", "code3": "SWZ", "name": "Eswatini", "number": "748"},
    {"code": "ET", "code3": "ETH", "name": "Ethiopia", "number": "231"},
    {"code": "FK", "code3": "FLK", "name": "Falkland Islands (the) [Malvinas]", "number": "238"},
    {"code": "FO", "code3": "FRO", "name": "Faroe Islands (the)", "number": "234"},
    {"code": "FJ", "code3": "FJI", "name": "Fiji", "number": "242"},
    {"code": "FI", "code3": "FIN", "name": "Finland", "number": "246"},
    {"code": "FR", "code3": "FRA", "name": "France", "number": "250"},
    {"code": "GF", "code3": "GUF", "name": "French Guiana", "number": "254"},
    {"code": "PF", "code3": "PYF", "name": "French Polynesia", "number": "258"},
    {"code": "TF", "code3": "ATF", "name": "French Southern Territories (the)", "number": "260"},
    {"code": "GA", "code3": "GAB", "name": "Gabon", "number": "266"},
    {"code": "GM", "code3": "GMB", "name": "Gambia (the)", "number": "270"},
    {"code": "GE", "code3": "GEO", "name": "Georgia", "number": "268"},
    {"code": "DE", "code3": "DEU", "name": "Germany", "number": "276"},
    {"code": "GH", "code3": "GHA", "name": "Ghana", "number": "288"},
    {"code": "GI", "code3": "GIB", "name": "Gibraltar", "number": "292"},
    {"code": "GR", "code3": "GRC", "name": "Greece", "number": "300"},
    {"code": "GL", "code3": "GRL", "name": "Greenland", "number": "304"},
    {"code": "GD", "code3": "GRD", "name": "Grenada", "number": "308"},
    {"code": "GP", "code3": "GLP", "name": "Guadeloupe", "number": "312"},
    {"code": "GU", "code3": "GUM", "name": "Guam", "number": "316"},
    {"code": "GT", "code3": "GTM", "name": "Guatemala", "number": "320"},
    {"code": "GG", "code3": "GGY", "name": "Guernsey", "number": "831"},
    {"code": "GN", "code3": "GIN", "name": "Guinea", "number": "324"},
    {"code": "GW", "code3": "GNB", "name": "Guinea-Bissau", "number": "624"},
    {"code": "GY", "code3": "GUY", "name": "Guyana", "number": "328"},
    {"code": "HT", "code3": "HTI", "name": "Haiti", "number": "332"},
    {"code": "HM", "code3": "HMD", "name": "Heard Island and McDonald Islands", "number": "334"},
    {"code": "VA", "code3": "VAT", "name": "Holy See (the)", "number": "336"},
    {"code": "HN", "code3": "HND", "name": "Honduras", "number": "340"},
    {"code": "HK", "code3": "HKG", "name": "Hong Kong", "number": "344"},
    {"code": "HU", "code3": "HUN", "name": "Hungary", "number": "348"},
    {"code": "IS", "code3": "ISL", "name": "Iceland", "number": "352"},
    {"code": "IN", "code3": "IND", "name": "India", "number": "356"},
    {"code": "ID", "code3": "IDN", "name": "Indonesia", "number": "360"},
    {"code": "IR", "code3": "IRN", "name": "Iran (Islamic Republic of)", "number": "364"},
    {"code": "IQ", "code3": "IRQ", "name": "Iraq", "number": "368"},
    {"code": "IE", "code3": "IRL", "name": "Ireland", "number": "372"},
    {"code": "IM", "code3": "IMN", "name": "Isle of Man", "number": "833"},
    {"code": "IL", "code3": "ISR", "name": "Israel", "number": "376"},
    {"code": "IT", "code3": "ITA", "name": "Italy", "number": "380"},
    {"code": "JM", "code3": "JAM", "name": "Jamaica", "number": "388"},
    {"code": "JP", "code3": "JPN", "name": "Japan", "number": "392"},
    {"code": "JE", "code3": "JEY", "name": "Jersey", "number": "832"},
    {"code": "JO", "code3": "JOR", "name": "Jordan", "number": "400"},
    {"code": "KZ", "code3": "KAZ", "name": "Kazakhstan", "number": "398"},
    {"code": "KE", "code3": "KEN", "name": "Kenya", "number": "404"},
    {"code": "KI", "code3": "KIR", "name": "Kiribati", "number": "296"},
    {"code": "KP", "code3": "PRK", "name": "Korea (the Democratic People's Republic of)", "number": "408"},
    {"code": "KR", "code3": "KOR", "name": "Korea (the Republic of)", "number": "410"},
    {"code": "KW", "code3": "KWT", "name": "Kuwait", "number": "414"},
    {"code": "KG", "code3": "KGZ", "name": "Kyrgyzstan", "number": "417"},
    {"code": "LA", "code3": "LAO", "name": "Lao People's Democratic Republic (the)", "number": "418"},
    {"code": "LV", "code3": "LVA", "name": "Latvia", "number": "428"},
    {"code": "LB", "code3": "LBN", "name": "Lebanon", "number": "422"},
    {"code": "LS", "code3": "LSO", "name": "Lesotho", "number": "426"},
    {"code": "LR", "code3": "LBR", "name": "Liberia", "number": "430"},
    {"code": "LY", "code3": "LBY", "name": "Libya", "number": "434"},
    {"code": "LI", "code3": "LIE", "name": "Liechtenstein", "number": "438"},
    {"code": "LT", "code3": "LTU", "name": "Lithuania", "number": "440"},
    {"code": "LU", "code3": "LUX", "name": "Luxembourg", "number": "442"},
    {"code": "MO", "code3": "MAC", "name": "Macao", "number": "446"},
    {"code": "MG", "code3": "MDG", "name": "Madagascar", "number": "450"},
    {"code": "MW", "code3": "MWI", "name": "Malawi", "number": "454"},
    {"code": "MY", "code3": "MYS", "name": "Malaysia", "number": "458"},
    {"code": "MV", "code3": "MDV", "name": "Maldives", "number": "462"},
    {"code": "ML", "code3": "MLI", "name": "Mali", "number": "466"},
    {"code": "MT", "code3": "MLT", "name": "Malta", "number": "470"},
    {"code": "MH", "code3": "MHL", "name": "Marshall Islands (the)", "number": "584"},
    {"code": "MQ", "code3": "MTQ", "name": "Martinique", "number": "474"},
    {"code": "MR", "code3": "MRT", "name": "Mauritania", "number": "478"},
    {"code": "MU", "code3": "MUS", "name": "Mauritius", "number": "480"},
    {"code": "YT", "code3": "MYT", "name": "Mayotte", "number": "175"},
    {"code": "MX", "code3": "MEX", "name": "Mexico", "number": "484"},
    {"code": "FM", "code3": "FSM", "name": "Micronesia (Federated States of)", "number": "583"},
    {"code": "MD", "code3": "MDA", "name": "Moldova (the Republic of)", "number": "498"},
    {"code": "MC", "code3": "MCO", "name": "Monaco", "number": "492"},
    {"code": "MN", "code3": "MNG", "name": "Mongolia", "number": "496"},
    {"code": "ME", "code3": "MNE", "name": "Montenegro", "number": "499"},
    {"code": "MS", "code3": "MSR", "name": "Montserrat", "number": "500"},
    {"code": "MA", "code3": "MAR", "name": "Morocco", "number": "504"},
    {"code": "MZ", "code3": "MOZ", "name": "Mozambique", "number": "508"},
    {"code": "MM", "code3": "MMR", "name": "Myanmar", "number": "104"},
    {"code": "NA", "code3": "NAM", "name": "Namibia", "number": "516"},
    {"code": "NR", "code3": "NRU", "name": "Nauru", "number": "520"},
    {"code": "NP", "code3": "NPL", "name": "Nepal", "number": "524"},
    {"code": "NL", "code3": "NLD", "name": "Netherlands (the)", "number": "528"},
    {"code": "NC", "code3": "NCL", "name": "New Caledonia", "number": "540"},
    {"code": "NZ", "code3": "NZL", "name": "New Zealand", "number": "554"},
    {"code": "NI", "code3": "NIC", "name": "Nicaragua", "number": "558"},
    {"code": "NE", "code3": "NER", "name": "Niger (the)", "number": "562"},
    {"code": "NG", "code3": "NGA", "name": "Nigeria", "number": "566"},
    {"code": "NU", "code3": "NIU", "name": "Niue", "number": "570"},
    {"code": "NF", "code3": "NFK", "name": "Norfolk Island", "number": "574"},
    {"code": "MP", "code3": "MNP", "name": "Northern Mariana Islands (the)", "number": "580"},
    {"code": "NO", "code3": "NOR", "name": "Norway", "number": "578"},
    {"code": "OM", "code3": "OMN", "name": "Oman", "number": "512"},
    {"code": "PK", "code3": "PAK", "name": "Pakistan", "number": "586"},
    {"code": "PW", "code3": "PLW", "name": "Palau", "number": "585"},
    {"code": "PS", "code3": "PSE", "name": "Palestine, State of", "number": "275"},
    {"code": "PA", "code3": "PAN", "name": "Panama", "number": "591"},
    {"code": "PG", "code3": "PNG", "name": "Papua New Guinea", "number": "598"},
    {"code": "PY", "code3": "PRY", "name": "Paraguay", "number": "600"},
    {"code": "PE", "code3": "PER", "name": "Peru", "number": "604"},
    {"code": "PH", "code3": "PHL", "name": "Philippines (the)", "number": "608"},
    {"code": "PN", "code3": "PCN", "name": "Pitcairn", "number": "612"},
    {"code": "PL", "code3": "POL", "name": "Poland", "number": "616"},
    {"code": "PT", "code3": "PRT", "name": "Portugal", "number": "620"},
    {"code": "PR", "code3": "PRI", "name": "Puerto Rico", "number": "630"},
    {"code": "QA", "code3": "QAT", "name": "Qatar", "number": "634"},
    {"code": "MK", "code3": "MKD", "name": "Republic of North Macedonia", "number": "807"},
    {"code": "RO", "code3": "ROU", "name": "Romania", "number": "642"},
    {"code": "RU", "code3": "RUS", "name": "Russian Federation (the)", "number": "643"},
    {"code": "RW", "code3": "RWA", "name": "Rwanda", "number": "646"},
    {"code": "RE", "code3": "REU", "name": "Réunion", "number": "638"},
    {"code": "BL", "code3": "BLM", "name": "Saint Barthélemy", "number": "652"},
    {"code": "SH", "code3": "SHN", "name": "Saint Helena, Ascension and Tristan da Cunha", "number": "654"},
    {"code": "KN", "code3": "KNA", "name": "Saint Kitts and Nevis", "number": "659"},
    {"code": "LC", "code3": "LCA", "name": "Saint Lucia", "number": "662"},
    {"code": "MF", "code3": "MAF", "name": "Saint Martin (French part)", "number": "663"},
    {"code": "PM", "code3": "SPM", "name": "Saint Pierre and Miquelon", "number": "666"},
    {"code": "VC", "code3": "VCT", "name": "Saint Vincent and the Grenadines", "number": "670"},
    {"code": "WS", "code3": "WSM", "name": "Samoa", "number": "882"},
    {"code": "SM", "code3": "SMR", "name": "San Marino", "number": "674"},
    {"code": "ST", "code3": "STP", "name": "Sao Tome and Principe", "number": "678"},
    {"code": "SA", "code3": "SAU", "name": "Saudi Arabia", "number": "682"},
    {"code": "SN", "code3": "SEN", "name": "Senegal", "number": "686"},
    {"code": "RS", "code3": "SRB", "name": "Serbia", "number": "688"},
    {"code": "SC", "code3": "SYC", "name": "Seychelles", "number": "690"},
    {"code": "SL", "code3": "SLE", "name": "Sierra Leone", "number": "694"},
    {"code": "SG", "code3": "SGP", "name": "Singapore", "number": "702"},
    {"code": "SX", "code3": "SXM", "name": "Sint Maarten (Dutch part)", "number": "534"},
    {"code": "SK", "code3": "SVK", "name": "Slovakia", "number": "703"},
    {"code": "SI", "code3": "SVN", "name": "Slovenia", "number": "705"},
    {"code": "SB", "code3": "SLB", "name": "Solomon Islands", "number": "090"},
    {"code": "SO", "code3": "SOM", "name": "Somalia", "number": "706"},
    {"code": "ZA", "code3": "ZAF", "name": "South Africa", "number": "710"},
    {"code": "GS", "code3": "SGS", "name": "South Georgia and the South Sandwich Islands", "number": "239"},
    {"code": "SS", "code3": "SSD", "name": "South Sudan", "number": "728"},
    {"code": "ES", "code3": "ESP", "name": "Spain", "number": "724"},
    {"code": "LK", "code3": "LKA", "name": "Sri Lanka", "number": "144"},
    {"code": "SD", "code3": "SDN", "name": "Sudan (the)", "number": "729"},
    {"code": "SR", "code3": "SUR", "name": "Suriname", "number": "740"},
    {"code": "SJ", "code3": "SJM", "name": "Svalbard and Jan Mayen", "number": "744"},
    {"code": "SE", "code3": "SWE", "name": "Sweden", "number": "752"},
    {"code": "CH", "code3": "CHE", "name": "Switzerland", "number": "756"},
    {"code": "SY", "code3": "SYR", "name": "Syrian Arab Republic", "number": "760"},
    {"code": "TW", "code3": "TWN", "name": "Taiwan", "number": "158"},
    {"code": "TJ", "code3": "TJK", "name": "Tajikistan", "number": "762"},
    {"code": "TZ", "code3": "TZA", "name": "Tanzania, United Republic of", "number": "834"},
    {"code": "TH", "code3": "THA", "name": "Thailand", "number": "764"},
    {"code": "TL", "code3": "TLS", "name": "Timor-Leste", "number": "626"},
    {"code": "TG", "code3": "TGO", "name": "Togo", "number": "768"},
    {"code": "TK", "code3": "TKL", "name": "Tokelau", "number": "772"},
    {"code": "TO", "code3": "TON", "name": "Tonga", "number": "776"},
    {"code": "TT", "code3": "TTO", "name": "Trinidad and Tobago", "number": "780"},
    {"code": "TN", "code3": "TUN", "name": "Tunisia", "number": "788"},
    {"code": "TR", "code3": "TUR", "name": "Turkey", "number": "792"},
    {"code": "TM", "code3": "TKM", "name": "Turkmenistan", "number": "795"},
    {"code": "TC", "code3": "TCA", "name": "Turks and Caicos Islands (the)", "number": "796"},
    {"code": "TV", "code3": "TUV", "name": "Tuvalu", "number": "798"},
    {"code": "UG", "code3": "UGA", "name": "Uganda", "number": "800"},
    {"code": "UA", "code3": "UKR", "name": "Ukraine", "number": "804"},
    {"code": "AE", "code3": "ARE", "name": "United Arab Emirates (the)", "number": "784"},
    {"code": "GB", "code3": "GBR", "name": "United Kingdom of Great Britain and Northern Ireland (the)", "number": "826"},
    {"code": "UM", "code3": "UMI", "name": "United States Minor Outlying Islands (the)", "number": "581"},
    {"code": "US", "code3": "USA", "name": "United States of America (the)", "number": "840"},
    {"code": "UY", "code3": "URY", "name": "Uruguay", "number": "858"},
    {"code": "UZ", "code3": "UZB", "name": "Uzbekistan", "number": "860"},
    {"code": "VU", "code3": "VUT", "name": "Vanuatu", "number": "548"},
    {"code": "VE", "code3": "VEN", "name": "Venezuela (Bolivarian Republic of)", "number": "862"},
    {"code": "VN", "code3": "VNM", "name": "Viet Nam", "number": "704"},
    {"code": "VG", "code3": "VGB", "name": "Virgin Islands (British)", "number": "092"},
    {"code": "VI", "code3": "VIR", "name": "Virgin Islands (U.S.)", "number": "850"},
    {"code": "WF", "code3": "WLF", "name": "Wallis and Futuna", "number": "876"},
    {"code": "EH", "code3": "ESH", "name": "Western Sahara", "number": "732"},
    {"code": "YE", "code3": "YEM", "name": "Yemen", "number": "887"},
    {"code": "ZM", "code3": "ZMB", "name": "Zambia", "number": "894"},
    {"code": "ZW", "code3": "ZWE", "name": "Zimbabwe", "number": "716"},
    {"code": "AX", "code3": "ALA", "name": "Åland Islands", "number": "248"}
  ];

  public constructor( private organizationService : OrganizationService,
      private roleService : RoleService,
      private userService : UserService,
      private countryService: CountryService, private messageService: MessageService,
      private businessSectorService: BusinessSectorService,
      private router: Router ) { }

  ngOnInit(): void {
    this.getOrganisations();
    this.getSectors();

    this.getCountries();

    this.getAdminRole();


    this.myForm = new FormGroup({
      id: new FormControl(''),
      organizationName: new FormControl('aoc', [Validators.required]),
      organizationCode: new FormControl('cc', [Validators.required]),
      sector: new FormControl('', [Validators.required]),
      organizationEmail: new FormControl('a@a', [Validators.required, Validators.email]),
      country: new FormControl('tun',),
      region: new FormControl('tn', [Validators.required]),
      address: new FormControl('d', [Validators.required]),
      phone: new FormControl('e', [Validators.min(1),Validators.pattern('^[0-9]{8}$')]),
      status: new FormControl('s', [Validators.required]),

      directorFirstName: new FormControl('z', [Validators.pattern("[A-Za-z _àâéêèëìïîôùçæœÀÂÉÊÈËÌÏÎÔÙÛÇÆŒ-]+"),Validators.required]),
      directorLastName: new FormControl('z', [Validators.pattern("[A-Za-z _àâéêèëìïîôùçæœÀÂÉÊÈËÌÏÎÔÙÛÇÆŒ-]+"),Validators.required]),
      directorPhone: new FormControl('z', [Validators.min(1),Validators.pattern('^[0-9]{8}$')]),
      directorEmail: new FormControl('z', [Validators.email]),

      adminFirstName: new FormControl('i', [Validators.pattern("[A-Za-z _àâéêèëìïîôùçæœÀÂÉÊÈËÌÏÎÔÙÛÇÆŒ-]+"),Validators.required]),
      adminLastName : new FormControl('o', [Validators.pattern("[A-Za-z _àâéêèëìïîôùçæœÀÂÉÊÈËÌÏÎÔÙÛÇÆŒ-]+"),Validators.required]),
      adminPhone: new FormControl('12345678', [Validators.required,Validators.min(1),Validators.pattern('^[0-9]{8}$')]),
      adminEmail: new FormControl('testing@testing', [Validators.required,Validators.email]),
      username: new FormControl('', [Validators.required, usernameExistsValidator]),
      password: new FormControl('testing', [Validators.required]),
      confirmPassword: new FormControl('testing'),

      document_file: new FormControl(''),

    });

    this.editForm = new FormGroup({
      id: new FormControl(''),
      organizationName: new FormControl('', [Validators.required]),
      organizationCode: new FormControl('', [Validators.required]),
      sector: new FormControl('', [Validators.required]),
      organizationEmail: new FormControl('', [Validators.required, Validators.email]),
      country: new FormControl('',),
      region: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.min(1),Validators.pattern('^[0-9]{8}$')]),
      status: new FormControl('', [Validators.required]),

      directorFirstName: new FormControl('', [Validators.pattern("[A-Za-z _àâéêèëìïîôùçæœÀÂÉÊÈËÌÏÎÔÙÛÇÆŒ-]+"),Validators.required]),
      directorLastName: new FormControl('', [Validators.pattern("[A-Za-z _àâéêèëìïîôùçæœÀÂÉÊÈËÌÏÎÔÙÛÇÆŒ-]+"),Validators.required]),
      directorPhone: new FormControl('', [Validators.min(1),Validators.pattern('^[0-9]{8}$')]),
      directorEmail: new FormControl('', [Validators.email]),

      document_file: new FormControl(''),

    });
  }

  getOrganisations() {
    this.organizationService.getOrganizations().subscribe(
      (data) => {
        this.organizations = data;
        console.log(this.organizations);
      }
    );
  }

  getCountries(){
    this.countryService.getCountries().then(countries => {
      this.countries = countries;
  });
  }

  //get admin role from database
  getAdminRole() {
    this.roleService.getRoles().subscribe(
      (data) => {
        this.adminRole = data.find(role => role.name === 'ADMIN');
        if (this.adminRole == null) {
          this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Aucun role admin trouvé'});
        }
      }
      
    );
  }

    



  saveOrganization() {
    //touch all fields to trigger validation messages
    for(let i in this.myForm.controls) {
      this.myForm.get(i).markAsDirty();
      //print validation errors
      console.log(this.myForm.get(i).errors);
    }

    

    if(!this.myForm.valid){
      this.messageService.add({severity:'error', summary:'Erreur', detail:'Veuillez remplir tous les champs'});
      console.log(this.myForm.value);
      return;
    }




    let user : User = {
      username: this.myForm.value.username,
      password: this.myForm.value.password,
      firstName: this.myForm.value.adminFirstName,
      lastName: this.myForm.value.adminLastName,
      email: this.myForm.value.adminEmail,
      phone: this.myForm.value.adminPhone,
      roles: [this.adminRole]
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
        formData.append('country', this.myForm.get('country').value.name);
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


          },
          (error: HttpErrorResponse) => {
            this.messageService.add({severity: 'error',summary: 'Enregistrement Organisation échoué', detail:error.message ,life: 3000});
          }
        )


      },
      (error: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Enregistrement échoué', life: 3000 });
      }
    );

  }

  deleteOrganization( organization: Organization ) {
    this.deleteOrganizationDialog = true;
    this.organization = organization;
    console.log(this.organization);
  }

  confirmDelete() {
    this.deleteOrganizationDialog = false;
    this.organizationService.deleteOrganization(this.organization.id).subscribe(
      (event) => {
        this.getOrganisations();
      },
      (error: HttpErrorResponse) => {
        this.messageService.add({severity: 'error',summary: 'Enregistrement échoué', detail:error.message ,life: 5000});
      }
    );
    this.messageService.add({severity: 'success', summary: 'Succèss', detail: 'Organisation Supprimé',life: 3000});
    this.organization = {};
  }

  loadOrganization( id: number ) {
    this.router.navigate(['cpm/organizations/manage/',id]);
  }

  editOrganization( organization : Organization){

    

    this.editForm.get('id').setValue(organization.id);
    this.editForm.get('organizationName').setValue(organization.name);
    this.editForm.get('organizationCode').setValue(organization.code);
    this.editForm.get('sector').setValue(organization.sector);
    this.editForm.get('organizationEmail').setValue(organization.email);
    this.editForm.get('country').setValue(organization.country);
    this.editForm.get('region').setValue(organization.region);
    this.editForm.get('address').setValue(organization.address);
    this.editForm.get('phone').setValue(organization.phone);
    this.editForm.get('status').setValue(organization.status);
    this.editForm.get('directorFirstName').setValue(organization.directorFirstName);
    this.editForm.get('directorLastName').setValue(organization.directorLastName);
    this.editForm.get('directorPhone').setValue(organization.directorPhone);
    this.editForm.get('directorEmail').setValue(organization.directorEmail);

    console.log(organization.document );

    if(organization.document != null){
      this.documentAvailability = true;
    }else{
      this.documentAvailability = false;
    }

    this.docs = [];
    this.docs.push(organization.document);

    this.editDialog = true;

  }

  updateOrganization(){
    this.formData = new FormData();
    this.formData.append('id', this.editForm.get('id').value);
    this.formData.append('name', this.editForm.get('organizationName').value);
    this.formData.append('code', this.editForm.get('organizationCode').value);
    this.formData.append('email', this.editForm.get('organizationEmail').value);
    this.formData.append('phone', this.editForm.get('phone').value);
    this.formData.append('country', this.editForm.get('country').value);
    this.formData.append('region', this.editForm.get('region').value);
    this.formData.append('address', this.editForm.get('address').value);
    this.formData.append('status', this.editForm.get('status').value);
    this.formData.append('directorFirstName', this.editForm.get('directorFirstName').value);
    this.formData.append('directorLastName', this.editForm.get('directorLastName').value);
    this.formData.append('directorPhone', this.editForm.get('directorPhone').value);
    this.formData.append('directorEmail', this.editForm.get('directorEmail').value);

    let sectorId = this.editForm.get('sector').value.id;
    this.formData.append('sectorId', sectorId);

    console.log(this.modalDocument_file);
    if (this.modalDocument_file != null) {
      this.formData.append('document', this.modalDocument_file, this.modalDocument_file?.name);
    }

    this.organizationService.updateOrganization(this.formData).subscribe(
      (response: Organization) => {
        this.getOrganisations();
        this.messageService.add({ severity: 'success', summary: 'Succèss', detail: 'Stagiaire Enregistré', life: 3000});
      },
      (error: HttpErrorResponse) => {
        this.messageService.add({severity: 'error',summary: 'Enregistrement échoué', detail:error.message ,life: 3000});
      }
    )

    this.editDialog = false;

  }

  hideEditDialog(){
    this.editDialog = false;
    this.editForm.reset();
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

  onSelectDocument(event) {
    this.document_file = event.files[0];
    if(this.document_file.size < 10000000){
      this.myForm.get('document_file').setValue('valid');
      this.messageService.add({severity: 'info', summary: 'Success', detail: 'Ficher selectionneé'});
    }else{
      this.myForm.get('document_file').reset();
    }
  }

  onSelectModalDocument(event) {
    this.modalDocument_file = event.files[0];
    if(this.modalDocument_file.size < 10000000){
      this.editForm.get('document_file').setValue('valid');
      this.messageService.add({severity: 'info', summary: 'Success', detail: 'Ficher selectionneé'});
    }else{
      this.editForm.get('document_file').reset();
    }
  }

  onRemoveDocument() {
    this.document_file = null
    this.myForm.get('document_file').reset();
  }

  onRemoveModalDocument() {
    this.modalDocument_file = null
    this.editForm.get('document_file').reset();
  }

  onRemoveExistingDocument(){
    this.documentAvailability = false;
    this.modalDocument_file = null;
  }
}
