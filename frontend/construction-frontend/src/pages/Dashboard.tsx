import { Link } from "react-router-dom";
import { ChevronRight, Home, Settings } from "lucide-react";
import StatCard from "@/components/StatCard";
import RevenueChart from "@/components/RevenueChart";
import ProfitChart from "@/components/ProfitChart";
import ActivityCard from "@/components/ActivityCard";
import TeamCard from "@/components/TeamCard";
import TransactionTable from "@/components/TransactionTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  statCards,
  recentActivities,
  transactions,
  teamMembers,
  projectProgress,
  quickActions,
} from "@/data/dashboard";
import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const displayName = user?.username || "User";
  const roleLabel = user?.role || "—";

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <nav className="mb-2 flex items-center gap-1.5 text-sm text-gray-500">
          <Home className="h-4 w-4" />
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-gray-900">Dashboard</span>
        </nav>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
          Dashboard
        </h1>
        <p className="mt-1 text-gray-500">
          Welcome, {displayName} · Role: {roleLabel}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => (
          <StatCard key={card.title} {...card} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-10">
        <div className="xl:col-span-7">
          <RevenueChart />
        </div>
        <div className="xl:col-span-3">
          <ProfitChart />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        <ActivityCard activities={recentActivities} />
        <TransactionTable transactions={transactions} />

        <Card className="h-full hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle>Project Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {projectProgress.map((project) => (
              <div key={project.id}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-900">{project.name}</span>
                  <span className="text-gray-500">{project.progress}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${project.progress}%`,
                      backgroundColor: project.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <TeamCard members={teamMembers} />

        <Card className="h-full hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <Button
                key={action.label}
                variant="outline"
                asChild
                className="h-auto justify-start px-4 py-3 text-left"
              >
                <Link to={action.href}>{action.label}</Link>
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>

      <Button
        size="icon"
        className="fixed bottom-6 right-6 z-20 h-12 w-12 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
        aria-label="Settings"
      >
        <Settings className="h-5 w-5" />
      </Button>
    </div>
  );
}
