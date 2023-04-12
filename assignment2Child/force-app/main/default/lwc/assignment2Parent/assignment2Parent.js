/* eslint-disable @lwc/lwc/no-api-reassignments */
import { LightningElement, wire, track, api } from 'lwc';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import TYPE_FIELD from "@salesforce/schema/Account.Type";
import INDUSTRY_FIELD from "@salesforce/schema/Account.Industry";
import getAccountList from "@salesforce/apex/accountHelper.getAccountList";
import insertAccount from "@salesforce/apex/accountHelper.insertAccount";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const cols = [
    { label: "Name", fieldName: "Name", type: "Text" },
    { label: "Type", fieldName: "Type", type: "Text" },
    { label: "Industry", fieldName: "Industry", type: "Text" }
]

export default class Assignment2Parent extends LightningElement {
    
    @api accountTypeValue
    @api industryValue
    @api accName
    accountTypes = []
    industries = []
    @api flag = false
    columns = cols
    accounts = []

    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    accountObjectMetadata;
    @wire(getPicklistValues, {
        recordTypeId: "$accountObjectMetadata.data.defaultRecordTypeId",
        fieldApiName: TYPE_FIELD
    })
    accountTypePicklist({ error, data }) {
        if (data) {
            console.log("Picklist  data", JSON.stringify(data));
            console.log("Picklist values Type", data.values);
            console.log("Picklist values Type string", JSON.stringify(data.values));
            this.accountTypes = data.values;
        } else {
            console.log(error);
        }
    }

    @wire(getPicklistValues, {
        recordTypeId: "$accountObjectMetadata.data.defaultRecordTypeId",
        fieldApiName: INDUSTRY_FIELD
    })
    industryFieldPicklist({ error, data }) {
        if (data) {
            console.log("Picklist  data", JSON.stringify(data));
            console.log("Picklist values Industry", data.values);
            console.log("Picklist values Industry string", JSON.stringify(data.values));
            this.industries = data.values;
        } else {
            console.log(error);
        }
    }

    handleAccountType(event) {
        this.accountTypeValue = event.target.value;
    }

    handleAccountIndustry(event) {
        this.industryValue = event.target.value;
    }

    handleSave() {
        const an = this.template.querySelector('c-assignment-2-child');
        this.accName = an.accountName;
        console.log(this.accName);
        this.accountInsert();
        
    }

    accountInsert() {
        insertAccount({ name: this.accName, type: this.accountTypeValue, industry: this.industryValue })
            .then((result) => {
                
                if (result) {
                    // this.fireSuccessToast();
                    const evt = new ShowToastEvent({
                        title: "Sucess",
                        message: this.accName + this.accountTypeValue + " is inserted!",
                        variant: "success"
                    });

                    this.dispatchEvent(evt);
                    // refreshApex(this.fetchAccounts);
                } else {
                    console.log("First name was NOT updated");
                }
            })
            .catch((error) => {
                console.log("error: ", error);
            });
        
    }

    displayAccounts() {
        // console.log("displayacc");
        this.flag = true;
        console.log("fetch accounts data:", this.accounts);
        console.log("Picklist values Industry string", JSON.stringify(this.accounts))
        this.fetchAccounts();
    }

    @wire(getAccountList) 
    fetchAccounts({ data, error }) {
        if (data) {
            this.accounts = data;
            console.log("fetch accounts data:", this.accounts);
            console.log("Picklist values Industry string", JSON.stringify(this.accounts))
        } else console.log(error);
    }
}