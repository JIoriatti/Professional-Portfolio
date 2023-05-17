import Link from 'next/link'
import styles from './page.module.css'
import { League_Spartan, Cinzel_Decorative } from 'next/font/google'
import LearnMore from './(homeComponents)/LearnMore'
import Experience from './(homeComponents)/Experience'
import About from './(homeComponents)/About'

//Aria font
const league = League_Spartan({ subsets: ['latin'], weight:['800', '900'] })
//DeckBuilder font
const yuji = Cinzel_Decorative({subsets: ['latin'], weight: ['400','700','900']})



export default function HomePage(){

    return (
            <main className={styles.main}>
                <div 
                    className={styles.container}
                    id='container'
                >
                    <div className={styles.introWrapper}>
                        <div className={styles.intro}>
                            Hey there, <br></br>{`I'm `}
                            <h1 className={styles.name}>
                                {`James Ioriatti.`}
                            </h1>
                            <br></br>
                            {`I build applications for the web.`}
                            <br></br>
                        </div>
                        <div className={styles.subHeaderWrapper}>
                            <p className={styles.subHeader}>
                                Full Stack Web Developer.
                            </p>
                            <Link
                                href={'/projects'}
                                style={{
                                    all: 'unset'
                                }}
                            >
                                <span className={styles.checkOut}>Check out my work.</span>
                            </Link>
                        </div>
                        <LearnMore />
                    </div>
                    <Experience />
                    <About />
                    <Link
                        href={'/projects'}
                        style={{
                            all: 'unset',
                            alignSelf: 'center',
                            marginTop: '3em'
                        }}
                    >
                        <span 
                            className={styles.checkOut}>Check out my work.</span>
                    </Link>
                </div>
            </main>
    )
}