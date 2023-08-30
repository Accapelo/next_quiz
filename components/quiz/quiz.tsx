'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import questions from '../../public/question.json';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import SwiperClass from 'swiper/types/swiper-class';
import Confetti from 'react-confetti'

export default function Quiz() {
    const [index, setIndex] = useState(-1);
    const [swiper, setSwiper] = useState<SwiperClass>();

    useEffect(()=>{
        setIndex(Number(sessionStorage.getItem("questionIndex")));
    },[])

    useEffect(()=>{
        if(swiper){
            swiper.slideTo(index, 1000, true); 
        }
    },[index])

    function answer (correct: boolean){
        var answers = JSON.parse(sessionStorage.getItem('answers')??"[]");
        var find = answers.findIndex((answer: {index: number, answer: boolean})=> answer.index === index);
        if(find !== -1){
            answers[find].answer = correct;
        }else{
            answers.push({index: index, answer: correct});  
        }
        sessionStorage.setItem(`answers`, JSON.stringify(answers));
        if(Number(sessionStorage.getItem("questionIndex")) <= index){
            sessionStorage.setItem("questionIndex", `${index+1}`);
        }
        setIndex(index+1);
    }

    function resetQuiz (){
        sessionStorage.removeItem("questionIndex");
        sessionStorage.removeItem(`answers`);
        setIndex(0);
    }

    return (
        index !== -1 &&
        <>
            {index < questions.questions.length ?
                <div className='w-full flex flex-1 items-center'>
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={"100%"}
                        allowTouchMove={false}
                        onSwiper={(swiper)=>setSwiper(swiper)}
                        initialSlide={index}
                        style={{ width: '100%', height: '100%' }}
                    >
                        {questions.questions.map((qs,i)=>{
                            return(
                                <SwiperSlide key={i}>
                                    <div className='flex justify-center items-center flex-col'>
                                        <div className='flex flex-col gap-4'>
                                            <div className='flex justify-center'>
                                                <Image
                                                    className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                                                    src={qs.image}
                                                    alt="Question image"
                                                    width={540}
                                                    height={200}
                                                    priority
                                                />
                                            </div>
                                            <div className='flex justify-between'>
                                                <button className='bg-[rgb(var(--beige))] rounded-full disabled:opacity-50 h-8 w-8 flex items-center justify-center' onClick={()=>setIndex(index-1)} disabled={index===0}>
                                                    <div className='w-6 h-6 rotate-180'>
                                                        <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M3.3335 8H12.6668" stroke="#252426" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                            <path d="M8 3.33337L12.6667 8.00004L8 12.6667" stroke="#252426" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                        </svg>  
                                                    </div>
                                                </button>
                                                <div className='text-xl'>
                                                    {`${index+1}/${questions.questions.length}`}
                                                </div>
                                                <button className='bg-[rgb(var(--beige))] rounded-full disabled:opacity-50 h-8 w-8 flex items-center justify-center' onClick={()=>setIndex(index+1)} disabled={index===Number(sessionStorage.getItem("questionIndex"))}>
                                                    <div className='w-6 h-6'>
                                                        <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M3.3335 8H12.6668" stroke="#252426" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                            <path d="M8 3.33337L12.6667 8.00004L8 12.6667" stroke="#252426" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                        </svg>   
                                                    </div>
                                                </button>
                                            </div>
                                            <div className='flex flex-col gap-4 w-full'>
                                                <h2 className='text-xl'>
                                                    {qs.question}
                                                </h2>
                                                <div className='w-full flex flex-col gap-4'>
                                                    {qs.options.map((opt)=>{
                                                        return (
                                                            <button className='py-2.5 px-6 w-full rounded-full border-2 text-base font-semibold border-[rgb(var(--beige))] transition-all hover:bg-[rgb(var(--winered))]' key={opt.option} onClick={()=>answer(opt.correct)}>{opt.option}</button>
                                                        )
                                                    })}
                                                </div>
                                            </div>  
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>
                :
                <div className='flex flex-col flex-1 items-center justify-around xl:items-center w-full'>
                    <div className='flex flex-col flex-1 justify-center w-full'>
                        <h2 className='text-xl text-center mb-4'>{`Du fick ${JSON.parse(sessionStorage.getItem('answers')??"[]").filter((val:{index: string, answer: boolean})=>val.answer === true).length} av ${questions.questions.length} rätt.`}</h2>
                        {JSON.parse(sessionStorage.getItem('answers')??"[]").filter((val:{index: string, answer: boolean})=>val.answer === true).length < (questions.questions.length/2) ?
                            <>
                                <h2 className='text-xl text-center mb-4'>{`Aj då, för ett pris krävs minst 50% rätt. Du har däremot möjligheten att prova quizet hur många gånger du vill.`}</h2>
                                <button className='underline' onClick={()=>resetQuiz()}>Försök igen</button>
                            </>
                            : 
                            <>
                                <Confetti></Confetti>
                                <h2 className='text-xl text-center mb-4 whitespace-pre-line'>{`Grattis!\nKom förbi Consid-kontoret i Skövde och fråga efter Jacob för att hämta ditt pris! Adress kan ses nedan.`}</h2>
                            </>
                        }
                    </div>
                    
                    <div className='bg-[#492A34] flex flex-col rounded overflow-hidden'>
                        <span className='p-2 text-sm'>
                            Kanikegränd 3b, 541 34 Skövde
                            <br />
                            Consid AB
                        </span>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d369.63516155049433!2d13.858082478496575!3d58.39386820697178!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465b03e717653ec3%3A0x9437066d0da712b8!2sConsid!5e0!3m2!1ssv!2sse!4v1687945558279!5m2!1ssv!2sse" width="100%" height="auto" style={{border:0}} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                 </div>    
            }
        </>
    )
}