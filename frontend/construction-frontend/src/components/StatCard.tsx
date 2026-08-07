import type { LucideIcon } from "lucide-react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

export default function StatCard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  iconBg,
  iconColor,
}: StatCardProps) {
  const TrendIcon = changeType === "positive" ? TrendingUp : TrendingDown;

  return (
    <Card className="group h-full hover:-translate-y-1 hover:shadow-lg">
      <CardContent className="flex h-full flex-col justify-between p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              {value}
            </p>
          </div>
          <div
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110",
              iconBg
            )}
          >
            <Icon className={cn("h-5 w-5", iconColor)} />
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <Badge variant={changeType === "positive" ? "success" : "danger"}>
            <TrendIcon className="mr-1 h-3 w-3" />
            {change}
          </Badge>
          <span className="text-xs text-gray-500">vs last month</span>
        </div>
      </CardContent>
    </Card>
  );
}
