import { api, LightningElement } from 'lwc';

export default class HotelRoom extends LightningElement {

    @api
    hotelRoomInfo = {roomName:'A-00', roomCapacity:2}

    @api
    showRoomInfo
}