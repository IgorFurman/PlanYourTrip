import React from 'react';

import { MDBIcon, MDBBtn, MDBImg } from 'mdb-react-ui-kit';

import {
	SocialIcon,
	FooterContainer,
	FooterSection,
	FooterCompanyName,
	StyledFooter,
	LogoContainer,
} from '../styles';

import LogoImg from '../images/PlanYourTrip-logo.png';

const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<StyledFooter>
			<FooterContainer>
				<FooterSection>
					<h2>Znajdź nas na social mediach</h2>
					<SocialIcon href='#!'>
					<MDBIcon fab icon='facebook' style={{ color: '#3b5998' }} />
					</SocialIcon>

					<SocialIcon href='#!'>
						<MDBIcon fab icon='twitter'  style={{ color: '#1da1f2' }}/>
					</SocialIcon>

					<SocialIcon href='#!'>
						<MDBIcon fab icon='google'  style={{ color: '#db4437' }}/>
					</SocialIcon>

					<SocialIcon href='#!'>
						<MDBIcon fab icon='instagram'  style={{ color: '#c32aa3' }} />
					</SocialIcon>
				</FooterSection>
			</FooterContainer>

			<FooterCompanyName>
				© {currentYear} Copyright:
				<a>
					{' '}
					<LogoContainer>
						<img src={LogoImg} alt='logo firmy' />
					</LogoContainer>
				</a>
			</FooterCompanyName>
		</StyledFooter>
	);
};

export default Footer;
