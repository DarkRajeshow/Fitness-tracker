import {
  LocalFireDepartment,
  FitnessCenter,
  Timeline,
  WhatshotRounded,
  RestaurantMenuRounded
} from "@mui/icons-material";


export const counts = [
  {
    name: "Calories Burned",
    icon: (
      <LocalFireDepartment sx={{ color: "inherit", fontSize: "26px" }} />
    ),
    desc: "Total calories burned today",
    key: "totalCaloriesBurnt",
    unit: "kcal",
    color: "#eb9e34",
    lightColor: "#FDF4EA",
  },
  {
    name: "Workouts",
    icon: <FitnessCenter sx={{ color: "inherit", fontSize: "26px" }} />,
    desc: "Total no of workouts for today",
    key: "totalWorkouts",
    unit: "",
    color: "#41C1A6",
    lightColor: "#E8F6F3",
  },
  {
    name: "Average  Calories Burned",
    icon: <Timeline sx={{ color: "inherit", fontSize: "26px" }} />,
    desc: "Average Calories Burned on each workout",
    key: "avgCaloriesBurntPerWorkout",
    unit: "kcal",
    color: "#FF9AD5",
    lightColor: "#FEF3F9",
  },
];


export const dietCounts = [
  {
    name: "Total Calories Intake",
    icon: (
      <WhatshotRounded sx={{ color: "inherit", fontSize: "26px" }} />
    ),
    desc: "Total calories intake today",
    key: "totalCaloriesIntake",
    unit: "kcal",
    color: "#eb9e34",
    lightColor: "#FDF4EA",
  },
  {
    name: "Total Food Items",
    icon: <RestaurantMenuRounded sx={{ color: "inherit", fontSize: "26px" }} />,
    desc: "Total number of food items consumed today",
    key: "totalFoodItems",
    unit: "",
    color: "#41C1A6",
    lightColor: "#E8F6F3",
  },
  {
    name: "Average Calories Per Food Item",
    icon: <Timeline sx={{ color: "inherit", fontSize: "26px" }} />,
    desc: "Average calories consumed per food item",
    key: "avgCaloriesPerFoodItem",
    unit: "kcal",
    color: "#FF9AD5",
    lightColor: "#FEF3F9",
  },
];