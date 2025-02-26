import "./globals.css";
import { SocketProvider } from "@/hooks/SocketContext";

export const metadata = {
	title: "ExoDev's Portfolio",
	description: "designer, developer and web artist",
	openGraph: {
		siteName: "portfolio",
		title: "ExoDev",
		description: "designer, developer and web artist",
		url: "https://exodev.xyz",
		images: [
			{
				url: "https://cortex.rest/assets/embed.png",
			},
		],
	},
};

export default function RootLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta name="darkreader-lock" />
				<meta name="theme-color" content="#232121" />				
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
				<link rel="preload" href="/assets/background.svg" as="image" />
				<link rel="preload" href="/assets/card.mp4" as="video" />
			</head>
				<body>
					<SocketProvider>{children}</SocketProvider>
				</body>
		</html>
	);
}