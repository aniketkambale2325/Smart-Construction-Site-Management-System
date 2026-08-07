import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Users,
  Cloud,
  Megaphone,
  BarChart3,
  Bitcoin,
  Truck,
  TrendingUp,
  ShoppingCart,
  ShoppingBag,
  DollarSign,
  Grid3X3,
  Sparkles,
  LifeBuoy,
  FolderKanban,
  Package,
  Building2,
  Receipt,
} from "lucide-react";

export interface StatCardData {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

export interface NavItem {
  label: string;
  icon: LucideIcon;
  href?: string;
  children?: { label: string; href: string }[];
}

export interface Transaction {
  id: string;
  customer: string;
  amount: string;
  status: "Completed" | "Pending" | "Failed";
  date: string;
}

export interface Activity {
  id: string;
  action: string;
  user: string;
  time: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

export interface ProjectProgress {
  id: string;
  name: string;
  progress: number;
  color: string;
}

export const statCards: StatCardData[] = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    changeType: "positive",
    icon: DollarSign,
    iconBg: "bg-green-50",
    iconColor: "text-[#22C55E]",
  },
  {
    title: "Active Users",
    value: "2,350",
    change: "+15.3%",
    changeType: "positive",
    icon: Users,
    iconBg: "bg-green-50",
    iconColor: "text-[#22C55E]",
  },
  {
    title: "Total Orders",
    value: "1,234",
    change: "-4.2%",
    changeType: "negative",
    icon: ShoppingCart,
    iconBg: "bg-red-50",
    iconColor: "text-[#EF4444]",
  },
  {
    title: "Conversion Rate",
    value: "3.42%",
    change: "+8.7%",
    changeType: "positive",
    icon: TrendingUp,
    iconBg: "bg-green-50",
    iconColor: "text-[#22C55E]",
  },
];

export const revenueData = [
  { month: "Jan", revenue: 3200 },
  { month: "Feb", revenue: 2800 },
  { month: "Mar", revenue: 3500 },
  { month: "Apr", revenue: 4100 },
  { month: "May", revenue: 3800 },
  { month: "Jun", revenue: 4500 },
  { month: "Jul", revenue: 4200 },
  { month: "Aug", revenue: 4800 },
  { month: "Sep", revenue: 5100 },
  { month: "Oct", revenue: 4900 },
  { month: "Nov", revenue: 5300 },
  { month: "Dec", revenue: 5600 },
];

export const profitExpenseData = [
  { month: "Jan", profit: 2400, expenses: 1800 },
  { month: "Feb", profit: 2100, expenses: 1600 },
  { month: "Mar", profit: 2800, expenses: 1900 },
  { month: "Apr", profit: 3200, expenses: 2100 },
  { month: "May", profit: 2900, expenses: 2000 },
  { month: "Jun", profit: 3500, expenses: 2200 },
  { month: "Jul", profit: 3100, expenses: 2100 },
  { month: "Aug", profit: 3600, expenses: 2300 },
  { month: "Sep", profit: 3800, expenses: 2400 },
  { month: "Oct", profit: 3700, expenses: 2350 },
  { month: "Nov", profit: 4000, expenses: 2500 },
  { month: "Dec", profit: 4200, expenses: 2600 },
];

export const navItems: NavItem[] = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    children: [{ label: "Default", href: "/dashboard" }],
  },
  { label: "Projects", icon: FolderKanban, href: "/projects" },
  { label: "Employees", icon: Users, href: "/employees" },
  { label: "Materials", icon: Package, href: "/materials" },
  { label: "Vendors", icon: Truck, href: "/vendors" },
  { label: "Clients", icon: Building2, href: "/clients" },
  { label: "Expenses", icon: Receipt, href: "/projects" },
  { label: "CRM", icon: Users, href: "/dashboard" },
  { label: "SaaS", icon: Cloud, href: "/dashboard" },
  { label: "Marketing", icon: Megaphone, href: "/dashboard" },
  { label: "Analytics", icon: BarChart3, href: "/dashboard" },
  { label: "Crypto", icon: Bitcoin, href: "/dashboard" },
  { label: "Logistics", icon: Truck, href: "/dashboard" },
  { label: "Stocks", icon: TrendingUp, href: "/dashboard" },
  { label: "E-Commerce", icon: ShoppingBag, href: "/dashboard" },
  { label: "Apps", icon: Grid3X3, href: "/dashboard" },
  { label: "AI Tools", icon: Sparkles, href: "/dashboard" },
  { label: "Support", icon: LifeBuoy, href: "/dashboard" },
];

export const recentActivities: Activity[] = [
  { id: "1", action: "New project created", user: "Sarah Chen", time: "2 min ago" },
  { id: "2", action: "Payment received", user: "Michael Ross", time: "15 min ago" },
  { id: "3", action: "Report generated", user: "Admin User", time: "1 hour ago" },
  { id: "4", action: "Team member added", user: "Lisa Park", time: "3 hours ago" },
  { id: "5", action: "Invoice sent", user: "John Doe", time: "5 hours ago" },
];

export const transactions: Transaction[] = [
  { id: "TXN-001", customer: "Acme Corp", amount: "$2,450.00", status: "Completed", date: "Aug 5, 2026" },
  { id: "TXN-002", customer: "Globex Inc", amount: "$1,820.00", status: "Pending", date: "Aug 4, 2026" },
  { id: "TXN-003", customer: "Initech", amount: "$980.00", status: "Completed", date: "Aug 4, 2026" },
  { id: "TXN-004", customer: "Umbrella Co", amount: "$3,200.00", status: "Failed", date: "Aug 3, 2026" },
  { id: "TXN-005", customer: "Stark Industries", amount: "$5,100.00", status: "Completed", date: "Aug 3, 2026" },
];

export const teamMembers: TeamMember[] = [
  { id: "1", name: "Sarah Chen", role: "Project Manager", avatar: "SC" },
  { id: "2", name: "Michael Ross", role: "Site Engineer", avatar: "MR" },
  { id: "3", name: "Lisa Park", role: "Accountant", avatar: "LP" },
  { id: "4", name: "John Doe", role: "Supervisor", avatar: "JD" },
];

export const projectProgress: ProjectProgress[] = [
  { id: "1", name: "Skyline Tower", progress: 78, color: "#2563EB" },
  { id: "2", name: "Green Valley Homes", progress: 45, color: "#22C55E" },
  { id: "3", name: "Metro Bridge", progress: 92, color: "#2563EB" },
  { id: "4", name: "Office Complex B", progress: 33, color: "#EF4444" },
];

export const quickActions = [
  { label: "New Project", href: "/projects/new" },
  { label: "Add Employee", href: "/employees/new" },
  { label: "View Materials", href: "/materials" },
  { label: "Generate Report", href: "/dashboard" },
];
