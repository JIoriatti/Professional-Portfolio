
import styles from './ScrollTracker.module.css'

export default function ScrollTracker({scrollPosition, pageHeight}){

    return (
        <div 
            className={styles.container}
        >
            <div 
                className={styles.bar}
                style={{
                    width: `${Math.trunc((scrollPosition / pageHeight)*100)}%`,
                }}
            ></div>
        </div>
    )
}