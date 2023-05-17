'use client'
import styles from './Header.module.css'
import Nav from './Nav'
import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion'
import ScrollTracker from './ScrollTracker';
import { usePathname } from 'next/navigation';
import MobileNav from './MobileNav';
import MobileDropDown from './MobileDropDown';
import ThemeToggle from './ThemeToggle';
import Link from 'next/link';

const NAVLISTITEMS = ['About', 'Projects', 'Contact']

export default function Header(){
    const [currentScrollPosition, setCurrentScrollPosition] = useState(0);
    const [previousScrollPosition, setPreviousScrollPosition] = useState(0);
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const [projectName, setProjectName] = useState('')
    const [media, setMedia] = useState({});
    const [isMobileNavExpanded, setIsMobileNavExpanded] = useState(false)

    const headerRef = useRef();
    const pageHeightRef = useRef(0);
    const pageWidthRef = useRef(0);

    const path = usePathname();

    useEffect(()=>{
        // if(path !== '/'){
            if(currentScrollPosition > previousScrollPosition){
                setIsHeaderVisible(false)
                setIsMobileNavExpanded(false)
            }
            else{
                setIsHeaderVisible(true);
            }
            setPreviousScrollPosition(currentScrollPosition);
        // }
    },[currentScrollPosition])
    
    useEffect(()=>{
        const trackScroll = ()=>{
            setCurrentScrollPosition(document.body.scrollTop)
            pageHeightRef.current = document.querySelector('body').scrollHeight - document.querySelector('body').clientHeight;
        }
        pageHeightRef.current = document.querySelector('body').scrollHeight - document.querySelector('body').clientHeight;
        document.body.addEventListener('scroll', trackScroll, {passive: true})
        
        return ()=> document.body.removeEventListener('scroll', trackScroll, {passive: true})
    },[])
    
    useEffect(()=>{
        setMedia({matches: window.matchMedia('(max-width: 1035px)').matches})
        pageWidthRef.current = window.innerWidth;
        const handleResize = ()=>{
            pageWidthRef.current = window.innerWidth;
            pageHeightRef.current = document.querySelector('body').scrollHeight - document.querySelector('body').clientHeight;
            setMedia({matches: window.matchMedia('(max-width: 1035px)').matches})
        }
        window.addEventListener('resize', handleResize)

        return ()=> window.removeEventListener('resize', handleResize)
    },[])
    useEffect(()=>{
        //everytime user navigates, check the pathname to see if it
        //includes `project` to display project name in header when
        //viewing a project
        setProjectName(()=>{
            // return path.split('/').includes('project') ? decodeURI(path.split('/').pop().toString()) : ''
            if(path !== '/'){
                const pathString = decodeURI(path.split('/').pop().toString());
                const stringSplit = pathString.split('');
                const cap = stringSplit.shift().toUpperCase();
                stringSplit.unshift(cap);
    
                return stringSplit
            }
        });
        setIsMobileNavExpanded(false)
    },[path])

    return (
                <motion.div 
                    className={styles.container}
                    initial={{y: 0}}
                    animate={{y: isHeaderVisible ? 0 : -headerRef.current.clientHeight, originY: 0}}
                    transition={{duration: 0.2, ease: 'easeOut'}}
                    exit={{y: 0}}
                    ref={headerRef}
                    id='header'
                    // style={{
                    //     position: path !== '/' ? 'sticky' : 'fixed',
                    //     width : path !== '/' ?  '100vw' : 'calc(100vw - 17px)' 
                    // }}
                >
                    <div className={styles.innerWrapper}>
                        <div className={styles.nameContainer}>
                            <Link
                                href={'/'}
                                style={{
                                    all: 'unset'
                                }}
                            >
                                <h1 className={styles.title}>Ioriatti</h1>
                            </Link>
                            <AnimatePresence>

                                {projectName &&
                                    <>
                                        <motion.span 
                                            className={styles.seperator}
                                            initial={{
                                                opacity: 0
                                            }}
                                            animate={{
                                                opacity: 1
                                            }}
                                            transition={{
                                                duration: 0.4,
                                                ease: 'easeInOut',
                                            }}
                                            exit={{
                                                opacity: 0
                                            }}
                                        ></motion.span>
                                        <motion.span 
                                            className={styles.seperatorSmall}
                                            initial={{
                                                opacity: 0
                                            }}
                                            animate={{
                                                opacity: 1
                                            }}
                                            transition={{
                                                duration: 0.4,
                                                ease: 'easeInOut',
                                                
                                            }}
                                            exit={{
                                                opacity: 0
                                            }}
                                        ></motion.span>
                                        <motion.h2 
                                            className={styles.projectName}
                                            initial={{
                                                opacity: 0,
                                                x: -100
                                            }}
                                            animate={{
                                                opacity: 1,
                                                x : 0,
                                            }}
                                            transition={{
                                                opacity: {
                                                    duration: 0.4,
                                                    ease: 'easeInOut',
                                                    delay: 0.2,
                                                },
                                                x: {
                                                    duration: 0.6
                                                }
                                            }}
                                            exit={{
                                                opacity: 0
                                            }}
                                        >
                                            {projectName}
                                        </motion.h2>
                                
                                    </> 
                                }
                            </AnimatePresence>
                        </div>
                        {!media.matches ?
                            <Nav navlist={NAVLISTITEMS}/> :
                            <MobileNav navlist={NAVLISTITEMS} isMobileNavExpanded={isMobileNavExpanded} setIsMobileNavExpanded={setIsMobileNavExpanded}/>
                        }
                        {media.matches && isMobileNavExpanded && 
                            <MobileDropDown navlist={NAVLISTITEMS} isMobileNavExpanded={isMobileNavExpanded} setIsMobileNavExpanded={setIsMobileNavExpanded} pageWidth={pageWidthRef.current} path={path}/>        
                        }
                        {!media.matches && 
                            <ThemeToggle />
                        }
                    </div>
                    <ScrollTracker scrollPosition={currentScrollPosition} pageHeight={pageHeightRef.current}/>
                </motion.div>
    )
}