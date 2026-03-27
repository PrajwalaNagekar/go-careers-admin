export interface Recruiter {
  id: number;
  name: string;
  email: string;
  company: string;
  plan: string;
  status: "Active" | "Suspended" | "Pending";
  joinDate: string;
  avatar: string;
  jobsPosted: number;
}

export interface Candidate {
  id: number;
  name: string;
  email: string;
  skills: string[];
  status: "Active" | "Blocked" | "Pending";
  appliedJobs: number;
  joinDate: string;
  avatar: string;
}

export interface Job {
  id: number;
  title: string;
  company: string;
  category: string;
  applicants: number;
  status: "Active" | "Pending Review" | "Closed" | "Rejected";
  postedDate: string;
}

export interface Subscription {
  id: number;
  user: string;
  avatar: string;
  plan: "Basic" | "Pro" | "Enterprise";
  status: "Active" | "Cancelled" | "Expired";
  startDate: string;
  endDate: string;
  amount: number;
}

export interface Transaction {
  id: string;
  user: string;
  avatar: string;
  amount: number;
  type: "Subscription" | "Refund" | "Upgrade";
  status: "Completed" | "Pending" | "Failed";
  date: string;
  stripeRef: string;
}

export interface SupportTicket {
  id: string;
  subject: string;
  user: string;
  avatar: string;
  priority: "Urgent" | "High" | "Medium" | "Low";
  status: "Open" | "In Progress" | "Closed";
  created: string;
  message: string;
}

export interface ModerationReport {
  id: string;
  contentType: "Job Posting" | "Profile" | "Message";
  reason: string;
  reportedBy: string;
  avatar: string;
  status: "Pending" | "Resolved" | "Dismissed";
  date: string;
}

export const recruiters: Recruiter[] = [
  {
    id: 1,
    name: "Sarah Mitchell",
    email: "sarah@techcorp.com",
    company: "TechCorp Inc.",
    plan: "Pro",
    status: "Active",
    joinDate: "2024-01-15",
    avatar: "https://i.pravatar.cc/150?img=5",
    jobsPosted: 24,
  },
  {
    id: 2,
    name: "James Okafor",
    email: "james@globalhr.io",
    company: "Global HR Solutions",
    plan: "Enterprise",
    status: "Active",
    joinDate: "2024-02-03",
    avatar: "https://i.pravatar.cc/150?img=12",
    jobsPosted: 51,
  },
  {
    id: 3,
    name: "Linda Chen",
    email: "linda@nextstep.co",
    company: "NextStep Careers",
    plan: "Basic",
    status: "Pending",
    joinDate: "2024-03-22",
    avatar: "https://i.pravatar.cc/150?img=9",
    jobsPosted: 3,
  },
  {
    id: 4,
    name: "Michael Torres",
    email: "m.torres@staffpro.com",
    company: "StaffPro Agency",
    plan: "Pro",
    status: "Active",
    joinDate: "2023-11-10",
    avatar: "https://i.pravatar.cc/150?img=15",
    jobsPosted: 37,
  },
  {
    id: 5,
    name: "Amira Hassan",
    email: "amira@hirevault.com",
    company: "HireVault",
    plan: "Enterprise",
    status: "Active",
    joinDate: "2023-09-07",
    avatar: "https://i.pravatar.cc/150?img=20",
    jobsPosted: 68,
  },
  {
    id: 6,
    name: "Derek Williams",
    email: "derek@bluechip.co",
    company: "BlueChip Recruiting",
    plan: "Basic",
    status: "Suspended",
    joinDate: "2024-04-01",
    avatar: "https://i.pravatar.cc/150?img=33",
    jobsPosted: 8,
  },
  {
    id: 7,
    name: "Priya Sharma",
    email: "priya@talentbridge.in",
    company: "TalentBridge",
    plan: "Pro",
    status: "Active",
    joinDate: "2023-12-18",
    avatar: "https://i.pravatar.cc/150?img=25",
    jobsPosted: 29,
  },
  {
    id: 8,
    name: "Carlos Mendes",
    email: "carlos@workwave.br",
    company: "WorkWave Brazil",
    plan: "Basic",
    status: "Active",
    joinDate: "2024-05-05",
    avatar: "https://i.pravatar.cc/150?img=42",
    jobsPosted: 11,
  },
  {
    id: 9,
    name: "Natalie Ford",
    email: "natalie@peaktalent.uk",
    company: "Peak Talent UK",
    plan: "Pro",
    status: "Active",
    joinDate: "2024-01-28",
    avatar: "https://i.pravatar.cc/150?img=16",
    jobsPosted: 22,
  },
  {
    id: 10,
    name: "Kwame Asante",
    email: "kwame@jobbridge.gh",
    company: "JobBridge Ghana",
    plan: "Basic",
    status: "Pending",
    joinDate: "2024-06-12",
    avatar: "https://i.pravatar.cc/150?img=54",
    jobsPosted: 1,
  },
  {
    id: 11,
    name: "Yuki Tanaka",
    email: "yuki@recruit.jp",
    company: "Recruit Japan",
    plan: "Enterprise",
    status: "Active",
    joinDate: "2023-08-20",
    avatar: "https://i.pravatar.cc/150?img=27",
    jobsPosted: 89,
  },
  {
    id: 12,
    name: "Elena Popescu",
    email: "elena@careerhub.ro",
    company: "CareerHub Romania",
    plan: "Pro",
    status: "Active",
    joinDate: "2024-02-14",
    avatar: "https://i.pravatar.cc/150?img=44",
    jobsPosted: 18,
  },
];

