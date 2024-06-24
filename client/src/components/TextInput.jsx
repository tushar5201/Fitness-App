import React from "react";
import styled from "styled-components";

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Label = styled.label`
  margin-bottom: 8px;
  font-size: 16px;
  color: ${({ theme }) => theme.text_primary};
`;

const InputField = styled.input`
  padding: 12px;
  font-size: 16px;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s ease;
  background-color: ${({ theme }) => theme.input_bg};
  color: ${({ theme }) => theme.text_primary};

  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.text_secondary};
  }
`;

const ErrorText = styled.span`
  margin-top: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.error};
`;

const TextInput = ({ label, value, onChange, placeholder, type = "text", error }) => {
  return (
    <InputContainer>
      {label && <Label>{label}</Label>}
      <InputField
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </InputContainer>
  );
};

export default TextInput;
