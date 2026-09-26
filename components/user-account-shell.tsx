"use client";

import { useState } from "react";
import UserAccountSidebar from "@/components/user-account-sidebar";

export default function UserAccountShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <UserAccountSidebar
        open={sidebarOpen}
        onToggle={() => setSidebarOpen((value) => !value)}
      />
      <div className={`min-h-screen transition-[padding] duration-300 ${sidebarOpen ? "lg:pl-64" : "lg:pl-20"}`}>
        {children}
      </div>
    </>
  );
}
