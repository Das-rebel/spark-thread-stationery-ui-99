import { ReactNode } from "react";
import { FloatingTweetButton } from "@/components/twitter/FloatingTweetButton";
import { KnowledgeHubFAB } from "../knowledge/KnowledgeHubFAB";
import { Header } from "./Header";
import { BottomNavigation } from "./BottomNavigation";
import { GestureHandler } from "@/components/ui/gesture-handler";
import { useLocation } from "react-router-dom";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();
  const isTwitterRoute = location.pathname.startsWith("/twitter");

  return (
    <div className="min-h-screen bg-gradient-paper overflow-x-hidden">
      <div className="max-w-2xl mx-auto min-h-screen bg-background relative">
        {location.pathname !== "/" && <Header />}
        
        <GestureHandler enableBackGesture={true}>
          <main className="mobile-optimized scroll-smooth scrollbar-hide">
            {children}
          </main>
        </GestureHandler>
        
        {isTwitterRoute && <FloatingTweetButton />}
        {!isTwitterRoute && <KnowledgeHubFAB />}
        
        <BottomNavigation />
      </div>
    </div>
  );
}