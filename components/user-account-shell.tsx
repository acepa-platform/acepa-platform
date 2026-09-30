"use client";

import { useEffect, useState, type ReactNode } from "react";
import UserAccountSidebar from "@/components/user-account-sidebar";

const SIDEBAR_STORAGE_KEY = "acepa-account-sidebar-open";

const translations: Record<string, Record<string, string>> = {
  French: {
    "Home":"Accueil","Discover":"Découvrir","Feed":"Fil","Wallet":"Portefeuille","Activity":"Activité","Profile":"Profil",
    "My Participations":"Mes participations","My Investments":"Mes investissements","My Earnings":"Mes revenus","Saved":"Enregistré","Referrals":"Parrainages","Reputation":"Réputation","Watchlist":"Liste de suivi","Upcoming Projects":"Projets à venir",
    "Investment":"Investissement","Innovation":"Innovation","Marketing":"Marketing","Business":"Entreprise","Collaboration":"Collaboration","Experts":"Experts","Careers & Jobs":"Carrières et emplois",
    "Business Hub":"Espace entreprise","Proposal Hub":"Espace propositions","AI Assistant":"Assistant IA","Learning Center":"Centre d'apprentissage",
    "Notifications":"Notifications","Settings":"Paramètres","ACEPA ID":"ID ACEPA","Support":"Assistance","Language":"Langue","Account Management":"Gestion du compte","Legal & Information":"Informations légales",
    "Welcome to ACEPA":"Bienvenue sur ACEPA","Create value. Find opportunity. Make progress.":"Créez de la valeur. Trouvez des opportunités. Progressez.",
    "Discover opportunities":"Découvrir les opportunités","ACEPA Best Investment Units":"Meilleures unités d'investissement ACEPA","Your overview":"Votre aperçu",
    "Referral Program":"Programme de parrainage","Explore the platform":"Explorer la plateforme","Marketplace":"Marché",
    "Recommended opportunities":"Opportunités recommandées","Latest from companies":"Actualités des entreprises"
  },
  Portuguese: {
    "Home":"Início","Discover":"Descobrir","Feed":"Feed","Wallet":"Carteira","Activity":"Atividade","Profile":"Perfil",
    "My Participations":"Minhas participações","My Investments":"Meus investimentos","My Earnings":"Meus ganhos","Saved":"Salvos","Referrals":"Indicações","Reputation":"Reputação","Watchlist":"Lista de acompanhamento","Upcoming Projects":"Projetos futuros",
    "Investment":"Investimento","Innovation":"Inovação","Marketing":"Marketing","Business":"Negócios","Collaboration":"Colaboração","Experts":"Especialistas","Careers & Jobs":"Carreiras e empregos",
    "Business Hub":"Central de negócios","Proposal Hub":"Central de propostas","AI Assistant":"Assistente de IA","Learning Center":"Centro de aprendizagem",
    "Notifications":"Notificações","Settings":"Configurações","ACEPA ID":"ID ACEPA","Support":"Suporte","Language":"Idioma","Account Management":"Gestão da conta","Legal & Information":"Informações legais",
    "Welcome to ACEPA":"Bem-vindo à ACEPA","Create value. Find opportunity. Make progress.":"Crie valor. Encontre oportunidades. Faça progresso.",
    "Discover opportunities":"Descobrir oportunidades","ACEPA Best Investment Units":"Melhores unidades de investimento ACEPA","Your overview":"Sua visão geral",
    "Referral Program":"Programa de indicações","Explore the platform":"Explorar a plataforma","Marketplace":"Marketplace",
    "Recommended opportunities":"Oportunidades recomendadas","Latest from companies":"Últimas das empresas"
  },
  Spanish: {
    "Home":"Inicio","Discover":"Descubrir","Feed":"Feed","Wallet":"Billetera","Activity":"Actividad","Profile":"Perfil",
    "My Participations":"Mis participaciones","My Investments":"Mis inversiones","My Earnings":"Mis ganancias","Saved":"Guardados","Referrals":"Referidos","Reputation":"Reputación","Watchlist":"Lista de seguimiento","Upcoming Projects":"Próximos proyectos",
    "Investment":"Inversión","Innovation":"Innovación","Marketing":"Marketing","Business":"Negocios","Collaboration":"Colaboración","Experts":"Expertos","Careers & Jobs":"Carreras y empleos",
    "Business Hub":"Centro empresarial","Proposal Hub":"Centro de propuestas","AI Assistant":"Asistente de IA","Learning Center":"Centro de aprendizaje",
    "Notifications":"Notificaciones","Settings":"Configuración","ACEPA ID":"ID de ACEPA","Support":"Soporte","Language":"Idioma","Account Management":"Gestión de cuenta","Legal & Information":"Información legal",
    "Welcome to ACEPA":"Bienvenido a ACEPA","Create value. Find opportunity. Make progress.":"Crea valor. Encuentra oportunidades. Avanza.",
    "Discover opportunities":"Descubrir oportunidades","ACEPA Best Investment Units":"Mejores unidades de inversión ACEPA","Your overview":"Tu resumen",
    "Referral Program":"Programa de referidos","Explore the platform":"Explorar la plataforma","Marketplace":"Mercado",
    "Recommended opportunities":"Oportunidades recomendadas","Latest from companies":"Últimas de las empresas"
  }
};

export default function UserAccountShell({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(SIDEBAR_STORAGE_KEY);
    if (saved !== null) setSidebarOpen(saved === "true");
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) window.localStorage.setItem(SIDEBAR_STORAGE_KEY, String(sidebarOpen));
  }, [sidebarOpen, ready]);

  useEffect(() => {
    const savedLanguage = () => window.localStorage.getItem("acepa-language") || "English";
    let language = savedLanguage();
    const originals = new WeakMap<Text, string>();

    function apply() {
      const dictionary = translations[language] || {};
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let node: Node | null;
      while ((node = walker.nextNode())) {
        const textNode = node as Text;
        const parent = textNode.parentElement;
        if (!parent || ["SCRIPT","STYLE","INPUT","TEXTAREA"].includes(parent.tagName)) continue;
        if (!originals.has(textNode)) originals.set(textNode, textNode.nodeValue || "");
        const original = originals.get(textNode) || "";
        textNode.nodeValue = language === "English" ? original : (dictionary[original.trim()] ? original.replace(original.trim(), dictionary[original.trim()]) : original);
      }
    }

    const observer = new MutationObserver(() => apply());
    observer.observe(document.body, { childList: true, subtree: true });
    apply();

    const onLanguageChange = (event: Event) => {
      language = (event as CustomEvent<string>).detail || "English";
      apply();
    };
    window.addEventListener("acepa-language-change", onLanguageChange);
    return () => {
      observer.disconnect();
      window.removeEventListener("acepa-language-change", onLanguageChange);
    };
  }, []);

  return (
    <>
      <UserAccountSidebar open={sidebarOpen} onToggle={() => setSidebarOpen((value) => !value)} />
      <div className={`min-h-screen transition-[padding] duration-300 ${sidebarOpen ? "lg:pl-64" : "lg:pl-20"}`}>{children}</div>
    </>
  );
}
