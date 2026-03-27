import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { transactions } from "../../data/mockData";
import { Search } from "lucide-react";
import { useState } from "react";

function StatusPill({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Completed: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Failed: "bg-red-100 text-red-700",
  };
  return (
    <span
      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${styles[status] ?? "bg-gray-100 text-gray-600"}`}
    >
      {status}
    </span>
  );
}

function TypeBadge({ type }: { type: string }) {
  const styles: Record<string, string> = {
    Subscription: "bg-blue-50 text-blue-700",
    Refund: "bg-orange-50 text-orange-700",
    Upgrade: "bg-purple-50 text-purple-700",
  };
  return (
    <span
      className={`text-xs font-semibold px-2.5 py-1 rounded-md ${styles[type] ?? "bg-gray-50 text-gray-600"}`}
    >
      {type}
    </span>
  );
}

export default function Transactions() {
  const [search, setSearch] = useState("");

  const filtered = transactions.filter(
    (t) =>
      t.id.toLowerCase().includes(search.toLowerCase()) ||
      t.user.toLowerCase().includes(search.toLowerCase()) ||
      t.stripeRef.toLowerCase().includes(search.toLowerCase()),
  );

  const total = transactions
    .filter((t) => t.status === "Completed")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            label: "Total Completed",
            value: `₹${total.toLocaleString("en-IN")}`,
            color: "text-green-600",
          },
          {
            label: "Pending",
            value: transactions.filter((t) => t.status === "Pending").length,
            color: "text-yellow-600",
          },
          {
            label: "Failed",
            value: transactions.filter((t) => t.status === "Failed").length,
            color: "text-red-600",
          },
        ].map((stat) => (
          <Card key={stat.label} className="border-0 shadow-sm bg-blue-100">
            <CardContent className="p-4">
              <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search transactions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 h-9 border-gray-200"
          data-ocid="transactions.search_input"
        />
      </div>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider pl-5">
                  ID
                </TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  User
                </TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Amount
                </TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Type
                </TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Date
                </TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Ref
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((t, i) => (
                <TableRow
                  key={t.id}
                  className="hover:bg-gray-50 border-gray-100"
                  data-ocid={`transactions.item.${i + 1}`}
                >
                  <TableCell className="pl-5 font-mono text-xs font-semibold text-gray-700">
                    {t.id}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-7 h-7">
                        <AvatarImage src={t.avatar} />
                        <AvatarFallback>{t.user[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-800">{t.user}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm font-semibold text-gray-900">
                    ₹{t.amount.toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell>
                    <TypeBadge type={t.type} />
                  </TableCell>
                  <TableCell>
                    <StatusPill status={t.status} />
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {t.date}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-gray-400">
                    {t.stripeRef}
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-12 text-gray-400"
                    data-ocid="transactions.empty_state"
                  >
                    No transactions found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
