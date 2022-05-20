import TextField from '@mui/material/TextField';
import React, { FC, ReactElement, ReactNode, useEffect, useState, Fragment } from 'react';
import styled from 'styled-components';
import { useHistory, Link } from 'react-router-dom';
import { Grid, Paper, Button } from '@mui/material';
import ErrorMessage from '../components/ErrorMessage';
import StarfieldAnimation from 'react-starfield-animation';
import Box from '@mui/material/Box';
import Navigation from 'src/components/common/Navigation';
import { useStoreActions, useStoreState } from '../store';
import SuccessMessage from '../components/SuccessMessage';
import Head from '../components/Head';
import Content from '../components/common/Content';
import Footer from '../components/common/Footer';

import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Lock } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Input, InputGroup, InputGroupAddon } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loader from '../components/common/Loader';
import { useSnackbar } from 'notistack';



const Heading = styled.h1`
    margin-top: 0;
    color: black;
    font-weight: bold;
    margin-bottom: 2rem;
`;

const FormContainer = styled(Paper)`
    max-width: 450px;
    border-radius: 5px;
    padding: 3rem;
`;

const FormField = styled(Input)`
    width: 100%;
    opacity: 1;
`;

const GridCenterItem = styled(Grid)`
    width: 100vw;
    margin-top: 7.5rem;
`;

const CustomizedButton = styled(Button)`
    margin-bottom: 2rem;
    width: 100%;
    background-color: purple !important;
    color: white !important;
`;

const LoginPage: FC = (props: any) => {

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const signIn = useStoreActions((actions) => actions.user.signIn);

    const load = useStoreActions((actions) => actions.user.loadTokenToMemory);
    const save = useStoreActions((actions) => actions.user.saveTokenToStorage);
    const setUserUsername = useStoreActions((actions) => actions.user.setUsername);
    //const loading = useStoreState((state) => state.trait.loading);

    const token = useStoreState((state) => state.user.accessToken);

    const navigate = useHistory();

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        //document.body.style.backgroundColor = '#b8860b';
        //document.body.style.backgroundColor = '#FAFAD2';
        //setLoading(true);

        const tmt = setTimeout(() => {
            setIsLoading(false);
        }, 5000);


        return () => {
            clearTimeout(tmt);
            document.body.style.backgroundColor = '';
        };
    }, []);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(false);

    const submit = async () => {
        setErrorMsg(null);

        try {
            const data = await signIn({ username, password });
            console.log('data', data.data.accessToken);
            setLoading(true);
            save(data.data.accessToken);
            setUserUsername(data.data.username);
            load();
            setLoading(false);
            window.location.reload();
            navigate.push('/');
            console.log('token', token);
        } catch (error: any) {
            console.log('errorMessage', error);

            //enqueueSnackbar('dwadawd<br> ndadwa \r', { variant: 'error' });
            const errorMessage = error.response.data.message;

            setErrorMsg(errorMessage);
        }
    };

    function goToRegister() {
        navigate.push('/register');
    }


    if (isLoading) {
        return <Loader/>;
    }

    return (
        <React.Fragment>
            <Head title={'Login Page'} />
            {errorMsg && <ErrorMessage errors={errorMsg} />}
            <Navigation />
         
            <Content>
             
                <FormContainer elevation={24}>
                        <Heading>Uživatelský login</Heading>
                        <InputGroup className={'mb-3'}>
                            <InputGroupAddon addonType="prepend">&#64;
                            </InputGroupAddon>
                            <FormField placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                type="text"
                            />
                        </InputGroup>
                        <InputGroup className={'mb-3'}>
                            <InputGroupAddon addonType="prepend">&#9919;
                            </InputGroupAddon>
                            <FormField placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                            />
                        </InputGroup>

                        <Button color={'inherit'} variant="outlined" fullWidth onClick={submit} style={{ fontWeight: 'bold', color: 'black', backgroundColor: 'white', opacity: '0.6' }}>
                            Login in
                        </Button>

                        <Button color="primary" fullWidth onClick={goToRegister} sx={{ mt: 2 }}>
                            Don't have an account? Sign up now!
                        </Button>
                    </FormContainer>
          
    
            </Content>
   
            <Footer />
        </React.Fragment>
    );
};

export default LoginPage;
