"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const applyTheme = (appearance: string, systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches) => {
      const dark = appearance === "dark" || (appearance === "system" && systemDark);
      document.documentElement.classList.toggle("dark", dark);
      document.documentElement.style.colorScheme = dark ? "dark" : "light";
    };

    const load = async () => {
      const saved = localStorage.getItem("acepa-appearance");
      const isPublicPage =
        pathname === "/" ||
        pathname === "/about" ||
        pathname === "/companies" ||
        pathname === "/how-it-works" ||
        pathname === "/get-started" ||
        pathname === "/sign-in" ||
        pathname === "/forgot-password" ||
        pathname === "/update-password" ||
        pathname === "/search" ||
        pathname === "/opportunities" ||
        pathname.startsWith("/discover");
      if (isPublicPage) {
        applyTheme("light");
        return;
      }

      if (saved) applyTheme(saved);

      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        applyTheme(saved || "system");
        return;
      }

      const { data } = await supabase
        .from("user_preferences")
        .select("appearance")
        .eq("user_id", user.id)
        .maybeSingle();

      const appearance = saved || data?.appearance || "system";
      localStorage.setItem("acepa-appearance", appearance);
      applyTheme(appearance);

      const media = window.matchMedia("(prefers-color-scheme: dark)");
      const onSystemChange = () => {
        if (appearance === "system") applyTheme("system", media.matches);
      };
      media.addEventListener("change", onSystemChange);

      return () => media.removeEventListener("change", onSystemChange);
    };

    const onAppearanceChange = (event: Event) => {
      const appearance = (event as CustomEvent<string>).detail;
      localStorage.setItem("acepa-appearance", appearance);
      applyTheme(appearance);
    };

    window.addEventListener("acepa-appearance-change", onAppearanceChange);
    const cleanup = load();

    return () => {
      window.removeEventListener("acepa-appearance-change", onAppearanceChange);
      void cleanup;
    };
  }, [pathname]);

  return <>{children}</>;
}
