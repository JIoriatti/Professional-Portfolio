
import styles from './ProjectInfo.module.css'
import ViewDetails from './ViewDetails'
import Buttons from './Buttons'
import IconInfo from './IconInfo'


export default function ProjectInfo({project}){
    return (
        <div className={styles.container}>
           
                <IconInfo project={project}/>
                {project.under_development && 
                    <div className='underDevelopment'></div>
                }
                {project.deployed && 
                    <div className='deployed'></div>
                }
            
            <div className={styles.nameContainer}>
                <h1 className={styles.projectName}>{project.name}</h1>
                <span className={styles.line}></span>
            </div>
            <div className={styles.bottomWrapper}>
                <div
                    className={styles.description}
                >
                    {project.brief}
                    <span className={styles.spacer}></span>
                    <ViewDetails project={project} />
                </div>
                <Buttons project={project} />
            </div>
        </div>
    )
}