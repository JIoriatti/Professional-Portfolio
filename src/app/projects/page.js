import styles from './page.module.css'
import projects from '../../../lib/projects.json'
import ProjectDisplay from './(components)/ProjectDisplay'

export default function Home() {

    return (
        <main className={styles.main}>
            <ProjectDisplay projects={projects}/>
        </main>
    )
}