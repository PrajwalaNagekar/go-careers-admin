import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import {
  Dialog,
  DialogContent,
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
import { type Candidate, candidates as initialData } from "../../data/mockData";
import { Ban, CheckCircle, Eye, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function StatusPill({ status }: { status: Candidate["status"] }) {
  const styles = {
    Active: "bg-green-100 text-green-700",
    Blocked: "bg-red-100 text-red-700",
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

export default function Candidates() {
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All" | Candidate["status"]>("All");
  const [viewCandidate, setViewCandidate] = useState<Candidate | null>(null);

  const filtered = data.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.skills.join(" ").toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || c.status === filter;
    return matchSearch && matchFilter;
  });

  function toggleBlock(id: number) {
    setData((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        const next = c.status === "Blocked" ? "Active" : "Blocked";
        toast.success(
          `Candidate ${next === "Blocked" ? "blocked" : "unblocked"} successfully`,
        );
        return { ...c, status: next as Candidate["status"] };
      }),
    );
  }

  function deleteCandidate(id: number) {
    setData((prev) => prev.filter((c) => c.id !== id));
    toast.success("Candidate removed");
  }

  const filters: Array<"All" | Candidate["status"]> = [
    "All",
    "Active",
    "Blocked",
    "Pending",
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search candidates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 border-gray-200"
            data-ocid="candidates.search_input"
          />
        </div>
        <div className="flex gap-2">
          {filters.map((f) => (
            <button
              type="button"
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-colors ${
                filter === f
                  ? "text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              style={filter === f ? { background: "linear-gradient(135deg, #2F80ED 0%, #1E40AF 100%)" } : {}}
              data-ocid="candidates.filter.tab"
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* View Candidate Dialog */}
      <Dialog
        open={!!viewCandidate}
        onOpenChange={(o) => !o && setViewCandidate(null)}
      >
        {viewCandidate && (
          <DialogContent className="max-w-md" data-ocid="candidates.view.modal">
            <DialogHeader>
              <DialogTitle>Candidate Profile</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={viewCandidate.avatar} />
                  <AvatarFallback>{viewCandidate.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-base font-semibold text-gray-900">
                    {viewCandidate.name}
                  </p>
                  <p className="text-sm text-gray-500">{viewCandidate.email}</p>
                </div>
              </div>
              <div className="space-y-1.5">
                <p className="text-xs text-gray-400 uppercase tracking-wide">
                  Skills
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {viewCandidate.skills.map((s) => (
                    <span
                      key={s}
                      className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-md font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 bg-gray-50 rounded-lg p-3">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">
                    Status
                  </p>
                  <StatusPill status={viewCandidate.status} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">
                    Applied
                  </p>
                  <p className="text-sm font-medium text-gray-700">
                    {viewCandidate.appliedJobs} jobs
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">
                    Joined
                  </p>
                  <p className="text-sm font-medium text-gray-700">
                    {viewCandidate.joinDate}
                  </p>
                </div>
              </div>
            </div>
            <DialogFooter className="gap-2 flex-wrap">
              <Button
                variant="outline"
                className={
                  viewCandidate.status === "Blocked"
                    ? "border-green-300 text-green-700 hover:bg-green-50"
                    : "border-yellow-300 text-yellow-700 hover:bg-yellow-50"
                }
                onClick={() => {
                  toggleBlock(viewCandidate.id);
                  setViewCandidate((c) =>
                    c
                      ? {
                          ...c,
                          status: c.status === "Blocked" ? "Active" : "Blocked",
                        }
                      : null,
                  );
                }}
                data-ocid="candidates.view.toggle"
              >
                {viewCandidate.status === "Blocked" ? "Unblock" : "Block"}
              </Button>
              <Button
                variant="outline"
                className="border-red-300 text-red-600 hover:bg-red-50"
                onClick={() => {
                  deleteCandidate(viewCandidate.id);
                  setViewCandidate(null);
                }}
                data-ocid="candidates.view.delete_button"
              >
                Remove
              </Button>
              <Button
                onClick={() => setViewCandidate(null)}
                style={{ background: "linear-gradient(135deg, #2F80ED 0%, #1E40AF 100%)" }}
                className="text-white font-semibold"
                data-ocid="candidates.view.close_button"
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
                  Candidate
                </TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Skills
                </TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Applied
                </TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Join Date
                </TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-right pr-5">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((c, i) => (
                <TableRow
                  key={c.id}
                  className="hover:bg-gray-50 border-gray-100"
                  data-ocid={`candidates.item.${i + 1}`}
                >
                  <TableCell className="pl-5">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={c.avatar} />
                        <AvatarFallback>{c.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {c.name}
                        </p>
                        <p className="text-xs text-gray-500">{c.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      {c.skills.slice(0, 2).map((s) => (
                        <span
                          key={s}
                          className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-md font-medium"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusPill status={c.status} />
                  </TableCell>
                  <TableCell className="text-sm text-gray-700">
                    {c.appliedJobs} jobs
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {c.joinDate}
                  </TableCell>
                  <TableCell className="pr-5">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        className="p-1.5 rounded hover:bg-blue-50 text-blue-600"
                        onClick={() => setViewCandidate(c)}
                        data-ocid={`candidates.view.button.${i + 1}`}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        className="p-1.5 rounded hover:bg-yellow-50 text-yellow-600"
                        onClick={() => toggleBlock(c.id)}
                        data-ocid={`candidates.toggle.button.${i + 1}`}
                      >
                        {c.status === "Blocked" ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Ban className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        type="button"
                        className="p-1.5 rounded hover:bg-red-50 text-red-500"
                        onClick={() => deleteCandidate(c.id)}
                        data-ocid={`candidates.delete_button.${i + 1}`}
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
                    colSpan={6}
                    className="text-center py-12 text-gray-400"
                    data-ocid="candidates.empty_state"
                  >
                    No candidates found
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
