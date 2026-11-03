
import Navbar from "@/components/Navbar/Navbar";
import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen w-full bg-white text-black">
      <Navbar />
      <main className="w-full pt-24">
        {children}
      </main>
    </div>
  );
}
