import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Card, CardContent } from "../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  type ModerationReport,
  moderationReports as initialData,
} from "../../data/mockData";
import { CheckCircle, MinusCircle, XCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function StatusPill({ status }: { status: ModerationReport["status"] }) {
  const styles: Record<ModerationReport["status"], string> = {
    Pending: "bg-yellow-100 text-yellow-700",
    Resolved: "bg-green-100 text-green-700",
    Dismissed: "bg-gray-100 text-gray-600",
  };
  return (
    <span
      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function ContentTypeBadge({ type }: { type: ModerationReport["contentType"] }) {
  const styles: Record<ModerationReport["contentType"], string> = {
    "Job Posting": "bg-blue-50 text-blue-700",
    Profile: "bg-purple-50 text-purple-700",
    Message: "bg-orange-50 text-orange-700",
  };
  return (
    <span
      className={`text-xs font-semibold px-2 py-0.5 rounded-md ${styles[type]}`}
    >
      {type}
    </span>
  );
}

export default function Moderation() {
  const [data, setData] = useState(initialData);
  const [filter, setFilter] = useState<"All" | ModerationReport["status"]>(
    "All",
  );

  const filtered = data.filter((r) => filter === "All" || r.status === filter);

  function updateStatus(id: string, status: ModerationReport["status"]) {
    setData((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    const msgs: Record<ModerationReport["status"], string> = {
      Resolved: "Content approved and report resolved",
      Dismissed: "Report dismissed",
      Pending: "Report marked as pending",
    };
    toast.success(msgs[status]);
  }

  const filters: Array<"All" | ModerationReport["status"]> = [
    "All",
    "Pending",
    "Resolved",
    "Dismissed",
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            label: "Pending Review",
            value: data.filter((r) => r.status === "Pending").length,
            color: "text-yellow-600",
          },
          {
            label: "Resolved",
            value: data.filter((r) => r.status === "Resolved").length,
            color: "text-green-600",
          },
          {
            label: "Dismissed",
            value: data.filter((r) => r.status === "Dismissed").length,
            color: "text-gray-600",
          },
        ].map((stat) => (
          <Card key={stat.label} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </CardContent>
          </Card>
        ))}
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
            data-ocid="moderation.filter.tab"
          >
            {f}
          </button>
        ))}
      </div>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider pl-5">
                  Report ID
                </TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Content Type
                </TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Reason
                </TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Reported By
                </TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Date
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
                  data-ocid={`moderation.item.${i + 1}`}
                >
                  <TableCell className="pl-5 font-mono text-xs font-semibold text-gray-600">
                    {r.id}
                  </TableCell>
                  <TableCell>
                    <ContentTypeBadge type={r.contentType} />
                  </TableCell>
                  <TableCell className="text-sm text-gray-700 max-w-[200px] truncate">
                    {r.reason}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-7 h-7">
                        <AvatarImage src={r.avatar} />
                        <AvatarFallback>{r.reportedBy[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-700">
                        {r.reportedBy}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusPill status={r.status} />
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {r.date}
                  </TableCell>
                  <TableCell className="pr-5">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        className="p-1.5 rounded hover:bg-green-50 text-green-600"
                        title="Approve Content"
                        onClick={() => updateStatus(r.id, "Resolved")}
                        data-ocid={`moderation.approve.button.${i + 1}`}
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        className="p-1.5 rounded hover:bg-red-50 text-red-500"
                        title="Remove Content"
                        onClick={() => {
                          updateStatus(r.id, "Resolved");
                          toast.success("Content removed");
                        }}
                        data-ocid={`moderation.delete_button.${i + 1}`}
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        className="p-1.5 rounded hover:bg-gray-100 text-gray-500"
                        title="Dismiss Report"
                        onClick={() => updateStatus(r.id, "Dismissed")}
                        data-ocid={`moderation.dismiss.button.${i + 1}`}
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
                    data-ocid="moderation.empty_state"
                  >
                    No reports found
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
