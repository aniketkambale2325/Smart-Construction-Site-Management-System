import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { TeamMember } from "@/data/dashboard";

interface TeamCardProps {
  members: TeamMember[];
}

export default function TeamCard({ members }: TeamCardProps) {
  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <CardTitle>Team Members</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {members.map((member) => (
            <li
              key={member.id}
              className="flex items-center gap-3 rounded-xl p-2 transition-colors duration-300 hover:bg-gray-50"
            >
              <Avatar className="h-9 w-9">
                <AvatarFallback className="text-xs">{member.avatar}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-gray-900">{member.name}</p>
                <p className="text-xs text-gray-500">{member.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
