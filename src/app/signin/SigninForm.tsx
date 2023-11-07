'use client';

import {useState} from 'react';
import {useFormState, useFormStatus} from 'react-dom';
import signinUser from './actions';
import styles from './signin.module.css';

function SubmitButton() {
    const {pending} = useFormStatus();

    return (
        <button type="submit" aria-disabled={pending}>
            {pending ? 'Logging in...' : 'Sign In'}
        </button>
    );
}

const initialState = {status: null};

export default function SigninForm() {
    const [state, formAction] = useFormState(signinUser, initialState);
    const [clientValidationError, setClientValidationError] = useState('');
    const {pending} = useFormStatus();

    async function performSubmit(formData: FormData) {
        const name = formData.get('name') as string;
        const password = formData.get('password') as string;
        if (!name && !password) {
            setClientValidationError('please fill out a name and password');
        } else if (!name) {
            setClientValidationError('please include a name');
        } else if (!password) {
            setClientValidationError('needs password');
        } else {
            setClientValidationError('');
            return formAction(formData);
        }
    }

    return (
        <div className={styles.signinPage}>
            <form className={styles.signinCard} action={performSubmit}>
                {state.status === 'server-error' && (
                    <p className={styles.errorMessage}>{state.message}</p>
                )}
                {!pending && clientValidationError && (
                    <p className={styles.errorMessage}>
                        {clientValidationError}
                    </p>
                )}
                <div className={styles.signinTitle}>Log In</div>
                <div className={styles.inputGroup}>
                    <input
                        aria-label="user id"
                        className={styles.inputField}
                        name="name"
                        type="text"
                    />
                </div>
                <div className={styles.inputGroup}>
                    <input
                        aria-label="password"
                        className={styles.inputField}
                        name="password"
                        type="password"
                    />
                </div>
                <SubmitButton />
            </form>
        </div>
    );
}