export const candidates: Candidate[] = [
  {
    id: 1,
    name: "Alex Rivera",
    email: "alex.r@gmail.com",
    skills: ["React", "TypeScript", "Node.js"],
    status: "Active",
    appliedJobs: 7,
    joinDate: "2024-01-20",
    avatar: "https://i.pravatar.cc/150?img=60",
  },
  {
    id: 2,
    name: "Fatima Al-Zahra",
    email: "fatima.az@outlook.com",
    skills: ["UI/UX", "Figma", "CSS"],
    status: "Active",
    appliedJobs: 4,
    joinDate: "2024-02-08",
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    id: 3,
    name: "Tom Blackwell",
    email: "tom.b@yahoo.com",
    skills: ["Python", "Django", "SQL"],
    status: "Active",
    appliedJobs: 12,
    joinDate: "2023-10-30",
    avatar: "https://i.pravatar.cc/150?img=52",
  },
  {
    id: 4,
    name: "Mei Lin",
    email: "mei.lin@proton.me",
    skills: ["Data Science", "ML", "R"],
    status: "Active",
    appliedJobs: 3,
    joinDate: "2024-03-15",
    avatar: "https://i.pravatar.cc/150?img=32",
  },
  {
    id: 5,
    name: "Samuel Adeyemi",
    email: "samuel.a@mail.com",
    skills: ["Java", "Spring", "AWS"],
    status: "Blocked",
    appliedJobs: 2,
    joinDate: "2024-04-22",
    avatar: "https://i.pravatar.cc/150?img=57",
  },
  {
    id: 6,
    name: "Clara Dubois",
    email: "clara.d@gmail.com",
    skills: ["Marketing", "SEO", "HubSpot"],
    status: "Active",
    appliedJobs: 9,
    joinDate: "2023-11-05",
    avatar: "https://i.pravatar.cc/150?img=35",
  },
  {
    id: 7,
    name: "Raj Patel",
    email: "raj.p@hotmail.com",
    skills: ["DevOps", "Kubernetes", "CI/CD"],
    status: "Active",
    appliedJobs: 5,
    joinDate: "2024-01-03",
    avatar: "https://i.pravatar.cc/150?img=62",
  },
  {
    id: 8,
    name: "Sophie Martin",
    email: "sophie.m@gmail.com",
    skills: ["Product", "Agile", "Jira"],
    status: "Active",
    appliedJobs: 6,
    joinDate: "2024-02-28",
    avatar: "https://i.pravatar.cc/150?img=38",
  },
  {
    id: 9,
    name: "Emeka Nwosu",
    email: "emeka.n@outlook.com",
    skills: ["Finance", "Excel", "SAP"],
    status: "Pending",
    appliedJobs: 1,
    joinDate: "2024-05-17",
    avatar: "https://i.pravatar.cc/150?img=65",
  },
  {
    id: 10,
    name: "Isabella Costa",
    email: "isa.costa@gmail.com",
    skills: ["Sales", "CRM", "Salesforce"],
    status: "Active",
    appliedJobs: 8,
    joinDate: "2023-09-25",
    avatar: "https://i.pravatar.cc/150?img=40",
  },
  {
    id: 11,
    name: "Hiroshi Yamamoto",
    email: "h.yamamoto@mail.jp",
    skills: ["Backend", "Go", "PostgreSQL"],
    status: "Active",
    appliedJobs: 10,
    joinDate: "2023-12-10",
    avatar: "https://i.pravatar.cc/150?img=66",
  },
  {
    id: 12,
    name: "Zainab Abubakar",
    email: "zainab.a@gmail.com",
    skills: ["HR", "Recruitment", "HRIS"],
    status: "Active",
    appliedJobs: 4,
    joinDate: "2024-04-01",
    avatar: "https://i.pravatar.cc/150?img=48",
  },
];

