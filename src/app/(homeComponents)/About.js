import styles from './About.module.css'

export default function About(){
    return (
        <div 
            className={styles.container}
        >
            <h2 className={styles.header}>About</h2>
            <span className={styles.divider}></span>
            <p className={styles.text}>Prior to the start of my coding journey I had worked as a bricklayer for several years. Not quite where I expected to be after earning a degree, I nonetheless made a committment to be the best bricklayer I could be. Every brick layed with a purpose - such was my mentality then as it is now for coding. <br></br><br></br><b>Every line written with a purpose.</b><br></br><br></br>Thank you to the Northwestern University Coding Bootcamp team for allowing me to discover this facsinating, new passion.</p>
        </div>
    )
}