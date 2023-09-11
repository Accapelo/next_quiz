'use client';
import { SetStateAction, useEffect, useState } from 'react';
import Image from 'next/image';
import questions from '../../public/question.json';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import SwiperClass from 'swiper/types/swiper-class';
import { FILE_PRETENSE } from '@/app/layout';

export default function QuizSwiper({index, setIndex}: {index: number, setIndex: (value: SetStateAction<number>) => void}) {
    const [swiper, setSwiper] = useState<SwiperClass>();

    useEffect(()=>{
        if(swiper){
            swiper.slideTo(index, 1000, true); 
        }
    },[index])

    function answer (optionIndex: number){
        var answers = JSON.parse(sessionStorage.getItem('answers')??"[]");
        var find = answers.findIndex((answer: {index: number, optionIndex: number})=> answer.index === index);
        if(find !== -1){
            answers[find].optionIndex = optionIndex;
        }else{
            answers.push({index: index, optionIndex: optionIndex});  
        }
        sessionStorage.setItem(`answers`, JSON.stringify(answers));
        if(Number(sessionStorage.getItem("questionIndex")) <= index){
            sessionStorage.setItem("questionIndex", `${index+1}`);
        }
        setIndex(index+1);
    }

    return (
        <>
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
                            <SwiperSlide style={{display: "flex"}} key={i}>
                                <div className='flex justify-center items-center flex-col flex-1'>
                                    <div className='flex flex-col gap-4'>
                                        <div className='flex justify-center'>
                                            <Image
                                                className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                                                src={`${FILE_PRETENSE}${qs.image}`}
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
                                                {qs.options.map((opt, i)=>{
                                                    return (
                                                        <button className='py-2.5 px-6 w-full rounded-full border-2 text-base font-semibold border-[rgb(var(--beige))] transition-all hover:bg-[rgb(var(--winered))]' key={opt.option} onClick={()=>answer(i)}>{opt.option}</button>
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
        </>
    )
}