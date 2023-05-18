'use client'
import { useEffect, useState } from 'react'
import styles from './Experience.module.css'
import Image from 'next/image'

export default function Experience(){
    const [svgSrc, setSvgSrc] = useState('/toolboxLight.svg')
    useEffect(()=>{
        const checkTheme = ()=>{
            if(localStorage.getItem('JI-T') === 'light'){
                setSvgSrc('/toolboxDark.svg');
            }
            if(localStorage.getItem('JI-T') === 'dark'){
                setSvgSrc('/toolboxLight.svg');
            }
            else{
                setSvgSrc('/toolboxDark.svg');
            }
        }
        checkTheme();
        //since I'm not using context, adding a mutation observer to the html element
        //to track when it's class changes from 'light' to 'dark' on user-theme-change
        //to change the SVG icon from dark to light, appropriatly.
        const config = {
            attributes: true
        };
        const trackClassChange = (list, observer)=>{
            for(let mut of list){
                mut.target.classList[0] === 'dark' ? setSvgSrc('/toolboxLight.svg') : setSvgSrc('/toolboxDark.svg')
            }
        }
        const classChangeObserver = new MutationObserver(trackClassChange);

        classChangeObserver.observe(document.documentElement, config);
        
        return ()=> classChangeObserver.disconnect();
    },[])
    return (
        <div id='experience' className={styles.container}>
            <h2 className={styles.header}>Experience & Education</h2>
            <span className={styles.seperator}></span>
            <div className={styles.resumeContainer}>
                <div className={styles.itemContainer}>
                    <div className={styles.itemWrapper}>
                        <div className={styles.imageWrapper}>
                            <Image src={svgSrc} alt='toolbox icon' fill={true}></Image>
                        </div>
                        <div className={styles.titleWrapper}>
                            <div className={styles.topWrapper}>
                                <p className={styles.itemTitle}>Northwestern Full Stack Web Development Coding Bootcamp</p>
                                <div className={styles.rightWrapper}>
                                    {/* <span className={styles.seperator}></span> */}
                                    <p className={styles.link}>
                                        <a
                                            className={styles.link}
                                            href='https://bootcamp.northwestern.edu/coding/'
                                            target='_blank'
                                        >
                                            Northwestern University
                                        </a>
                                    </p>
                                </div>
                            </div>
                            <p className={styles.date}>April, 2023</p>
                            <ul className={styles.workedOn}>
                                <li className={styles.listItem}>
                                    Learned technologies such as <span className={styles.tech}>React</span>, <span className={styles.tech}>Node.js</span>, <span className={styles.tech}>MySQL</span>, and <span className={styles.tech}>MongoDb</span> to develop full-stack applications through a rigorous 24-week program.
                                </li>
                                <li className={styles.listItem}>
                                    Worked with the <a className={styles.link} href='https://console.cloud.google.com/apis'  target='_blank'>Google Developer Cloud Platform</a> to integrate <a className={styles.link} href='https://developers.google.com/maps' target='_blank'>Google Maps API </a> and <a className={styles.link} href='https://developers.google.com/identity/gsi/web/guides/display-google-one-tap' target='_blank'>Google One-Tap</a> sign-in features into a charity-event-hosting application on a team of four over the course of twelve days.
                                </li>
                                <li className={styles.listItem}>
                                    Developed the core search functionality and UX for a Magic The Gathering deck-creating application that leveraged the expansive <a className={styles.link} href='https://scryfall.com/docs/api' target='_blank'>Scryfall REST API </a>
                                    to allow users to dynamically search, view, and select cards from the entire MTG catalog. The application was developed on a team of three over the course of twelve days.
                                </li>
                                <li 
                                    className={styles.listItem}
                                >
                                    Utilized <a className={styles.link} href='https://www.rainforestapi.com/' target='_blank'>Rainforest API</a>, an Amazon products API, to develop search functionality and product display pages for a perfume e-commerce website where users could search for fragrances based on their preferred scents. The application was developed on a team of four over the course of twelve days.
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.itemWrapper}>
                        <div className={styles.imageWrapper}>
                            <Image src={svgSrc} alt='toolbox icon' fill={true}></Image>
                        </div>
                        <div className={styles.titleWrapper}>
                            <div className={styles.topWrapper}>
                                <p className={styles.itemTitle}>BS in Finance</p>
                                <div className={styles.rightWrapper}>
                                    {/* <span className={styles.seperator}></span> */}
                                    <p className={styles.link}>
                                        <a
                                            className={styles.link}
                                            href='https://www.cob.niu.edu/index.shtml'
                                            target='_blank'
                                        >
                                            Northern Illinois University
                                        </a>
                                    </p>
                                </div>
                            </div>
                            <p className={styles.date}>May, 2018</p>
                            <ul className={styles.workedOn}>
                                <li className={styles.listItem}>
                                    <a className={styles.link} href='https://www.cfainstitute.org/' target='_blank'>CFA</a> level II candidate. Passed CFA Level I Exam December, 2018.
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.itemWrapper}>
                        <div className={styles.imageWrapper}>
                            <Image src={svgSrc} alt='toolbox icon' fill={true}></Image>
                        </div>
                        <div className={styles.titleWrapper}>
                            <div className={styles.topWrapper}>
                                <p className={styles.itemTitle}>NJCAA Student Athlete</p>
                                <div className={styles.rightWrapper}>
                                    {/* <span className={styles.seperator}></span> */}
                                    <p className={styles.link}>
                                        <a
                                            className={styles.link}
                                            href='https://www.harpercollege.edu/index.php'
                                            target='_blank'
                                        >
                                            Harper College
                                        </a>
                                    </p>
                                </div>
                            </div>
                            <p className={styles.date}>May, 2014</p>
                            <ul className={styles.workedOn}>
                                <li className={styles.listItem}>
                                    NJCAA Division 3 Baseball, All-Area, All-Region.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}