import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CountsCard from "../components/cards/CountsCard";
import WeeklyDietStatCard from "../components/cards/WeeklyDietStatCard";
import CategoryChart from "../components/cards/CategoryChart";
import { addDiet, getDashboard2Details, getDiets } from "../api";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import FoodCard from "../components/cards/FoodCard";
import { dietCounts } from "../utils/data";

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

const Dashboard2 = () => {
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [data, setData] = useState();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [todaysFoodIntake, setTodaysFoodIntake] = useState([]);
  const [diet, setDiet] = useState({
    foodName: "",
    quantity: "",
    caloriesPerUnit: ""
  });

  const dashboard2Data = async () => {
    setLoading(true);
    const token = localStorage.getItem("fittrack-app-token");
    await getDashboard2Details(token).then((res) => {
      setData(res.data);
      console.log(res.data);
      setLoading(false);
    });
  };


  const getTodaysFoodIntake = async () => {
    setLoading(true);
    const token = localStorage.getItem("fittrack-app-token");
    await getDiets(token, "").then((res) => {
      setTodaysFoodIntake(res?.data?.todayDiets);
      console.log(res.data);
      setLoading(false);
    });
  };


  const handleInputChange = (e) => {
    const keyName = e.target.name;
    const keyValue = e.target.value;

    setDiet((diet) => ({
      ...diet,
      [keyName]: keyValue
    }));
  }


  const addNewDiet = async (e) => {
    e.preventDefault();
    setButtonLoading(true);
    const token = localStorage.getItem("fittrack-app-token");
    await addDiet(token, diet)
      .then((res) => {
        dashboard2Data();
        getTodaysFoodIntake();
        setButtonLoading(false);
      })
      .catch((err) => {
        setButtonLoading(false);
        alert(err);
      });

    setDialogOpen(false);
  };

  useEffect(() => {
    dashboard2Data();
    getTodaysFoodIntake();
  }, []);


  return (
    <Container>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-gray-100 p-8 py-10 max-h-[500px] overflow-auto">
          <DialogTitle className="mb-2 text-2xl">Add diet</DialogTitle>
          <form onSubmit={addNewDiet} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm">Food Name</label>
              <input required value={diet.foodName} onChange={handleInputChange} name="foodName" className="text-sm px-4 py-2.5 rounded-md outline-none focus:outline-green-300" type="text" placeholder="e.g Chicken Breast" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm">Quantity (grams)</label>
              <input required value={diet.quantity} onChange={handleInputChange} name="quantity" className="text-sm px-4 py-2.5 rounded-md outline-none focus:outline-green-300" type="number" placeholder="e.g 100" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm">Calories per Unit</label>
              <input required value={diet.caloriesPerUnit} onChange={handleInputChange} name="caloriesPerUnit" className="text-sm px-4 py-2.5 rounded-md outline-none focus:outline-green-300" type="number" placeholder="e.g 200" />
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
          <Title>Calories Intake Statistics</Title>
          <FlexWrap>
            {dietCounts.map((item) => (
              <CountsCard loading={loading} item={item} data={data} />
            ))}
          </FlexWrap>

          <FlexWrap>
            <WeeklyDietStatCard loading={loading} data={data} />
            <CategoryChart loading={loading} data={data} />
            <Card>
              <h1 id="addWorkoutTitle">Add Diet</h1>
              <img id="addWorkoutImg" src="diet.jpg" alt="" />
              <DialogTrigger className="addWorkoutBtn">Add Diet</DialogTrigger>
            </Card>
          </FlexWrap>

          <Section>
            <Title>Todays Diets</Title>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
              {todaysFoodIntake.map((food) => (
                <FoodCard food={food} />
              ))}
            </div>
          </Section>
        </Wrapper>
      </Dialog>
    </Container>
  );
};

export default Dashboard2;
