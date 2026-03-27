import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import Header from "./Header";
import Sidebar, { type Section } from "./Sidebar";
import Analytics from "./sections/Analytics";
import Candidates from "./sections/Candidates";
import Jobs from "./sections/Jobs";
import Moderation from "./sections/Moderation";
import Overview from "./sections/Overview";
import Recruiters from "./sections/Recruiters";
import Settings from "./sections/Settings";
import Subscriptions from "./sections/Subscriptions";
import Support from "./sections/Support";
import Transactions from "./sections/Transactions";

const SECTION_MAP: Record<Section, React.ReactNode> = {
  overview: <Overview />,
  recruiters: <Recruiters />,
  candidates: <Candidates />,
  jobs: <Jobs />,
  subscriptions: <Subscriptions />,
  transactions: <Transactions />,
  support: <Support />,
  moderation: <Moderation />,
  analytics: <Analytics />,
  settings: <Settings />,
};

interface DashboardProps {
  onLogout: () => void;
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const [section, setSection] = useState<Section>("overview");

  return (
    <div className="flex min-h-screen" style={{ background: "#F8FAFC" }}>
      <Sidebar
        activeSection={section}
        onNavigate={setSection}
        onLogout={onLogout}
      />

      {/* Main content offset by sidebar width */}
      <div className="flex-1 flex flex-col" style={{ marginLeft: 260 }}>
        <Header section={section} />

        <main className="flex-1 p-8 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={section}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              {SECTION_MAP[section]}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="py-5 px-8 text-center text-xs text-gray-500 border-t border-gray-200 bg-white font-medium">
          © {new Date().getFullYear()} GoCareer Admin Panel. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
