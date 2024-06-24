import {
  FitnessCenterRounded,
  // LocalFireDepartmentRounded,
  TimelineRounded,
} from "@mui/icons-material";

export const counts = [
  // {
  //   name: "Calories Consumed",
  //   icon: <LocalFireDepartmentRounded sx={{ fontSize: "26px", color: "inherit" }} />,
  //   desc: "Total calories consumed today",
  //   key: "totalCaloriesBurnt",
  //   unit: "kcal",
  //   color: "#eb9e34",
  //   lightColor: "#FDF4EA",
  // },
  {
    name: "Average Calories Burned",
    icon: <TimelineRounded sx={{ fontSize: "26px", color: "inherit" }} />,
    desc: "Average calories burned per workout",
    key: "avgCaloriesBurntPerWorkout",
    unit: "kcal",
    color: "#FF9AD5",
    lightColor: "#FEF3F9",
  },
  {
    name: "Workouts",
    icon: <FitnessCenterRounded sx={{ fontSize: "26px", color: "inherit" }} />,
    desc: "Total number of workouts today",
    key: "totalWorkouts",
    unit: "",
    color: "#41C1A6",
    lightColor: "#E8F6F3",
  },

];

