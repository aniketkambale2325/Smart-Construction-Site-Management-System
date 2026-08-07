import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Transaction } from "@/data/dashboard";
import { cn } from "@/lib/utils";

interface TransactionTableProps {
  transactions: Transaction[];
}

const statusStyles: Record<Transaction["status"], string> = {
  Completed: "bg-green-50 text-[#22C55E]",
  Pending: "bg-amber-50 text-amber-600",
  Failed: "bg-red-50 text-[#EF4444]",
};

export default function TransactionTable({ transactions }: TransactionTableProps) {
  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <CardTitle>Latest Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left text-gray-500">
                <th className="pb-3 font-medium">ID</th>
                <th className="pb-3 font-medium">Customer</th>
                <th className="pb-3 font-medium">Amount</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium hidden sm:table-cell">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn) => (
                <tr
                  key={txn.id}
                  className="border-b border-gray-50 transition-colors duration-300 hover:bg-gray-50"
                >
                  <td className="py-3 font-medium text-gray-900">{txn.id}</td>
                  <td className="py-3 text-gray-600">{txn.customer}</td>
                  <td className="py-3 font-medium text-gray-900">{txn.amount}</td>
                  <td className="py-3">
                    <Badge className={cn("border-0", statusStyles[txn.status])}>
                      {txn.status}
                    </Badge>
                  </td>
                  <td className="py-3 text-gray-500 hidden sm:table-cell">{txn.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
