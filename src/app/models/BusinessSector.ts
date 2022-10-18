import { Profession } from "./Profession";

export interface BusinessSector{

    id? : number;

    name? : string;
    professions? : Array<Profession>;

}