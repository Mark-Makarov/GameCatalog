import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import axios from "axios";
import styled, {keyframes} from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { FreeMode, Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const glow = keyframes`
  0% {
    text-shadow: 0 0 10px #fff, 0 0 60px #ff00de;
  }
  50% {
    text-shadow: 0 0 40px #fff,0 0 5px #ff00de;
  }
  100% {
    text-shadow: 0 0 10px #fff, 0 0 60px #ff00de;
  }
`;

const Title = styled.h1`
  font-size: 40px;
  margin-bottom: 30px;
  animation: ${glow} 5s ease-in-out infinite;
`;

const Description = styled.p`
  text-align: center;
  font-size: 20px;
  line-height: 1.7;
  margin: 30px 0;
`;

const Link = styled.a`
  font-size: 20px;
  color: #0070f3;
  text-decoration: none;
`;

const Poster = styled.img`
  border-radius: 15px;
  max-width: 80%;
  object-fit: contain;
  margin-bottom: 10px;
`;

const Rating = styled.p`
  font-size: 30px;
  margin: 5px 0;
`;

const Star = styled.span`
  display: inline-block;
  color: #FFD700;
  margin-left: 5px;
  font-size: 30px;
`;

const ReleaseDate = styled.p`
  font-size: 30px;
  margin: 5px 0;
`;

SwiperCore.use([FreeMode, Navigation, Pagination]);

const GameDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const SliderImage = styled.img`
  max-height: 550px;
  border-radius: 10px;
  max-width: 100%;
  box-sizing: border-box;
  display: block;
  margin: 0 auto;
	user-select: none;
`;

const SliderWrapper = styled.div`
  width: 100%;
  margin: 30px 0;
`;


const Id = () => {
	const router = useRouter();
	const gameId = router.query.id;
	
	const [data, setData] = useState([])
	const [screenshots, setScreenshots] = useState([])
	
	useEffect(() => {
		async function fetchData() {
			if (gameId) {
				const [gameRes, screenshotsRes] = await Promise.all([
					axios.get(`https://api.rawg.io/api/games/${gameId}?key=856574f363d844d5935677771d6dd6bc`),
					axios.get(`https://api.rawg.io/api/games/${gameId}/screenshots?key=856574f363d844d5935677771d6dd6bc`)
				]);
				setData(gameRes.data);
				setScreenshots(screenshotsRes.data.results);
			}
		}
		fetchData();
	}, [gameId]);
	
	
	return (
		<GameDetailsWrapper>
			<Title>{data.name}</Title>
			<Poster
				src={data.background_image}
				alt={data.name}
			/>
			<Rating>Рейтинг: {data.rating}<Star>★</Star></Rating>
			<ReleaseDate>Дата выхода: {data.released}</ReleaseDate>
			<Description>{data.description_raw}</Description>
			<Link href={data.website} target="_blank" rel="noopener">Посетить сайт игры</Link>
			<SliderWrapper>
				<Swiper
					spaceBetween={10}
					slidesPerView={1}
					freeMode={true}
					navigation={true}
					loop={true}
					pagination={{ clickable: true }}
				>
					{screenshots.map((screenshot, index) => (
						<SwiperSlide key={index}>
							<SliderImage src={screenshot.image} alt={`Screenshot ${index}`} />
						</SwiperSlide>
					))}
				</Swiper>
			</SliderWrapper>
		</GameDetailsWrapper>
	);
};

export default Id;