import Tiptap from "@/components/editors/Tiptap";
import { JSONContent } from '@tiptap/react'
import { prisma } from "@/lib/prisma";
import { updateBio } from "@/app/actions/bio";

export default async function DashboardPage() {
    const bio = await prisma.bio.findFirst({
        select: { tiptapcontent: true },
    });

    const content: JSONContent = bio?.tiptapcontent as JSONContent || { type: 'doc', content: [] };

    return (
        <div style={{ padding: '2rem', textAlign: 'center' }} className="dark">
            <h1>Admin Dashboard</h1>
            <p>Welcome back! You’re authenticated ✅</p>

            <Tiptap initialContent={content} onSave={updateBio}/>
        </div>
    );
}
