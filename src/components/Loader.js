import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
	display: flex;
	justify-content: center;
  &:after {
    content: "";
    display: block;
    width:150px;
    height: 150px;
    border-radius: 50%;
    border: 6px solid;
    border-color: #f0f0f0 transparent;
    animation: ${spin} 1.2s linear infinite;
  }
`;

export default Loader;