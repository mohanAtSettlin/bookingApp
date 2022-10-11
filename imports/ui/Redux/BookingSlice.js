import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie'
import { BookingCollection } from "../../api/BookingCollection";
import {Meteor} from 'meteor/meteor'

// const seatsInQueue=Cookies.get('inQueue') && JSON.parse(Cookies.get('inQueue'))
// console.log(seatsInQueue)
export const getSeats = createAsyncThunk("seats/booking", async () => {
   
    const seats = await new Promise((resolve, reject) =>
    Meteor.call("booking.data", (error, result) => {
      if (error) return reject(error);
      resolve(result);
    })
  );
   
    return seats
  });


const initialState={
    seats:[],
    bookNow: [],
    availableSeats:[],
}

const bookingSlice=createSlice({
    name:'bookings',
    initialState,
    reducers:{
        addSeats:(state,action)=>{
            //console.log(action.payload);
            let BookingSeat=action.payload;
            let isSeatAvailable= state.availableSeats.find((availableSeat)=>availableSeat._id===BookingSeat._id);
            //console.log(isSeatAvailable)
            if(isSeatAvailable){
                let inBookNow=state.bookNow.find((bookedSeat)=>bookedSeat._id===BookingSeat._id);
                if(inBookNow){
                    // in the Queue then Remove
                    console.log("firsrrsr")
                    state.bookNow=state.bookNow.filter((element)=>element._id!==BookingSeat._id);

                    state.seats=state.seats.map((eachSeat)=>{
                        if(eachSeat._id===action.payload._id){
        
                            let newSeat={...eachSeat,status:true};
                            return newSeat
                        }else return eachSeat
                    })
                }else{
                    //not in the Queue add it
                    state.bookNow=[...state.bookNow,{...BookingSeat,status:false}];
                   // Cookies.set('inQueue',JSON.stringify( state.bookNow))
                    state.seats=state.seats.map((eachSeat)=>{
                        if(eachSeat._id===action.payload._id){
        
                            let newSeat={...eachSeat,status:false};
                            return newSeat
                        }else return eachSeat
                    })
                }
            }
           
        },
        getBookings:(state)=>{
            
           
            //console.log(seats)
        },
        getAvailableSeats:(state,action)=>{
            state.availableSeats=action.payload;
        },
        bookSeatsFinal:(state)=>{
           // state.bookNow=[]
        }

    },
    extraReducers: (builder) => {
        builder.addCase(getSeats.fulfilled, (state, action) => {
      
            console.log(action.payload)
            state.seats=action.payload

            let availableSeat=action.payload.filter((element)=> element.status===true)

            state.availableSeats=availableSeat
            state.bookNow=[];
            
        });
      },
})


export const {addSeats,getBookings,getAvailableSeats,bookSeatsFinal}=bookingSlice.actions
export default bookingSlice.reducer;