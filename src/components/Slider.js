import React from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, { FreeMode, Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styled from "styled-components";

SwiperCore.use([FreeMode, Navigation, Pagination]);
const SliderImage = styled.img`
  max-height: 550px;
  border-radius: 10px;
  max-width: 100%;
  box-sizing: border-box;
  display: block;
  margin: 0 auto;
	user-select: none;
  @media (max-width: 600px) {
    height: 250px;
  }
`;

const SliderWrapper = styled.div`
  width: 100%;
  margin: 10px 0;
`;


const Slider = ({screenshots}) => {
	return (
		<SliderWrapper>
			<Swiper
				spaceBetween={10}
				slidesPerView={1}
				freeMode={true}
				navigation={true}
				loop={true}
				pagination={{ clickable: true }}
			>
				{screenshots?.map((screenshot, index) => (
					<SwiperSlide key={index}>
						<SliderImage src={screenshot.image} alt={`Screenshot ${index}`} />
					</SwiperSlide>
				))}
			</Swiper>
		</SliderWrapper>
	);
};

export default Slider;