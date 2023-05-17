'use client'
import styles from './ContactButton.module.css'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import ContactForm from '../contact/(components)/ContactForm'

export default function ContactButton({font}){
    const [isExpanded, setIsExpanded] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [colorScheme, setColorScheme] = useState({})


    const handleClick =(e)=>{
        if(e.target.dataset.id === 'button'){
            setIsClicked(!isClicked)
        }
    }

    useEffect(()=>{
        setColorScheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light')
        const watchColorScheme = (e)=>{
            setColorScheme(e.matches ? 'dark': 'light')
        }
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener('change', watchColorScheme)

        return ()=> window.removeEventListener('change', watchColorScheme)
    },[])
    return(
        <motion.div 
            className={styles.container}
            initial={false}
            animate={{
                width: isExpanded && !isClicked ? 200 : 50,
            }}
            transition={{
                duration: 0.1,
                delay: isExpanded && !isClicked ? 0.05 : 0.1,
            }}
            style={{
                padding: isExpanded && !isClicked ? '0 0.25em 0 0.25em' : 'none'
            }}
            onMouseEnter={(e)=> {
                    setIsExpanded(true)}
            }
            onMouseLeave={()=> {
                if(!isClicked){
                    setIsExpanded(false)}
                }
            }
            onClick={handleClick}
            data-id={'button'}
        >
            <motion.img 
                src={
                    isClicked ? "/cross.png" : "/mail.png"
                } 
                alt="Contact Me" 
                className={styles.icon}
                initial={false}
                animate={{
                    opacity: isExpanded && !isClicked ? 0 : 1,
                }}
                transition={{
                    duration: 0.1,
                    delay: isExpanded && !isClicked ? 0 : 0.1,
                }}
                style={{
                    pointerEvents: 'none',
                }}
            />
            <motion.span 
                className={styles.contactMe}
                initial={{
                    opacity: 0
                }}
                animate={{
                    opacity: isExpanded && !isClicked ? 1 : 0,
                }}
                transition={{
                    duration: 0.1,
                    delay: isExpanded && !isClicked ? 0.2 : 0,
                }}
                style={{
                    minWidth: isExpanded ? 140 : 50,
                    pointerEvents: 'none'
                }}
            >Contact Me
            </motion.span>
            <AnimatePresence>
                {isClicked && 
                    <ContactForm font={font}/>
                }
            </AnimatePresence>
        </motion.div>
    )
}