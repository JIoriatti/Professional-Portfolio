'use client'
import { useState } from 'react'
import styles from './IconInfo.module.css'
import { AnimatePresence, motion } from 'framer-motion'

export default function IconInfo({project}){
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div 
            className={styles.container}
            onMouseEnter={()=> setIsHovered(true)}
            onMouseLeave={()=> setIsHovered(false)}
            onFocus={()=> setIsHovered(true)}
            onBlur={()=> setIsHovered(false)}
            tabIndex='0'
            aria-label={`Information as to the state of development of project ${project.name}`}
            aria-details={project.under_development && `Project ${project.name} is currently under development and may not have full functionality or features enabled.` || project.deployed && `Project ${project.name} is deployed with full features and functionality.`}
        >
            <div className={styles.popupRelativeContainer}>
                <AnimatePresence>
                    {isHovered && 
                        <motion.div 
                            className={styles.popup}
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{duration: 0.2}}
                            exit={{opacity: 1}}

                        >
                            {project.under_development && 
                                <p className={styles.info}>
                                    <b>In Development:</b>  Application is deployed, but may have limited functionaltity and features while under development. 
                                </p>
                            }
                            {project.deployed && 
                                <p className={styles.info}>
                                <b>Deployed:</b>  Application is deployed with full functionality and features.
                                </p>
                            }
                        </motion.div>
                    }
                </AnimatePresence>
            </div>
        </div>
    )
}
