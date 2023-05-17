import styles from './Details.module.css'
import BuiltWith from './BuiltWith'
import DetailsSection from './DetailsSection'
import Buttons from '@/app/projects/(components)/Buttons'

export default function Details({project}){
    return (
        <div className={styles.container}>
            <div className={styles.topBar}>
                <BuiltWith project={project}/>
            </div>
            <div className={styles.innerContainer}>
                <DetailsSection project={project} />     
                <Buttons project={project} individual={true}/>           
            </div>
        </div>
    )
}