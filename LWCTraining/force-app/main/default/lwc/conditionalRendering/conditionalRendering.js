import { LightningElement, track } from 'lwc';

export default class ConditionalRendering extends LightningElement {
    displayDiv = false;

    @track
    cityList = ["pune","delhi","pune"]
    changeHandler(evt){
        this.displayDiv = evt.target.checked
    }
    handleClick(){
        this.cityList[1] = "chennai"
    }
}