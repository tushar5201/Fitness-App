import React, { useEffect, useReducer } from "react";
import styled from "styled-components";
import AddWorkout from "../components/AddWorkout";
import WorkoutCard from "../components/cards/WorkoutCard";
import CaloriesCard from "../components/cards/CaloriesCard";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import { getError } from "../utils/utils";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

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
  font-weight: 500;
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
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-bottom: 100px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, workout: action.payload };
    case 'FETCH_FAILED':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

const Dashboard = () => {
  const [{ loading, error, workout }, dispatch] = useReducer((reducer), {
    loading: true,
    error: '',
    workout: []
  });

  const today = new Date();
  const date = today.getDate() + "-" + ((today.getMonth() )+ 1) + "-" + today.getFullYear();

  const user = (JSON.parse(localStorage.getItem('userInfo'))).data.id;

  useEffect(() => {
    const getTodaysWorkout = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const res = await axios.get(`http://localhost:5000/api/getWorkout/${date}/${user}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: res.data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAILED', payload: getError(error) });
      }
    }
    getTodaysWorkout();
  }, [date, user]);

  return (
    <Container>
      <Wrapper>
        <Title>Dashboard</Title>

        <FlexWrap>
          <CaloriesCard />
        </FlexWrap>

        <Section>
          <Title>Todays Workouts</Title>
          <Row>
            <Col md={9}>
              {loading ? <LoadingBox /> : error ? <MessageBox>{error}</MessageBox> : (
                <CardWrapper>
                  {workout.data.map((workout) => (
                    <WorkoutCard key={workout.id} workout={workout} />
                  ))}
                </CardWrapper>
              )}
            </Col>
            <Col md={3}>
              <AddWorkout date={date} />
            </Col>
          </Row>
        </Section>
      </Wrapper>
    </Container>
  );
};

export default Dashboard;
