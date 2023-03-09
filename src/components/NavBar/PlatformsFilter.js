import styled from "styled-components";
import {useEffect, useState} from "react";
import axios from "axios";

const PlatformSelectWrapper = styled.select`
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 2px solid #ccc;
  font-size: 1rem;
	margin: 10px;
  color: white;
	height: 40px;
	width: 220px;
  transition: all 0.2s ease-in-out;
  &:hover {
    box-shadow: 0 0 10px #fff;
  }
`;

const PlatformsFilter = ({filter}) => {
	const [currentPlatform, setCurrentPlatform] = useState(4)
	const [platforms, setPlatforms] = useState([])

	useEffect( () => {
		axios.get('/api/platformsList').then(res => setPlatforms(res.data));
	}, [])
	
	const onChange = (e) => {
		filter(e.target.value)
		setCurrentPlatform(e.target.value)
	}

	return (
		<PlatformSelectWrapper onChange={onChange} value={currentPlatform}>
			{platforms.map((platform) => (
				<option key={platform.id} value={platform.id}>
					{platform.name}
				</option>
			))}
		</PlatformSelectWrapper>
	);
};

export default PlatformsFilter;