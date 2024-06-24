import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { origin } from "../origin";

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

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const handleSignIn = async (e) => {
  //   try {
  //   e.preventDefault();
  //   const res = await axios.post('https://movieflix-lyart.vercel.app/sign_in', { email, password }, { withCredentials: true })
  //   // const res = await fetch("http://localhost:5000/user/signin", {
  //     //   method: "POST",
  //     //   headers: { 'content-type': 'application/json' },
  //     //   body: JSON.stringify({ email, password })
  //     // })
  //     // .then((response) => {
  //     //   return response.JSON();
  //     // })
  //     switch (res.status) {
  //       case 200:
  //         localStorage.setItem('userInfo', JSON.stringify(res));
  //         // window.location.reload();
  //         toast.success("Successfully Logged In.");
  //         break;
  //       case 405:
  //         toast.error("Invalid Email.");
  //         break;
  //       default:
  //         toast.error("Error in sign in");
  //         break;
  //     }
  //   } catch (error) {
  //     toast.error(error);
  //   }
  // };

  const handleSignIn = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(`${origin}/user/signin`, { email, password }, { withCredentials: true })
      window.location.reload();
      toast.success("Signin Successful.");
      localStorage.setItem('userInfo', JSON.stringify(res));
    } catch (error) {
      toast.error("Invalid Credentials.");
    }
  }

  return (
    <Container>
      <Header>
        <Title>Hello Folks from FitPro 👋</Title>
        <Subtitle>Have your login details for getting in!!</Subtitle>
      </Header>
      <Form className="signup-form" onSubmit={handleSignIn}>
        <TextInput
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
        <Button type="submit" className="btn btn-primary">Sign In</Button>
      </Form>
    </Container>
  );
};

export default SignIn;
