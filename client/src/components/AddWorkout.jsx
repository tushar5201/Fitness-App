import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const Card = styled.div`
  flex: 1;
  min-width: 280px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 14px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
  display: flex;
  flex-direction: column;
  gap: 16px;
  @media (max-width: 600px) {
    padding: 16px;
  }
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 18px;
  color: ${({ theme }) => theme.primary};
  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const AddWorkout = ({date}) => {

  const [category, setCategory] = useState();
  const [workoutName, setworkoutName] = useState();
  const [sets, setSets] = useState();
  const [reps, setReps] = useState();
  const [weight, setWeight] = useState();
  const [duration, setDuration] = useState();

  const addWorkoutHandler = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("userInfo")).data.id;
    const res = await axios.post("http://localhost:5000/api/addWorkout", { user, category, workoutName, sets, reps, weight, duration, date });
    if (res.status === 200) {
      toast.success("Added");
    } else {
      toast.error("Failed")
    }
  }

  return (
    <Card>
      <Title>Add New Workout</Title>
      <Form onSubmit={addWorkoutHandler}>
        <TextInput
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          label="Category(#)"
          placeholder="ex.#back"
        />
        <TextInput
          value={workoutName}
          onChange={(e) => setworkoutName(e.target.value)}
          label="Workout Name"
          placeholder="ex.Lat pull down"
        />
        <TextInput
          value={sets}
          onChange={(e) => setSets(e.target.value)}
          label="Sets"
          placeholder="ex.3"
        />
        <TextInput
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          label="Reps"
          placeholder="ex.15"
        />
        <TextInput
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          label="Weight"
          placeholder="ex.50kg"
        />
        <TextInput
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          label="Duration"
          placeholder="ex. 10mins"
        />

        <Button type="submit">Add Workout</Button>
      </Form>
    </Card>
  );
};

export default AddWorkout;
