'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const Navigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Function to toggle the menu
    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    // Framer Motion variants for advanced animation
    const menuVariants = {
        hidden: {
            opacity: 0,
            scale: 0.9,
            y: -50,
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1], // Smooth easing curve
            },
        },
        exit: {
            opacity: 0,
            scale: 0.9,
            y: -50,
            transition: {
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
            },
        },
    };

    return (
        <>
            {/* Floating Circle Button */}
            <button
                onClick={toggleMenu}
                className="outline-none fixed top-5 right-5 z-50"
            >
                <Image
                    src="/buton-meniu.svg"
                    alt="Menu Button"
                    width={80}
                    height={80}
                    className="w-16 h-16" // Larger SVG icon
                />
            </button>

            {/* Animated Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        variants={menuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="fixed top-0 left-0 w-full h-full bg-blue-100 z-40 flex flex-col items-center justify-center"
                    >
                        {/* Close Button */}
                        <button
                            onClick={toggleMenu}
                            className="absolute top-5 right-5"
                        >
                            <Image
                                src="/buton-meniu.svg"
                                alt="Close Menu"
                                width={80}
                                height={80}
                                className="rotate-180 w-16 h-16"
                            />
                        </button>

                        {/* Menu Content */}
                        <nav className="flex flex-col items-center space-y-8">
                            <motion.a
                                href="#"
                                className="text-3xl text-[#046494] font-bold"
                                style={{ color: '#046494' }} // Inline style fallback
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                Portfolio
                            </motion.a>
                            <motion.a
                                href="#"
                                className="text-3xl text-[#046494] font-bold"
                                style={{ color: '#046494' }} // Inline style fallback
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
                                Partners
                            </motion.a>
                            <motion.a
                                href="#"
                                className="text-3xl text-[#046494] font-bold"
                                style={{ color: '#046494' }} // Inline style fallback
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                            >
                                Contact
                            </motion.a>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navigation;
