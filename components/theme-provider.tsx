"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect } from "react";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const applyTheme = (appearance: string, systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches) => {
      const dark = appearance === "dark" || (appearance === "system" && systemDark);
      document.documentElement.classList.toggle("dark", dark);
      document.documentElement.style.colorScheme = dark ? "dark" : "light";
    };

    const load = async () => {
      const saved = localStorage.getItem("acepa-appearance");
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

      const appearance = data?.appearance || saved || "system";
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
  }, []);

  return <>{children}</>;
}
