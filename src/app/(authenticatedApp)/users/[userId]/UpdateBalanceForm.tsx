'use client';

import {User} from '@/domain/User';
import {useEffect, useRef} from 'react';
import {useFormState, useFormStatus} from 'react-dom';
import styles from './UpdateBalanceForm.module.css';
import {updateBalance} from './actions';

const initialState = null;

function AmountInput() {
    const {pending} = useFormStatus();

    return (
        <>
            <input id="amount" name="amount" placeholder="amount" />
            <input
                id="description"
                name="description"
                placeholder="description"
            />
            <button type="submit" aria-disabled={pending}>
                {pending ? 'Loading...' : 'Submit'}
            </button>
        </>
    );
}

export default function UserBalanceControls({user}: {user: User}) {
    const [state, formAction] = useFormState(
        updateBalance.bind(null, user.userId),
        initialState
    );

    const formRef = useRef<HTMLFormElement>(null);

    useEffect(
        function () {
            formRef.current?.reset();
        },
        [state]
    );

    return (
        <div className={styles.updateBalanceForm}>
            <p className={styles.balance}>Balance: {user.balance}</p>
            <form
                ref={formRef}
                action={formAction}
                className={styles.formSection}
            >
                <AmountInput />
            </form>
        </div>
    );
}
