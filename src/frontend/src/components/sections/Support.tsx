import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Textarea } from "../../components/ui/textarea";
import {
  type SupportTicket,
  supportTickets as initialData,
} from "../../data/mockData";
import { MessageSquare, Send, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function PriorityBadge({ priority }: { priority: SupportTicket["priority"] }) {
  const styles: Record<SupportTicket["priority"], string> = {
    Urgent: "bg-red-100 text-red-700",
    High: "bg-orange-100 text-orange-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Low: "bg-blue-100 text-blue-700",
  };
  return (
    <span
      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${styles[priority]}`}
    >
      {priority}
    </span>
  );
}

function StatusPill({ status }: { status: SupportTicket["status"] }) {
  const styles: Record<SupportTicket["status"], string> = {
    Open: "bg-green-100 text-green-700",
    "In Progress": "bg-blue-100 text-blue-700",
    Closed: "bg-gray-100 text-gray-600",
  };
  return (
    <span
      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${styles[status]}`}
    >
      {status}
    </span>
  );
}

type FilterTab = "All" | SupportTicket["status"];
const TABS: FilterTab[] = ["All", "Open", "In Progress", "Closed"];

export default function Support() {
  const [data, setData] = useState(initialData);
  const [tab, setTab] = useState<FilterTab>("All");
  const [selected, setSelected] = useState<SupportTicket | null>(null);
  const [reply, setReply] = useState("");

  const filtered = data.filter((t) => tab === "All" || t.status === tab);

  function closeTicket(id: string) {
    setData((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "Closed" as const } : t)),
    );
    if (selected?.id === id)
      setSelected((prev) => (prev ? { ...prev, status: "Closed" } : null));
    toast.success("Ticket closed");
  }

  function sendReply() {
    if (!reply.trim()) return;
    toast.success("Reply sent successfully");
    setReply("");
  }

  return (
    <div className="flex gap-4 h-full">
      {/* Table */}
      <div className={`flex-1 space-y-4 ${selected ? "hidden lg:block" : ""}`}>
        <div className="flex gap-2">
          {TABS.map((t) => (
            <button
              type="button"
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-colors ${
                tab === t
                  ? "text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              style={tab === t ? { background: "linear-gradient(135deg, #2F80ED 0%, #1E40AF 100%)" } : {}}
              data-ocid="support.filter.tab"
            >
              {t}
            </button>
          ))}
        </div>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 hover:bg-gray-50">
                  <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider pl-5">
                    Ticket
                  </TableHead>
                  <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    User
                  </TableHead>
                  <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Priority
                  </TableHead>
                  <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Status
                  </TableHead>
                  <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Created
                  </TableHead>
                  <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-right pr-5">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((ticket, i) => (
                  <TableRow
                    key={ticket.id}
                    className={`hover:bg-gray-50 border-gray-100 cursor-pointer ${
                      selected?.id === ticket.id ? "bg-blue-50" : ""
                    }`}
                    onClick={() => setSelected(ticket)}
                    data-ocid={`support.item.${i + 1}`}
                  >
                    <TableCell className="pl-5">
                      <p className="text-xs font-mono text-gray-400 mb-0.5">
                        {ticket.id}
                      </p>
                      <p className="text-sm font-medium text-gray-900 max-w-[200px] truncate">
                        {ticket.subject}
                      </p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="w-7 h-7">
                          <AvatarImage src={ticket.avatar} />
                          <AvatarFallback>{ticket.user[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-gray-700">
                          {ticket.user}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <PriorityBadge priority={ticket.priority} />
                    </TableCell>
                    <TableCell>
                      <StatusPill status={ticket.status} />
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {ticket.created}
                    </TableCell>
                    <TableCell className="pr-5">
                      <div
                        className="flex items-center justify-end gap-1"
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          className="p-1.5 rounded hover:bg-blue-50 text-blue-600"
                          onClick={() => setSelected(ticket)}
                          data-ocid={`support.view.button.${i + 1}`}
                        >
                          <MessageSquare className="w-4 h-4" />
                        </button>
                        {ticket.status !== "Closed" && (
                          <button
                            type="button"
                            className="p-1.5 rounded hover:bg-gray-100 text-gray-500"
                            onClick={() => closeTicket(ticket.id)}
                            data-ocid={`support.close.button.${i + 1}`}
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-12 text-gray-400"
                      data-ocid="support.empty_state"
                    >
                      No tickets found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Ticket detail panel */}
      {selected && (
        <div className="w-full lg:w-96 flex-shrink-0" data-ocid="support.panel">
          <Card className="border-0 shadow-sm h-full">
            <CardContent className="p-5 flex flex-col h-full gap-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-mono text-xs text-gray-400">
                    {selected.id}
                  </p>
                  <h3 className="font-semibold text-gray-900 mt-0.5">
                    {selected.subject}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="p-1 rounded hover:bg-gray-100"
                  data-ocid="support.close_button"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={selected.avatar} />
                  <AvatarFallback>{selected.user[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {selected.user}
                  </p>
                  <p className="text-xs text-gray-500">{selected.created}</p>
                </div>
                <div className="ml-auto flex gap-2">
                  <PriorityBadge priority={selected.priority} />
                  <StatusPill status={selected.status} />
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 flex-1">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {selected.message}
                </p>
              </div>

              <div className="space-y-2">
                <Textarea
                  placeholder="Type your reply..."
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  className="resize-none h-24 text-sm"
                  data-ocid="support.textarea"
                />
                <div className="flex gap-2">
                  <Button
                    onClick={sendReply}
                    className="flex-1 h-9 text-sm text-white"
                    style={{ background: "#2F80ED" }}
                    data-ocid="support.submit_button"
                  >
                    <Send className="w-3.5 h-3.5 mr-1.5" /> Send Reply
                  </Button>
                  {selected.status !== "Closed" && (
                    <Button
                      variant="outline"
                      onClick={() => closeTicket(selected.id)}
                      className="h-9 text-xs"
                      data-ocid="support.confirm_button"
                    >
                      Close Ticket
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
