import { useEffect, FC, useRef, useState } from 'react';
import styled from 'styled-components';
import Head from '../components/Head';
import Navigation from '../components/common/Navigation';
import Footer from '../components/common/Footer';
import Content from '../components/common/Content';
import { Grid, TextField, Button, Fab, Box, autocompleteClasses, Collapse, ListSubheader } from '@mui/material';
import { useFormik, Formik, FormikProps, Form } from 'formik';
import * as Yup from 'yup';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Ajax from 'src/tools/Ajax';
import { toast } from 'react-toastify';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

const Container = styled.div`
    background-color: white;
    color: black;
    height: 100vh;
`;

const InputField = styled(TextField)`
    margin-bottom: 1rem !important;
    width: 17rem;
`;

const CreateCategoryContent = styled(Form)`
  align-content: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction:column;
  flex-flow: column;
  align-items: center;
  /*background-color: #F0FFF0;*/
  height: 100%;
  margin: 0 auto;
  background-color: white;
  text-align: center;
  padding-bottom: 5rem;
  margin-top: 2rem;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding-left: 5rem;
  padding-right: 5rem;
`;

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}

      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
  }
  
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }



function CreateProfession() {
    const username = sessionStorage.getItem('username');
    console.log(username)
    const [value, setValue] = useState(0);
    const [trades, setTrades] = useState<any[]>([]);
    const history = useHistory();

    const [open, setOpen] = useState<any[]>([]);
    
    const handleClick = (index) => {
        let tempOpen: boolean[] = [];
        open.forEach((bool, i) => {
            if(i === index) {
                tempOpen.push(!bool);
                console.log(!bool);
            }
            else {
                tempOpen.push(bool);
            }
        })
        setOpen([...tempOpen]);
        console.log({open});
    };

    useEffect( () => {
        
        (async () =>  
        {
            const {data}: any=  await Ajax.get('/trade');
            
            setOpen([...Array(data.length).fill(false)]);
            console.log('data', data);
            setTrades(data);
            
        })();
     

    }, [])

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

    const tradesIndexRef: any = useRef({
        fileid: '',
        name: ''
    });

    const validationSchema = Yup.object().shape({
        fileid: Yup.string()
            .required('Required'),
        name: Yup.string()
            .required('Required'),
    });

    return (
        <>
        <Container>
            <Head title={'Character Generator'} />
            <Navigation />
            <>
                <Content>
                <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center', alignContent: 'center', textAlign: 'center', alignItems: 'center' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Professions Houses" {...a11yProps(0)} />
                        <Tab label="Categorized data" {...a11yProps(1)} />
                        <Tab label="Item Three" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                <Formik initialValues={tradesIndexRef.current}
                onSubmit={async values => {
                    // same shape as initial values
                    //const {data} = await Ajax.post('/trade', {values});
                    Ajax.post('/trade', values)
                    .then( () => {
                        toast.success( `Successfully created category!`,
                        {position: toast.POSITION.TOP_RIGHT, autoClose:5000}
                    )})
                    .catch((e) => {toast.error( `${e}`,
                        {position: toast.POSITION.TOP_RIGHT, autoClose:5000}
                    )})
  
                console.log(values);
             
                }}
                validationSchema={validationSchema}
                >
                    {formik => (
                        <>
                    <h2 className={'heading'}>
                        Professions houses
                    </h2>
                    <CreateCategoryContent>
                    <InputField
                        label="FileId"

                        variant="filled"
                
                        type="text"
                        name="fileid"

                        
                        error={formik.touched?.fileid && formik.errors?.fileid ? true : false}
                        id="filled-error-helper-text"
                        value={formik.values?.fileid}
                        helperText={formik.touched.fileid && formik.errors?.fileid
                            ? formik.errors.fileid
                            : null}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <InputField
                        label="Name"

                        variant="filled"
                
                        type="text"
                        name="name"

                        error={formik.touched?.name && formik.errors?.name ? true : false}
                        id="filled-error-helper-text"
                        value={formik.values?.name}
                        helperText={formik.touched.name && formik.errors?.name
                            ? formik.errors.name
                            : null}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                     <Button style={{ width: '17rem', marginTop: '2rem' }} variant="contained" color="inherit" type="submit">Create Category</Button>
                  
                    </CreateCategoryContent>
                    </>
                    )}</Formik>
                </TabPanel>
                <TabPanel value={value} index={1}>
                <List
                    sx={{ width: '50%', maxWidth: 360, bgcolor: 'background.paper', margin: '0 auto', borderTop: 'solid 1px grey' }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                      <ListSubheader component="div" id="nested-list-subheader">
                        Nested List Items
                      </ListSubheader>
                    }
                    >
                    {trades.map((item, index) => {
                    return <ListItem disablePadding  key={index} style={{width: '100%', display: 'flex', alignItems: 'flex-start', flexDirection: 'column', borderBottom: 'solid 1px grey'}}>
                        <ListItemButton  onClick={() => handleClick(index)} sx={{width: '100%'}}>
                            <ListItemText primary={item.sector} />
                            {open[index] ? <ExpandLess /> : <ExpandMore />}
                             
                     
                        </ListItemButton>
                        <Collapse in={open[index]} timeout="auto" unmountOnExit sx={{paddingLeft: '2rem', width: '100%'}}>
                            <List component="div" disablePadding sx={{width: '100%'}}>
                            {item.profession.map((trade, index) => {
                                return <ListItemButton key={index} sx={{width: '100%'}} onClick={() => history.push(`/trades/${item.fileid}/${index}`)}>
                                    <ListItemText primary={trade.name} />
                                </ListItemButton>
                            })}     
                          
                            </List>
                        </Collapse>
                    </ListItem>
                    })}
              
                   
                  
                    </List>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Item Three
                </TabPanel>
                </Box>
     
                </Content>


            </>
   
        </Container>
     
        </>
    );
}

export default CreateProfession;