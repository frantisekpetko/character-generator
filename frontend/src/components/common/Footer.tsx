import React from 'react';
import styled from 'styled-components';

const FooterElement = styled.footer`
    border-top: solid black medium;
    width: 100%;
    height: 125px;
    //background-color: #64aa66;
    position: absolute;
    bottom: 0;
    //color: #c0c0c0;
    color: black;
    font-weight: bolder;
    transition: background-color 2s;
    -webkit-transition: background-color 2s;
    z-index: 2000;
    &:hover {
        background-color: #3D46A5;
        color: white;
        border-color: black;
    }
`;

const HandWrited = styled.span`
    font-family: 'Kaushan Script', cursive;
    font-size: 2rem;
`;

const FooterCustomText = styled.span`
    font-family: 'Special Elite', cursive;
`;

const Footer = (props) => {
    return (
        <>
            <FooterElement
                className={
                    !props.positionAbsolute
                        ? 'text-center pt-3 pb-3 mb-3 border-silver border-medium'
                        : 'text-center pt-3 pb-3 border-silver border-medium static-position'
                }
                style={{zIndex: 9999999999999}}
            >
                <FooterCustomText>
                    Copyright&copy; {new Date().getFullYear()}
                    <br />
                </FooterCustomText>
                <HandWrited>
                    {' '}
                    Created by František Petko <br />
                </HandWrited>
                {/* <FooterCustomText>Powered by NodeJS, NestJS, ReactJS, MUI and my skills.</FooterCustomText> */}
            </FooterElement>
        </>
    );
};

export default Footer;
