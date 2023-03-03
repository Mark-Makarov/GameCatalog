import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import axios from "axios";
import styled from 'styled-components';
import Loader from "@/components/Loader";
import {Swiper, SwiperSlide} from "swiper/react";
import {FreeMode} from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const GameDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 36px;
  margin: 30px 0;
`;

const Description = styled.p`
  text-align: center;
  font-size: 18px;
  line-height: 1.5;
  margin: 30px 0;
`;

const Link = styled.a`
  font-size: 18px;
  color: #0070f3;
  text-decoration: none;
`;

const SliderWrapper = styled.div`
  width: 80%;
  margin: 30px 0;
`;

const SliderImage = styled.img`
  margin: 30px 30px;
  width: 400px;
  height: 200px;
`;

	const params = {
		spaceBetween: 0,
		slidesPerView: 1,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	}
	
	
	
	const Game = () => {
		const router = useRouter();
		const gameId = router.query.id;
		
		const [data, setData] = useState([])
		const [screenshots, setScreenshots] = useState([])
		
		useEffect(() => {
			axios.get(`https://api.rawg.io/api/games/${gameId}?key=856574f363d844d5935677771d6dd6bc`)
				.then(res => {
					setData(res.data)
				})
			axios.get(`https://api.rawg.io/api/games/${gameId}/screenshots?key=856574f363d844d5935677771d6dd6bc`)
				.then(res => {
					setScreenshots(res.data.results)
				})
		}, [])

		
		return (
			<GameDetailsWrapper>
				<Title>{data.name}</Title>
				<Description>{data.description_raw}</Description>
				<Link href={data.website} target="_blank" rel="noopener">Посетить сайт игры</Link>
					{screenshots.map((screenshot, index) => (
						<SwiperSlide key={index}>
							<SliderImage src={screenshot.image} alt={`Screenshot ${index}`}/>
						</SwiperSlide>
					))}
			</GameDetailsWrapper>
		);
	};
	
	export default Game;