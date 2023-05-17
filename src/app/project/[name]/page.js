import projects from '../../../../lib/projects.json'
import styles from './page.module.css'
import Hero from './(components)/Hero';
import Details from './(components)/Details';




//simulating serverside data fetch
async function getProjectData(name){
    //would fetch here...

    return projects.filter((proj)=> proj.name === decodeURI(name)).shift();
}

export default async function ProjectPage({params}){
    
    const project = await getProjectData(params.name)

    return (
        <>
            <main
                className={styles.main}
            >
                <Hero images={project.hero} project={project}/>
                <Details project={project}/>
            </main>
        </>
    )
}




export async function generateStaticParams(){
    return projects.map((project)=> project.name)
}
