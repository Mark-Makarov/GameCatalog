import React, {useEffect, useState} from 'react';
import axios from "axios";
import styled from 'styled-components';

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const SearchInput = styled.input`
  border: 2px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  padding: 0.5rem;
  width: 100%;
  max-width: 500px;

  &:focus {
    outline: none;
    border-color: red;
  }
`;

const SearchButton = styled.button`
  background-color: #de9e9e;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  margin-left: 1rem;
  padding: 0.5rem 1rem;

  &:hover {
    cursor: pointer;
    background-color: white;
  }
`;

const Search = ({onSearch}) => {
	
	useEffect(() => {
			axios.get(`https://api.rawg.io/api/games?key=856574f363d844d5935677771d6dd6bc&search=grand`)
				.then(res => {
				
				})
	}, [])
	
	const [query, setQuery] = useState('');
	
	const handleSubmit = async (e) => {
		e.preventDefault();
		const results = await axios.get(
			`https://api.rawg.io/api/games?key=856574f363d844d5935677771d6dd6bc&search=${query}`
		);
		onSearch(results.data.results);
		console.log(results.data.results)
	};
	
	return (
		<SearchWrapper>
			<form onSubmit={handleSubmit}>
				<SearchInput
					type="text"
					placeholder="Search for games"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
				<SearchButton type="submit">Search</SearchButton>
			</form>
		</SearchWrapper>
	);
};

export default Search;