export const jobs: Job[] = [
  {
    id: 1,
    title: "Senior Frontend Engineer",
    company: "TechCorp Inc.",
    category: "Engineering",
    applicants: 42,
    status: "Active",
    postedDate: "2024-05-10",
  },
  {
    id: 2,
    title: "UX/UI Designer",
    company: "NextStep Careers",
    category: "Design",
    applicants: 28,
    status: "Active",
    postedDate: "2024-05-12",
  },
  {
    id: 3,
    title: "Data Scientist",
    company: "HireVault",
    category: "Data & AI",
    applicants: 19,
    status: "Pending Review",
    postedDate: "2024-05-18",
  },
  {
    id: 4,
    title: "Product Manager",
    company: "Global HR Solutions",
    category: "Product",
    applicants: 55,
    status: "Active",
    postedDate: "2024-04-30",
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "TechCorp Inc.",
    category: "Engineering",
    applicants: 31,
    status: "Active",
    postedDate: "2024-05-01",
  },
  {
    id: 6,
    title: "Marketing Lead",
    company: "BlueChip Recruiting",
    category: "Marketing",
    applicants: 0,
    status: "Rejected",
    postedDate: "2024-04-20",
  },
  {
    id: 7,
    title: "Backend Developer (Node.js)",
    company: "TalentBridge",
    category: "Engineering",
    applicants: 23,
    status: "Active",
    postedDate: "2024-05-05",
  },
  {
    id: 8,
    title: "Sales Executive",
    company: "StaffPro Agency",
    category: "Sales",
    applicants: 14,
    status: "Closed",
    postedDate: "2024-03-15",
  },
  {
    id: 9,
    title: "Cloud Architect",
    company: "HireVault",
    category: "Engineering",
    applicants: 8,
    status: "Pending Review",
    postedDate: "2024-05-20",
  },
  {
    id: 10,
    title: "HR Business Partner",
    company: "Global HR Solutions",
    category: "HR",
    applicants: 36,
    status: "Active",
    postedDate: "2024-04-25",
  },
  {
    id: 11,
    title: "Finance Analyst",
    company: "Peak Talent UK",
    category: "Finance",
    applicants: 17,
    status: "Active",
    postedDate: "2024-05-08",
  },
  {
    id: 12,
    title: "Mobile Engineer (iOS)",
    company: "Recruit Japan",
    category: "Engineering",
    applicants: 12,
    status: "Active",
    postedDate: "2024-05-14",
  },
];

