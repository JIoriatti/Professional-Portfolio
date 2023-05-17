import styles from './MobileNav.module.css'
import React from 'react'

export default function MobileNav({navlist, isMobileNavExpanded, setIsMobileNavExpanded, pageWidth, path}){
    // const [isExpanded, setIsExpanded] = useState();

    const handleContainerClick =()=>{
        setIsMobileNavExpanded(!isMobileNavExpanded)
    }
    

    return (
        <div 
            className={styles.container}
            onClick={handleContainerClick}    
        >
        </div>
    )
}