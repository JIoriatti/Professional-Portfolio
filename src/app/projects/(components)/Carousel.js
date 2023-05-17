
import styles from './Carousel.module.css'
import { memo } from 'react'
import Image from 'next/image'


const Carousel = memo(function Carousel({ project, itemsRef, trackRef, clickId, setTrackCount, trackRefWidth, trackRefHeight, displayHeight}){
    return (
        <div className={styles.wrapper}>
            <div 
                className={styles.container}
            >
                {/* placeholder invis image for sizing container */}
                    <img 
                    src={project.images[0].src} 
                    alt={`placeholder`}
                    style={{
                        visibility: 'hidden', 
                        objectFit: 'scale-down', 
                        width: '100%', 
                        maxHeight: '800px'
                    }}
                    />
                    {/* <Image
                        src={project.images[0].src} 
                        alt={`placeholder`}
                        style={{
                            visibility: 'hidden',
                            minHeight: '427px' 
                            // objectFit: 'scale-down', 
                            // width: '100%', 
                            // maxHeight: '800px'
                        }}
                        // loading='lazy'
                        // width={trackRefWidth}
                        // height={displayHeight}
                        fill={true}
                        quality={1}
                    /> */}
                <div 
                    className={styles.track + ' '}
                    ref={trackRef}
                    style={{left: -trackRefWidth}}
                    onTransitionEnd={()=>{
                        trackRef.current.style.transition = 'none'
                        trackRef.current.style.transform = 'none'
                        if(clickId.current === 0){
                            const removeLast = itemsRef.current.pop();
                            itemsRef.current.unshift(removeLast);
                            trackRef.current.prepend(removeLast);
                            setTrackCount((prevCount)=>{
                                if(prevCount === 0){
                                    return prevCount += (itemsRef.current.length-1);
                                }
                                else{
                                    return prevCount-=1
                                }
                            })
                        }
                        if(clickId.current === 1){
                            const removeFirst = itemsRef.current.shift();
                            itemsRef.current.push(removeFirst);
                            trackRef.current.appendChild(removeFirst)
                            setTrackCount((prevCount)=>{
                                if(prevCount === (itemsRef.current.length-1)){
                                    return 0;
                                }
                                else{
                                    return prevCount+=1
                                }
                            })
                        }
                    }}
                >
                    {project.images.map((img,i)=>{
                        return <div 
                                    key={i}
                                    className={styles.item}
                                    ref={(ref)=>{
                                        if(!itemsRef.current.includes(ref) && ref !=null){
                                            itemsRef.current = [...itemsRef.current, ref]
                                        }
                                    }}
                                    style={{
                                        width: trackRefWidth
                                    }}
                                    id={i+1}
                                >
                                        <img 
                                            src={img.src} 
                                            alt={`Project ${project.name} screenshot-${i+1}`}
                                            className={styles.image}
                                            style={{width: trackRefWidth,}}
                                            title={`${project.name}`}
                                            loading={i === 1 ? 'eager' : 'lazy'} 
                                        />
                                        {/* <Image
                                            src={img.src} 
                                            alt={`Project ${project.name} screenshot-${i+1}`}
                                            className={styles.image}
                                            // style={{width: trackRefWidth,}}
                                            title={`${project.name}`}
                                            loading={i!==2 ? 'lazy': 'eager'}
                                            width={trackRefWidth}
                                            height={displayHeight}
                                            priority={i === 2 && true}
                                        /> */}
                                </div>
                    })}
                </div>
            </div>
        </div>
    )
})
export default Carousel;