import React, { useEffect, useState } from "react";
import { NavBar } from "./NavBar";
import { SeactBody } from "./SeactBody";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { BookingCollection } from "../api/BookingCollection";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addSeats, getAvailableSeats, getBookings, getSeats } from "./Redux/BookingSlice";

export const App = () => {
  const dispatch=useDispatch()

  const {seats} = useSelector((state) => state.seats);

  const {loading} = useTracker(() => {
    const handler = Meteor.subscribe("bookings");
    if (!handler.ready()) {
     return {loading:true}
    } else {
      // const bookings=BookingCollection.find({}).fetch();
     
      return {loading:false}
    }
  },[]);
  useEffect(()=>{
    //dispatch(getBookings())
    if(seats.length===0) {
      dispatch(getSeats())
       }
  })


  if (loading) return <span>Loading...</span>;
  return (
    <div>
      <NavBar />
      <SeactBody  seats={seats}/>
      <ToastContainer/>
    </div>
  );
};
