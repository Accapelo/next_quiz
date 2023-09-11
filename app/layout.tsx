import './globals.css'
import localFont from 'next/font/local'
import Image from 'next/image'

const font = localFont({ src: "../public/fonts/Plus_Jakarta_Sans/PlusJakartaSans-VariableFont_wght.ttf" })

export const metadata = {
  title: 'Consid kod-quiz',
  description: 'Klara av frågorna och vinn ett pris av Consid',
}

//This is used to go from testing locally "/" to hosted on gh-pages "./"
export const FILE_PRETENSE = "./";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sv" className='h-full'>
      <head>
        <link rel='icon' href='/favicon.png'/>
      </head>
      <body className={`${font.className} h-full`}>
        <main className="flex h-full flex-col items-center justify-between p-12">
          <div className="relative flex place-items-center">
            <Image
              src={`${FILE_PRETENSE}images/Consid-logo-liggande-vit.png`}
              alt="Consid Logo"
              width={180}
              height={40}
              priority
            />
          </div>
          {children}    
        </main> 
      </body>
    </html>
  )
}
