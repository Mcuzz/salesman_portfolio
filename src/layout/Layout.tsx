import Navbar from "@/components/Navbar";
import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Navbar inverted={true} />
      <main className="pt-20">{children}</main>
    </div>
  );
}
