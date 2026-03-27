import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import {
  candidates,
  jobCategoryData,
  recruiters,
  userGrowthData,
} from "../../data/mockData";
import {
  Briefcase,
  IndianRupee,
  TrendingUp,
  UserCheck,
  Users,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "motion/react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const kpis = [
  {
    label: "Total Recruiters",
    value: "247",
    delta: "+12%",
    icon: <Users className="w-6 h-6" />,
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    bgColor: "rgba(102, 126, 234, 0.1)",
  },
  {
    label: "Total Candidates",
    value: "1,842",
    delta: "+18%",
    icon: <UserCheck className="w-6 h-6" />,
    gradient: "linear-gradient(135deg, #0ba360 0%, #3cba92 100%)",
    bgColor: "rgba(11, 163, 96, 0.1)",
  },
  {
    label: "Active Jobs",
    value: "389",
    delta: "+9%",
    icon: <Briefcase className="w-6 h-6" />,
    gradient: "linear-gradient(135deg, #f46b45 0%, #eea849 100%)",
    bgColor: "rgba(244, 107, 69, 0.1)",
  },
  {
    label: "Monthly Revenue",
    value: "₹40.03L",
    delta: "+4%",
    icon: <IndianRupee className="w-6 h-6" />,
    gradient: "linear-gradient(135deg, #c471ed 0%, #f64f59 100%)",
    bgColor: "rgba(196, 113, 237, 0.1)",
  },
];

function StatusPill({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Active: "bg-green-100 text-green-700",
    Suspended: "bg-red-100 text-red-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Blocked: "bg-red-100 text-red-700",
  };
  return (
    <span
      className={`text-xs font-semibold px-3 py-1 rounded-full ${styles[status] ?? "bg-gray-100 text-gray-600"}`}
    >
      {status}
    </span>
  );
}

export default function Overview() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
        data-ocid="overview.section"
      >
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            data-ocid={`overview.card.${i + 1}`}
          >
            <Card className="border-0 shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 relative group cursor-pointer">
              {/* Background gradient overlay */}
              <div
                className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                style={{ background: kpi.gradient }}
              />

              <CardContent className="p-6 relative z-10">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-2">
                      {kpi.label}
                    </p>
                    <motion.p
                      className="text-4xl font-bold text-gray-900 mb-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.1 + 0.2 }}
                    >
                      {kpi.value}
                    </motion.p>

                    {/* Delta badge */}
                    <div
                      className="inline-flex items-center gap-1 rounded-full px-3 py-1"
                      style={{ background: kpi.bgColor }}
                    >
                      <ArrowUpRight className="w-3 h-3" style={{ color: kpi.gradient.split("#")[1] }} />
                      <span
                        className="text-xs font-bold"
                        style={{
                          color: kpi.gradient.split("#")[1],
                        }}
                      >
                        {kpi.delta}
                      </span>
                      <span className="text-xs text-gray-600">
                        this month
                      </span>
                    </div>
                  </div>

                  {/* Icon with gradient background */}
                  <motion.div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-white flex-shrink-0 shadow-md"
                    style={{ background: kpi.gradient }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {kpi.icon}
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* User Growth */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="lg:col-span-3"
        >
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="pb-3 border-b border-gray-100">
              <CardTitle className="text-base font-bold text-gray-900 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                User Growth
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={userGrowthData}>
                  <defs>
                    <linearGradient id="colorRecruiter" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2F80ED" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#2F80ED" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorCandidate" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12, fill: "#9CA3AF" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "#9CA3AF" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: "none",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                      backgroundColor: "#ffffff",
                      padding: "12px 16px",
                    }}
                    cursor={{ stroke: "#E5E7EB", strokeWidth: 2, strokeDasharray: "5 5" }}
                  />
                  <Legend
                    iconType="line"
                    wrapperStyle={{ fontSize: 13, paddingTop: 16 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="recruiters"
                    stroke="#2F80ED"
                    strokeWidth={3}
                    dot={false}
                    isAnimationActive={true}
                    name="Recruiters"
                  />
                  <Line
                    type="monotone"
                    dataKey="candidates"
                    stroke="#10B981"
                    strokeWidth={3}
                    dot={false}
                    isAnimationActive={true}
                    name="Candidates"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Job Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="lg:col-span-2"
        >
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
            <CardHeader className="pb-3 border-b border-gray-100">
              <CardTitle className="text-base font-bold text-gray-900 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                Jobs by Category
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={jobCategoryData} layout="vertical" margin={{ left: 80, right: 20 }}>
                  <defs>
                    <linearGradient id="colorBar" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#2F80ED" />
                      <stop offset="100%" stopColor="#1E40AF" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#F3F4F6"
                    horizontal={true}
                    vertical={false}
                  />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 11, fill: "#9CA3AF" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="category"
                    tick={{ fontSize: 11, fill: "#6B7280" }}
                    axisLine={false}
                    tickLine={false}
                    width={75}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: "none",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                      backgroundColor: "#ffffff",
                    }}
                  />
                  <Bar
                    dataKey="jobs"
                    fill="url(#colorBar)"
                    radius={[0, 8, 8, 0]}
                    name="Jobs"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Recruiters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="pb-3 border-b border-gray-100">
              <CardTitle className="text-base font-bold text-gray-900 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500" />
                Recent Recruiters
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {recruiters.slice(0, 5).map((r, idx) => (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + idx * 0.05 }}
                  className="flex items-center gap-3 px-5 py-4 hover:bg-blue-50/50 transition-all duration-200 border-b border-gray-100 last:border-0 group cursor-pointer"
                >
                  <Avatar className="w-10 h-10 flex-shrink-0 ring-2 ring-gray-200 group-hover:ring-blue-300 transition-all">
                    <AvatarImage src={r.avatar} alt={r.name} />
                    <AvatarFallback>{r.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {r.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{r.company}</p>
                  </div>
                  <StatusPill status={r.status} />
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Candidates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.4 }}
        >
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="pb-3 border-b border-gray-100">
              <CardTitle className="text-base font-bold text-gray-900 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                Recent Candidates
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {candidates.slice(0, 5).map((c, idx) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + idx * 0.05 }}
                  className="flex items-center gap-3 px-5 py-4 hover:bg-green-50/50 transition-all duration-200 border-b border-gray-100 last:border-0 group cursor-pointer"
                >
                  <Avatar className="w-10 h-10 flex-shrink-0 ring-2 ring-gray-200 group-hover:ring-green-300 transition-all">
                    <AvatarImage src={c.avatar} alt={c.name} />
                    <AvatarFallback>{c.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {c.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {c.skills.slice(0, 2).join(" · ")}
                    </p>
                  </div>
                  <StatusPill status={c.status} />
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
