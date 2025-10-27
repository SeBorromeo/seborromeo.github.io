'use client';

import { useActionState } from 'react';
import { login } from '@/app/actions/auth';

import styles from './page.module.scss';

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, undefined)

  return (
    <div className={styles.container}>
      <form action={action} className={styles.form}>
        <h2 className={styles.title}>Login</h2>

        <div>
          <label htmlFor="email">Email</label>
          <input className={styles.input} id="email" name="email" type="email" placeholder="Email" required/>
        </div>
        {state?.errors?.email && <p className={styles.error}>{state.errors.email}</p>}

        <div>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" placeholder="Password" required/>
        </div>
        {state?.errors?.password && <p className={styles.error}>{state.errors.password}</p>}

        <button type="submit" className={styles.button} disabled={pending}>
          {pending ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
