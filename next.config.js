/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['media.kitsu.io', 'kitsu.io', 'avatars.slack-edge.com'],
        formats: ['image/avif', 'image/webp']
    }
}

module.exports = nextConfig
