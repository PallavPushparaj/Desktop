import { LightningElement } from 'lwc';

export default class HotelRooms extends LightningElement {
    hotelRoomsInfo = [
        {roomName:'A-01', roomCapacity:4},
        {roomName:'A-02', roomCapacity:2},
        {roomName:'B-01', roomCapacity:4},
        {roomName:'B-02', roomCapacity:2},
        {roomName:'C-01', roomCapacity:4},
        {roomName:'C-02', roomCapacity:2}
    ]
}