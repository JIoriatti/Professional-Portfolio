'use client'
import styles from './ProjectDisplay.module.css'
import ProjectInfo from './ProjectInfo'
import React, { useEffect, useState, useRef, Suspense } from 'react'
import Loader from '@/app/(components)/Loader'

const Overlay = React.lazy(()=> import('./Overlay'))

export default function ProjectDisplay({projects}){
    const [media, setMedia] = useState({})
    const [sectionHeight, setSectionHeight] = useState(0);
    const [screenHeight, setScreenHeight] = useState(0);
    const [screenWidth, setScreenWidth] = useState(0);
    const [displayHeight, setDisplayHeight] = useState(500);

    const displayRef = useRef();

    useEffect(()=>{
        let headerHeight = document.querySelector('#header').clientHeight;
        setSectionHeight(document.body.clientHeight - headerHeight);
    },[media.matches, screenWidth])

    const trackScreenSize = () =>{
        //tracking media screen change on resize
        let headerHeight = document.querySelector('#header').clientHeight;
        setMedia({ matches: window.matchMedia("(max-width: 1556px)").matches })
        setScreenHeight(document.body.clientHeight - headerHeight);
        setScreenWidth(document.body.clientWidth)
    }
    
    useEffect(()=>{
        let pad = window.getComputedStyle(displayRef.current,null)
        setDisplayHeight(displayRef.current.offsetHeight - parseFloat(pad.paddingTop) - parseFloat(pad.paddingBottom))

        setMedia({ matches: window.matchMedia("(max-width: 1556px)").matches })
        window.addEventListener('resize', trackScreenSize)
        return () => window.removeEventListener('resize', trackScreenSize)
    },[])

    return(
        <>
            {projects.map((project,i, array)=>{
                return  <React.Fragment key={i}>
                            <section 
                                ref={displayRef}
                                className={styles.projectSection + ' ' + (i=== array.length-1 && styles.extraPad)}
                                style={{height: media.matches ? `${sectionHeight}px` : null}}
                            >
                                <Suspense fallback={
                                    <Loader />
                                }>
                                    <Overlay project={project} media={media} screenWidth={screenWidth} displayHeight={displayHeight}/>
                                </Suspense>
                                <ProjectInfo project={project} />
                            </section>
                            {i< array.length - 1 && 
                                <span className={styles.divider}></span>
                            }
                        </React.Fragment> 
                
            })}
        </>
    )
}
