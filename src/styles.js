import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0 auto;
	max-width: 1200px;
	padding: 0 15px;
	box-sizing: border-box;
	width: 100%;

	@media (min-width: 576px) {
		max-width: 540px;
	}
	@media (min-width: 768px) {
		max-width: 720px;
		flex-direction: row;
		align-items: start;
	}
	@media (min-width: 992px) {
		max-width: 960px;
	}
	@media (min-width: 1200px) {
		max-width: 1140px;
	}
`;

export const List = styled.ul`
	height: 75vh;
	width: 100%;
	list-style: none;
	padding: 0;
	margin: 0;
	overflow: auto;
`;

export const ListItem = styled.li`
	border: 1px solid #ccc;
	border-radius: 5px;
	padding: 15px;
	margin-bottom: 10px;
`;

export const Button = styled.button`
	background-color: #007bff;
	color: white;
	padding: 10px 20px;
	border-radius: 5px;
	border: none;
	cursor: pointer;
	&:hover {
		background-color: #0056b3;
	}
`;

export const Input = styled.input`
	padding: 10px;
	border-radius: 5px;
	border: 1px solid #ccc;
	width: 100%;
	box-sizing: border-box;
	margin-bottom: 10px;
`;
export const MapContainer = styled.div`
	height: 90vh;
	width: 100%;
	box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
		rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
		rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
`;
export const Heading = styled.h2`

`;

export const Header = styled.header`
display: flex;
width: 100%;
  justify-content: space-between;
  align-items: center;
  background-color: #203A43;
  padding: 20px;
  color: white;
`
