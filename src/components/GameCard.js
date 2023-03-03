import styled from 'styled-components';
import Link from "next/link";

const Tile = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 300px;
  min-height: 300px;
  border: 1px solid #ccc;
  border-radius: 15px;
  padding: 10px;
  margin: 10px;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0 5px;
`;

const Poster = styled.img`
  max-width: 100%;
  height: 160px;
  object-fit: contain;
`;

const Rating = styled.p`
  font-size: 14px;
  margin: 5px 0;
`;

const ReleaseDate = styled.p`
  font-size: 14px;
  margin: 5px 0;
`;

const GameCard = ({name, backgroundImg, rating, released, id}) => {
	
	
	return (
		<Link href={`/game?id=${id}`} as={`/game/${id}`} passHref>
			<Tile>
				<Title>{name}</Title>
				<Poster src={backgroundImg} alt={name}/>
				<Rating>Rating: {rating}</Rating>
				<ReleaseDate>Released: {released}</ReleaseDate>
			</Tile>
		</Link>
	);
};

export default GameCard;