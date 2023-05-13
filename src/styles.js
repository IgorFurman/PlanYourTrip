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

	@media (max-width: 576px) {
		padding: 0 5px;
	}
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

	@media (max-width: 576px) {
		height: 60vh;
	}
`;

export const ListItem = styled.li`
	border: 1px solid #ccc;
	border-radius: 5px;
	padding: 15px;
	margin-bottom: 10px;

	@media (max-width: 576px) {
		padding: 10px;
	}
`;

export const ButtonSearch = styled.button`
	background-color: #007bff;
	color: white;
	padding: 10px 20px;
	border-radius: 5px;
	border: none;
	cursor: pointer;
	&:hover {
		background-color: #0056b3;
	}

	@media (max-width: 576px) {
		padding: 5px 10px;
	}
`;

export const ButtonList = styled.button`
	background-color: #808080;
	color: white;
	padding: 5px 10px;
	border-radius: 5px;
	border: none;
	cursor: pointer;
	font-size: 12px;
	&:hover {
		background-color: #a9a9a9;
	}

	@media (max-width: 576px) {
		padding: 3px 5px;
		font-size: 10px;
	}
`;

export const Input = styled.input`
	padding: 10px;
	border-radius: 5px;
	border: 1px solid #ccc;
	width: 100%;
	box-sizing: border-box;
	margin-bottom: 10px;

	@media (max-width: 576px) {
		padding: 5px;
		margin-bottom: 5px;
	}
`;

export const MapContainerStyled = styled.div`
	height: 90vh;
	width: auto;
	margin: 20px;
	box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
		rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0px 8px 16px),
		rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;

	@media (max-width: 576px) {
		margin: 10px;
		height: 80vh;
	}
`;
export const Heading = styled.h2`
	@media (max-width: 576px) {
		font-size: 18px;
	}
`;

export const Header = styled.header`
	display: flex;
	width: 100%;
	justify-content: space-between;
	align-items: center;
	background-color: #203a43;
	padding: 20px;
	color: white;
	.logo {
		width: 100%;
		max-width: 250px;
		height: auto;
	}
	@media (max-width: 576px) {
		padding: 10px;

		.logo {
			max-width: 150px;
		}
		@media (min-width: 768px) {
			.logo {
				max-width: 300px;
				min-height: 200px;
				max-height: 300px;
			}
		}
	}
`;
export const PinStyled = styled.img`
	width: 25px;
	height: 30px;
	cursor: pointer;
	z-index: 1;
	position: relative;
	transform: translate(-50%, -100%);
`;
export const InfoWindowStyled = styled.div`
	position: absolute;
	background-color: white;
	border-radius: 5px;
	box-shadow: 0 2px 7px rgba(0, 0, 0, 0.3);
	padding: 10px;
	left: 50%;
	top: 100%;
	transform: translate(-50%, 0);
	min-width: 200px;
	max-width: 300px;
	z-index: 10;
	@media (max-width: 576px) {
		padding: 5px;
		min-width: 150px;
		max-width: 250px;
	}
`;

export const DetailsContainer = styled.div`
	position: absolute;
	background-color: white;
	border-radius: 5px;
	box-shadow: 0 2px 7px rgba(0, 0, 0, 0.3);
	padding: 10px;
	min-width: 200px;
	max-width: 300px;
	z-index: 10;
	@media (max-width: 576px) {
		padding: 5px;
		min-width: 150px;
		max-width: 250px;
	}
`;
export const ButtonContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;

export const ListContainer = styled.div`
	border: 1px solid #ccc;
	border-radius: 5px;
	padding: 15px;
	margin: 10px;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
	@media (max-width: 576px) {
		padding: 10px;
		margin: 5px;
	}
`;

export const PlaceDetailsStyled = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: flex-start;
	flex-wrap: wrap;
	border: 1px solid #ccc;
	border-radius: 5px;
	padding: 15px;
	margin: 0 auto;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
	width: 90%;
	@media (max-width: 576px) {
		padding: 10px;
		margin: 5px;
	}
`;

export const WebsideLink = styled.a`
	text-decoration: none;
	color: black;
	transition: color 0.3s;
	&:hover {
		color: blue;
	}
`;

export const OpeningHours = styled.div`
	p {
		text-transform: uppercase;
		font-weight: bold;
	}
	ul {
		display: flex;
		flex-direction: column;
		list-style: none;
		padding-left: 0;
	}
`;

export const CarouselWrapper = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	width: 100%;
	overflow: hidden;
	padding: 15px 0;
`;

export const CarouselItem = styled.div`
	flex: 0 0 auto;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0 auto;
	width: 100%;
`;

export const CarouselImage = styled.img`
	height: 400px;
	width: 90%;
	object-fit: cover;
`;
