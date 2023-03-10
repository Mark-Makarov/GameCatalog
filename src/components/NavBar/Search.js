import {useState} from 'react';
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
  background-color: #3B3B3B;
  color: #fff;
  height: 40px;
  width: 220px;
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    box-shadow: 0 0 10px #fff;
  }
  &:focus {
    box-shadow: 0 0 10px #fff;
  }
`;

const SearchButton = styled.button`
  background-color: #8c46c0;
  border: none;
  border-radius: 5px;
  color: white;
  height: 40px;
  font-size: 1.2rem;
  font-weight: bold;
  margin-left: 5px;
  padding: 5px 10px;
  transition: all 0.2s ease-in-out;

  &:hover {
    cursor: pointer;
    box-shadow: 0 0 10px #fff;
  }
`;

const Search = ({getUserSearch}) => {
	
	const [query, setQuery] = useState('');
	
	const handleSubmit = async (e) => {
		e.preventDefault();
		const res = await axios.get(`/api/search?query=${query}`);
		getUserSearch(res.data);
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