import React, { useState } from 'react';
import styled from 'styled-components';

const SortWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
`;

const Button = styled.button`
	display: flex;
	align-items: center;
	flex-direction: column;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px;
  font-weight: 600;
  margin-right: 10px;
  color: ${({ active }) => (active ? '#f44336' : '#00ff3b')};
`;

const ResetButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px;
  font-weight: 600;
  color: ${({ disabled }) => (disabled ? '#DEDEF666' : '#f44336')};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
`;

const Sort = ({ sort }) => {
	const [sortType, setSortType] = useState('');
	const [sortOrder, setSortOrder] = useState('');
	
	const handleSort = (type) => {
		let order = 'down'
		if (type === sortType) {
		order = sortOrder === 'down' ? 'up' : 'down';
		} else {
			order = 'down';
		}
		setSortType(type);
		setSortOrder(order);
		sort(type, order === 'up');
	};
	
	const resetSort = () => {
		setSortType('');
		setSortOrder('');
		sort('reset')
	};

	return (
		<SortWrapper>
			<Button
				active={sortType === 'rating' && sortOrder === 'down'}
				onClick={() => handleSort('rating')}
			>
				⭐{' '}
				{sortType === 'rating' ? (sortOrder === 'down' ? '▼' : '▲') : ''}
			</Button>
			<Button
				active={sortType === 'released' && sortOrder === 'down'}
				onClick={() => handleSort('released')}
			>
				📅{' '}
				{sortType === 'released' ? (sortOrder === 'down' ? '▼' : '▲') : ''}
			</Button>
			<ResetButton
				disabled={!sortType && !sortOrder}
				onClick={resetSort}
			>
				❌
			</ResetButton>
		</SortWrapper>
	);
};

export default Sort;
