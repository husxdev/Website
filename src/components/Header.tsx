"use client";

import { useState, useEffect } from "react";
import { useSocket } from "@/hooks/SocketContext";
import { motion, AnimatePresence } from "framer-motion";
import UserArea from "./DiscordPresence";
import Link from "next/link"; // Add this import
import MusicPlayer from "./MusicPlayer"; // Add this import

export default function Header() {
	const [hamburgerTriggered, setHamburgerTriggered] = useState(false);
	const { status } = useSocket();
	const [showUserArea, setShowUserArea] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [isDesktop, setIsDesktop] = useState(false);

	const statusColor = {
		online:
			"bg-green-500 shadow-[0_0_3px_rgba(34,197,94,0.2),_0_0_5px_rgba(34,197,94,0.12),_0_0_8px_rgba(34,197,94,0.05)]",
		dnd: "bg-red-500 shadow-[0_0_3px_rgba(239,68,68,0.2),_0_0_5px_rgba(239,68,68,0.12),_0_0_8px_rgba(239,68,68,0.05)]",
		idle: "bg-yellow-500 shadow-[0_0_3px_rgba(234,179,8,0.2),_0_0_5px_rgba(234,179,8,0.12),_0_0_8px_rgba(234,179,8,0.05)]",
		offline:
			"bg-gray-500 shadow-[0_0_3px_rgba(107,114,128,0.2),_0_0_5px_rgba(107,114,128,0.12),_0_0_8px_rgba(107,114,128,0.05)]",
	} as const;

	const statusClass =
		statusColor[status as keyof typeof statusColor] || statusColor.offline;

	useEffect(() => {
		const handleResize = () => {
			setIsDesktop(window.innerWidth >= 1024);
			if (window.innerWidth >= 1100) {
				setHamburgerTriggered(false);
			}
		};

		// Initial check
		handleResize();

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		document.documentElement.style.scrollBehavior = "xsmooth";

		return () => {
			document.documentElement.style.scrollBehavior = "auto";
		};
	}, []);

	return (
		<div>
			<div className="h-20" />

			<AnimatePresence>
				{hamburgerTriggered && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
						onClick={() => setHamburgerTriggered(false)}
					></motion.div>
				)}
			</AnimatePresence>

			<motion.div
				initial={{ y: -100, scale: 0.98 }}
				animate={{
					y: 0,
					scale: 1,
					marginLeft: scrolled && isDesktop ? "8.5rem" : "5rem",
					marginRight: scrolled && isDesktop ? "8.5rem" : "5rem",
				}}
				transition={{
					y: { type: "spring", stiffness: 150, damping: 20 },
					scale: { type: "spring", stiffness: 120, damping: 25 },
					marginLeft: { type: "spring", stiffness: 70, damping: 25, mass: 1.2 },
					marginRight: {
						type: "spring",
						stiffness: 70,
						damping: 25,
						mass: 1.2,
					},
				}}
				className={`fixed top-0 left-0 right-0 mt-4 bg-dark/85 text-white border border-[#999a9e]/30 backdrop-blur-[5px] rounded-2xl shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.07)] non-selectable relative z-50`}
				style={{ position: "fixed", top: 0, left: 0, right: 0 }}
			>
				<div className="p-3.5 px-4 non-selectable">
					<div className="flex justify-between items-center non-selectable">
						<div className="flex items-center gap-2 non-selectable min-w-fit xsm:w-1/4">
							<div
								className="flex items-center gap-2 cursor-pointer"
								onClick={() => setShowUserArea(!showUserArea)}
							>
								<h1
									className="text-xl font-bold text-[#f0edff]/90 hover:text-[#f0edff] transition-all duration-300 non-selectable"
									style={{
										textShadow:
											"0 0 3px rgba(240,237,255,0.15), 0 0 5px rgba(240,237,255,0.08), 0 0 8px rgba(240,237,255,0.03)",
									}}
									onMouseEnter={(e) => {
										e.currentTarget.style.textShadow =
											"0 0 3px rgba(240,237,255,0.2), 0 0 5px rgba(240,237,255,0.12), 0 0 8px rgba(240,237,255,0.05)";
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.textShadow =
											"0 0 3px rgba(240,237,255,0.15), 0 0 5px rgba(240,237,255,0.08), 0 0 8px rgba(240,237,255,0.03)";
									}}
								>
									ExoDev
								</h1>
								<div
									className={`w-2 h-2 rounded-full ${statusClass} non-selectable ml-0.5`}
								></div>
							</div>
						</div>

						<div className="flex-grow flex justify-center zsm:w-2/4">
							<div className="pl-4 zsm:pl-8 xsm:pl-0 xsm:mx-auto w-full flex justify-center items-center">
								<div className="w-full max-w-[250px] flex justify-center">
 									<MusicPlayer />
								</div>
							</div>
						</div>

						<div className="flex items-center w-1/4 justify-end">
							<button
								className="lg:hidden flex items-center justify-center non-selectable"
								onClick={() => setHamburgerTriggered(!hamburgerTriggered)}
								aria-label="Toggle menu"
							>
								<div className="relative w-8 h-8 flex items-center justify-center">
									<motion.span
										className="absolute w-6 h-0.5 bg-white rounded-full"
										initial={false}
										animate={{
											rotate: hamburgerTriggered ? 45 : 0,
											y: hamburgerTriggered ? 0 : -8,
											width: hamburgerTriggered ? "20px" : "25px",
										}}
										transition={{ duration: 0.2, ease: "easeInOut" }}
									/>
									<motion.span
										className="absolute w-6 h-0.5 bg-white rounded-full"
										initial={false}
										animate={{
											opacity: hamburgerTriggered ? 0 : 1,
											scale: hamburgerTriggered ? 0 : 1,
										}}
										transition={{ duration: 0.1, ease: "easeInOut" }}
									/>
									<motion.span
										className="absolute w-6 h-0.5 bg-white rounded-full"
										initial={false}
										animate={{
											rotate: hamburgerTriggered ? -45 : 0,
											y: hamburgerTriggered ? 0 : 8,
											width: hamburgerTriggered ? "20px" : "24px",
										}}
										transition={{ duration: 0.2, ease: "easeInOut" }}
									/>
									<motion.span
										className="absolute w-0.5 h-5 bg-white rounded-full"
										initial={false}
										animate={{
											opacity: hamburgerTriggered ? 1 : 0,
											scale: hamburgerTriggered ? 1 : 0,
											height: "20px",
										}}
										transition={{ duration: 0.2, ease: "easeInOut" }}
									/>
									<motion.span
										className="absolute w-5 h-0.5 bg-white rounded-full"
										initial={false}
										animate={{
											opacity: hamburgerTriggered ? 1 : 0,
											scale: hamburgerTriggered ? 1 : 0,
											width: "20px",
										}}
										transition={{ duration: 0.2, ease: "easeInOut" }}
									/>
								</div>
							</button>
							<nav className="hidden lg:flex gap-2.5 items-center non-selectable">
								<Link
									href="/"
									onClick={() => setHamburgerTriggered(false)}
									className="nav-link text-white/80 hover:text-white py-2 px-3 rounded-xl transition-all duration-300 hover:bg-white/5"
								>
									Home
								</Link>
								<a
									href="#about"
									onClick={(e) => {
										e.preventDefault();
										const aboutElement = document.getElementById("about");
										if (aboutElement) {
											smoothScrollTo(aboutElement.offsetTop - 80, 650);
										}
										setHamburgerTriggered(false);
									}}
									className="nav-link text-white/80 hover:text-white py-2 px-3 rounded-xl transition-all duration-300 hover:bg-white/5"
								>
									About
								</a>
								<a
									href="#projects"
									onClick={(e) => {
										e.preventDefault();
										const projectsElement = document.getElementById("projects");
										if (projectsElement) {
											smoothScrollTo(projectsElement.offsetTop - 80, 650);
										}
										setHamburgerTriggered(false);
									}}
									className="nav-link text-white/80 hover:text-white py-2 px-3 rounded-xl transition-all duration-300 hover:bg-white/5"
								>
									Projects
								</a>
								<Link
									href="/services"
									onClick={() => setHamburgerTriggered(false)}
									className="nav-link text-white/80 hover:text-white py-2 px-3 rounded-xl transition-all duration-300 hover:bg-white/5"
								>
									Services
								</Link>
								<div className="h-6 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent mx-1.5" />
								<a
									href="mailto:exodev@atums.world"
									onClick={() => setHamburgerTriggered(false)}
									className="nav-link text-white/80 hover:text-white py-2 px-3 rounded-xl transition-all duration-300 hover:bg-white/5"
								>
									<svg
										className="w-5 h-5"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 2 0 002 2z"
										/>
									</svg>
								</a>
								<a
									href="https://github.com/husxdev"
									onClick={() => setHamburgerTriggered(false)}
									className="nav-link text-white/80 hover:text-white py-2 px-3 rounded-xl transition-all duration-300 hover:bg-white/5"
									target="_blank"
									rel="noopener noreferrer"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="w-5 h-5"
									>
										<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
										<path d="M20 3v4" />
										<path d="M22 5h-4" />
										<path d="M4 17v2" />
										<path d="M5 18H3" />
									</svg>
								</a>
							</nav>
						</div>
					</div>

					{hamburgerTriggered && (
						<div
							className="absolute left-0 right-0 mt-6 mx-4 bg-dark/70 text-white border border-[#898c91] opacity-75 rounded-2xl shadow-md shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(255,255,255,0.08)] transition-all duration-300 lg:hidden non-selectable z-30"
							style={{ boxShadow: "0 0 15px rgba(255, 255, 255, 0.05)" }}
						>
							<nav className="index-nav p-4 non-selectable">
								<div className="flex flex-col non-selectable">
									<Link
										href="/"
										onClick={() => setHamburgerTriggered(false)}
										className="hamburger-navlink text-white/80 hover:text-white py-2 hover:bg-white/10 transition-all duration-300 hover:text-shadow-[0_0_12px_rgba(255,255,255,0.7)] non-selectable"
									>
										Home
									</Link>
									<a
										href="#about"
										onClick={(e) => {
											e.preventDefault();
											const aboutElement = document.getElementById("about");
											if (aboutElement) {
												smoothScrollTo(aboutElement.offsetTop - 80, 800);
											}
											setHamburgerTriggered(false);
										}}
										className="hamburger-navlink text-white/80 hover:text-white py-2 hover:bg-white/10 transition-all duration-300 hover:text-shadow-[0_0_12px_rgba(255,255,255,0.7)] non-selectable"
									>
										About
									</a>
									<a
										href="#projects"
										onClick={(e) => {
											e.preventDefault();
											const projectsElement =
												document.getElementById("projects");
											if (projectsElement) {
												smoothScrollTo(projectsElement.offsetTop - 80, 800);
											}
											setHamburgerTriggered(false);
										}}
										className="hamburger-navlink text-white/80 hover:text-white py-2 hover:bg-white/10 transition-all duration-300 hover:text-shadow-[0_0_12px_rgba(255,255,255,0.7)] non-selectable"
									>
										Projects
									</a>
									<Link
										href="/services"
										onClick={() => setHamburgerTriggered(false)}
										className="hamburger-navlink text-white/80 hover:text-white py-2 hover:bg-white/10 transition-all duration-300 hover:text-shadow-[0_0_12px_rgba(255,255,255,0.7)] non-selectable"
									>
										Services
									</Link>
									<a
										href="mailto:exodev@atums.world"
										className="hamburger-navlink text-white/80 hover:text-white py-2 hover:bg-white/10 transition-all duration-300 hover:text-shadow-[0_0_12px_rgba(255,255,255,0.7)] non-selectable"
									>
										<div className="flex items-center">
											<svg
												className="w-5 h-5 mr-2"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2v10a2 2 2 0 002 2z"
												/>
											</svg>
											Contact
										</div>
									</a>
									<a
										href="https://github.com/husxdev"
										className="hamburger-navlink text-white/80 hover:text-white py-2 hover:bg-white/10 transition-all duration-300 hover:text-shadow-[0_0_12px_rgba(255,255,255,0.7)] non-selectable"
										target="_blank"
										rel="noopener noreferrer"
									>
										<div className="flex items-center">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="24"
												height="24"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
												className="w-5 h-5 mr-2"
											>
												<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
												<path d="M20 3v4" />
												<path d="M22 5h-4" />
												<path d="M4 17v2" />
												<path d="M5 18H3" />
											</svg>
											Source
										</div>
									</a>
								</div>
							</nav>
						</div>
					)}
				</div>
			</motion.div>

			<UserArea isOpen={showUserArea} onClose={() => setShowUserArea(false)} />
		</div>
	);
}

function smoothScrollTo(targetY: number, duration: number) {
	const startY = window.scrollY;
	const distance = targetY - startY;
	let startTime: number | null = null;

	function animation(currentTime: number) {
		if (startTime === null) startTime = currentTime;
		const timeElapsed = currentTime - startTime;
		const progress = Math.min(timeElapsed / duration, 1);
		const ease = easeInOutQuad(progress);
		window.scrollTo(0, startY + distance * ease);

		if (timeElapsed < duration) {
			requestAnimationFrame(animation);
		}
	}

	function easeInOutQuad(t: number) {
		return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
	}

	requestAnimationFrame(animation);
}