import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers";
import { getDiets } from "../api";
import { CircularProgress } from "@mui/material";
import FoodCard from "../components/cards/FoodCard";

const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 22px 0px;
  overflow-y: scroll;
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

const Diets = () => {
  const [todaysDiets, setTodaysDiets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState("");

  const getTodaysWorkout = useCallback(async () => {
    setLoading(true);
    const token = localStorage.getItem("fittrack-app-token");
    await getDiets(token, date ? `?date=${date}` : "").then((res) => {
      setTodaysDiets(res?.data?.todayDiets);
      console.log(res.data);
      setLoading(false);
    });
  }, [date])

  useEffect(() => {
    getTodaysWorkout();
  }, [date, getTodaysWorkout]);

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
          <SecTitle>Your Diet History.</SecTitle>
          {loading ? (
            <div className="flex bg-gray-50 rounded-2xl my-2 items-center justify-center sm:h-[350px] h-full w-full">
              <CircularProgress />
            </div>
          ) : (
            <div className="my-2">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4" >
                {todaysDiets.map((food) => (
                  <FoodCard food={food} />
                ))}
              </div>
              {
                todaysDiets.length === 0 && (
                  <div className="flex items-center justify-center w-full sm:h-[350px] h-full bg-zinc-50 rounded-md">
                    It seems like you haven't added any food items for the selected day.
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

export default Diets;
