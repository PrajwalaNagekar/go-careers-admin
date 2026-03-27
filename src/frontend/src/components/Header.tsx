import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Input } from "../components/ui/input";
import { Bell, Search } from "lucide-react";
import { motion } from "motion/react";
import type { Section } from "./Sidebar";

const sectionTitles: Record<Section, string> = {
  overview: "Overview",
  recruiters: "Recruiters",
  candidates: "Candidates",
  jobs: "Job Listings",
  subscriptions: "Subscriptions",
  transactions: "Transactions",
  support: "Support Tickets",
  moderation: "Moderation",
  analytics: "Analytics",
  settings: "Settings",
};

interface HeaderProps {
  section: Section;
}

export default function Header({ section }: HeaderProps) {
  return (
    <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-20 shadow-sm">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-2xl font-bold text-gray-900">
          {sectionTitles[section]}
        </h1>
        <p className="text-xs text-gray-500 mt-0.5 font-medium">
          Manage and monitor your platform
        </p>
      </motion.div>

      <div className="flex items-center gap-6">
        {/* Search */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="relative hidden md:block"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search anything..."
            className="pl-11 h-11 rounded-full border-2 border-gray-200 bg-gray-50 text-sm focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 w-64 transition-all"
            data-ocid="header.search_input"
          />
        </motion.div>

        {/* Notification */}
        <motion.button
          type="button"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            alert("3 new notifications:\n\n✓ New recruiter registered\n✓ Job application received\n✓ Subscription payment processed");
          }}
          className="relative p-2.5 rounded-full hover:bg-gray-100 transition-colors group cursor-pointer"
          data-ocid="header.notification.button"
        >
          <Bell className="w-6 h-6 text-gray-600 group-hover:text-gray-900 transition-colors" />
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-red-500 shadow-lg"
          />
        </motion.button>

        {/* Profile Avatar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
        >
          <Avatar className="w-10 h-10 cursor-pointer ring-2 ring-gray-200 hover:ring-blue-300 transition-all">
            <AvatarImage src="https://i.pravatar.cc/150?img=1" alt="Admin" />
            <AvatarFallback className="bg-gradient-to-br from-blue-400 to-blue-600 text-white font-bold">
              AD
            </AvatarFallback>
          </Avatar>
        </motion.div>
      </div>
    </header>
  );
}
