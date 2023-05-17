'use client'
import styles from './ThemeToggle.module.css'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function ThemeToggle({mobile}){
    const [isDark, setIsDark] = useState(null)

    const trackThemeChange = (e)=>{
        if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
            setIsDark(true)
            localStorage.setItem('JI-T', 'dark')
        }
        else{
            setIsDark(false)
            localStorage.setItem('JI-T', 'light')
        }
    }
    useEffect(()=>{
        const classSwapper = ()=>{
            //check if local storage on first render, if not check media for color-scheme,
            //if not default to light
            if(localStorage.getItem('JI-T')){
                if(isDark){
                    if(document.documentElement.className = 'light'){
                        document.documentElement.classList.remove('light')
                        document.documentElement.classList.add('dark');
                    }
                    localStorage.setItem('JI-T', 'dark')
                }
                else{
                    if(document.documentElement.className = 'dark'){
                        document.documentElement.classList.remove('dark')
                        document.documentElement.classList.add('light')
                    }
                    localStorage.setItem('JI-T', 'light')
                }
            }
            else if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
                if(document.documentElement.className = 'light'){
                    document.documentElement.classList.remove('light')
                    document.documentElement.classList.add('dark');
                }
                localStorage.setItem('JI-T', 'dark')
            }
            else{
                if(document.documentElement.className = 'dark'){
                    document.documentElement.classList.remove('dark')
                    document.documentElement.classList.add('light')
                }
                localStorage.setItem('JI-T', 'light')
            }
        }

        if(isDark != null){
            classSwapper();
        }
    },[isDark])
    useEffect(()=>{
        if(localStorage.getItem('JI-T')){
            localStorage.getItem('JI-T') === 'dark' ? setIsDark(true) : setIsDark(false);
        }
        else{
            trackThemeChange();
        }

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', trackThemeChange)
        return ()=> window.removeEventListener('change', trackThemeChange)
    },[])

    return(
        <div 
            className={styles.container + ' ' + (mobile && styles.mobile)}
            onClick={()=> setIsDark(!isDark)}
        >
            <motion.div 
                className={styles.toggle}
                style={{
                    transform: !isDark ? 'translateX(-20%)': 'translateX(100%)',
                    // backgroundImage: !isDark ? 'url(/sun.png)' : 'url(/moon.png)'
                }}
            ></motion.div>
        </div>
    )
}