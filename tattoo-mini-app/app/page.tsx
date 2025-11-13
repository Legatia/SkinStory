import App from "@/components/App";
import { env } from "@/lib/env";
import { Metadata } from "next";

const appUrl = env.NEXT_PUBLIC_URL;

const frame = {
  version: "next",
  imageUrl: `${appUrl}/images/feed.png`,
  button: {
    title: "Discover Tattoos",
    action: {
      type: "launch_frame",
      name: "Tattoos.lib",
      url: appUrl,
      splashImageUrl: `${appUrl}/images/splash.png`,
      splashBackgroundColor: "#9333ea",
    },
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Tattoos.lib - NFT Tattoo Gallery",
    description: "Discover amazing tattoo art, read stories, and tip artists with USDC on Base",
    openGraph: {
      title: "Tattoos.lib - NFT Tattoo Gallery",
      description: "Explore soul-bound tattoo NFTs and support artists",
      images: [`${appUrl}/images/feed.png`],
    },
    other: {
      "fc:frame": JSON.stringify(frame),
    },
  };
}

export default function Home() {
  return <App />;
}
