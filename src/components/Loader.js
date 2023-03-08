import styled, {keyframes} from 'styled-components';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${props => props.fullScreen && `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    height: 100vh;
  `};

  ${props => props.little && `
    position: relative;
    bottom: 15px;
    left: 50%;
    transform: translate(-50%, 0%);
    z-index: 9999;
    overflow: hidden;
`}
  &:after {
    content: "";
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 6px solid;
    border-color: #f0f0f0 transparent;
    animation: ${spin} 1.2s linear infinite;
    ${props => props.little && `
    width: 50px;
    height: 50px;
`}
  }
`;

export default Loader;