import { Attachment } from "./Attachment";
import { Item } from "./Item";

export interface ItemRealised{

    id? : number;
    quantity? : number;
    attachment? : Attachment;
    item? : Item;
}