export const subscriptions: Subscription[] = [
  {
    id: 1,
    user: "Sarah Mitchell",
    avatar: "https://i.pravatar.cc/150?img=5",
    plan: "Pro",
    status: "Active",
    startDate: "2024-01-15",
    endDate: "2025-01-15",
    amount: 6599,
  },
  {
    id: 2,
    user: "James Okafor",
    avatar: "https://i.pravatar.cc/150?img=12",
    plan: "Enterprise",
    status: "Active",
    startDate: "2024-02-03",
    endDate: "2025-02-03",
    amount: 16499,
  },
  {
    id: 3,
    user: "Michael Torres",
    avatar: "https://i.pravatar.cc/150?img=15",
    plan: "Pro",
    status: "Active",
    startDate: "2023-11-10",
    endDate: "2024-11-10",
    amount: 6599,
  },
  {
    id: 4,
    user: "Amira Hassan",
    avatar: "https://i.pravatar.cc/150?img=20",
    plan: "Enterprise",
    status: "Active",
    startDate: "2023-09-07",
    endDate: "2024-09-07",
    amount: 16499,
  },
  {
    id: 5,
    user: "Derek Williams",
    avatar: "https://i.pravatar.cc/150?img=33",
    plan: "Basic",
    status: "Cancelled",
    startDate: "2024-04-01",
    endDate: "2024-05-01",
    amount: 2499,
  },
  {
    id: 6,
    user: "Priya Sharma",
    avatar: "https://i.pravatar.cc/150?img=25",
    plan: "Pro",
    status: "Active",
    startDate: "2023-12-18",
    endDate: "2024-12-18",
    amount: 6599,
  },
  {
    id: 7,
    user: "Linda Chen",
    avatar: "https://i.pravatar.cc/150?img=9",
    plan: "Basic",
    status: "Active",
    startDate: "2024-03-22",
    endDate: "2025-03-22",
    amount: 2499,
  },
  {
    id: 8,
    user: "Natalie Ford",
    avatar: "https://i.pravatar.cc/150?img=16",
    plan: "Pro",
    status: "Active",
    startDate: "2024-01-28",
    endDate: "2025-01-28",
    amount: 6599,
  },
  {
    id: 9,
    user: "Yuki Tanaka",
    avatar: "https://i.pravatar.cc/150?img=27",
    plan: "Enterprise",
    status: "Active",
    startDate: "2023-08-20",
    endDate: "2024-08-20",
    amount: 16499,
  },
  {
    id: 10,
    user: "Elena Popescu",
    avatar: "https://i.pravatar.cc/150?img=44",
    plan: "Pro",
    status: "Expired",
    startDate: "2023-02-14",
    endDate: "2024-02-14",
    amount: 6599,
  },
  {
    id: 11,
    user: "Carlos Mendes",
    avatar: "https://i.pravatar.cc/150?img=42",
    plan: "Basic",
    status: "Active",
    startDate: "2024-05-05",
    endDate: "2025-05-05",
    amount: 2499,
  },
];

