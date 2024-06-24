import React, { useState } from 'react';
import styled from 'styled-components';
import TextInput from '../components/TextInput';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { origin } from '../origin';

// const FormContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   height: 100vh;
//   background: ${({ theme }) => theme.bg};
//   color: ${({ theme }) => theme.text_primary};
// `;

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
//   width: 300px;
// `;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

// const Button = styled.button`
//   padding: 10px;
//   background-color: #28a745;
//   color: white;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;

//   &:hover {
//     background-color: #218838;
//   }
// `;

// const ResponseMessage = styled.div`
//   margin-top: 20px;
//   text-align: center;
// `;

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

const Card = styled.div`
  flex: 1;
  justify-content: center;
    margin-top: 10%;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 14px;
  gap: 16px;
  // box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  @media (max-width: 600px) {
    padding: 16px;
    gap: 12px;
  }
`;


const Contact = () => {
    const [subject, setSubject] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const res = await axios.post(`${origin}/contact`, { subject, email, message });
        if (res.status === 200) {
            toast.success("Mail sent Successfully.")
        } else {
            toast.error("Mail sent Failed.")
        }
    };

    return (
        <>
            <Container>
                <Row>
                    <Col md={3}></Col>
                    <Col md={6}>
                        <Card>
                            <Header>
                                <Title>Hello Folks from FitPro 👋</Title>
                                <Subtitle>Submit Form to Contact us</Subtitle>
                            </Header>

                            <Form className="signup-form" onSubmit={handleSubmit}>
                                <TextInput
                                    label="Email"
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <TextInput
                                    label="Subject"
                                    type="text"
                                    placeholder="Enter Subject"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                />
                                <TextInput
                                    label="Message"
                                    placeholder="Enter your message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                                <Button type="submit" className="btn btn-primary">Submit</Button>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Contact;