import { BookingCollection } from "./BookingCollection";
import {Meteor} from 'meteor/meteor';

Meteor.methods({
    'booking.update'(body){
        console.log(body)
        body.forEach(element => {
          
          BookingCollection.update(element._id,{
              $set: {
                status:element.status
              }
            })
        });
    },
    'booking.data'(){
        let seats=BookingCollection.find({}).fetch();
        return seats
     // });
  }
})
