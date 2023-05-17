'use client'

import styles from './LearnMore.module.css'


export default function LearnMore(){
    
    const handleClick = (e) =>{
        const container = document.getElementById('container');
        const scrollToElement = document.getElementById('experience');
        // container.scrollBy({
        //     top: 1000,
        //     behavior: 'smooth'
        // })
        scrollToElement.scrollIntoView({
            behavior: 'smooth'
        });
    }

    return (
        <div className={styles.container}>
            <span 
                className={styles.more}
                onClick={handleClick}
            >More about me.
            </span>
        </div>
    )
}