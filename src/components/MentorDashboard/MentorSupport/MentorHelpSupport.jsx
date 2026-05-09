import React, { useState } from "react";
import {
  Plus,
  Search,
  TicketCheck,
  X,
} from "lucide-react";
import {
  useGetMentorSupportTicketsQuery,
  useCreateMentorSupportTicketMutation,
} from "./MentorSupportapislice";
import Loader from "../../../global/Loader";

export default function MentorHelpSupport() {
  const mentorId = JSON.parse(localStorage.getItem("userData") || "{}")?._id;

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    subject: "",
    category: "",
    priority: "",
    description: "",
  });

  const { data, isLoading, refetch } = useGetMentorSupportTicketsQuery(
    mentorId,
    {
      skip: !mentorId,
    }
  );

  const [createTicket, { isLoading: creating }] =
    useCreateMentorSupportTicketMutation();

  const tickets = data?.tickets || [];

  const filteredTickets = tickets.filter((item) => {
    const matchSearch =
      item.subject?.toLowerCase().includes(search.toLowerCase()) ||
      item.ticketId?.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      status === "all" || item.status === status;

    return matchSearch && matchStatus;
  });

  const inputClass =
    "w-full border border-gray-300 rounded-xl px-4 py-2.5 text-xs bg-white text-gray-600 outline-none focus:ring-2 focus:ring-[#0098cc]";

  const buttonPrimary =
    "bg-[#1a1a2e] text-white px-4 py-2.5 rounded-xl text-xs font-semibold hover:opacity-90 transition";

  const buttonSecondary =
    "border border-gray-300 text-gray-600 px-4 py-2.5 rounded-xl text-xs font-medium bg-white hover:border-[#0098cc] transition";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createTicket({
        mentorId,
        ...form,
      }).unwrap();

      setForm({
        subject: "",
        category: "",
        priority: "",
        description: "",
      });

      setShowModal(false);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-700">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#1a1a2e] flex items-center gap-2">
              <TicketCheck size={24} className="text-[#0098cc]" />
              Help & Support
            </h1>

            <p className="text-gray-500 mt-2 text-xs">
              Raise, manage and track your support requests
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className={buttonPrimary}
          >
            <span className="flex items-center gap-2">
              <Plus size={15} />
              Raise Query
            </span>
          </button>
        </div>

        {/* Search + Filter */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            <Search
              size={15}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search by subject or ticket ID"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`${inputClass} pl-10`}
            />
          </div>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className={inputClass}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200   shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  {[
                    "Ticket ID",
                    "Subject",
                    "Category",
                    "Priority",
                    "Status",
                    "Created",
                  ].map((item) => (
                    <th
                      key={item}
                      className="text-left px-6 py-3 text-[11px] font-semibold text-gray-500 uppercase"
                    >
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filteredTickets.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center py-16"
                    >
                      <TicketCheck
                        size={38}
                        className="mx-auto text-gray-300 mb-3"
                      />

                      <p className="text-gray-500 text-sm font-medium">
                        No support tickets found
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredTickets.map((ticket) => (
                    <tr
                      key={ticket._id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 text-xs font-medium text-[#0098cc]">
                        {ticket.ticketId}
                      </td>

                      <td className="px-6 py-4 text-xs text-[#1a1a2e] font-medium">
                        {ticket.subject}
                      </td>

                      <td className="px-6 py-4 text-xs text-gray-500">
                        {ticket.category}
                      </td>

                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full bg-gray-100 text-xs text-gray-600">
                          {ticket.priority}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full bg-[#0098cc]/10 text-[#0098cc] text-xs">
                          {ticket.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-xs text-gray-500">
                        {new Date(ticket.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl border border-gray-200">

            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
              <h2 className="text-lg font-bold text-[#1a1a2e]">
                Raise Support Query
              </h2>

              <button onClick={() => setShowModal(false)}>
                <X className="text-gray-500" size={18} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-5"
            >
              <input
                type="text"
                placeholder="Subject"
                value={form.subject}
                onChange={(e) =>
                  setForm({
                    ...form,
                    subject: e.target.value,
                  })
                }
                className={inputClass}
                required
              />

              <div className="grid md:grid-cols-2 gap-4">
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      category: e.target.value,
                    })
                  }
                  className={inputClass}
                  required
                >
                  <option value="">Select Category</option>
                  <option>Technical Issue</option>
                  <option>Session Management</option>
                  <option>Payment</option>
                  <option>Account Settings</option>
                </select>

                <select
                  value={form.priority}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      priority: e.target.value,
                    })
                  }
                  className={inputClass}
                  required
                >
                  <option value="">Select Priority</option>
                  <option>low</option>
                  <option>medium</option>
                  <option>high</option>
                  <option>urgent</option>
                </select>
              </div>

              <textarea
                rows="5"
                placeholder="Describe your issue"
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value,
                  })
                }
                className={inputClass}
                required
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className={buttonSecondary}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className={buttonPrimary}
                >
                  {creating ? "Submitting..." : "Submit Query"}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}