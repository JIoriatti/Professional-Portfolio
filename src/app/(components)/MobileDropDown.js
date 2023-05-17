import styles from './MobileDropDown.module.css'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import React from 'react'
import ThemeToggle from './ThemeToggle'

export default function MobileDropDown({navlist,isMobileNavExpanded, setIsMobileNavExpanded, pageWidth, path}){
    const handleLinkClick = (e) =>{
        e.target.style.color = `var(--themeAccent)`
        setIsMobileNavExpanded(false)
    }
    return (
        <AnimatePresence>
        {isMobileNavExpanded && 
            <motion.nav 
                className={styles.dropDown}
                style={{
                    width: pageWidth,
                }}
                initial={{
                    opacity: 0,
                    scaleY: 0,
                    originY: 0
                }}
                animate={{
                    opacity: 1,
                    scaleY: 1,
                    originY: 0
                }}
                exit={{
                    opacity: 0,
                    scaleY: 0,
                    originY: 0
                }}
                transition={{
                    duration: 0.1,
                    delayChildren: 1
                }}
            >
                <ThemeToggle mobile={true}/>
                <motion.ul
                    key={'list'}
                    className={styles.navList}
                    initial={{
                        opacity: 0
                    }}
                    animate={{
                        opacity: 1
                    }}
                    exit={{
                        opacity: 0
                    }}
                    transition={{
                        duration: 0.05
                    }}
                >
                    {navlist.map((listItem, i, array) => {
                        return  <React.Fragment key={i}>
                                    <Link
                                        href={listItem === 'About' ? '/' : `/${listItem.toLowerCase().split(' ').join('')}`}
                                        className={styles.listItem + ' ' + (listItem === 'Contact' && styles.contact)}
                                        style={{
                                            color: path === `/${listItem.toLowerCase().split(' ').join('')}` && listItem !== 'Contact' ? 'var(--themeAccent)' : 'var(--themeColor)',
                                        }}
                                        onClick={(e) => handleLinkClick(e)}
                                        onMouseEnter={(e) => {
                                            if(listItem!=='Contact'){
                                                e.target.style.color = 'var(--themeAccent)'
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if(path!== e.currentTarget.dataset.endpoint && listItem!=='Contact'){
                                                e.target.style.color = `var(--themeColor)`
                                            }
                                        }}
                                        data-endpoint={`/${listItem.toLowerCase().split(' ').join('')}`}
                                        data-id={i}
                                    >
                                        <li
                                            className={styles.item}
                                        >
                                            {listItem}
                                        </li>
                                    </Link>
                                    {i < array.length - 1 &&
                                        <span className={styles.seperator}></span>
                                    }
                        </React.Fragment>
                    })}
                </motion.ul>
            </motion.nav>
        }
    </AnimatePresence>
    )
}