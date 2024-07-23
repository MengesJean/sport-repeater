/** @type {import('next').NextConfig} */
const nextConfig = {};

import withPWA from 'next-pwa';

const withPWAModule = withPWA({
    dest: 'public',
    register: true,
    skipWaiting: true,
});

export default withPWAModule(nextConfig);