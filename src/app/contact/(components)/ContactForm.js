'use client'
import styles from './ContactForm.module.css'
import emailjs from '@emailjs/browser'
import { useRef, useState, useEffect } from 'react'
import Loader from '@/app/(components)/Loader'

export default function ContactForm() {
    const [isSuccessful, setIsSuccessful] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isStarted, setIsStarted] = useState(false);
    const [formValues, setFormValues] = useState({
        fName: '',
        lName: '',
        email: '',
        company: '',
        message: ''
    });

    const form = useRef();
   
    const sendEmail = (e) => {
        setIsLoading(true);
        setIsStarted(true);
        e.preventDefault();

        emailjs.sendForm('portfolio_service', 'portfolio_form', form.current, 'vRGvN31J-mzYRmvMv')
            .then((result) => {
                if (result.text === 'OK') {
                    handleSuccess();
                }
            }).catch((error) => {
                handleError();
                throw new Error(error);
            });
    };

    const handleSuccess = () =>{
        setIsLoading(false);
        setIsSuccessful(true);

        setTimeout(()=>{
            setIsStarted(false);
            clearForm();
        },4000)
    }
    const handleError = () =>{
        setIsLoading(false);
        setIsSuccessful(false);

        setTimeout(()=>{
            setIsStarted(false);
            clearForm();
        },4000)
    }
    const handleChange = (e)=>{
        setFormValues((prevState)=>{
            return {
                ...prevState, [e.target.dataset.name] : e.target.value
            }
        })
    }
    const clearForm = () =>{
        setFormValues({ 
            fName: '',
            lName: '',
            email: '',
            company: '',
            message: ''
        })
    }
    return (
        <div className={styles.container}>
            {isStarted && 
                <Loader 
                    position={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        top: '0',
                        left: '0',
                        zIndex: '2',
                        backgroundColor: 'var(--themeContactLoading)'
                    }}
                    forContact={true}
                    isLoading={isLoading}
                    isSuccessful={isSuccessful}
                />
            }
            <form
                className={styles.form}
                id='contact'
                ref={form}
                onSubmit={sendEmail}
            >
                <div className={styles.nameWrapper}>
                    <div className={styles.nameLabelWrapper}>
                        <label
                            htmlFor="user_first_name"
                            className={styles.firstLabel}
                        >First Name</label>
                        <input
                            type="text"
                            name="user_first_name"
                            className={styles.firstName}
                            required
                            value={formValues.fName}
                            onChange={handleChange}
                            data-name='fName'
                        // placeholder='First'
                        />
                    </div>
                    <div className={styles.nameLabelWrapper + ' ' + styles.forLast}>
                        <label
                            htmlFor="user_last_name"
                            className={styles.lastLabel}
                        >Last Name</label>
                        <input
                            type="text"
                            name="user_last_name"
                            className={styles.lastName}
                            required
                            value={formValues.lName}
                            onChange={handleChange}
                            data-name='lName'
                        // placeholder='Last'
                        />
                    </div>
                </div>
                <div className={styles.emailWrapper}>
                    <label
                        htmlFor="user_email"
                        className={styles.emailLabel}
                    >Email</label>
                    <input
                        type="email"
                        name='user_email'
                        className={styles.email}
                        required
                        value={formValues.email}
                        onChange={handleChange}
                        data-name='email'
                    // placeholder='Email'
                    />
                </div>
                <div className={styles.companyWrapper}>
                    <label
                        htmlFor="user_company"
                        className={styles.companyLabel}
                    >Company</label>
                    <input
                        type="text"
                        name='user_company'
                        className={styles.company}
                        placeholder='(Optional)'
                        value={formValues.company}
                        onChange={handleChange}
                        data-name='company'
                    />
                </div>
                <div className={styles.messageWrapper}>
                    <label
                        htmlFor="message"
                        className={styles.messageLabel}
                    >Message
                    </label>
                    <textarea
                        className={styles.message}
                        name="message"
                        required
                        value={formValues.message}
                        onChange={handleChange}
                        data-name='message'
                    >
                    </textarea>
                </div>
                <button
                    type='submit'
                    className={styles.send}
                >Send</button>
            </form>
        </div>
    )
}