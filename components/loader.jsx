"use client";

import React from "react";
import Image from "next/image";
import { BarLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm transition-all duration-500">
      <div className="relative flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-500">
        <div className="relative">
          <div className="absolute -inset-4 bg-emerald-500/20 rounded-full blur-xl animate-pulse" />
          <Image
            src="/logo.png"
            alt="Medimeet Logo"
            width={120}
            height={120}
            className="relative z-10 drop-shadow-2xl"
            priority
          />
        </div>
        
        <div className="flex flex-col items-center gap-2">
          <BarLoader color="#10b981" width={150} height={4} speedMultiplier={0.8} />
          <p className="text-emerald-500 font-medium tracking-widest text-xs uppercase animate-pulse">
            Loading Excellence
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loader;
