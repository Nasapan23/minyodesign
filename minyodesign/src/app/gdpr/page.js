'use client';

import React, { useState, useEffect } from 'react';
import Navigation from '@/components/navigation';
import CloudyOverlay from '@/components/cloudOverlay/cloudOverlay';
import Footer from '@/components/footer';
import LoadingScreen from '@/components/loadingScreen';

export default function PoliticaConfidentialitate() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="bg-blue-50 min-h-screen">
      <Navigation />

      {/* Top Overlay */}
      <div className="relative h-[16vh] w-full -mt-10">
        <CloudyOverlay mode="up" />
      </div>

      {/* GDPR Compliance Content */}
      <div className="container mx-auto px-8 py-16 space-y-12 mt-16">
        <h1 className="text-4xl font-bold text-gray-800 text-center">Politica de Confidențialitate</h1>

        <section className="text-lg text-gray-600 leading-relaxed">
          <p>
            Această politică de confidențialitate explică modul în care gestionăm datele utilizatorilor în conformitate cu Regulamentul General privind Protecția Datelor (GDPR) - Regulamentul (UE) 2016/679.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6">1. Colectarea Datelor</h2>
          <p>
            În prezent, acest site nu colectează, nu stochează și nu procesează date personale ale vizitatorilor. 
            Nu folosim cookie-uri, nu cerem formulare de înscriere și nu monitorizăm utilizatorii prin metode care identifică persoane.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6">2. Instrumente de Analiză și Publicitate</h2>
          <p>
            Deși momentan nu folosim astfel de tehnologii, în viitor am putea implementa instrumente precum:
          </p>
          <ul className="list-disc ml-6 mt-2">
            <li>Meta Pixel – pentru analiza traficului și eficiența campaniilor de marketing;</li>
            <li>Instrumente PPC pentru optimizarea publicității online;</li>
            <li>Alte tehnologii de analiză anonimizată.</li>
          </ul>
          <p>
            Dacă aceste funcționalități vor fi adăugate, această politică va fi actualizată pentru a reflecta modul în care datele sunt gestionate.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6">3. Drepturile Utilizatorilor</h2>
          <p>
            Chiar dacă nu colectăm date personale, ne angajăm să respectăm drepturile utilizatorilor conform GDPR:
          </p>
          <ul className="list-disc ml-6 mt-2">
            <li>Dreptul de a fi informat cu privire la colectarea și utilizarea datelor personale;</li>
            <li>Dreptul de acces la datele personale (dacă vor fi colectate în viitor);</li>
            <li>Dreptul de rectificare a informațiilor incorecte;</li>
            <li>Dreptul de ștergere a datelor („dreptul de a fi uitat”);</li>
            <li>Dreptul de a restricționa procesarea datelor;</li>
            <li>Dreptul la portabilitatea datelor;</li>
            <li>Dreptul de a depune o plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP).</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6">4. Securitatea Datelor</h2>
          <p>
            Deoarece nu colectăm date personale, nu există riscuri legate de stocarea acestora. În cazul în care acest aspect se schimbă, vom implementa măsuri stricte de protecție a datelor.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6">5. Modificări ale Politicii de Confidențialitate</h2>
          <p>
            Această politică poate fi actualizată în funcție de modificările legislative sau de implementarea unor noi funcționalități pe site. Orice schimbare va fi publicată pe această pagină.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6">6. Contact</h2>
          <p>
            Dacă aveți întrebări legate de această politică de confidențialitate, ne puteți contacta la:
          </p>
          <p className="font-semibold">
            Email: <a href="mailto:contact@minyodesign.ro" className="text-blue-500 underline">contact@minyodesign.ro</a>
          </p>
        </section>
      </div>

      {/* Bottom Overlay & Footer */}
      <div className="relative mt-[80%] lg:mt-[-36%] w-full">
        <CloudyOverlay />
        <Footer />
      </div>
    </div>
  );
}
