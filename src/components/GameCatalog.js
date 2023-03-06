import {useEffect, useState} from 'react';
import axios from "axios";
import GameCard from "@/components/GameCard";
import styled from "styled-components";
import NavBar from "@/components/NavBar/NavBar";

const GameCatalogWrapper = styled.div`
  justify-content: center;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  padding-top: 80px;
  padding-bottom: 30px;

  @media (max-width: 600px) {
    padding-top: 10px;
    grid-template-columns: repeat(auto-fit, minmax(300px, calc(100% / 2)));
  }

  @media (min-width: 600px) {
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
	const [platform, setPlatform] = useState(4)
	
	
	useEffect(() => {
		if (fetching) {
			axios.get(`https://api.rawg.io/api/games?key=856574f363d844d5935677771d6dd6bc&page=${page}&platforms=${platform}`)
				.then(res => {
					setData([...data, ...res.data.results])
					setTotalCount(res.data.count)
					setPage(prevState => prevState + 1)
				}).finally(() => setFetching(false))
		}
	}, [fetching, platform])
	
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
	
	const handleSearch = (query) => {
		setData(query)
	};
	
	const handleFilter = (query) => {
		setPlatform(query)
		setFetching(true)
		setData([])
		setTotalCount(0)
		setPage(1)
	}
	
	const handleSort = (prop, dir) => {
		if (prop === 'reset') {
			setFetching(true)
			setData([])
			setTotalCount(0)
			setPage(1)
		} else {
			const sorted = [...data].sort((a, b) => (!dir ? a[prop] > b[prop] : a[prop] < b[prop]) ? -1 : 1)
			setData(sorted)
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			});
		}
	}
	
	return (
		<>
			<NavBar search={handleSearch} filter={handleFilter} sort={handleSort}/>
			<GameCatalogWrapper>
				{data.map((item) =>
					<GameCard name={item.name} backgroundImg={item.background_image} rating={item.rating} released={item.released}
					          id={item.id} key={item.id}/>
				)}
			</GameCatalogWrapper>
		</>
	);
};

export default GameCatalog;