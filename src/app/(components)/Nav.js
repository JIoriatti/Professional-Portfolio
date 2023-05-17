'use client'
import styles from './Nav.module.css'
import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'



export default function Nav({navlist}){
    const seperatorRefs = useRef([])
    const listItemRefs = useRef([])
    const [activeTab, setActiveTab] = useState(-1);

    const path = usePathname();

    const handleClick =(e)=>{
        seperatorRefs.current.forEach((seperator, i, array)=>{
            if(parseInt(e.target.dataset.id) === i && parseInt(e.target.dataset.id) !== array.length-1){
                seperator.style.opacity = 1;
                if(array[i-1]){
                    array[i-1].style.opacity = 1;
                }
                setActiveTab(parseInt(seperator.dataset.id));
            }
            else if(parseInt(e.target.dataset.id) === array.length-1){
                array[array.length - 2].style.opacity = 1;
                setActiveTab(parseInt(seperator.dataset.id));
                seperator.style.opacity = 0;
            }
            else{
                seperator.style.opacity = 0;
            }
        })
        listItemRefs.current.forEach((listItem ,i)=>{
            if(parseInt(e.target.dataset.id) === i && listItem.textContent !=='Contact'){
                listItem.style.color = 'var(--themeAccent)'
            }
            else if(listItem.textContent === 'Contact' && window.matchMedia('(prefers-color-scheme: light)').matches){
                listItem.style.color = 'var(--themeBg)'                
            }
            else{
                listItem.style.color = 'var(--themeColor)'
            }
        })
    }

    useEffect(()=>{
        listItemRefs.current.forEach((listItem, i)=>{
            if(path === listItem.dataset.endpoint && listItem.textContent !=='Contact'){
                setActiveTab(parseInt(listItem.dataset.id));
                listItem.style.color = 'var(--themeAccent)'
            }
            else if(listItem.textContent === 'Contact' && window.matchMedia('(prefers-color-scheme: light)').matches){
                listItem.style.color = 'var(--themeBg)'                
            }
            else{
                listItem.style.color = 'var(--themeColor)'
            }
        })
        
        seperatorRefs.current.forEach((seperator,i,array)=>{
            if(path === seperator.dataset.endpoint && path !== array[array.length-1].dataset.endpoint){
                seperator.style.opacity = 1;
                if(array[i-1]){
                    array[i-1].style.opacity = 1;
                }
            }
            else if(path === array[array.length-1].dataset.endpoint){
                array[array.length - 2].style.opacity = 1;
                seperator.style.opacity = 0;
            }
            else{
                seperator.style.opacity = 0;
            }
        })
    },[path])

    return (
        <nav 
            className={styles.nav}
        >
                <ul 
                    className={styles.navList}
                >
                    {navlist.map((item, i, array)=>{
                        return <React.Fragment key={i}>
                                    
                                    <Link 
                                        href={item==='About' ? '/' : `/${item.toLowerCase().split(' ').join('')}`}
                                        className={styles.listItem}
                                        onClick={(e)=>handleClick(e)}
                                        ref={(ref)=>{
                                            if(!listItemRefs.current.includes(ref) && ref!=null){
                                                listItemRefs.current.push(ref);
                                            }
                                        }}
                                        onMouseEnter={()=>{
                                            if(item!=='Contact'){
                                                listItemRefs.current[i].style.color = 'var(--themeAccent)'
                                            }
                                        }}
                                        onMouseLeave={(e)=>{
                                            if(path !== e.currentTarget.dataset.endpoint){
                                                listItemRefs.current[i].style.color = 'var(--themeColor)'
                                            }
                                            if(item==='Contact' && window.matchMedia('(prefers-color-scheme: light)').matches){
                                                listItemRefs.current[i].style.color = 'var(--themeBg)'
                                            }
                                            if(item==='Contact' && window.matchMedia('(prefers-color-scheme: dark)').matches){
                                                listItemRefs.current[i].style.color = 'var(--themeColor)'
                                            }
                                        }}
                                        data-endpoint={item==='About' ? '/' : `/${item.toLowerCase().split(' ').join('')}`}
                                        data-id={i}
                                    >
                                        <li
                                            className={styles.navText + ' ' + (item==='Contact' && styles.contact)}
                                            data-id={i}
                                        >{item}</li>
                                    </Link>

                                    <span 
                                        className={styles.seperator}
                                        ref={(ref)=>{
                                            if(!seperatorRefs.current.includes(ref) && ref!=null){
                                                seperatorRefs.current.push(ref);
                                            }
                                        }}
                                        data-id={i}
                                        data-endpoint={item === 'About' ? '/' : `/${item.toLowerCase().split(' ').join('')}`}
                                        style={{
                                            display: i === array.length-1 && 'none'
                                        }}
                                    ></span>
                                </React.Fragment>
                                
                    })}
                </ul>
            </nav>
    )
}