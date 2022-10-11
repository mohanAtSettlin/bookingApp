import { Meteor } from "meteor/meteor";
import { LinksCollection } from "/imports/api/links";
import { BookingCollection } from "./../imports/api/BookingCollection";
import './../imports/api/PublishBooking';
import './../imports/api/BookingMethods';

function insertLink({ title, url }) {
  LinksCollection.insert({ title, url, createdAt: new Date() });
}

let seats = [
 { seatNumber: "A1" ,status:true}, { seatNumber: "A2",status:true }, { seatNumber: "A3",status:true }, { seatNumber: "A4",status:true },
  { seatNumber: "B1",status:true }, { seatNumber: "B2" ,status:true}, { seatNumber: "B3",status:true }, { seatNumber: "B4",status:true },
  { seatNumber: "C1",status:true }, { seatNumber: "C2" ,status:true}, { seatNumber: "C3",status:true }, { seatNumber: "C4",status:true }
];
Meteor.startup(() => {
  // If the Links collection is empty, add some data.
 //BookingCollection.remove({})
 
  if(BookingCollection.find().count() === 0){
    seats.forEach((e)=>{
      BookingCollection.insert(e)
    })
  }
});
