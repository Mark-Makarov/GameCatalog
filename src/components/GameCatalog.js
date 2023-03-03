import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import GameCard from "@/components/GameCard";
import styled from "styled-components";
import Loader from "@/components/Loader";
import Search from "@/components/Search";

const GameCatalogWrapper = styled.div`
  justify-content: center;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  padding: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(300px, calc(100% / 2)));
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, calc(100% / 3)));
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, calc(100% / 5)));
  }
`;

const GameCatalog = () => {
	
	const [page, setPage] = useState(1)
	const [data, setData] = useState([])
	const [totalCount, setTotalCount] = useState(0)
	const [fetching, setFetching] = useState(true)
	const parentBlock = useRef()
	
	
	useEffect(() => {
		
		if (fetching) {
			axios.get(`https://api.rawg.io/api/games?key=856574f363d844d5935677771d6dd6bc&page=${page}&platforms=4`)
				.then(res => {
					setData([...data, ...res.data.results])
					setTotalCount(res.data.count)
					setPage(prevState => prevState + 1)
				}).finally(() => setFetching(false))
		}
	}, [fetching])
	
	useEffect(() => {
		document.addEventListener('scroll', scrollHandler)
		return function () {
			document.removeEventListener('scroll', scrollHandler)
		}
	})
	
	const scrollHandler = (e) => {
		if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 200 && data.length < totalCount) {
			setFetching(true)
		}
	}
	
	const onSearch = (query) => {
		setData(query)
	};
	
	return (
		<GameCatalogWrapper ref={parentBlock}>
			<Search onSearch={onSearch} />
			{fetching ? (<Loader/>)
				: (<> {data.map((item) =>
					<GameCard name={item.name} backgroundImg={item.background_image} rating={item.rating} released={item.released}
					          id={item.id} key={item.id}/>
				)} </>)}
		</GameCatalogWrapper>
	);
};

export default GameCatalog;