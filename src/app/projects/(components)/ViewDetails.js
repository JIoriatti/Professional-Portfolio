'use client'
import styles from './ViewDetails.module.css'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'

export default function ViewDetails({project}){
    const [isLinkHovered, setIsLinkHovered] = useState(false);
    return (
        <span
            className={styles.container}
            onMouseEnter={()=> setIsLinkHovered(true)}
            onMouseLeave={()=> setIsLinkHovered(false)}
        >
            <Link
                href={`/project/${project.name}`}
                style={{textDecoration: 'none'}}
                aria-roledescription={`A link to view the details of project ${project.name}, including technoligies used and insight into the development process.`}
                aria-label={`Link to view details of project ${project.name}`}
            >
                <motion.span
                    className={styles.animatedLink}
                    initial={false}
                    transition={{duration: 0.2, ease: 'easeOut'}}
                    animate={{
                        color: isLinkHovered ? 'var(--themeColor)' : 'var(--themeAccentTwo)',
                    }}
                >View Details</motion.span>
                <motion.span 
                    className={styles.arrow}
                    initial={false}
                    transition={{duration: 0.2, ease: 'easeOut'}}
                    animate={{
                        borderTop: isLinkHovered ? '3px solid var(--themeColor)' : '3px solid var(--themeAccentTwo)',
                        borderRight: isLinkHovered ? '3px solid var(--themeColor)' : '3px solid var(--themeAccentTwo)',
                        translateX: isLinkHovered ? 10 : 0,
                        rotate: 45
                    }}
                >
                    
                </motion.span>
            </Link>
        </span>
    )
}