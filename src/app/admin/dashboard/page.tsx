import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';

export default function DashboardPage() {
    // const cookieStore = cookies();
    // const session = cookieStore.get('session');

    // if (!session) redirect('/admin/login');

    // try {
    //     jwt.verify(session.value, process.env.JWT_SECRET!);
    // } catch {
    //     alert('Invalid or expired login');
    //     redirect('/admin/login');
    // }

    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>Admin Dashboard</h1>
            <p>Welcome back! You’re authenticated ✅</p>
        </div>
    );
}
