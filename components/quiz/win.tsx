'use client';
import questions from '../../public/question.json';
import 'swiper/css';
import Confetti from 'react-confetti'
import { office } from '../form/types';

export default function Win({result, officeInfo}:{result: number, officeInfo: office}) {

    return (
        <>
            <div className='flex flex-col flex-1 justify-center w-full'>
                <h2 className='text-xl text-center mb-4'>{`Du fick ${result} av ${questions.questions.length} rätt.`}</h2>
                <Confetti></Confetti>
                <h2 className='text-xl text-center mb-4 whitespace-pre-line'>{`Grattis!\nVänta på ett mail från HR och kom sedan förbi Consid-kontoret i ${officeInfo.title.rendered} för att hämta ditt pris! Adress kan ses nedan.`}</h2>
            </div>
            <div className='bg-[#492A34] flex flex-col rounded overflow-hidden'>
                <span className='p-2 text-sm'>
                    {officeInfo.acf.map.address}
                    <br />
                    Consid AB
                </span>
                <a className='p-2 text-base underline' href={`https://www.google.com/maps/place/?q=place_id:${officeInfo.acf.map.place_id}`}>Hitta kontoret via google maps</a>
            {/*                 
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d369.63516155049433!2d13.858082478496575!3d58.39386820697178!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465b03e717653ec3%3A0x9437066d0da712b8!2sConsid!5e0!3m2!1ssv!2sse!4v1687945558279!5m2!1ssv!2sse" width="100%" height="auto" style={{border:0}} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
             */}
            </div>
        </>      
)
}