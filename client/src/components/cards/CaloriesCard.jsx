import { LocalFireDepartmentRounded } from "@mui/icons-material";
import { Gauge } from '@mui/x-charts/Gauge';
import { useContext } from "react";
import styled from "styled-components";
import { FoodCalories } from "../../Context/foodContext";
import { Col, Container, Row } from "react-bootstrap";
import { LinearProgress, Typography } from "@mui/material";

const Card = styled.div`
  flex: 1;
  max-width: 500px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 14px;
  display: flex;
  gap: 16px;
  // box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  @media (max-width: 600px) {
    padding: 16px;
    gap: 12px;
  }
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  @media (max-width: 600px) {
    gap: 6px;
  }
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 2rem;
  color: ${({ theme }) => theme.primary};
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

const Value = styled.div`
  font-weight: 600;
  font-size: 32px;
  display: flex;
  align-items: flex-end;
  gap: 8px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 600px) {
    font-size: 22px;
  }
`;

const Unit = styled.div`
  font-size: 14px;
  margin-bottom: 8px;
`;

const Span = styled.div`
  margin-bottom: 8px;
  font-weight: 500;
  font-size: 16px;
  @media (max-width: 600px) {
    font-size: 12px;
  }
  ${({ positive, theme }) =>
    positive
      ? `color: ${theme.black};`
      : `color: ${theme.red};`}
`;

const Icon = styled.div`
  height: fit-content;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  ${({ color, bg }) => `
    background: ${bg};
    color: ${color};
  `}
`;

const Desc = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary + 90};
  margin-bottom: 6px;
  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

const CaloriesCard = () => {
  // const nutritions = useContext(FoodCalories);
  const nutritions = JSON.parse(localStorage.getItem("nutritions"))
  let calories = 0, protein = 0, carbohydrate = 0, cholestrol = 0, fat = 0, fiber = 0, sodium = 0, sugar = 0;

  if (nutritions.length > 0) {
    nutritions.forEach(nut => {
      calories += nut.calories
      protein += nut.protein_g
      carbohydrate += nut.carbohydrates_total_g
      cholestrol += nut.cholesterol_mg
      fat += nut.fat_total_g
      fiber += nut.fiber_g
      sodium += nut.sodium_mg
      sugar += nut.sugar_g
    });
  }

  return (
    <Row>
      <Col>
        <Card>
          <Left>
            <Title>Calories Intake</Title>
            <Value>
              {/* {calories} */}
              <Gauge width={300} height={300} value={calories} valueMax={2000} />
              <Unit>kcal</Unit>
              <Span positive={true}>/2000</Span>
            </Value>
            <Desc>Total calories consumed today<br /> <span style={{ color: "red" }}>*Average calories intake per day is 2000</span></Desc>
          </Left>
          <Icon color={"#eb9e34"} bg={"#FDF4EA"}>
            <LocalFireDepartmentRounded sx={{ fontSize: "2rem", color: "inherit" }} />
          </Icon>
        </Card>
      </Col>
      <Col style={{ marginLeft: "50px" }}>
        <Title>Nutritions</Title>
        <Container style={{ width: "300%" }}>
          <Value style={{ fontSize: "25px" }}>Protein</Value>
          <LinearProgress variant="buffer" width="500px" value={(protein/60)*100} valueBuffer={100} />
          <Typography variant="body2" color="text.secondary">{protein} /60</Typography>

          <Value style={{ fontSize: "25px" }}>Carbohydrate</Value>
          <LinearProgress variant="buffer" width="500px" value={(carbohydrate/250)*100} color="success" valueBuffer={100} />
          <Typography variant="body2" color="text.secondary">{carbohydrate} /250</Typography>

          <Value style={{ fontSize: "25px" }}>Cholesterol</Value>
          <LinearProgress variant="buffer" width="500px" value={(cholestrol/300)*100} color="secondary" valueBuffer={100} />
          <Typography variant="body2" color="text.secondary">{cholestrol} /300</Typography>

          <Value style={{ fontSize: "25px" }}>Fat</Value>
          <LinearProgress variant="buffer" width="500px" value={(fat/50)*100} valueBuffer={100} />
          <Typography variant="body2" color="text.secondary">{fat} /50</Typography>

          <Value style={{ fontSize: "25px" }}>Fiber</Value>
          <LinearProgress variant="buffer" width="500px" color="success" value={(fiber/30)*100} valueBuffer={100} />
          <Typography variant="body2" color="text.secondary">{fiber} /30</Typography>

          <Value style={{ fontSize: "25px" }}>Sodium</Value>
          <LinearProgress variant="buffer" width="500px" value={(sodium/2300)*100} valueBuffer={100} />
          <Typography variant="body2" color="text.secondary">{sodium} /2300</Typography>

          <Value style={{ fontSize: "25px" }}>Sugar</Value>
          <LinearProgress variant="buffer" width="500px" color="secondary" value={(sugar/30)*100} valueBuffer={100} />
          <Typography variant="body2" color="text.secondary">{sugar} /30</Typography>

        </Container>
      </Col>
    </Row>
  )
}

export default CaloriesCard;