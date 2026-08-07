import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Activity } from "@/data/dashboard";

interface ActivityCardProps {
  activities: Activity[];
}

export default function ActivityCard({ activities }: ActivityCardProps) {
  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {activities.map((activity) => (
            <li
              key={activity.id}
              className="flex items-start gap-3 rounded-xl p-2 transition-colors duration-300 hover:bg-gray-50"
            >
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#2563EB]" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                <p className="text-xs text-gray-500">
                  {activity.user} · {activity.time}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
