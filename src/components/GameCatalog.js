import React from 'react';
import GameCard from "@/components/GameCard";
import styled from "styled-components";
import {appear, glow} from "@/styles/animations";

const GameCatalogWrapper = styled.div`
	width: 100%;
  justify-content: center;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  padding-top: 80px;
  padding-bottom: 30px;
  animation: ${appear} 1s ease-in-out;
	
  @media (max-width: 600px) {
    padding-top: 10px;
    grid-template-columns: repeat(auto-fit, minmax(300px, calc(100% / 2)));
  }

  @media (min-width: 600px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, calc(100% / 3)));
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, calc(100% / 5)));
  }
`;

const NoResultsWrapper = styled.div`
	display: flex;
	width: 100%;
	justify-content: center;
	margin-top: 100px;
	font-size: 30px;
  animation: ${glow} 5s ease-in-out infinite;
  @media (max-width: 400px) {
    font-size: 25px;
  }
`

const GameCatalog = ({data}) => {
	
	return (
		<GameCatalogWrapper>
			{data[0] === 'No results' ? <NoResultsWrapper>Результатов нет...</NoResultsWrapper> :
				(<>{data.map((item) =>
					<GameCard name={item.name}
					          backgroundImg={item.background_image}
					          rating={item.rating}
					          released={item.released}
					          id={item.id} key={item.id}/>
				)}</>)}
		</GameCatalogWrapper>
	);
};

export default GameCatalog;