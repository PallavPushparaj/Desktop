import { api, LightningElement } from 'lwc';

export default class Assignment2Child extends LightningElement {
    @api accountName;

    handleName(event){
        this.accountName = event.target.value;
    }
}