import Tiptap from "@/components/editors/Tiptap";

export default function DashboardPage() {

    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>Admin Dashboard</h1>
            <p>Welcome back! You’re authenticated ✅</p>

            <Tiptap />
        </div>
    );
}
