import Background from "@/components/Background";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import Services from "@/components/Services";
import { SocketProvider } from "@/hooks/SocketContext";

export default function ServicesPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Background />
            <SocketProvider>
                <Header />
            </SocketProvider>
            <div className="flex-1 pt-24">
                <Services />
            </div>
            <Footer />
        </div>
    );
}
