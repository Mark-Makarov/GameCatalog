import {useEffect, useState} from 'react';
import axios from "axios";
import styled from 'styled-components';

const SearchWrapper = styled.div`
  display: flex;
	justify-content: center;
	flex-direction: row;
  align-items: center;
  margin: 10px;
`;

const SearchInput = styled.input`
  border: 2px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  padding: 0.5rem;
  height: 40px;
  width: 220px;
  transition: all 0.2s ease-in-out;
  &:hover {
    box-shadow: 0 0 10px #fff;
  }
  &:focus {
    box-shadow: 0 0 10px #fff;
  }
`;

const SearchButton = styled.button`
  background-color: palevioletred;
  border: none;
  border-radius: 5px;
  color: white;
  height: 40px;
  font-size: 1.2rem;
  font-weight: bold;
  margin-left: 5px;
  padding: 5px 10px;

  &:hover {
    cursor: pointer;
    box-shadow: 0 0 10px #fff;
  }
`;

const Search = ({search}) => {
	
	const [query, setQuery] = useState('');
	
	const handleSubmit = async (e) => {
		e.preventDefault();
		const results = await axios.get(
			`https://api.rawg.io/api/games?key=856574f363d844d5935677771d6dd6bc&search=${query}`
		);
		search(results.data.results);
		console.log(results.data.results)
	};
	
	
	
	return (
		<SearchWrapper>
			<form onSubmit={handleSubmit}>
				<SearchInput
					type="text"
					placeholder="Поиск игр по названию"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
				<SearchButton type="submit">Поиск</SearchButton>
			</form>
		</SearchWrapper>
	);
};

export default Search;