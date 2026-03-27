import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  type Subscription,
  subscriptions as initialData,
} from "../../data/mockData";
import { Eye, Search, Trash2, XCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function StatusPill({ status }: { status: Subscription["status"] }) {
  const styles = {
    Active: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
    Expired: "bg-gray-100 text-gray-600",
  };
  return (
    <span
      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function PlanBadge({ plan }: { plan: Subscription["plan"] }) {
  const styles = {
    Basic: "bg-gray-100 text-gray-600",
    Pro: "bg-blue-100 text-blue-700",
    Enterprise: "bg-purple-100 text-purple-700",
  };
  return (
    <span
      className={`text-xs font-semibold px-2.5 py-1 rounded-md ${styles[plan]}`}
    >
      {plan}
    </span>
  );
}

export default function Subscriptions() {
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [viewSub, setViewSub] = useState<Subscription | null>(null);

  const filtered = data.filter(
    (s) =>
      s.user.toLowerCase().includes(search.toLowerCase()) ||
      s.plan.toLowerCase().includes(search.toLowerCase()),
  );

  function cancelSubscription(id: number) {
    setData((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: "Cancelled" as const } : s,
      ),
    );
    toast.success("Subscription cancelled successfully");
  }

  function deleteSubscription(id: number) {
    setData((prev) => prev.filter((s) => s.id !== id));
    toast.success("Subscription removed");
  }

  const totalRevenue = data
    .filter((s) => s.status === "Active")
    .reduce((sum, s) => sum + s.amount, 0);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            label: "Active Subscriptions",
            value: data.filter((s) => s.status === "Active").length,
            color: "text-green-600",
          },
          {
            label: "Monthly Recurring",
            value: `₹${totalRevenue.toLocaleString("en-IN")}`,
            color: "text-blue-600",
          },
          {
            label: "Cancelled",
            value: data.filter((s) => s.status === "Cancelled").length,
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
          placeholder="Search subscriptions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 h-9 border-gray-200"
          data-ocid="subscriptions.search_input"
        />
      </div>

      {/* View Subscription Dialog */}
      <Dialog open={!!viewSub} onOpenChange={(o) => !o && setViewSub(null)}>
        {viewSub && (
          <DialogContent
            className="max-w-md"
            data-ocid="subscriptions.view.modal"
          >
            <DialogHeader>
              <DialogTitle>Subscription Details</DialogTitle>
              <DialogDescription>
                Manage this user's subscription plan.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="flex items-center gap-4">
                <Avatar className="w-14 h-14">
                  <AvatarImage src={viewSub.avatar} />
                  <AvatarFallback>{viewSub.user[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-base font-semibold text-gray-900">
                    {viewSub.user}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <PlanBadge plan={viewSub.plan} />
                    <StatusPill status={viewSub.status} />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 bg-gray-50 rounded-lg p-3">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">
                    Start Date
                  </p>
                  <p className="text-sm font-medium text-gray-700">
                    {viewSub.startDate}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">
                    End Date
                  </p>
                  <p className="text-sm font-medium text-gray-700">
                    {viewSub.endDate}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">
                    Amount/mo
                  </p>
                  <p className="text-sm font-semibold text-gray-800">
                    ₹{viewSub.amount.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                className="border-red-300 text-red-600 hover:bg-red-50"
                disabled={viewSub.status === "Cancelled"}
                onClick={() => {
                  cancelSubscription(viewSub.id);
                  setViewSub((s) => (s ? { ...s, status: "Cancelled" } : null));
                }}
                data-ocid="subscriptions.view.cancel_button"
              >
                <XCircle className="w-3.5 h-3.5 mr-1" />
                {viewSub.status === "Cancelled"
                  ? "Already Cancelled"
                  : "Cancel Subscription"}
              </Button>
              <Button
                onClick={() => setViewSub(null)}
                style={{ background: "linear-gradient(135deg, #2F80ED 0%, #1E40AF 100%)" }}
                className="text-white font-semibold"
                data-ocid="subscriptions.view.close_button"
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider pl-5">
                  User
                </TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Plan
                </TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Start Date
                </TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  End Date
                </TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Amount/mo
                </TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-right pr-5">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((s, i) => (
                <TableRow
                  key={s.id}
                  className="hover:bg-gray-50 border-gray-100"
                  data-ocid={`subscriptions.item.${i + 1}`}
                >
                  <TableCell className="pl-5">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={s.avatar} />
                        <AvatarFallback>{s.user[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-gray-900">
                        {s.user}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <PlanBadge plan={s.plan} />
                  </TableCell>
                  <TableCell>
                    <StatusPill status={s.status} />
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {s.startDate}
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {s.endDate}
                  </TableCell>
                  <TableCell className="text-sm font-semibold text-gray-800">
                    ₹{s.amount.toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell className="pr-5">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        className="p-1.5 rounded hover:bg-blue-50 text-blue-600"
                        onClick={() => setViewSub(s)}
                        data-ocid={`subscriptions.view.button.${i + 1}`}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        className="p-1.5 rounded hover:bg-red-50 text-red-500"
                        onClick={() => deleteSubscription(s.id)}
                        data-ocid={`subscriptions.delete_button.${i + 1}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-12 text-gray-400"
                    data-ocid="subscriptions.empty_state"
                  >
                    No subscriptions found
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
