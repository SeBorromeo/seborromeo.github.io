/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            new URL('https://raw.githubusercontent.com/oyfaatuva/oyfa-website/**'),
            new URL('https://seborromeo-portfolio-assets.s3.us-east-2.amazonaws.com/images/**')
        ],
    },
};

export default nextConfig;
