import { useState } from 'react';
import Search from "@/components/NavBar/Search";
import PlatformsFilter from "@/components/NavBar/PlatformsFilter";
import Sort from "@/components/NavBar/Sort";
import styled from "styled-components";
import {appear} from "@/styles/animations";

const NavBarWrapper = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 5px;
  z-index: 999;
`

const ComponentsWrapper = styled.div `
  display: flex;
  align-items: center;
  max-width: 100%;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  animation: ${appear} 0.5s ease-in-out;
	
  @media (max-width: 750px) {
    flex-direction: column;
    margin: 10px;
    display: ${({ isNavBarOpen }) => (isNavBarOpen ? 'flex' : 'none')};
  }
`

const ToggleNavBarButton = styled.button`
  display: none;
  @media (max-width: 750px) {
    display: block;
    position: fixed;
	  right: 10px;
    height: 50px;
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    font-size: 30px;
    color: #fff;
    z-index: 1000;
  }
`

const NavBar = ({search, filter, sort}) => {
	const [isNavBarOpen, setIsNavBarOpen] = useState(false);
	
	const handleToggleNavBar = () => {
		setIsNavBarOpen(prevState => !prevState);
	}
	
	return (
		<>
			<NavBarWrapper>
				<ComponentsWrapper isNavBarOpen={isNavBarOpen}>
					<Search search={search}/>
					<PlatformsFilter filter={filter}/>
					<Sort sort={sort}/>
				</ComponentsWrapper>
			</NavBarWrapper>
			<ToggleNavBarButton onClick={handleToggleNavBar}>
				{isNavBarOpen ? 'X' : '☰'}
			</ToggleNavBarButton>
		</>
	);
};

export default NavBar;