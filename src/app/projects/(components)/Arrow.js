
import styles from './Arrow.module.css'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Arrow({ 
    left, 
    itemsRef, 
    trackRef, 
    clickId, 
    trackRefWidth, 
    isCarouselHovered, 
    setIsCarouselHovered, 
    project}) {

    const [isArrowHovered, setIsArrowHovered] = useState(false)
    const handleTranslate = (e)=>{
        trackRef.current.style.transition = 'transform 0.5s ease'
        if(e.target.dataset.id === '0'){
            clickId.current = 0
            trackRef.current.style.transform = `translate3d(${trackRefWidth}px, 0, 0)`
        }
        if(e.target.dataset.id === '1'){
            clickId.current = 1
            trackRef.current.style.transform = `translate3d(-${trackRefWidth}px, 0, 0)`
        }
    }
    const handleFocus = ()=>{
        setIsArrowHovered(true);
        setIsCarouselHovered(true);
    }
    const handleBlur =()=>{
        setIsArrowHovered(false);
        setIsCarouselHovered(false);
    }

    return (
        <motion.button 
            className={left ? styles.container + ' ' + styles.left : styles.container + ' ' + styles.right}
            type='button'
            onClick={(e) => handleTranslate(e)}
            data-id={left? '0' : '1'}
            aria-label={left ? `View previous screenshot of project ${project.name}` : `View next screenshot of project ${project.name}`}
            initial={false}
            animate={{opacity: isCarouselHovered? 1 : 0.3}}
            transition={{duration: 0.2, ease:'easeInOut'}}
            tabIndex='0'
            onFocus={handleFocus}
            onBlur={handleBlur}
        >
                {left ?
                    <motion.div
                        className={styles.left + ' ' + styles.image}
                        onClick={(e) => handleTranslate(e)}
                        data-id='0'
                        initial={false}
                        animate={{scale: isArrowHovered ? 1.2 : 1}}
                        transition={{duration: 0.1}}
                        onMouseEnter={()=> setIsArrowHovered(true)}
                        onMouseLeave={()=> setIsArrowHovered(false)}
                    ></motion.div> :
                    <motion.div
                        className={styles.right + ' ' + styles.image}
                        onClick={(e) => handleTranslate(e)}
                        data-id='1'
                        initial={false}
                        animate={{scale: isArrowHovered ? 1.2 : 1}}
                        transition={{duration: 0.1}}
                        onMouseEnter={()=> setIsArrowHovered(true)}
                        onMouseLeave={()=> setIsArrowHovered(false)}
                    ></motion.div>
                }
        </motion.button>
    )
}