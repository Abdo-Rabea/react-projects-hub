import styled, { keyframes } from "styled-components";

const rotate = keyframes`
    0%   { box-shadow: 15px 0 #fff, -15px 0 #fff2; background: #fff }
    33%  { box-shadow: 15px 0 #fff, -15px 0 #fff2; background: #fff2 }
    66%  { box-shadow: 15px 0 #fff2, -15px 0 #fff; background: #fff2 }
    100% { box-shadow: 15px 0 #fff2, -15px 0 #fff; background: #fff }
`;

const SpinnerDots = styled.div`
  width: 10px;
  aspect-ratio: 1;
  border-radius: 50%;
  animation: ${rotate} 1s infinite linear alternate;
`;

export default SpinnerDots;
