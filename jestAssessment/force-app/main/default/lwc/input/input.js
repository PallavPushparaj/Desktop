import {  api, LightningElement,track } from 'lwc';
import fetchAccountsList from "@salesforce/apex/accountHelper.fetchAccountsList";

const ACCOUNT_COLS = [
    { label: "Account Name", type: "Text", fieldName: "Name" },
    { label: "Account Type", type: "Text", fieldName: "Type" },
    { label: "Account Industry", type: "Text", fieldName: "Industry" }
  ];

export default class Input extends LightningElement {
    @track flag = false
    @api names = []
    @api accountName
    @track showTableFlag = false
    cols = ACCOUNT_COLS;

    handleEdit(){
        this.flag = true
    }

    connectedCallback() {
        this.loadAccounts()
      }

      loadAccounts() {
        fetchAccountsList()
            .then((result) => {
                this.names = result.map((account) => ({
                    label: account.Name,
                    value: account.Name,
                }));
                this.accountName = this.names[0].value; // Set the value of the selected option to the first item in the names array
                console.log('Names:', this.names);
                console.log('Account name:', this.accountName);
            })
            .catch((error) => {
                console.log(error);
            });
    }

      handleAccountNames(event){
        this.accountName = event.target.value
      }      


      displayAccounts(){
        this.showTableFlag = true;
    }
}