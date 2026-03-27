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
import { type Job, jobs as initialData } from "../../data/mockData";
import { CheckCircle, Eye, MinusCircle, Search, XCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function StatusPill({ status }: { status: Job["status"] }) {
  const styles: Record<Job["status"], string> = {
    Active: "bg-green-100 text-green-700",
    "Pending Review": "bg-yellow-100 text-yellow-700",
    Closed: "bg-gray-100 text-gray-600",
    Rejected: "bg-red-100 text-red-700",
  };
  return (
    <span
      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${styles[status]}`}
    >
      {status}
    </span>
  );
}

const ALL_STATUSES: Array<"All" | Job["status"]> = [
  "All",
  "Active",
  "Pending Review",
  "Closed",
  "Rejected",
];

export default function Jobs() {
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All" | Job["status"]>("All");
  const [viewJob, setViewJob] = useState<Job | null>(null);

  const filtered = data.filter((j) => {
    const matchSearch =
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.company.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || j.status === filter;
    return matchSearch && matchFilter;
  });

  function changeStatus(id: number, status: Job["status"]) {
    setData((prev) => prev.map((j) => (j.id === id ? { ...j, status } : j)));
    toast.success(`Job marked as ${status}`);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 border-gray-200"
            data-ocid="jobs.search_input"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {ALL_STATUSES.map((s) => (
            <button
              type="button"
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-colors ${
                filter === s
                  ? "text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              style={filter === s ? { background: "linear-gradient(135deg, #2F80ED 0%, #1E40AF 100%)" } : {}}
              data-ocid="jobs.filter.tab"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* View Job Dialog */}
      <Dialog open={!!viewJob} onOpenChange={(o) => !o && setViewJob(null)}>
        {viewJob && (
          <DialogContent className="max-w-md" data-ocid="jobs.view.modal">
            <DialogHeader>
              <DialogTitle>Job Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {viewJob.title}
                </h3>
                <p className="text-sm text-gray-500">{viewJob.company}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 bg-gray-50 rounded-lg p-3">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">
                    Category
                  </p>
                  <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-md font-medium inline-block mt-1">
                    {viewJob.category}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">
                    Status
                  </p>
                  <div className="mt-1">
                    <StatusPill status={viewJob.status} />
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">
                    Applicants
                  </p>
                  <p className="text-sm font-medium text-gray-700">
                    {viewJob.applicants}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">
                    Posted Date
                  </p>
                  <p className="text-sm font-medium text-gray-700">
                    {viewJob.postedDate}
                  </p>
                </div>
              </div>
            </div>
            <DialogFooter className="gap-2 flex-wrap">
              <Button
                variant="outline"
                className="border-green-300 text-green-700 hover:bg-green-50"
                onClick={() => {
                  changeStatus(viewJob.id, "Active");
                  setViewJob((j) => (j ? { ...j, status: "Active" } : null));
                }}
                disabled={viewJob.status === "Active"}
                data-ocid="jobs.view.approve.button"
              >
                <CheckCircle className="w-3.5 h-3.5 mr-1" /> Approve
              </Button>
              <Button
                variant="outline"
                className="border-red-300 text-red-600 hover:bg-red-50"
                onClick={() => {
                  changeStatus(viewJob.id, "Rejected");
                  setViewJob((j) => (j ? { ...j, status: "Rejected" } : null));
                }}
                disabled={viewJob.status === "Rejected"}
                data-ocid="jobs.view.reject.button"
              >
                <XCircle className="w-3.5 h-3.5 mr-1" /> Reject
              </Button>
              <Button
                variant="outline"
                className="border-gray-300 text-gray-600 hover:bg-gray-50"
                onClick={() => {
                  changeStatus(viewJob.id, "Closed");
                  setViewJob((j) => (j ? { ...j, status: "Closed" } : null));
                }}
                disabled={viewJob.status === "Closed"}
                data-ocid="jobs.view.close_button"
              >
                <MinusCircle className="w-3.5 h-3.5 mr-1" /> Close
              </Button>
              <Button
                onClick={() => setViewJob(null)}
                style={{ background: "linear-gradient(135deg, #2F80ED 0%, #1E40AF 100%)" }}
                className="text-white font-semibold"
                data-ocid="jobs.view.dismiss_button"
              >
                Done
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
                  Title
                </TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Company
                </TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Category
                </TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Applicants
                </TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Posted
                </TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-right pr-5">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((j, i) => (
                <TableRow
                  key={j.id}
                  className="hover:bg-gray-50 border-gray-100"
                  data-ocid={`jobs.item.${i + 1}`}
                >
                  <TableCell className="pl-5 font-medium text-sm text-gray-900">
                    {j.title}
                  </TableCell>
                  <TableCell className="text-sm text-gray-700">
                    {j.company}
                  </TableCell>
                  <TableCell>
                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md font-medium">
                      {j.category}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-gray-700">
                    {j.applicants}
                  </TableCell>
                  <TableCell>
                    <StatusPill status={j.status} />
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {j.postedDate}
                  </TableCell>
                  <TableCell className="pr-5">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        className="p-1.5 rounded hover:bg-blue-50 text-blue-600"
                        onClick={() => setViewJob(j)}
                        data-ocid={`jobs.view.button.${i + 1}`}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        className="p-1.5 rounded hover:bg-green-50 text-green-600"
                        onClick={() => changeStatus(j.id, "Active")}
                        data-ocid={`jobs.approve.button.${i + 1}`}
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        className="p-1.5 rounded hover:bg-red-50 text-red-500"
                        onClick={() => changeStatus(j.id, "Rejected")}
                        data-ocid={`jobs.reject.button.${i + 1}`}
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        className="p-1.5 rounded hover:bg-gray-100 text-gray-500"
                        onClick={() => changeStatus(j.id, "Closed")}
                        data-ocid={`jobs.close.button.${i + 1}`}
                      >
                        <MinusCircle className="w-4 h-4" />
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
                    data-ocid="jobs.empty_state"
                  >
                    No jobs found
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
