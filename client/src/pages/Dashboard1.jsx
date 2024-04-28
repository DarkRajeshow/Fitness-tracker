import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { counts } from "../utils/data";
import CountsCard from "../components/cards/CountsCard";
import WeeklyWorkoutStatCard from "../components/cards/WeeklyWorkoutStatCard";
import CategoryChart from "../components/cards/CategoryChart";
import WorkoutCard from "../components/cards/WorkoutCard";
import { addWorkout, getDashboardDetails, getWorkouts } from "../api";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"

const Card = styled.div`
  flex: 1;
  min-width: 280px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 14px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
  display: flex;
  flex-direction: column;
  gap: 6px;
  @media (max-width: 600px) {
    padding: 16px;
  }
`;
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
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;
const Title = styled.div`
  padding: 0px 16px;
  font-size: 22px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 600;
`;
const FlexWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 22px;
  padding: 0px 16px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;
const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 16px;
  gap: 22px;
  padding: 0px 16px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const Dashboard1 = () => {
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [data, setData] = useState();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [todaysWorkouts, setTodaysWorkouts] = useState([]);
  const [workout, setWorkout] = useState({
    category: "",
    workoutName: "",
    sets: "",
    reps: "",
    weight: "",
    duration: ""
  });

  const dashboardData = async () => {
    setLoading(true);
    const token = localStorage.getItem("fittrack-app-token");
    await getDashboardDetails(token).then((res) => {
      setData(res.data);
      console.log(res.data);
      setLoading(false);
    });
  };

  const getTodaysWorkout = async () => {
    setLoading(true);
    const token = localStorage.getItem("fittrack-app-token");
    await getWorkouts(token, "").then((res) => {
      setTodaysWorkouts(res?.data?.todaysWorkouts);
      console.log(res.data);
      setLoading(false);
    });
  };

  const handleInputChange = (e) => {
    const keyName = e.target.name;
    const keyValue = e.target.value;

    setWorkout((workout) => ({
      ...workout,
      [keyName]: keyValue
    }));
  }


  const addNewWorkout = async (e) => {

    e.preventDefault();
    setButtonLoading(true);
    const token = localStorage.getItem("fittrack-app-token");
    await addWorkout(token, workout)
      .then((res) => {
        dashboardData();
        getTodaysWorkout();
        setButtonLoading(false);
      })
      .catch((err) => {
        setButtonLoading(false);
        alert(err);
      });

    setDialogOpen(false);
  };

  useEffect(() => {
    dashboardData();
    getTodaysWorkout();
  }, []);
  return (
    <Container>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-gray-100 p-8 py-10 max-h-[500px] overflow-auto">
          <DialogTitle className="mb-2 text-2xl">Add Workout</DialogTitle>
          <form onSubmit={addNewWorkout} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm">Muscle Group</label>
              <input required value={workout.category} onChange={handleInputChange} name="category" className="text-sm px-4 py-2.5 rounded-md outline-none focus:outline-green-300" type="text" placeholder="e.g Chest" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm">Name of Workout</label>
              <input required value={workout.workoutName} onChange={handleInputChange} name="workoutName" className="text-sm px-4 py-2.5 rounded-md outline-none focus:outline-green-300" type="text" placeholder="e.g Bench press" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm">No. of Sets</label>
              <input required value={workout.sets} onChange={handleInputChange} name="sets" className="text-sm px-4 py-2.5 rounded-md outline-none focus:outline-green-300" type="number" placeholder="e.g 3" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm">No. of Reps per set</label>
              <input required value={workout.reps} onChange={handleInputChange} name="reps" className="text-sm px-4 py-2.5 rounded-md outline-none focus:outline-green-300" type="number" placeholder="e.g 12" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm">Weight per reps (kg)</label>
              <input required value={workout.weight} onChange={handleInputChange} name="weight" className="text-sm px-4 py-2.5 rounded-md outline-none focus:outline-green-300" type="number" placeholder="e.g 50" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm">Duration (in minutes)</label>
              <input required value={workout.duration} onChange={handleInputChange} name="duration" className="text-sm px-4 py-2.5 rounded-md outline-none focus:outline-green-300" type="number" placeholder="e.g 15" />
            </div>

            <button type="submit" className="addWorkoutBtn mt-4 flex gap-2 justify-center items-center" >
              {
                buttonLoading && (
                  <span className="animate-spin h-5 w-5 rounded-full border-2 border-white border-t-transparent"></span>
                )
              }
              Add
            </button>
          </form>
        </DialogContent>
        <Wrapper>
          <Title>Calories Burned Statistics</Title>
          <FlexWrap>
            {counts.map((item) => (
              <CountsCard loading={loading} item={item} data={data} />
            ))}
          </FlexWrap>

          <FlexWrap>
            <WeeklyWorkoutStatCard loading={loading} data={data} />
            <CategoryChart loading={loading} data={data} />
            <Card>
              <h1 id="addWorkoutTitle">Add Workout</h1>
              <img id="addWorkoutImg" src="workout.jpg" alt="" />
              <DialogTrigger className="addWorkoutBtn">Add Workout</DialogTrigger>
            </Card>
          </FlexWrap>

          <Section>
            <Title>Todays Workouts</Title>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
              {todaysWorkouts.map((workout) => (
                <WorkoutCard workout={workout} />
              ))}
            </div>
          </Section>
        </Wrapper>
      </Dialog>
    </Container>
  );
};

export default Dashboard1;
