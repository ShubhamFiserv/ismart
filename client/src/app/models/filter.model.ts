/**
 * Model class for filtering attributes for payments
 */
export class FilterModel {
    frequency:string;
    month:string ;
    category:string; 
    static instance:FilterModel = null;
    
    constructor(frequency?:string,month?:string,category?:string){
        this.frequency = frequency || 'Current',
        this.month = month || 'NA';
        this.category = category || "Misc"
    }

    static getInstance(): FilterModel {
        if(!this.instance){
            this.instance = new FilterModel();
        }
        return this.instance;
    }
}