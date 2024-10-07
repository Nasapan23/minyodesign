'use client';
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import useIsMobile from '@/hooks/UseIsMobile'; // Import the custom hook

const Navigation = () => {
    const navRef = useRef(null);
    const placeholderRef = useRef(null);
    const [isSticky, setIsSticky] = useState(false);
    const isMobile = useIsMobile(); // Detect mobile

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isPortfolioOpen, setIsPortfolioOpen] = useState(false); // Dropdown state for Portfolio

    // Handle the sticky behavior for desktop
    useEffect(() => {
        if (!isMobile) {
            const handleScroll = () => {
                if (navRef.current && placeholderRef.current) {
                    const navTopOffset = placeholderRef.current.getBoundingClientRect().top;

                    // Make the navbar sticky when it reaches the top
                    if (navTopOffset <= 0) {
                        setIsSticky(true);
                    } else {
                        setIsSticky(false);
                    }
                }
            };

            window.addEventListener('scroll', handleScroll);
            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        } else {
            // On mobile, we want the navbar to always be sticky at the top
            setIsSticky(true);
        }
    }, [isMobile]);

    // Function to toggle the mobile menu
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((prev) => !prev);
        setIsPortfolioOpen(false); // Ensure dropdown is closed when toggling the menu
    };

    // Function to toggle the Portfolio dropdown for desktop
    const togglePortfolio = () => {
        setIsPortfolioOpen((prev) => !prev);
    };

    return (
        <>
            <div
                ref={placeholderRef}
                style={{ height: isSticky && !isMobile ? navRef.current?.offsetHeight : 0 }}
            ></div>

            {/* Navigation bar */}
            <div
                ref={navRef}
                className={`${
                    isSticky ? 'fixed top-0 left-0 w-full shadow-lg z-50' : 'relative'
                } bg-gray-900 transition-all duration-300`}
            >
                <nav className="flex justify-center md:justify-center items-center md:py-3 px-5 md:px-10 max-w-7xl mx-auto">
                    {/* Desktop Navigation Links (Centered) */}
                    {!isMobile && (
                        <div className="hidden md:flex items-center space-x-12 text-center">
                            <div className="relative group">
                                {/* Portfolio Button */}
                                <button
                                    onClick={togglePortfolio}
                                    className="text-lg font-bold text-gray-100 hover:text-gray-400 transition-colors duration-300"
                                >
                                    Portfolio
                                </button>
                                
                                {/* Dropdown for Portfolio */}
                                {isPortfolioOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute left-0 mt-2 w-48 bg-gray-800 shadow-lg rounded-lg p-4"
                                    >
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-gray-100 transition-colors duration-300"
                                        >
                                            Graphic Design
                                        </a>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-gray-100 transition-colors duration-300"
                                        >
                                            3D Modeling
                                        </a>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-gray-100 transition-colors duration-300"
                                        >
                                            Web Design
                                        </a>
                                    </motion.div>
                                )}
                            </div>
                            <button className="text-lg font-bold text-gray-100 hover:text-gray-400 transition-colors duration-300">
                                Contact
                            </button>
                            <button className="text-lg font-bold text-gray-100 hover:text-gray-400 transition-colors duration-300">
                                Partners
                            </button>
                        </div>
                    )}

                    {/* Mobile Menu Icon */}
                    {isMobile && (
                        <div className="md:hidden flex items-center absolute top-3 right-5">
                            <button
                                onClick={toggleMobileMenu}
                                className="bg-gray-700 p-2 rounded-full text-gray-100 shadow-lg outline-none focus:outline-none"
                            >
                                {isMobileMenuOpen ? (
                                    <FaTimes className="text-2xl" />
                                ) : (
                                    <FaBars className="text-2xl" />
                                )}
                            </button>
                        </div>
                    )}
                </nav>

                {/* Mobile Navigation Drawer */}
                {isMobile && isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -100 }}
                        className="md:hidden fixed top-0 left-0 w-full h-full bg-gray-900 z-40 flex flex-col items-center justify-start pt-10"
                    >
                        <button onClick={toggleMobileMenu} className="text-gray-100 text-3xl mb-8 outline-none focus:outline-none">
                            <FaTimes />
                        </button>
                        <button
                            className="text-xl text-gray-100 font-bold mb-4"
                            onClick={togglePortfolio}
                        >
                            Portfolio
                        </button>
                        {isPortfolioOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="flex flex-col items-center space-y-3"
                            >
                                <a href="#" className="text-gray-300 text-lg font-medium">
                                    Graphic Design
                                </a>
                                <a href="#" className="text-gray-300 text-lg font-medium">
                                    3D Modeling
                                </a>
                                <a href="#" className="text-gray-300 text-lg font-medium">
                                    Web Design
                                </a>
                            </motion.div>
                        )}
                        <a href="#" className="text-xl text-gray-100 font-bold mb-4">
                            Contact
                        </a>
                        <a href="#" className="text-xl text-gray-100 font-bold mb-4">
                            Partners
                        </a>
                    </motion.div>
                )}
            </div>
        </>
    );
};

export default Navigation;
