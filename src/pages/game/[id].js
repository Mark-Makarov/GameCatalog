import axios from "axios";
import styled from 'styled-components';
import {appear, glow} from "@/styles/animations";
import Slider from "@/components/Slider";

const GameDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  animation: ${appear} 1s ease-in-out;
`;

const Title = styled.h1`
  font-size: 40px;
  margin-bottom: 30px;
  animation: ${glow} 5s ease-in-out infinite;
  @media (max-width: 630px) {
    font-size: 22px;
    margin-bottom: 20px;
  }
`;

const Poster = styled.img`
  border-radius: 15px;
  max-width: 90%;
  object-fit: contain;
  margin-bottom: 10px;
  animation: ${glow} 5s ease-in-out infinite;
  @media (max-width: 600px) {
    max-width: 100%;
  }
`;

const Rating = styled.p`
  display: flex;
  align-items: center;
  font-size: 30px;
  margin: 5px 0;
  animation: ${glow} 5s ease-in-out infinite;
  @media (max-width: 600px) {
    font-size: 20px;
  }
`;

const Star = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffd700;
  font-size: 30px;
  margin-left: 5px;
  @media (max-width: 600px) {
    font-size: 18px;
  }
`;

const ReleaseDate = styled.p`
  animation: ${glow} 5s ease-in-out infinite;
  font-size: 30px;
  margin: 5px 0;
  @media (max-width: 600px) {
    font-size: 20px;
  }
`;

const DescriptionTitle = styled.p`
	display: flex;
	justify-content: center;
	width: 100%;
  animation: ${glow} 5s ease-in-out infinite;
  font-size: 30px;
	margin-top: 20px;
  @media (max-width: 600px) {
    font-size: 20px;
  }
`;

const Description = styled.p`
  text-align: center;
  font-size: 20px;
  line-height: 1.7;
  margin: 10px 0;
  @media (max-width: 600px) {
    font-size: 15px;
    margin: 15px 0;
  }
`;

const ScreenShotsTitle = styled.p`
	display: flex;
	justify-content: center;
	width: 100%;
  animation: ${glow} 5s ease-in-out infinite;
  font-size: 30px;
	margin-top: 20px;
  @media (max-width: 600px) {
    font-size: 20px;
  }
`;


const Link = styled.a`
  font-size: 30px;
  color: #c995ff;
  text-decoration: none;
  animation: ${glow} 5s ease-in-out infinite;
  @media (max-width: 600px) {
    font-size: 20px;
  }
`;

const BackButton = styled.button`
  background-color: #8c46c0;
  border: none;
  border-radius: 5px;
  color: white;
  min-height: 60px;
  font-size: 1.2rem;
  font-weight: bold;
  margin-left: 5px;
  padding: 5px 10px;
  margin-top: 40px;
  transition: all 0.2s ease-in-out;

  &:hover {
    cursor: pointer;
    box-shadow: 0 0 10px #fff;
  }
`;

const Id = ({gameData}) => {
	
	return (
		<GameDetailsWrapper>
			<Title>{gameData.name}</Title>
			<Poster src={gameData.background_image} alt={gameData.name}/>
			<Rating>Рейтинг: {gameData.rating}<Star>⭐</Star></Rating>
			<ReleaseDate>Дата выхода: {gameData.released}</ReleaseDate>
			<DescriptionTitle>Описание:</DescriptionTitle>
			<Description>{gameData.description_raw}</Description>
			<ScreenShotsTitle>Скриншоты игры:</ScreenShotsTitle>
			<Slider screenshots={gameData.screenshots}/>
			<Link href={gameData.website} target="_blank" rel="noopener">Посетить сайт игры</Link>
			<Link href={'/'}> <BackButton>Вернуться на главную</BackButton></Link>
		</GameDetailsWrapper>
	);
};

export async function getServerSideProps(context) {
	const {id} = context.query;
	const baseURL = `http://${context.req.headers.host}`;
	const apiUrl = `${baseURL}/api/gameData?id=${id}`;
	
	try {
		const response = await axios.get(apiUrl);
		const gameData = response.data;
		return {props: {gameData}};
	} catch (error) {
		return {
			props: {gameData: 'Error'},
			notFound: true,
		};
	}
}

export default Id;
