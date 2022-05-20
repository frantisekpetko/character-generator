import React, { useEffect, FC } from 'react';
import styled from 'styled-components';
import Head from '../components/Head';
import Navigation from '../components/common/Navigation';
import { Grid } from '@mui/material';
import Footer from '../components/common/Footer';
import Content from '../components/common/Content';
import {toast} from 'react-toastify';


const Container = styled.div`
    background-color: white;
    color: black;
    height: 100vh;
`;

function HomePage() {
    const username = sessionStorage.getItem('username');
    console.log(username)
    useEffect(()=> {
        toast.success( `Hey ${username}, You are logged in !`,{
            // Set to 15sec
            position: toast.POSITION.TOP_RIGHT, autoClose:5000})

    })

    return (
      <Container>
          <Head title={'Character Generator'} />
          <Navigation />
          <>
              <Content>
                  <h2 className={'heading'}>
                        Hey {username}, You are logged in !
                  </h2>
              </Content>
          </>
          <Footer />
      </Container>
    );
}

export default HomePage;
