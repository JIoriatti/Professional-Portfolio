'use client'
import styles from './Buttons.module.css'

export default function Buttons({project, individual}){
    return (
        <div 
            className={styles.container}
            style={individual && {
                width: '80%',
                marginBottom : '2em'
            }}
        >
            <a
                className={styles.link}
                href={project.deployedHref}
                target='_blank'
                style={{all: 'unset'}}
                onFocus={(e)=> e.currentTarget.blur()}
            >
                <button 
                    className={styles.deploy}
                    type='button'
                    tabIndex='0'
                    aria-roledescription={`Button to open a new tab with James Ioriatti's project ${project.name} website.`}
                    aria-label={`View deployed site for project ${project.name}`}
                    style={individual &&{
                        padding: '10px 15px 10px 15px',
                        marginBottom: '20px'
                    }}
                >Deployed Site</button>
            </a>
            <a 
                className={styles.link}
                href={project.href}
                target='_blank'
                style={{all: 'unset'}}
                onFocus={(e)=> e.currentTarget.blur()}
            >
                <button 
                    className={styles.source}
                    type='button'
                    aria-roledescription={`Button to open a new tab to GitHub to view James Ioriatti's project ${project.name} source code.`}
                    aria-label={`View source code for project ${project.name}`}
                    tabIndex='0'
                    style={individual &&{
                        padding: '10px 15px 10px 15px',
                        marginBottom: '20px'
                    }}
                >Source Code</button>
            </a>
        </div>
    )
}