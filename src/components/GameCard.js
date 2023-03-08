import styled from 'styled-components';
import {glow} from "@/styles/animations";
import Link from "next/link";
import { useState } from "react";
import Loader from "@/components/Loader";

const Tile = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  max-width: 300px;
  height: 320px;
  border: 3px solid #ccc;
  border-radius: 15px;
  padding: 13px;
  color: white;
  text-decoration: none !important;
  transition: all 0.2s ease-in-out;
  margin-bottom: 0;
  margin-top: auto;

  &:hover {
    box-shadow: 0 0 10px #fff;
    transform: translateY(-5px);

    animation: ${glow} 5s ease-in-out infinite;
  }
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin: 10px 0;
`;

const Poster = styled.img`
  border-radius: 10%;
  width: 100%;
  height: 160px;
  object-fit: contain;
  margin-bottom: 10px;
`;

const Rating = styled.p`
  font-size: 20px;
  margin: 5px 0;
`;

const Star = styled.span`
  color: #ffd700;
  font-size: 20px;
  margin-left: 5px;
  @media (max-width: 850px) {
    font-size: 18px;
  }
`;

const ReleaseDate = styled.p`
  font-size: 18px;
  margin: 5px 0;
  @media (max-width: 850px) {
    font-size: 14px;
  }
`;

const GameCard = ({name, backgroundImg, rating, released, id}) => {
	const [loading, setLoading] = useState(true);
	
	const handleImageLoaded = () => {
		setLoading(false);
	};
	
	return (
		<Link href={`/game/${id}`} passHref>
			<Tile>
				<Title>{name}</Title>
				{loading ? <Loader /> : null}
				<Poster
					src={backgroundImg}
					alt={name}
					onLoad={handleImageLoaded}
					style={loading ? { display: 'none' } : {}}
				/>
				<Rating>Рейтинг: {rating}<Star>⭐</Star></Rating>
				<ReleaseDate>Дата выхода: {released}</ReleaseDate>
			</Tile>
		</Link>
	);
};

export default GameCard;