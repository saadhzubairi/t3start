/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js"; // Make sure this path is correct relative to your project root

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // This wildcard allows any hostname
        // port: '', // Optional: Omit to allow any port, or specify if needed
        // pathname: '/**', // Optional: Omit to allow any path, or specify e.g., '/images/**'
      },
      {
        protocol: 'http', // Also allow http if necessary
        hostname: '**',
        // port: '',
        // pathname: '/**',
      },
    ],
  },
};

export default config;