export const transactions: Transaction[] = [
  {
    id: "TXN-001",
    user: "James Okafor",
    avatar: "https://i.pravatar.cc/150?img=12",
    amount: 16499,
    type: "Subscription",
    status: "Completed",
    date: "2024-05-01",
    stripeRef: "ch_3OxZ2I2eZvKYlo",
  },
  {
    id: "TXN-002",
    user: "Sarah Mitchell",
    avatar: "https://i.pravatar.cc/150?img=5",
    amount: 6599,
    type: "Subscription",
    status: "Completed",
    date: "2024-05-01",
    stripeRef: "ch_3OxZ2I4eZvKYlo",
  },
  {
    id: "TXN-003",
    user: "Derek Williams",
    avatar: "https://i.pravatar.cc/150?img=33",
    amount: 2499,
    type: "Refund",
    status: "Completed",
    date: "2024-04-28",
    stripeRef: "re_3OxZ2I6eZvKYlo",
  },
  {
    id: "TXN-004",
    user: "Amira Hassan",
    avatar: "https://i.pravatar.cc/150?img=20",
    amount: 9999,
    type: "Upgrade",
    status: "Completed",
    date: "2024-04-25",
    stripeRef: "ch_3OxZ2I8eZvKYlo",
  },
  {
    id: "TXN-005",
    user: "Priya Sharma",
    avatar: "https://i.pravatar.cc/150?img=25",
    amount: 6599,
    type: "Subscription",
    status: "Pending",
    date: "2024-05-18",
    stripeRef: "ch_3OxZ2IAeZvKYlo",
  },
  {
    id: "TXN-006",
    user: "Yuki Tanaka",
    avatar: "https://i.pravatar.cc/150?img=27",
    amount: 16499,
    type: "Subscription",
    status: "Completed",
    date: "2024-05-02",
    stripeRef: "ch_3OxZ2ICeZvKYlo",
  },
  {
    id: "TXN-007",
    user: "Michael Torres",
    avatar: "https://i.pravatar.cc/150?img=15",
    amount: 6599,
    type: "Subscription",
    status: "Completed",
    date: "2024-04-10",
    stripeRef: "ch_3OxZ2IEeZvKYlo",
  },
  {
    id: "TXN-008",
    user: "Linda Chen",
    avatar: "https://i.pravatar.cc/150?img=9",
    amount: 2499,
    type: "Subscription",
    status: "Failed",
    date: "2024-05-19",
    stripeRef: "ch_3OxZ2IGeZvKYlo",
  },
  {
    id: "TXN-009",
    user: "Natalie Ford",
    avatar: "https://i.pravatar.cc/150?img=16",
    amount: 6599,
    type: "Subscription",
    status: "Completed",
    date: "2024-05-01",
    stripeRef: "ch_3OxZ2IIeZvKYlo",
  },
  {
    id: "TXN-010",
    user: "Carlos Mendes",
    avatar: "https://i.pravatar.cc/150?img=42",
    amount: 2499,
    type: "Subscription",
    status: "Completed",
    date: "2024-05-05",
    stripeRef: "ch_3OxZ2IKeZvKYlo",
  },
  {
    id: "TXN-011",
    user: "Elena Popescu",
    avatar: "https://i.pravatar.cc/150?img=44",
    amount: 6599,
    type: "Refund",
    status: "Completed",
    date: "2024-04-14",
    stripeRef: "re_3OxZ2IMeZvKYlo",
  },
  {
    id: "TXN-012",
    user: "Kwame Asante",
    avatar: "https://i.pravatar.cc/150?img=54",
    amount: 2499,
    type: "Subscription",
    status: "Pending",
    date: "2024-05-20",
    stripeRef: "ch_3OxZ2IOeZvKYlo",
  },
  {
    id: "TXN-013",
    user: "James Okafor",
    avatar: "https://i.pravatar.cc/150?img=12",
    amount: 16499,
    type: "Upgrade",
    status: "Completed",
    date: "2024-03-01",
    stripeRef: "ch_3OxZ2IQeZvKYlo",
  },
  {
    id: "TXN-014",
    user: "Amira Hassan",
    avatar: "https://i.pravatar.cc/150?img=20",
    amount: 16499,
    type: "Subscription",
    status: "Completed",
    date: "2024-04-07",
    stripeRef: "ch_3OxZ2ISeZvKYlo",
  },
  {
    id: "TXN-015",
    user: "Priya Sharma",
    avatar: "https://i.pravatar.cc/150?img=25",
    amount: 4150,
    type: "Refund",
    status: "Failed",
    date: "2024-05-15",
    stripeRef: "re_3OxZ2IUeZvKYlo",
  },
];

