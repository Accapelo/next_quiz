'use client';
import { useEffect, useState } from 'react';
import { office, submitInfo } from './types';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

export default function Form({submit, errorText}: {submit: (info: submitInfo, office: office) => Promise<void>, errorText: string}) {
    const [offices, setOffices] = useState<office[]>([]);
    const [selectedOfficeIndex, setSelectedOfficeIndex] = useState(0);
    const [userInfo, setUserInfo] = useState({email: "", firstName: "", lastName: ""});

    useEffect(()=>{
        fetchOffices();
    },[])

    async function fetchOffices(){
        const res = await fetch(
            "https://cms.consid.net/wp-json/wp/v2/offices?lang=sv&getall=true&_fields=title,acf.hr_manager,acf.map",
            {
                method: 'GET',
            });
        const data = await res.json();
        setOffices(data);
    }

    return (
        offices.length > 0 &&
            <div className='absolute top-0 bottom-0 right-0 left-0 bg-[rgba(0,0,0,0.3)] flex justify-center items-center'>
                <div className='flex flex-col gap-8 p-8'>
                    <div>
                        <h2 className='text-center'>Fyll i din kontaktinformation för att få reda på ditt resultat!</h2>
                        {errorText.length>0 && <p className='text-center text-sm italic mt-2'>{errorText}</p>}
                    </div>
                    <div className='flex flex-col gap-2'>
                        <TextField
                            value={userInfo.firstName}
                            onChange={(event) => setUserInfo({...userInfo, firstName: event.target.value})}
                            sx={{
                                color: 'rgb(var(--beige)) !important',
                                '& label.Mui-focused': {
                                    color: 'rgb(var(--beige)) !important',
                                },
                                '& .MuiInput-underline:before': {
                                    borderBottomColor: 'rgb(var(--beige)) !important',
                                },
                                '& .MuiInput-underline:after': {
                                    borderBottomColor: 'rgb(var(--beige)) !important',
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'rgb(var(--beige)) !important',
                                },
                                '& .MuiInput-root': {
                                    color: 'rgb(var(--beige)) !important',
                                },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'rgb(var(--beige)) !important',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'rgb(var(--beige)) !important',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'rgb(var(--beige)) !important',
                                    },
                                },
                            }} 
                            label="Förnamn*" 
                            variant="standard"
                        />
                        <TextField 
                            value={userInfo.lastName}
                            onChange={(event) => setUserInfo({...userInfo, lastName: event.target.value})}
                            sx={{
                                color: 'rgb(var(--beige)) !important',
                                '& label.Mui-focused': {
                                    color: 'rgb(var(--beige)) !important',
                                },
                                '& .MuiInput-underline:before': {
                                    borderBottomColor: 'rgb(var(--beige)) !important',
                                },
                                '& .MuiInput-underline:after': {
                                    borderBottomColor: 'rgb(var(--beige)) !important',
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'rgb(var(--beige)) !important',
                                },
                                '& .MuiInput-root': {
                                    color: 'rgb(var(--beige)) !important',
                                },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'rgb(var(--beige)) !important',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'rgb(var(--beige)) !important',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'rgb(var(--beige)) !important',
                                    },
                                },
                            }}
                            label="Efternamn*"
                            variant="standard" 
                        />
                        <TextField 
                            value={userInfo.email}
                            onChange={(event) => setUserInfo({...userInfo, email: event.target.value})}
                            sx={{
                                '& label.Mui-focused': {
                                    color: 'rgb(var(--beige)) !important',
                                },
                                '& .MuiInput-underline:before': {
                                    borderBottomColor: 'rgb(var(--beige)) !important',
                                },
                                '& .MuiInput-underline:after': {
                                    borderBottomColor: 'rgb(var(--beige)) !important',
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'rgb(var(--beige)) !important',
                                },
                                '& .MuiInput-root': {
                                    color: 'rgb(var(--beige)) !important',
                                },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'rgb(var(--beige)) !important',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'rgb(var(--beige)) !important',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'rgb(var(--beige)) !important',
                                    },
                                },
                            }}
                            label="Epost*" 
                            variant="standard" 
                        />
                    </div>
                    <FormControl 
                        fullWidth
                    >
                        <InputLabel
                            id="select-label" 
                            className='!text-[rgb(var(--beige))]'
                        >
                            Kontor*
                        </InputLabel>
                        <Select
                            labelId="select-label"
                            label="Kontor"
                            value={selectedOfficeIndex}
                            onChange={(event) => setSelectedOfficeIndex(Number(event.target.value))}
                            sx={{
                                color: '[rgb(var(--beige))]',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'rgb(var(--beige)) !important'
                                },
                                '& .MuiSvgIcon-root': {
                                    color: 'rgb(var(--beige)) !important'
                                },
                                "&:focus": {
                                    borderColor: 'rgb(var(--beige)) !important',
                                },
                                '&:before': {
                                    borderColor: 'rgb(var(--beige)) !important',
                                },
                                '&:after': {
                                    borderColor: 'rgb(var(--beige)) !important',
                                },
                            }}
                        >
                            {offices.map((office:office, i: number)=>{
                                return (
                                    <MenuItem key={i} value={i}>
                                        {office.title.rendered}
                                    </MenuItem>
                                )
                            })} 
                        </Select>
                    </FormControl>
                    <button className='py-2.5 px-6 w-full rounded-full border-2 text-base font-semibold border-[rgb(var(--beige))] transition-all hover:bg-[rgb(var(--winered))]' onClick={()=>submit({firstName: userInfo.firstName, lastName: userInfo.lastName, email: userInfo.email, office: [offices[selectedOfficeIndex].title.rendered]}, offices[selectedOfficeIndex])}>Skicka in</button>
                </div>  
            </div>
    )
}