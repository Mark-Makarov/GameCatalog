import {useCallback, useEffect, useState} from 'react';
import axios from "axios";
import NavBar from "@/components/NavBar/NavBar";
import Loader from "@/components/Loader";
import GameCatalog from "@/components/GameCatalog";

const MainPage = () => {
	
	const [page, setPage] = useState(1)
	const [data, setData] = useState([])
	const [totalCount, setTotalCount] = useState(0)
	const [fetching, setFetching] = useState(true)
	const [platform, setPlatform] = useState(4)
	const [showLoader, setShowLoader] = useState(false)
	
	
	useEffect(() => {
		if (fetching) {
			if (data.length) setShowLoader(true)
			axios.get(`/api/gamesList?page=${page}&platforms=${platform}`)
				.then(res => {
					setData([...data, ...res.data.results])
					setTotalCount(res.data.count)
					setPage(prevState => prevState + 1)
				}).finally(() => {
				setFetching(false);
				setShowLoader(false)
			})
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
	
	const handleSearch = useCallback((query) => {
		setData(query)
	}, [])
	
	const handleFilter = useCallback((query) => {
		setPlatform(query)
		setFetching(true)
		setData([])
		setTotalCount(0)
		setPage(1)
	}, [])
	
	const handleSorting = useCallback((prop, dir) => {
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
	}, [data])

	return (
		<>
			<NavBar search={handleSearch} filter={handleFilter} sort={handleSorting}/>
			<GameCatalog data={data}/>
			{(showLoader || data.length) ? <Loader little/> : <Loader fullScreen/>}
		</>
	);
};

export default MainPage;