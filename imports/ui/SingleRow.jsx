import React from "react";
import { nanoid } from "nanoid";
import WeekendIcon from "@mui/icons-material/Weekend";
import { Grid, Stack, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { addSeats } from "./Redux/BookingSlice";

export const SingleRow = ({ seat }) => {
  const dispatch = useDispatch();
  //console.log("seat", seat);
  return (
    <>
      {/* <Stack
        direction="row"
        justifyContent="center"
        alignContent="center"
        spacing={4}
      >
        <Typography variant="h5">{rowName}</Typography>
        <Stack direction="row">
          {row.map((seat, i) => {
            return (
             
            );
          })}
        </Stack>
      </Stack> */}
      <Grid item xs={2} md={3} lg={3} justifyContent="center" alignItems="center">
        <Stack direction="column" justifyContent="center" alignItems="center">
          <WeekendIcon
            fontSize="large"
            sx={{
              color: seat.status ? "green" : "red",
             
              margin: "5px",
              cursor:"pointer"
            }}
            onClick={() => {
              console.log("first");
              
              dispatch(addSeats(seat));
            }}
          />
          <Typography variant="caption"> {seat.seatNumber}</Typography>
        </Stack>
      </Grid>
    </>
  );
};
