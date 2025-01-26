'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { DropdownArrowSVG } from '@/utils/svgs';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.position = 'fixed';
      document.body.style.top = `-${window.scrollY}px`;
      document.body.style.width = '100%';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      <button
        onClick={toggleMenu}
        className="fixed top-5 right-5 z-[100] outline-none"
      >
        {isMenuOpen ? (
          <Image
            src="/buton-meniu-x.svg"
            alt="Close Menu"
            width={80}
            height={80}
            className="w-16 h-16"
          />
        ) : (
          <Image
            src="/buton-meniu.svg"
            alt="Open Menu"
            width={80}
            height={80}
            className="w-16 h-16"
          />
        )}
      </button>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-blue-100 z-[99] flex items-center justify-center"
        >
          <nav className="space-y-4">
            <motion.a
              href="#"
              className="block text-2xl font-medium text-black"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              Acasa
            </motion.a>
            <motion.a
              href="#"
              className="block text-2xl font-medium text-black"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              Despre Noi
            </motion.a>
            <motion.a
              href="#"
              className="block text-2xl font-medium text-black"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              Portofoliu
            </motion.a>
            <div>
              <motion.button
                onClick={toggleDropdown}
                className="block text-2xl font-medium text-black flex items-center justify-between w-full"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <span>Parteneri</span>
                <motion.span
                  animate={{ rotate: isDropdownOpen ? -90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {'>'}
                </motion.span>
              </motion.button>
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.ul
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 space-y-2"
                  >
                    <li>
                      <a
                        href="https://nisipeanutech.ro"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-lg text-black"
                      >
                        nisipeanutech.ro
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block text-lg text-black">
                        Value2
                      </a>
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </nav>
        </motion.div>
      )}
    </>
  );
}
