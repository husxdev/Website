"use client";
import { Card, CardHeader, CardBody } from "@heroui/react";
import { motion } from "framer-motion";
import { TextFade } from "../app/structure/TextFade";
import Image from "next/image";
import { useRef } from "react";
import { useInview } from "../lib/animateInscroll";

const services = [
    {
        name: "Web Development",
        description: "Full-stack web development using modern technologies like React, Next.js, and Node.js.",
        icon: "/assets/web-dev-icon.png",
        price: "Contact for pricing",
        buttonText: "Get Started"
    },
    {
        name: "Discord Bot Development",
        description: "Custom Discord bots with advanced features and functionality.",
        icon: "/assets/discord-icon.png",
        price: "Starting at $10",
        buttonText: "Learn More"
    },
    {
        name: "Plugin Development",
        description: "Custom Minecraft plugins for Spigot and Paper servers.",
        icon: "/assets/design-icon.png",
        price: "Contact for pricing",
        buttonText: "Request Quote"
    }
];

export default function Services() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInview(ref);

    return (
        <div id="services" ref={ref} className="mt-10 flex flex-col items-center">
            <TextFade
                fullLoadedDuration={2.25}
                duration={1.85}
                words="Services"
                className="text-2xl font-bold text-white/90"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-1 mx-auto w-[95%] max-w-[1200px] p-4 justify-center">
                {services.map((service, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 25 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
                        transition={{
                            opacity: { duration: 0.8, delay: isInView ? index * 0.2 : 0 },
                            y: { duration: 0.65, delay: isInView ? index * 0.2 : 0, ease: [0.2, 0.8, 0.2, 1] },
                        }}
                    >
                        <Card className="bg-black/5 backdrop-blur-[1.5px] border border-[#999a9e]/75 rounded-xl relative z-0 transition-all duration-300 ease-out hover:shadow-[0_0_15px_rgba(35,32,32,20)] hover:border-opacity-70 hover:scale-[1.03] hover:backdrop-blur-none h-full flex flex-col">
                            <video
                                className="absolute inset-0 w-full h-full object-cover opacity-35 -z-10 rounded-md scale-[1.5]"
                                autoPlay
                                loop
                                muted
                                playsInline
                                preload="auto"
                            >
                                <source src="/assets/card.mp4" type="video/mp4" />
                            </video>
                            <CardHeader className="px-4 pt-4">
                                <div className="flex items-center gap-3 mb-2">
                                    {service.icon && (
                                        <Image
                                            src={service.icon}
                                            alt={`${service.name} icon`}
                                            width={40}
                                            height={40}
                                            className="w-10 h-10 object-contain"
                                        />
                                    )}
                                    <h2 className="text-xl font-bold tracking-tight text-white">
                                        {service.name}
                                    </h2>
                                </div>
                            </CardHeader>
                            <CardBody className="px-4 py-4 flex-grow flex flex-col">
                                <p className="text-gray-300 text-sm mb-4 flex-grow">
                                    {service.description}
                                </p>
                                <div className="mt-auto">
                                    <p className="text-gray-400 text-sm mb-3">{service.price}</p>
                                    <button className="w-full py-2 px-4 bg-zinc-800/80 hover:bg-zinc-700/80 text-white rounded-lg transition-all duration-300 border border-zinc-700/50 hover:border-zinc-600/50">
                                        {service.buttonText}
                                    </button>
                                </div>
                            </CardBody>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
