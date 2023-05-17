import styles from './Loader.module.css'

export default function Loader({position, forContact, isLoading, isSuccessful}){
    if(forContact){
        return (
            <div 
            className={styles.loaderWrapper}
            style={position}
        >
            {(!isLoading && isSuccessful) && 
                <>
                    <div
                        style={{
                            backgroundImage: 'url(/success.png)',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            height: '60px',
                            width: '60px'
                            
                        }}
                    ></div>
                    <div className={styles.sendingText} style={{textAlign: 'center'}}>Email sent. <br></br> Thank you for reaching out!</div>
                </>
            }
            {(!isLoading && !isSuccessful) && 
                    <>
                        <div
                            style={{
                                backgroundImage: 'url(/failure.png)',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                height: '60px',
                                width: '60px'
                            }}
                        ></div>
                        <div className={styles.sendingText}>Oops, something went wrong.</div>
                </>
            }
            
            {isLoading && 
                <>
                    <div className={styles.loader}></div>
                    <p className={styles.sendingText}>Sending...</p>
                </>
            }
         
        </div>
        )
    }
    else{

    }
    return (
        <div 
            className={styles.loaderWrapper}
        >
            <div className={styles.loader}></div>
        </div>
    )
}