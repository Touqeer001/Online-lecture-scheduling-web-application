import React from "react";
import styled from "styled-components";

const ErrorPage = () => {
  return (
    <ErrorContainer>
      <ErrorMessage>Oops! Something went wrong.</ErrorMessage>
      {/* You can add additional information or links here */}
    </ErrorContainer>
  );
};

const ErrorContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ErrorMessage = styled.h1`
  font-size: 24px;
  color: #ff0000;
  margin-bottom: 20px;
`;

export default ErrorPage;
