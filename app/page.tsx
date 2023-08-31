import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 justify-center text-center">
        <h1 className={`mb-4 text-2xl font-semibold`}>
          Välkommer till Consids kod-quiz!
        </h1>
        <h2 className={`mb-8 text-xl font-semibold`}>
          Klara quizet och vinn pris från Consids kontor i Skövde.
        </h2>
        <Link role="button" className='py-2.5 px-6 rounded-full border-2 text-base font-semibold border-[rgb(var(--beige))] transition-all hover:bg-[rgb(var(--winered))]' tabIndex={1} href={"/quiz"}> Starta test </Link>
    </div>
  )
}
