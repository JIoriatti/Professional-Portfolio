'use client'
import styles from './Hero.module.css'
import { useState, useEffect, useRef } from 'react'
import { motion, useAnimationControls} from 'framer-motion'
import Icons from './Icons'

const VARIANTS = {
    visible: {
        opacity: 0.8,
    },
    hidden: {
        opacity: 0
    }
}

export default function Hero({images, project}){
    const [currentImage, setCurrentImage] = useState(images[1].src);
    const [index, setIndex] = useState(1);
    const [runAnimation, setRunAnimation] = useState(false)
    const controls = useAnimationControls();
    const [media, setMedia] = useState({})
    const heroRef = useRef();
    
    //setting arbitrary large init value to keep page hero from loading
    //in at 0
    const [screenHeight, setScreenHeight] = useState(3000);
    const [screenWidth, setScreenWidth] = useState(0);
 
    //using same code from projectDisplay to adjust size of Hero to full size of screen
    //and be reponsive
    useEffect(()=>{
        let headerHeight = document.querySelector('#header').clientHeight;
        setScreenHeight(document.body.clientHeight - headerHeight);
        setScreenWidth(document.body.clientWidth)
    },[media.matches, screenWidth])

    const trackScreenSize = () =>{
        //tracking media screen change on resize
        let headerHeight = document.querySelector('#header').clientHeight;
        setMedia({ matches: window.matchMedia("(max-width: 1556px)").matches })
        setScreenWidth(document.body.clientWidth)
    }
    
    useEffect(()=>{
        //header was causing page to load in not excluding it's height,
        //so set initial scrollTo top to fix
        document.body.scrollTo(0,0);
        setMedia({ matches: window.matchMedia("(max-width: 1556px)").matches })
        window.addEventListener('resize', trackScreenSize)
        return () => window.removeEventListener('resize', trackScreenSize)
    },[])

    useEffect(()=>{
        controls.start('visible')
    },[currentImage])

    return (
        <div 
            className={styles.container}
            style={{
                height : !media.matches ? `${screenHeight}px` : null,
                width : `${screenWidth}px`
            }}
        >
                <div 
                    className={styles.heroWrapper}
                    style={{
                        height : !media.matches ? `${screenHeight}px` : null,
                        width: `${screenWidth}px`,
                    }}
                >
                    <h1 
                        className={styles.title}
                    >{project.name}
                    </h1>
                    <Icons project={project} />
                    <div className={styles.shadow}></div>
                    <motion.img
                        ref={heroRef}
                        className={styles.heroImage}
                        style={{
                            height : !media.matches ? `${screenHeight}px` : `${(9/16)* screenWidth}px`,
                            width: `${screenWidth}px`,
                            objectFit: 'cover'
                        }}
                        src={currentImage}
                        initial='hidden'
                        animate={controls}
                        variants={VARIANTS}
                        transition={{
                            duration: 5,
                            repeat: 1,
                            repeatType: 'reverse'
                        }}
                        onAnimationComplete={()=>{
                            if(index < images.length - 1){
                                setCurrentImage(images[index + 1].src)
                                setIndex((prevIndex)=> prevIndex+=1)
                            }
                            else{
                                setCurrentImage(images[0].src);
                                setIndex(0);
                            }
                        }}
                    >
                    </motion.img>
                </div>
        </div>
    )
}