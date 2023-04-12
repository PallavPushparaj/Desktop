import { api, LightningElement } from 'lwc';

export default class TodoItem extends LightningElement {

    @api
    itemName = "default"
    @api
    showTodo = false
}