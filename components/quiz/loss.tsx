'use client';
import questions from '../../public/question.json';
import 'swiper/css';

export default function Loss({resetQuiz, result}: {resetQuiz: () => void, result: number}) {


    return (
        <>
            <div className='flex flex-col flex-1 justify-center w-full'>
                <h2 className='text-xl text-center mb-4'>{`Du fick ${result} av ${questions.questions.length} rätt.`}</h2>
                    <>
                        <h2 className='text-xl text-center mb-4'>{`Aj då, för ett pris krävs minst 50% rätt. Du har däremot möjligheten att prova quizet hur många gånger du vill.`}</h2>
                        <button className='underline' onClick={()=>resetQuiz()}>Försök igen</button>
                    </>
            </div>
        </>
    )
}