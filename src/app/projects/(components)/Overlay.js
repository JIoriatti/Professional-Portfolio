'use client'
import styles from './Overlay.module.css'
import { motion, AnimatePresence } from 'framer-motion'
import Arrow from './Arrow'
import CarouselTracker from './CarouselTracker'
import Carousel from './Carousel'
import { useRef, useState, useEffect } from 'react'

export default function Overlay({ project, font, screenWidth, displayHeight }) {
    const [isCarouselHovered, setIsCarouselHovered] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);
    const [trackCount, setTrackCount] = useState(0);
    const [trackRefWidth, setTrackRefWidth] = useState(0);
    const [trackRefHeight, setTrackRefHeight] = useState(0)
    const [isExpanded, setIsExpanded] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    
    const observerRef = useRef();
    const itemsRef = useRef([]);
    const trackRef = useRef();
    const clickId = useRef();
    const carouselWrapperRef = useRef();

    //incorporating an instance of ResizeObserver as well as window resize event listener,
    //in order for carousel contents to resize after immediate screen size change
    // i.e. inspection of page. Without resize observer the contents dont
    //resize until the user changes the screen size dynamically.

    //stored instance into a ref, turns out I was creating a new instance every time
    //screen width changed, no-bueno.
    useEffect(()=>{
        const observer = new ResizeObserver((els, observer)=>{
            setTrackRefWidth(els[0].contentBoxSize[0].inlineSize)
            setTrackRefHeight(els[0].contentRect.height)
        })
        observerRef.current = observer;
    },[])
    useEffect(()=>{
            observerRef.current.observe(carouselWrapperRef.current, {box: 'content-box'});
    
            return () => observerRef.current.disconnect();
    },[screenWidth])
    
    useEffect(()=>{
        if(isCarouselHovered){
            setIsAnimating(true)
        }
    },[isCarouselHovered])

    return (
            <motion.div
                className={styles.carouselWrapper + ' ' + font}
                id="carouselWrapper"
                style={{
                    transitionDelay: isExpanded? '1s' : '0s',
                }}
                ref={carouselWrapperRef}
                data-name={project.name}
                aria-hidden={true}
                initial={false}
                onTransitionEnd={(e)=>{
                    if(isCarouselHovered){
                        setIsExpanded(true)
                    }
                    if(!isCarouselHovered){
                        setIsExpanded(false)
                    }
                    setIsAnimating(false)
                }}
                
                onMouseEnter={(e) => {
                    if(e.currentTarget.dataset.name === project.name){
                        setIsCarouselHovered(true)
                        setIsAnimating(true) 
                        
                    }
                }}
                onMouseLeave={(e) => {
                        setIsCarouselHovered(false)
                }}
            >   
                <Carousel project={project} itemsRef={itemsRef} trackRef={trackRef} clickId={clickId} setTrackCount={setTrackCount} trackRefWidth={trackRefWidth} trackRefHeight={trackRefHeight} displayHeight={displayHeight}/>
                
                <AnimatePresence>
                    {(!isCarouselHovered || isScrolling) &&
                        <>
                            <motion.div
                                className={styles.bottomShadow}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ 
                                    duration: 0.75,
                                    opacity: {
                                        delay: (!isCarouselHovered || isScrolling) ? 0.2 : 0 }}
                                    } 
                                exit={{ opacity: 0 }}
                            ></motion.div>
                        </>
                    }
                </AnimatePresence>
                <AnimatePresence>
                    {isCarouselHovered && !isScrolling &&
                        <CarouselTracker data={itemsRef.current} trackCount={trackCount} />   
                    }
                </AnimatePresence>
                    <Arrow left={true} itemsRef={itemsRef} trackRef={trackRef} clickId={clickId} trackRefWidth={trackRefWidth} isCarouselHovered={isCarouselHovered} setIsCarouselHovered={setIsCarouselHovered} project={project}/>
                    <Arrow left={false} itemsRef={itemsRef} trackRef={trackRef} clickId={clickId} trackRefWidth={trackRefWidth} isCarouselHovered={isCarouselHovered} setIsCarouselHovered={setIsCarouselHovered} project={project}/>
            </motion.div>
    )
}