export const supportTickets: SupportTicket[] = [
  {
    id: "TKT-001",
    subject: "Unable to post new job listing",
    user: "Sarah Mitchell",
    avatar: "https://i.pravatar.cc/150?img=5",
    priority: "High",
    status: "Open",
    created: "2024-05-18",
    message:
      "Hi, I've been trying to post a new job listing for the past 2 hours and keep getting a 500 error. This is urgent as the role closes soon. Please help!",
  },
  {
    id: "TKT-002",
    subject: "Candidate profile appears blank",
    user: "Alex Rivera",
    avatar: "https://i.pravatar.cc/150?img=60",
    priority: "Medium",
    status: "In Progress",
    created: "2024-05-17",
    message:
      "When recruiters view my profile, all the skills and work experience sections appear empty even though I've filled them out. Can you investigate?",
  },
  {
    id: "TKT-003",
    subject: "Billing charged twice this month",
    user: "Yuki Tanaka",
    avatar: "https://i.pravatar.cc/150?img=27",
    priority: "Urgent",
    status: "Open",
    created: "2024-05-19",
    message:
      "I was charged ₹16,499 twice on May 1st. Please refund the duplicate charge immediately. Transaction IDs: ch_3OxZ2ICeZvKYlo and ch_3OxZ9IDeZvKYlo.",
  },
  {
    id: "TKT-004",
    subject: "Email notifications not arriving",
    user: "Priya Sharma",
    avatar: "https://i.pravatar.cc/150?img=25",
    priority: "Low",
    status: "Closed",
    created: "2024-05-10",
    message:
      "I'm not receiving any email notifications when candidates apply to my jobs. I've checked spam and the emails are not there.",
  },
  {
    id: "TKT-005",
    subject: "Account access issue after password reset",
    user: "Tom Blackwell",
    avatar: "https://i.pravatar.cc/150?img=52",
    priority: "High",
    status: "In Progress",
    created: "2024-05-16",
    message:
      "After resetting my password, I'm now locked out of my account. The new password doesn't work and the 'forgot password' link is sending to old email.",
  },
  {
    id: "TKT-006",
    subject: "Search filters not working correctly",
    user: "Mei Lin",
    avatar: "https://i.pravatar.cc/150?img=32",
    priority: "Medium",
    status: "Open",
    created: "2024-05-15",
    message:
      "When I filter jobs by 'Data & AI' category, it shows results from all categories. The filter seems broken on the candidates search page too.",
  },
  {
    id: "TKT-007",
    subject: "Request to upgrade subscription plan",
    user: "Carlos Mendes",
    avatar: "https://i.pravatar.cc/150?img=42",
    priority: "Low",
    status: "Closed",
    created: "2024-05-08",
    message:
      "I'd like to upgrade from Basic to Pro plan. Can you help me with the process and confirm if there are any proration charges?",
  },
  {
    id: "TKT-008",
    subject: "Inappropriate job listing reported",
    user: "Clara Dubois",
    avatar: "https://i.pravatar.cc/150?img=35",
    priority: "Urgent",
    status: "Open",
    created: "2024-05-20",
    message:
      "There's a job listing that appears to be a scam. It's asking for personal bank account information. The listing ID is JOB-4521. Please remove it urgently.",
  },
  {
    id: "TKT-009",
    subject: "CV download feature not working",
    user: "Sophie Martin",
    avatar: "https://i.pravatar.cc/150?img=38",
    priority: "Medium",
    status: "In Progress",
    created: "2024-05-14",
    message:
      "The download CV button on candidate profiles gives a 404 error. I'm a Pro plan subscriber and this is a key feature I need.",
  },
  {
    id: "TKT-010",
    subject: "Company logo not uploading",
    user: "Natalie Ford",
    avatar: "https://i.pravatar.cc/150?img=16",
    priority: "Low",
    status: "Open",
    created: "2024-05-13",
    message:
      "I can't upload our company logo. I've tried PNG and JPG formats both under 2MB and none of them work. The upload spins and then fails.",
  },
];

