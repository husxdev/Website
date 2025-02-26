import Background from "@/components/Background";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SocketProvider } from "@/hooks/SocketContext";
import About from "@/components/About";
import Projects from "@/components/Projects";

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col">
            <Background />
            <SocketProvider>
                <Header />
            </SocketProvider>
            <div className="flex-1">
                <About />
                <Projects />
            </div>
            <Footer />
            <Analytics />
            <SpeedInsights />
        </div>
    );
}