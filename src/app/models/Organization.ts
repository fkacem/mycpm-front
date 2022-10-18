import { BusinessSector } from "./BusinessSector";
import { CustomFile } from "./CustomFile";
import { User } from "./User";

export interface Organization{

    id? : number;
    name? : String;
    code? : String;
    sector? : BusinessSector;
    email? : String;
    country? : String;
    region? : String;
    address? : String;
    phone? : String;
    status? : Boolean;

    directorFirstName? : String;
    directorLastName? : String;
    directorPhone? : String;
    directorEmail? : String;
    
    document? : CustomFile;
    logo? : CustomFile;

    admin? : User;
    
}