import React from 'react'
import styles from './BuiltWith.module.css'

export default function BuiltWith({project}){
    return (
        <div className={styles.nameContainer}>
            
                {project.built_with.map((tech,i)=>{
                    return <div 
                                key={i} 
                                className={styles.nameWrapper}
                            >
                                <p className={styles.techName}>{tech.name}</p>
                            </div>
                })}
        </div>
    )
}
        // <div className={styles.container}>
        // </div>
            // <div 
            //     className={styles.techContainer}
            // >
            //     {/* shoutout to Ali G */}
            //     {project.built_with.map((techMology,i)=>{
            //         return <img
            //                     key={i}
            //                     className={techMology.dark ? styles.logo + ' ' + styles.darkLogo : styles.logo} 
            //                     style={{transform: techMology.small ? 'scale(1.5)' : null}}
            //                     src={techMology.src} 
            //                     alt={techMology.name} 
            //                 />
                                    
                           
            //     })}
            // </div>