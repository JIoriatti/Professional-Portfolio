'use client'
import styles from './DetailsSection.module.css'
import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'

const VISIBILITY_THRESH = 1.05

export default function DetailsSection({project}){
    const containerRef = useRef();
    const sectionRefs = useRef([]);
    const pageHeightRef = useRef(0);

    const [sectionWidth, setSectionWidth] = useState(0);
    const [showSection, setShowSection] = useState({})
   

    
    useEffect(()=>{
        //initializing values on mount
        pageHeightRef.current = document.querySelector('body').getBoundingClientRect().height;
        setSectionWidth(sectionRefs.current[0].getBoundingClientRect().width);

        //initialize show/hide state on load (for mobile due to hero not taking up full screen height)
        sectionRefs.current.forEach((section,i)=>{
            setShowSection((prevState)=>{
                    return (section.getBoundingClientRect().top < pageHeightRef.current / VISIBILITY_THRESH) ? {...prevState, [i]: true} : {...prevState}
                })
        })
    },[sectionWidth])
    
    useEffect(()=>{
        const trackScroll = (e) =>{
            sectionRefs.current.forEach((section,i)=>{
                setShowSection((prevState)=>{
                        return (section.getBoundingClientRect().top < pageHeightRef.current / VISIBILITY_THRESH) ? {...prevState, [i]: true} : {...prevState}
                    })
            })
        }
        document.body.addEventListener('scroll', trackScroll)
        
        return ()=> document.body.removeEventListener('scroll', trackScroll)
    },[])
    return (
        <motion.div 
            className={styles.container}
            ref={containerRef}
        >
            {project.features.map((feature, i) => {
                return <div 
                            key={i} 
                            className={styles.sectionWrapper}
                        >
                            <motion.div
                                key={i}
                                className={styles.section}
                                ref={(ref) => {
                                    if (!sectionRefs.current.includes(ref) && ref != null) {
                                        sectionRefs.current.push(ref)
                                    }
                                }}
                                
                                initial={false}
                                animate={ showSection[i] ? 
                                {
                                    // x: 0,
                                    // y: 0,
                                    // originX: i % 2 === 0 ? 1 : 0,
                                    // originY: i % 2 === 0 ? 1 : 0,
                                    opacity: 1,
                                } : 
                                {
                                    // x: i % 2 === 0 ? -sectionWidth : sectionWidth,
                                    // y: i % 2 === 0 ? -100 : 100,
                                    // originX: i % 2 === 0 ? 1 : 0,
                                    // originY: i % 2 === 0 ? 1 : 0,
                                    opacity: 0,
                                }}
                                transition={{
                                    duration: 1,
                                    ease: 'easeInOut'
                                }}
                                style={{
                                    order: i % 2 === 0 ? 0 : 1,
                                }}
                            >
                                <div className={styles.descriptionContainer}>
                                    <motion.h3 
                                        className={styles.header}
                                        animate={{
                                            opacity: showSection[i] ? 1 : 0
                                        }}
                                        transition={{
                                            duration: 1,
                                            ease: 'easeInOut',
                                            delay: 0.75
                                        }}
                                    >
                                        {Object.keys(feature)[0]}
                                    </motion.h3>
                                    <motion.span 
                                        className={styles.divider}
                                        animate={{
                                            opacity: showSection[i] ? 1 : 0
                                        }}
                                        transition={{
                                            duration: 1,
                                            ease: 'easeInOut',
                                            delay: 0.75
                                        }}
                                    ></motion.span>
                                    <motion.p 
                                        className={styles.description}
                                        initial={{opacity: 0}}
                                        animate={{opacity: showSection[i] && 1}}
                                        transition={{
                                            duration: 1,
                                            ease: 'easeInOut',
                                            delay: 0.75
                                        }}
                                    >
                                        {Object.values(feature)[0]}
                                    </motion.p>
                                </div>
                            </motion.div>
                        </div>
            })}
        </motion.div>
    )
}