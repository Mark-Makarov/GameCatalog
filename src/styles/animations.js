import {keyframes} from "styled-components";

export const appear = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const glow = keyframes`
  0% {
    text-shadow: 0 0 5px #fff, 0 0 5px #ff00de;
  }
  50% {
    text-shadow: 0 0 15px #fff,0 0 20px #ff00de;
  }
  100% {
    text-shadow: 0 0 5px #fff, 0 0 5px #ff00de;
  }
`;