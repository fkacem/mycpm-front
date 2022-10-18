import { Organization } from "./Organization";
import { Role } from "./Role";

export interface User{
    id? : number;

    // account information
    username? : String;
    password? : String;
    isActive? : boolean;
    
    // personal information
    firstName? : String;
    lastName? : String;
    gender? : String;
    dob? : Date;
    email? : String;
    phone? : String;
    address? : String;

    organization? : Organization;

    roles?:Role[];
}