export const moderationReports: ModerationReport[] = [
  {
    id: "RPT-001",
    contentType: "Job Posting",
    reason: "Suspected scam/phishing",
    reportedBy: "Clara Dubois",
    avatar: "https://i.pravatar.cc/150?img=35",
    status: "Pending",
    date: "2024-05-20",
  },
  {
    id: "RPT-002",
    contentType: "Profile",
    reason: "Fake credentials / misleading info",
    reportedBy: "James Okafor",
    avatar: "https://i.pravatar.cc/150?img=12",
    status: "Pending",
    date: "2024-05-19",
  },
  {
    id: "RPT-003",
    contentType: "Message",
    reason: "Harassment / inappropriate language",
    reportedBy: "Fatima Al-Zahra",
    avatar: "https://i.pravatar.cc/150?img=47",
    status: "Resolved",
    date: "2024-05-17",
  },
  {
    id: "RPT-004",
    contentType: "Job Posting",
    reason: "Illegal/discriminatory requirements",
    reportedBy: "Alex Rivera",
    avatar: "https://i.pravatar.cc/150?img=60",
    status: "Pending",
    date: "2024-05-16",
  },
  {
    id: "RPT-005",
    contentType: "Profile",
    reason: "Stolen identity / impersonation",
    reportedBy: "Sophie Martin",
    avatar: "https://i.pravatar.cc/150?img=38",
    status: "Dismissed",
    date: "2024-05-15",
  },
  {
    id: "RPT-006",
    contentType: "Message",
    reason: "Spam / unsolicited offers",
    reportedBy: "Raj Patel",
    avatar: "https://i.pravatar.cc/150?img=62",
    status: "Resolved",
    date: "2024-05-14",
  },
  {
    id: "RPT-007",
    contentType: "Job Posting",
    reason: "Salary information is misleading",
    reportedBy: "Mei Lin",
    avatar: "https://i.pravatar.cc/150?img=32",
    status: "Pending",
    date: "2024-05-13",
  },
  {
    id: "RPT-008",
    contentType: "Profile",
    reason: "Duplicate/bot account detected",
    reportedBy: "Priya Sharma",
    avatar: "https://i.pravatar.cc/150?img=25",
    status: "Pending",
    date: "2024-05-12",
  },
  {
    id: "RPT-009",
    contentType: "Message",
    reason: "Sharing personal data without consent",
    reportedBy: "Tom Blackwell",
    avatar: "https://i.pravatar.cc/150?img=52",
    status: "Dismissed",
    date: "2024-05-11",
  },
  {
    id: "RPT-010",
    contentType: "Job Posting",
    reason: "Copyright violation in description",
    reportedBy: "Natalie Ford",
    avatar: "https://i.pravatar.cc/150?img=16",
    status: "Resolved",
    date: "2024-05-10",
  },
];

export const userGrowthData = [
  { month: "Jun", recruiters: 95, candidates: 620 },
  { month: "Jul", recruiters: 112, candidates: 740 },
  { month: "Aug", recruiters: 128, candidates: 850 },
  { month: "Sep", recruiters: 145, candidates: 970 },
  { month: "Oct", recruiters: 163, candidates: 1100 },
  { month: "Nov", recruiters: 179, candidates: 1230 },
  { month: "Dec", recruiters: 188, candidates: 1340 },
  { month: "Jan", recruiters: 198, candidates: 1460 },
  { month: "Feb", recruiters: 211, candidates: 1570 },
  { month: "Mar", recruiters: 225, candidates: 1680 },
  { month: "Apr", recruiters: 237, candidates: 1760 },
  { month: "May", recruiters: 247, candidates: 1842 },
];

export const jobCategoryData = [
  { category: "Engineering", jobs: 142 },
  { category: "Design", jobs: 48 },
  { category: "Data & AI", jobs: 61 },
  { category: "Marketing", jobs: 39 },
  { category: "Sales", jobs: 54 },
  { category: "HR & Finance", jobs: 45 },
];

export const revenueData = [
  { month: "Jun", revenue: 1510600 },
  { month: "Jul", revenue: 1784500 },
  { month: "Aug", revenue: 1975400 },
  { month: "Sep", revenue: 2166300 },
  { month: "Oct", revenue: 2440200 },
  { month: "Nov", revenue: 2747300 },
  { month: "Dec", revenue: 3120800 },
  { month: "Jan", revenue: 3253600 },
  { month: "Feb", revenue: 3469400 },
  { month: "Mar", revenue: 3693500 },
  { month: "Apr", revenue: 3842900 },
  { month: "May", revenue: 4003090 },
];

export const jobStatusData = [
  { name: "Active", value: 389, color: "#2F80ED" },
  { name: "Pending", value: 87, color: "#F59E0B" },
  { name: "Closed", value: 134, color: "#6B7280" },
  { name: "Rejected", value: 23, color: "#EF4444" },
];

export const topRecruitersData = [
  { name: "Yuki Tanaka", jobs: 89 },
  { name: "Amira Hassan", jobs: 68 },
  { name: "James Okafor", jobs: 51 },
  { name: "Michael Torres", jobs: 37 },
  { name: "Priya Sharma", jobs: 29 },
];
