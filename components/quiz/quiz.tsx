'use client';
import questions from '../../public/question.json';
import 'swiper/css';
import QuizSwiper from './quizSwiper';
import { useEffect, useState } from 'react';
import Form from '../form/form';
import { FILE_PRETENSE } from '@/app/layout';
import { office, submitInfo } from '../form/types';
import Win from './win';
import Loss from './loss';

export default function Quiz() {

    const [index, setIndex] = useState(-1);
    const [submittedOffice, setSubmittedOffice] = useState<office>();
    const [errorText, setErrorText]= useState("");

    useEffect(()=>{
        setIndex(Number(sessionStorage.getItem("questionIndex")));
        if(sessionStorage.getItem("office")){
            setSubmittedOffice(JSON.parse(sessionStorage.getItem("office")??"{}"));
        }
    },[])

    function resetQuiz(){
        sessionStorage.removeItem("questionIndex");
        sessionStorage.removeItem(`answers`);
        setIndex(0);
    }

    const submitAPI = async (info: submitInfo, office: office) => {
        try{
            const res = await fetch(`${FILE_PRETENSE}api/mailchimp`, {
                method: 'POST',
                body: JSON.stringify(info)
            });
            if(!res.ok){
                setErrorText("Fyll i alla fält med information*");
            }else{
                setSubmittedOffice(office);
                sessionStorage.setItem(`office`, JSON.stringify(office));
                setErrorText("");
            }
        }catch (error){
            console.log("Error:", error);
        }
    }

    function calculateResults(){
        let correct = 0;
        let answers = JSON.parse(sessionStorage.getItem('answers')??"[]");
        answers.forEach((ans: {index: number, optionIndex: number}) => ans.optionIndex === questions.questions[ans.index].correctIndex && correct++);
        return correct;
    }

    return (
        index !== -1 &&
        <>
            {index < questions.questions.length ?
                <QuizSwiper 
                    index={index} 
                    setIndex={setIndex}
                />
                :
                <div className='flex flex-col flex-1 items-center justify-around xl:items-center w-full'>
                    {calculateResults() >= (questions.questions.length/2) ?
                        !submittedOffice ? 
                            <Form
                                submit={submitAPI}
                                errorText={errorText}
                            />
                            :
                            <Win result={calculateResults()} officeInfo={submittedOffice} />
                    : 
                        <Loss result={calculateResults()} resetQuiz={resetQuiz}/>
                    }
                </div>    
            }
        </>
    )
}