import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import { toast } from 'react-toastify';
import { Form, Button } from 'react-bootstrap'
import { origin } from "../origin";

// import { UserSignUp } from "../api";
// import { useDispatch } from "react-redux";
// import { loginSuccess } from "../react-redux/reducers/useSlice";

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.background};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: ${({ theme }) => theme.text_primary};
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.text_secondary};
`;

// const Form = styled.form`
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   gap: 20px;
// `;

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // const res = await axios.post("http://localhost:5000/user/signup", { name, email, password })
      const res = await fetch(`${origin}/user/signup`, {
        method: "post",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      switch (res.status) {
        case 200:
          window.location.reload();
          toast.success("Successfully Signup.");
          break;
        case 401:
          toast.error("User Already Exist.");
          break;
        default:
          toast.error("Err in signup");
          break;
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container>
      <Header>
        <Title>Create New Account👋</Title>
        <Subtitle>Enter the required details to create a new account</Subtitle>
      </Header>
      <Form className="signup-form" onSubmit={submitHandler}>
        <TextInput
          label="Full Name"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextInput
          type="email"
          label="Email Address"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" className="btn btn-primary">Sign Up</Button>
      </Form>
    </Container>
  );
};

export default SignUp;