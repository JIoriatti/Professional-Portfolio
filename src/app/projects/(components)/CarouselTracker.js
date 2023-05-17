import styles from './CarouselTracker.module.css'
import { motion } from 'framer-motion'
export default function CarouselTracker({data, trackCount}){
    return (
        <motion.div 
            className={styles.container}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.2, ease:'easeIn'}}
            exit={{opacity: 0}}
        >
            {data.map((element,i, array)=>{
                return <span 
                            className={styles.tick} 
                            key={i}
                            style={{
                                backgroundColor: trackCount === i ?  'var(--themeTickerFocus)':'var(--themeTicker)'
                            }}
                        ></span>
            })}
        </motion.div>
    )
}