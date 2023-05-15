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
					<SocialIcon href='#!'>
						<MDBIcon fab icon='facebook-f' />
					</SocialIcon>

					<SocialIcon href='#!'>
						<MDBIcon fab icon='twitter' />
					</SocialIcon>

					<SocialIcon href='#!'>
						<MDBIcon fab icon='google' />
					</SocialIcon>

					<SocialIcon href='#!'>
						<MDBIcon fab icon='instagram' />
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
