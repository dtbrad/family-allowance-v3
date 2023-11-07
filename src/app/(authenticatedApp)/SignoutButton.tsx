'use client';

import React from 'react';
import styles from './SigninToggle.module.css';
import {useEffect, useState, useTransition} from 'react';
import {logoutUser} from './actions';

export default function SignOutButton({userId}: {userId: string}) {
    const [isPending, startTransition] = useTransition();

    return (
        <div className={styles.signinToggle}>
            <div className={styles.loggedInUser}>Signed in as: {userId}</div>
            <button
                disabled={isPending}
                onClick={() =>
                    startTransition(function () {
                        return logoutUser();
                    })
                }
            >
                Sign Out
            </button>
        </div>
    );
}
