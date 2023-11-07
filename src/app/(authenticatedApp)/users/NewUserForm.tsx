'use client';

import {useEffect, useRef} from 'react';
import {useFormState, useFormStatus} from 'react-dom';
import styles from './NewUserForm.module.css';
import {addUser} from './actions';

const initialState = {status: null};

export function SubmitButton() {
    const {pending} = useFormStatus();
    return (
        <button type="submit" aria-disabled={pending}>
            {pending ? 'Loading...' : 'Submit'}
        </button>
    );
}

export default function NewUserForm() {
    const [state, formAction] = useFormState(addUser, initialState);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(
        function () {
            console.log({state});
            formRef.current?.reset();
        },
        [state]
    );

    return (
        <div className={styles.form}>
            <div className={styles.formContent}>
                <div>Create a new user</div>
                <form
                    action={formAction}
                    className={styles.inputs}
                    ref={formRef}
                >
                    <input type="text" name="name" placeholder="name" />
                    <input type="text" name="password" placeholder="password" />
                    <input type="text" name="amount" placeholder="amount" />
                    <label htmlFor="weekday-select">Choose a day:</label>
                    <select
                        name="dayPreference"
                        id="weekday-select"
                        defaultValue=""
                    >
                        <option value="" disabled>
                            --Please choose an option--
                        </option>
                        <option value="Sunday">Sunday</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                    </select>
                    <SubmitButton />
                </form>
            </div>
        </div>
    );
}
