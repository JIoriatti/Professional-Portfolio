import './globals.css'
import { Exo, Quantico, Jura, Forum, Michroma, Cinzel_Decorative, Marcellus_SC, Roboto, Gowun_Batang, Yuji_Syuku, League_Spartan  } from 'next/font/google'
import Header from './(components)/Header'
import ContactButton from './(components)/ContactButton'
import Footer from './(components)/Footer'
const exo = Exo({ subsets: ['latin'], weight: ['100','200','300','400','500','600','700','800','900'], display: 'swap' })
//Tron font
const quantico = Quantico({subsets: ['latin'], weight: ['400', '700']})
const jura = Jura({subsets: ['greek'], weight: ['300','400','500','600','700']})
const forum = Forum({subsets: ['cyrillic'], weight: ['400']})
const michroma = Michroma({subsets:['latin'], weight: ['400']})
//Roman font
const cinzel = Cinzel_Decorative({subsets:['latin'], weight:['400','700','900']})

const roboto = Roboto({subsets:['cyrillic'], weight:['100','300','900']})

export const metadata = {
  title: 'James Ioriatti',
  description: `James Ioriatti's full-stack web development portfolio.`,
}

//future dev theme-colors
const themes = {
  Roman: //Lime-stone white/dark red, 
  0,
  Oni: //black(off-black)/deep-red/gold,
  0,
  Tron: //dark-deep-blue-grey/blue/neon-blue,
  0,
  Timberland: //deep green/dark-brown
  0,
}


export default function RootLayout({ children }) {
  return (
    <html lang="en" className='light' style={exo.style}>
      <body className={exo.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
