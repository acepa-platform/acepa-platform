"use client";

import { useEffect, useState, type ReactNode } from "react";
import UserAccountSidebar from "@/components/user-account-sidebar";

const SIDEBAR_STORAGE_KEY = "acepa-account-sidebar-open";

export default function UserAccountShell({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(SIDEBAR_STORAGE_KEY);
    if (saved !== null) {
      setSidebarOpen(saved === "true");
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) {
      window.localStorage.setItem(SIDEBAR_STORAGE_KEY, String(sidebarOpen));
    }
  }, [sidebarOpen, ready]);

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
