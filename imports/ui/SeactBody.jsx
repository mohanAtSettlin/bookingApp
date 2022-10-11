import React from "react";

import { SingleRow } from "./SingleRow";
import { nanoid } from "nanoid";
import {
  Alert,
  Box,
  Button,
  Chip,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Meteor } from "meteor/meteor";
import { getSeats } from "./Redux/BookingSlice";
import WeekendIcon from "@mui/icons-material/Weekend";
import { toast } from "react-toastify";

export const SeactBody = ({ seats }) => {
  const dispatch = useDispatch();
  const { bookNow } = useSelector((state) => state.seats);

  const bookSeats = () => {
    console.log(bookNow);
    if (bookNow.length === 0) {
      toast.error("No seats Selected");
      return;
    }
    Meteor.call("booking.update", bookNow, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        toast.success("Booking Successfull");
      }
      //console.log(data)
    });

    dispatch(getSeats());
  };

  return (
    <div>
      <Stack
        direction="row"
        spacing={8}
        justifyContent="center"
        alignItems="center"
      >
        <Stack direction="column" justifyContent="center" alignItems="center">
          <WeekendIcon
            fontSize="large"
            sx={{
              color: "green",
              margin: "5px",
              cursor: "pointer",
            }}
          />
          <Typography variant="caption">Available Seats</Typography>
        </Stack>
        <Stack direction="column" justifyContent="center" alignItems="center">
          <WeekendIcon
            fontSize="large"
            sx={{
              color: "red",
              margin: "5px",
              cursor: "pointer",
            }}
          />
          <Typography variant="caption"> Booked Seats</Typography>
        </Stack>
      </Stack>

      <Grid container spacing={2} sx={{ marginTop: "50px" }}>
        {seats.map((seat) => {
          return <SingleRow key={nanoid()} seat={seat} />;
        })}
      </Grid>
      {bookNow.length === 0 && 
      <Typography variant="h5" justifyContent='center' alignItems='center' textAlign='center'>
           *Select Any Seat to Book
      </Typography>
      }
      <Stack
        direction="column"
        sx={{ marginTop: "20px" }}
        justifyContent="center"
        alignItems="center"
      >
       
        {bookNow.length !== 0 && (
          <>
            <Typography variant="h6" mt={10}>
              Selected Seats
            </Typography>

            <Stack
              direction="row"
              spacing={4}
              sx={{
                padding: "10px",
                borderRadius: "15px",
                marginTop: "10px",
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
              }}
            >
              {bookNow.map((eachSeat) => {
                return (
                  <Chip
                    key={nanoid()}
                    color="success"
                    label={eachSeat.seatNumber}
                  />
                );
              })}
            </Stack>
            <Button
            sx={{marginTop:"10px"}}
          color="warning"
          variant="contained"
          onClick={() => {
            // console.log("booking",bookNow);
            bookSeats();
            // Cookies.remove("inQueue");
          }}
        >
          Book Seats
        </Button>
            <Typography variant="caption" >
              Press Book to Confirm the seats
            </Typography>

          </>
        )}
      </Stack>
    </div>
  );
};
