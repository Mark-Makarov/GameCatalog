import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
	display: flex;
	justify-content: center;
  width: 100%;
	height: 100%;
  &:after {
    content: "";
    display: block;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: 6px solid #f0f0f0;
    border-color: #f0f0f0 transparent #f0f0f0 transparent;
    animation: ${spin} 1.2s linear infinite;
  }
`;

export default Loader;