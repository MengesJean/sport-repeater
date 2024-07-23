import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Sport Repeater",
        short_name: "App",
        description: "An example of a PWA using Next.js and TypeScript",
        start_url: "/",
        display: "standalone",
        background_color: "#FFFFFF",
        theme_color: "#FFFFFF",
        orientation: "portrait"
    }
}