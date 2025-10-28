'use client';

import { validate } from "@/app/actions/auth";
import Router from "next/router";
import { useEffect } from "react";

export default function DashboardPage() {
    useEffect(() => {
        const isAuth = validate()
        if (!isAuth) {
            Router.push('/admin/login');
        }
    });

    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>Admin Dashboard</h1>
            <p>Welcome back! You’re authenticated ✅</p>
        </div>
    );
}
