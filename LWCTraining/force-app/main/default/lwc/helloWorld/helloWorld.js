import { LightningElement } from 'lwc';

export default class HelloWorld extends LightningElement {
    message = "World !!"

    handleChange(evt){
        this.message = evt.target.value
    }

}