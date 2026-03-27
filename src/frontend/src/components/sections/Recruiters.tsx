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
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { type Recruiter, recruiters as initialData } from "../../data/mockData";
import { Ban, CheckCircle, Eye, Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function StatusPill({ status }: { status: Recruiter["status"] }) {
  const styles = {
    Active: "bg-green-100 text-green-700",
    Suspended: "bg-red-100 text-red-700",
    Pending: "bg-yellow-100 text-yellow-700",
  };
  return (
    <span
      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function PlanBadge({ plan }: { plan: string }) {
  const styles: Record<string, string> = {
    Basic: "bg-gray-100 text-gray-600",
    Pro: "bg-blue-100 text-blue-700",
    Enterprise: "bg-purple-100 text-purple-700",
  };
  return (
    <span
      className={`text-xs font-semibold px-2 py-0.5 rounded-md ${styles[plan] ?? "bg-gray-100 text-gray-600"}`}
    >
      {plan}
    </span>
  );
}

export default function Recruiters() {
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [viewRecruiter, setViewRecruiter] = useState<Recruiter | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    plan: "Basic",
  });

  const filtered = data.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.company.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase()),
  );

  function toggleStatus(id: number) {
    setData((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        const next = r.status === "Active" ? "Suspended" : "Active";
        toast.success(
          `Recruiter ${next === "Active" ? "activated" : "suspended"} successfully`,
        );
        return { ...r, status: next as Recruiter["status"] };
      }),
    );
  }

  function deleteRecruiter(id: number) {
    setData((prev) => prev.filter((r) => r.id !== id));
    toast.success("Recruiter removed");
  }

  function handleAddSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.company) {
      toast.error("Please fill in all required fields");
      return;
    }
    const newRecruiter: Recruiter = {
      id: Date.now(),
      name: form.name,
      email: form.email,
      company: form.company,
      plan: form.plan,
      status: "Pending",
      joinDate: new Date().toISOString().split("T")[0],
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`,
      jobsPosted: 0,
    };
    setData((prev) => [newRecruiter, ...prev]);
    toast.success(`${form.name} added as recruiter`);
    setForm({ name: "", email: "", company: "", plan: "Basic" });
    setAddOpen(false);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search recruiters..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 border-gray-200"
            data-ocid="recruiters.search_input"
          />
        </div>
        <Button
          className="h-10 text-white text-sm font-semibold shadow-lg hover:shadow-xl transition-all"
          style={{ background: "linear-gradient(135deg, #2F80ED 0%, #1E40AF 100%)" }}
          onClick={() => setAddOpen(true)}
          data-ocid="recruiters.add.button"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Recruiter
        </Button>
      </div>

      {/* Add Recruiter Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-md" data-ocid="recruiters.modal">
          <DialogHeader>
            <DialogTitle>Add New Recruiter</DialogTitle>
            <DialogDescription>
              Fill in the details to add a new recruiter to the platform.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddSubmit} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label htmlFor="rec-name">Full Name *</Label>
              <Input
                id="rec-name"
                placeholder="e.g. Jane Smith"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                data-ocid="recruiters.name.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="rec-email">Email *</Label>
              <Input
                id="rec-email"
                type="email"
                placeholder="jane@company.com"
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
                data-ocid="recruiters.email.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="rec-company">Company *</Label>
              <Input
                id="rec-company"
                placeholder="Company name"
                value={form.company}
                onChange={(e) =>
                  setForm((f) => ({ ...f, company: e.target.value }))
                }
                data-ocid="recruiters.company.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Plan</Label>
              <Select
                value={form.plan}
                onValueChange={(v) => setForm((f) => ({ ...f, plan: v }))}
              >
                <SelectTrigger data-ocid="recruiters.plan.select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Basic">Basic</SelectItem>
                  <SelectItem value="Pro">Pro</SelectItem>
                  <SelectItem value="Enterprise">Enterprise</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setAddOpen(false)}
                data-ocid="recruiters.cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                style={{ background: "linear-gradient(135deg, #2F80ED 0%, #1E40AF 100%)" }}
                className="text-white font-semibold"
                data-ocid="recruiters.submit_button"
              >
                Add Recruiter
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Recruiter Dialog */}
      <Dialog
        open={!!viewRecruiter}
        onOpenChange={(o) => !o && setViewRecruiter(null)}
      >
        {viewRecruiter && (
          <DialogContent className="max-w-md" data-ocid="recruiters.view.modal">
            <DialogHeader>
              <DialogTitle>Recruiter Profile</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={viewRecruiter.avatar} />
                  <AvatarFallback>{viewRecruiter.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-base font-semibold text-gray-900">
                    {viewRecruiter.name}
                  </p>
                  <p className="text-sm text-gray-500">{viewRecruiter.email}</p>
                  <p className="text-sm text-gray-500">
                    {viewRecruiter.company}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 bg-gray-50 rounded-lg p-3">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">
                    Plan
                  </p>
                  <PlanBadge plan={viewRecruiter.plan} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">
                    Status
                  </p>
                  <StatusPill status={viewRecruiter.status} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">
                    Join Date
                  </p>
                  <p className="text-sm font-medium text-gray-700">
                    {viewRecruiter.joinDate}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">
                    Jobs Posted
                  </p>
                  <p className="text-sm font-medium text-gray-700">
                    {viewRecruiter.jobsPosted}
                  </p>
                </div>
              </div>
            </div>
            <DialogFooter className="gap-2 flex-wrap">
              <Button
                variant="outline"
                className={
                  viewRecruiter.status === "Active"
                    ? "border-yellow-300 text-yellow-700 hover:bg-yellow-50"
                    : "border-green-300 text-green-700 hover:bg-green-50"
                }
                onClick={() => {
                  toggleStatus(viewRecruiter.id);
                  setViewRecruiter((r) =>
                    r
                      ? {
                          ...r,
                          status:
                            r.status === "Active" ? "Suspended" : "Active",
                        }
                      : null,
                  );
                }}
                data-ocid="recruiters.view.toggle"
              >
                {viewRecruiter.status === "Active" ? "Suspend" : "Activate"}
              </Button>
              <Button
                variant="outline"
                className="border-red-300 text-red-600 hover:bg-red-50"
                onClick={() => {
                  deleteRecruiter(viewRecruiter.id);
                  setViewRecruiter(null);
                }}
                data-ocid="recruiters.view.delete_button"
              >
                Remove
              </Button>
              <Button
                onClick={() => setViewRecruiter(null)}
                style={{ background: "linear-gradient(135deg, #2F80ED 0%, #1E40AF 100%)" }}
                className="text-white font-semibold"
                data-ocid="recruiters.view.close_button"
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
                  Recruiter
                </TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Company
                </TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Plan
                </TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Join Date
                </TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Jobs Posted
                </TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-right pr-5">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((r, i) => (
                <TableRow
                  key={r.id}
                  className="hover:bg-gray-50 border-gray-100"
                  data-ocid={`recruiters.item.${i + 1}`}
                >
                  <TableCell className="pl-5">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={r.avatar} />
                        <AvatarFallback>{r.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {r.name}
                        </p>
                        <p className="text-xs text-gray-500">{r.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-700">
                    {r.company}
                  </TableCell>
                  <TableCell>
                    <PlanBadge plan={r.plan} />
                  </TableCell>
                  <TableCell>
                    <StatusPill status={r.status} />
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {r.joinDate}
                  </TableCell>
                  <TableCell className="text-sm font-medium text-gray-700">
                    {r.jobsPosted}
                  </TableCell>
                  <TableCell className="pr-5">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        className="p-1.5 rounded hover:bg-blue-50 text-blue-600 transition-colors"
                        onClick={() => setViewRecruiter(r)}
                        data-ocid={`recruiters.view.button.${i + 1}`}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        className="p-1.5 rounded hover:bg-yellow-50 text-yellow-600 transition-colors"
                        onClick={() => toggleStatus(r.id)}
                        data-ocid={`recruiters.toggle.button.${i + 1}`}
                      >
                        {r.status === "Active" ? (
                          <Ban className="w-4 h-4" />
                        ) : (
                          <CheckCircle className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        type="button"
                        className="p-1.5 rounded hover:bg-red-50 text-red-500 transition-colors"
                        onClick={() => deleteRecruiter(r.id)}
                        data-ocid={`recruiters.delete_button.${i + 1}`}
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
                    data-ocid="recruiters.empty_state"
                  >
                    No recruiters found
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
