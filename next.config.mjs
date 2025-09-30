/** @type {import('next').NextConfig} */

const nextConfig = {
    basePath: '',
    output: 'export',
    reactStrictMode: true,
    images: { 
        unoptimized: true, // For static export
    },
};

export default nextConfig;
