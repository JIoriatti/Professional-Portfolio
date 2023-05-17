import styles from './Icons.module.css'


export default function Icons({project}){
    return (
        <div className={styles.container}>
            {/* shoutout to Ali G */}
            {project.built_with.map((techMology, i) => {
                return <div 
                            key={i}
                            className={styles.spacingWrapper}
                        >
                            <div
                                className={styles.iconContainer}
                            >
                                <img

                                    className={techMology.dark ? styles.logo + ' ' + styles.darkLogo : styles.logo}
                                    style={{ transform: techMology.small ? 'scale(1.5)' : null }}
                                    src={techMology.src}
                                    alt={techMology.name}
                                />
                            </div>
                            <div className={styles.nameWrapper}>
                                {/* using hidden text to dynamically size top bar */}
                                <p className={styles.name + ' ' + 'hidden'}>{techMology.name}</p>
                            </div>
                        </div>
            })}
        </div>
    )
}