import { useEffect, FC } from 'react';
import styled from 'styled-components';
import Head from '../components/Head';
import Navigation from '../components/common/Navigation';
import { Grid } from '@mui/material';
import Footer from '../components/common/Footer';
import Content from '../components/common/Content';

const Container = styled.div`
    background-color: white;
    color: black;
    height: 100vh;
`;

function CreateCharacter() {
    const username = sessionStorage.getItem('username');
    console.log(username)
    return (
        <Container>
            <Head title={'Zoo Admin'} />
            <Navigation />
            <>
                <Content>
                    <h2 className={'heading'}>
                        Hey {username}, You are at CreateCharacter Page!
                    </h2>
                </Content>
            </>
            <Footer />
        </Container>
    );
}

export default CreateCharacter;