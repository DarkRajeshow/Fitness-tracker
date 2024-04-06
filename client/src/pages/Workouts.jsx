import React, { useEffect, useState } from "react";
import styled from "styled-components";
import WorkoutCard from "../components/cards/WorkoutCard";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers";
import { getWorkouts } from "../api";
import { CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";

const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 22px 0px;
  overflow-y: scroll;
`;
const Wrapper = styled.div`
  flex: 1;
  max-width: 1600px;
  display: flex;
  gap: 22px;
  padding: 0px 16px;
  @media (max-width: 600px) {
    gap: 12px;
    flex-direction: column;
  }
`;
const Left = styled.div`
  flex: 0.2;
  height: fit-content;
  padding: 18px;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 14px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
`;
const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.primary};
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;
const Right = styled.div`
  flex: 1;
`;

const SecTitle = styled.div`
  font-size: 22px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
`;

const Workouts = () => {
  const dispatch = useDispatch();
  const [todaysWorkouts, setTodaysWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState("");

  const getTodaysWorkout = async () => {
    setLoading(true);
    const token = localStorage.getItem("fittrack-app-token");
    await getWorkouts(token, date ? `?date=${date}` : "").then((res) => {
      setTodaysWorkouts(res?.data?.todaysWorkouts);
      console.log(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getTodaysWorkout();
  }, [date]);
  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-[90%] m-auto">
        <Left>
          <Title>Select Date</Title>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              onChange={(e) => setDate(`${e.$M + 1}/${e.$D}/${e.$y}`)}
            />
          </LocalizationProvider>
        </Left>
        <Right>
          <SecTitle>Todays Workout</SecTitle>
          {loading ? (
            <CircularProgress />
          ) : (
            <div className="my-2">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4" >
                {todaysWorkouts.map((workout) => (
                  <WorkoutCard workout={workout} />
                ))}

              </div>
              {
                todaysWorkouts.length === 0 && (
                  <div className="flex items-center justify-center w-full sm:h-[350px] h-full bg-zinc-50 rounded-md">
                    You haven't performed any exercises on the selected date.
                  </div>
                )
              }
            </div>
          )}
        </Right>
      </div>
    </Container>
  );
};

export default Workouts;
