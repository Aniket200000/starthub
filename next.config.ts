import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */

    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*', // Allows subdomains of any domain
            }
        ]
    },
    devIndicators: {
        appIsrStatus: true,
        buildActivity: true,
        buildActivityPosition: "bottom-right",
    },
};

// Import and wrap with the bundle analyzer
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

// Combine the configs
export default withBundleAnalyzer(nextConfig);
