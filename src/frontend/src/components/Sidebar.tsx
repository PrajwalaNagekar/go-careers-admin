import {
  ArrowLeftRight,
  BarChart3,
  Briefcase,
  CreditCard,
  HeadphonesIcon,
  LayoutDashboard,
  LogOut,
  Settings,
  ShieldAlert,
  UserCheck,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

export type Section =
  | "overview"
  | "recruiters"
  | "candidates"
  | "jobs"
  | "subscriptions"
  | "transactions"
  | "support"
  | "moderation"
  | "analytics"
  | "settings";

const navItems: { id: Section; label: string; icon: React.ReactNode }[] = [
  {
    id: "overview",
    label: "Overview",
    icon: <LayoutDashboard className="w-4 h-4" />,
  },
  {
    id: "recruiters",
    label: "Recruiters",
    icon: <Users className="w-4 h-4" />,
  },
  {
    id: "candidates",
    label: "Candidates",
    icon: <UserCheck className="w-4 h-4" />,
  },
  { id: "jobs", label: "Jobs", icon: <Briefcase className="w-4 h-4" /> },
  {
    id: "subscriptions",
    label: "Subscriptions",
    icon: <CreditCard className="w-4 h-4" />,
  },
  {
    id: "transactions",
    label: "Transactions",
    icon: <ArrowLeftRight className="w-4 h-4" />,
  },
  {
    id: "support",
    label: "Support",
    icon: <HeadphonesIcon className="w-4 h-4" />,
  },
  {
    id: "moderation",
    label: "Moderation",
    icon: <ShieldAlert className="w-4 h-4" />,
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: <BarChart3 className="w-4 h-4" />,
  },
  { id: "settings", label: "Settings", icon: <Settings className="w-4 h-4" /> },
];

interface SidebarProps {
  activeSection: Section;
  onNavigate: (s: Section) => void;
  onLogout: () => void;
}

export default function Sidebar({
  activeSection,
  onNavigate,
  onLogout,
}: SidebarProps) {
  return (
    <aside
      className="sidebar-gradient fixed left-0 top-0 bottom-0 flex flex-col z-30 shadow-xl"
      style={{ width: 260 }}
    >
      {/* Logo Section */}
      <div
        className="px-6 py-7 flex items-center gap-3 border-b"
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg"
          style={{ background: "linear-gradient(135deg, #2F80ED 0%, #1E40AF 100%)" }}
        >
          <Briefcase className="w-5 h-5 text-white" />
        </motion.div>
        <div>
          <span className="text-white font-bold text-lg tracking-tight block">
            GoCareer
          </span>
          <span className="text-blue-200 text-xs font-semibold opacity-70">
            Admin Panel
          </span>
        </div>
      </div>

      {/* Navigation Section */}
      <nav className="flex-1 py-6 overflow-y-auto px-3 space-y-1">
        {navItems.map((item, index) => {
          const isActive = activeSection === item.id;
          return (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 group relative overflow-hidden ${
                isActive
                  ? "text-white"
                  : "text-blue-100 hover:text-white"
              }`}
              style={{
                background: isActive
                  ? "rgba(47, 128, 237, 0.25)"
                  : "transparent",
              }}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              data-ocid={`nav.${item.id}.link`}
            >
              {/* Background glow on active */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 -z-10 rounded-lg blur-sm"
                  style={{ background: "rgba(47, 128, 237, 0.15)" }}
                  layoutId="sidebarActive"
                />
              )}

              <span
                className={`transition-all duration-200 ${
                  isActive ? "text-blue-300" : "text-blue-200 group-hover:text-blue-100"
                }`}
              >
                {item.icon}
              </span>
              <span className="flex-1 text-left">{item.label}</span>
              
              {/* Badge for support */}
              {item.id === "support" && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-auto text-xs font-bold rounded-full px-2 py-1"
                  style={{ background: "#EF4444", color: "white" }}
                >
                  4
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Bottom divider */}
      <div
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
        className="border-t"
      />

      {/* Logout Section */}
      <div className="px-3 py-5">
        <motion.button
          whileHover={{ x: 2, background: "rgba(255,255,255,0.1)" }}
          whileTap={{ scale: 0.97 }}
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-blue-100 hover:text-white transition-colors duration-200"
          data-ocid="nav.logout.button"
        >
          <LogOut className="w-4 h-4" />
          <span>Log Out</span>
        </motion.button>
      </div>
    </aside>
  );
}
