import { BookingCollection } from "./BookingCollection";
import {Meteor} from 'meteor/meteor';

Meteor.publish('bookings',function publishBooking(){
    return BookingCollection.find({})
})