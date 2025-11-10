"use server";

export async function triggerRebuild() {
    if (process.env.NODE_ENV !== "production") {
        console.log("Skipping rebuild - not in production");
        return { skipped: true };
    }
    
    const hookUrl = process.env.VERCEL_DEPLOY_HOOK_URL;

    if (!hookUrl) throw new Error("Missing deploy hook URL");

    const res = await fetch(hookUrl, { method: "POST" });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Rebuild failed: ${res.status} ${res.statusText} - ${text}`);
    }

    return {
        success: true,
        status: res.status,
    };
}
