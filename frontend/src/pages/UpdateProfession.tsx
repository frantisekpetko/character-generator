import { useEffect, useState, Fragment, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useStoreActions, useStoreState } from '../store';
import styled from 'styled-components';
import Head from '../components/Head';
import Navigation from '../components/common/Navigation';
import { TextField, Button, Fab, Box } from '@mui/material';
import Footer from '../components/common/Footer';
import * as Yup from 'yup';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Ajax from 'src/tools/Ajax';
import spinner from 'src/imagetools/loading.gif';
//import BackButton from '../components/BackButton';
import ErrorMessage from '../components/ErrorMessage';
import SuccessMessage from '../components/SuccessMessage';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


interface Extlink {
    id: number;
    link: string;
}

interface AnimalDetailUpdate {
    name?: string;
    latinname?: string;
    description?: string;
    extlinks?: {
        id: number;
        link: string
    }[];
    images?: Image[];
    createdAt?: string;
    updatedAt?: string;
}

interface Image {
    id?: number;
    urlname?: string;
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

const Image = styled.img`
    width: 20rem;
    height: 15rem;
`;

const Extlink = styled.a`
    text-decoration: underline;
    color: blue;
    font-size: 1rem;
`;

interface id {
    id?: string | undefined;
}

interface fileid {
    id?: string | undefined;
}

interface ParamsProps {
    id,
    fileid
}

const HeadingCenter = styled.div`
    text-align: center;
`;


const ExtlinkWrapper = styled.div`
    display: flex;
    direction: row;
    width: 150%;
    align-items: center;
    justify-content: center;
    height: 100%;
`;

const UpdateAnimalContent = styled.div`
  align-content: center;
  display: flex;
  justify-content: center;
  flex-direction:column;
  flex-flow: column;
  align-items: center;
  /*background-color: #F0FFF0;*/
  width: 100%;
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

function UpdateProfession() {

    const { id, fileid }: ParamsProps = useParams();
    //const getAnimal = useStoreActions((actions) => actions.animal.getUpdateAnimal);
    //const animal: any = useStoreState((state) => state.animal.animalUpdate);
    const error = useStoreState((actions) => actions.animal.error);

    const [errorMsg, setErrorMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    const [extlinks, setExtlinks] = useState(['']);
    const [formValues, setFormValues] = useState<any>(null);
    const [formErrors, setFormErrors] = useState<any>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isCheckingForm, setIsCheckingForm] = useState(false);

    const [listValues, setListValues] = useState<any>([]);

    //const updateAnimal = useStoreActions((actions) => actions.animal.updateAnimal);

    const animalRef: any = useRef({});


    const handleChange = (e, index) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        if (name === 'extlinks') {


            const data = { ...formValues };
            //data.extlinks[index] = value;
            console.error('data', data, index);
            setFormValues({ ...data });
            //console.log('data after setState', formValues, index);
            
        }
    };

    const checkForm = (e, formFieldName) => {
        e.preventDefault();
        setIsCheckingForm(true);
        const values = validate(formValues, formFieldName);
        setFormErrors({ ...values });
        setIsCheckingForm(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const values = validate(formValues, '');
        setFormErrors({ ...values });
        setSuccessMsg(null);
        setErrorMsg(null);

        try {
            //await updateAnimal({ id: animal.id, data: formValues });
            setSuccessMsg('You successfully updated this animal!');
        } catch (error: any) {
            const errorMessage = error.response.data.message;
            console.log('errorMessage', errorMessage);
            setErrorMsg(errorMessage);
        }

   

        setIsSubmitting(true);
    };

    const validate = (values, formFieldName) => {
        let errors: any = {};

        if (!isCheckingForm || formFieldName === 'name') {
            if (!values.name) {
                errors.name = "Required";
            }
        }

        if (!isCheckingForm || formFieldName === 'fileid') {
            if (!values.fileid) {
                errors.fileid = "Required";
            } 
        }

        if (!isCheckingForm || formFieldName === 'description') {
            if (!values.description) {
                errors.description = "Required";
            }
        }

        console.error('errors', errors);
        return errors;
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Required'),
        latinname: Yup.string()
            .required('Required'),
        description: Yup.string()
            .required('Required'),
        fileid: Yup.string()
        .required('Required'),
        /*Yup
            .string()
            .matches(
                /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                'Enter correct url!'
             )
            .required('Required')*/
    });

    useEffect(() => {
        async function getData() {
            try {
                //await getAnimal(id);
                //console.log('id', id)
                //console.log('animal', animal);

                const { data }: any = await Ajax.get(`trade/${fileid}/${id}`);
             
                const {data:list }: any = await Ajax.get(`trade/list`);
                setListValues([...list])
                setFormValues({...data});


             
            }
            catch (e) {
                console.error(e);
            }

        }
        getData();
    }, []);




    function addNewExtlink() {
        let tempData:any = { ...formValues };
        tempData?.extlinks?.push('');
        setFormValues({ ...tempData });

        console.log('tempData', tempData);

        setExtlinks((previousState) => [...previousState, '']);
    }

    function removeExtlink(id) {
        let tempData: any | null = { ...formValues};
        const values = tempData?.extlinks?.filter((item, index) => {
            return id !== index;
        });
        console.log('values', values)
        tempData.extlinks = [...values  ];

        extlinks.filter((item, index) => {
            const idx = extlinks.indexOf(item);
            return id !== index;
        });
        setFormValues({ ...tempData });
        setExtlinks([...extlinks]);
        console.log('tempData', tempData)
  
    }

    const history = useHistory();

    return (
        <>
            <Head title={'Update Animal'} />
            {errorMsg && <ErrorMessage errors={errorMsg} />}
            {successMsg && <SuccessMessage message={successMsg} />}
            <Navigation />
            {/* <BackButton /> */}
            <HeadingCenter>
                <h2 className={'heading'}>Update Profession</h2>
            </HeadingCenter>
  
            {
                (formValues && Object.keys(formValues).length > 0)
                ?
                <form>
                    <UpdateAnimalContent>
                        <InputField
                            error={formErrors?.name ? true : false}
                            id="filled-error-helper-text"
                            label="Name"
                            helperText={formErrors?.name
                                ? formErrors.name
                                : null}
                            variant="filled"
                            onChange={(e) => handleChange(e, null)}
                            onBlur={(e) => checkForm(e, e.target.name)}
                            type="text"
                            name="name"
                            value={formValues?.name}
                        />

                        <InputField
                            id="filled-multiline-static"
                            label="Description"
                            multiline
                            rows={7}
                            error={ formErrors.description? true : false}
                            variant="filled"
                            value={formValues.description}
                            helperText={formErrors.description 
                                ? formErrors.description
                                : null}
                            onChange={(e) => handleChange(e, null)}
                            onBlur={(e) => checkForm(e, e.target.name)}
                            type="text"
                            name="description"
                        />

                        <FormControl sx={{width: '17rem'}}>
                        
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                error={ formErrors.fileid? true : false}
                                variant="filled"
                                value={formValues.fileid}
                                onChange={(e) => handleChange(e, null)}
                                onBlur={(e) => checkForm(e, e.target.name)}
                                type="text"
                                name="fileid"
                                label="sector"
                                
                                >
                                {listValues.map((item, index)=> {
                                    return <MenuItem key={index} value={item.fileid}>{item.name}</MenuItem>
                                })}
                             
                        
                                
                                </Select>
                        </FormControl>

                        <Button style={{ width: '17rem', marginTop: '2rem' }} variant="contained" color="inherit" onClick={(e) => {
                            console.log('onClick');
                            handleSubmit(e);
                            
                        }}>
                           Update
                        </Button>

                    </UpdateAnimalContent>
                </form>
                    : <>
                        <div className={'grid-middle'}>
                            <img src={spinner} alt={'spinner'} />
                        </div>
                      </>}
            {

            }
          
        </>
    );
}

export default UpdateProfession;