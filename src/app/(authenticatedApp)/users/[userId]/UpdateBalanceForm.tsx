'use client';

import {User} from '@/domain/User';
import styles from './UpdateBalanceForm.module.css';
import {useFormState, useFormStatus} from 'react-dom';
import {updateBalance} from './actions';
import {useEffect, useRef, useState} from 'react';
import {Status} from '@/domain/Status';

const initialState = {status: null};

function SubmitButton() {
    const {pending} = useFormStatus();

    return (
        <button type="submit" aria-disabled={pending}>
            {pending ? 'Loading...' : 'Submit'}
        </button>
    );
}

function AmountInput({status}: {status?: Status}) {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const myRef = useRef(null);

    useEffect(
        function () {
            // if (status === Status.success) {
            setAmount('');
            setDescription('');
            // }
            console.log('RESETTING AMOUNT INPUT', myRef);
            // setAmount('');
        },
        [status]
    );

    return (
        <>
            <input
                ref={myRef}
                onChange={(e) => setAmount(e.target.value)}
                id="amount"
                name="amount"
                value={amount}
                placeholder="amount"
            />
            <input
                ref={myRef}
                onChange={(e) => setDescription(e.target.value)}
                id="description"
                name="description"
                value={description}
                placeholder="description"
            />
        </>
    );
}

export default function UserBalanceControls({user}: {user: User}) {
    const [state, formAction] = useFormState(updateBalance, initialState);

    return (
        <div className={styles.updateBalanceForm}>
            <p className={styles.balance}>Balance: {user.balance}</p>
            <form action={formAction} className={styles.formSection}>
                <input
                    type="hidden"
                    id="user-id"
                    name="user-id"
                    value={user.userId}
                />
                <AmountInput status={state.status} />
                <SubmitButton />
                <p aria-live="polite" className={styles.hidden} role="status">
                    {state?.status}
                </p>
            </form>
        </div>
    );
}
