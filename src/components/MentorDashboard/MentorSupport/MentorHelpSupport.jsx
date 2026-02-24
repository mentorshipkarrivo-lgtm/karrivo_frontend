import React, { useState, useEffect } from 'react';
import {
  Plus, X, Clock, CheckCircle, Search, SlidersHorizontal,
  ThumbsUp, ThumbsDown, MessageSquare, TicketCheck, TriangleAlert,
  CircleDot, CircleCheck, SendHorizonal, Loader2
} from 'lucide-react';
import {
  useGetMentorSupportTicketsQuery,
  useCreateMentorSupportTicketMutation,
  useUpdateMentorSupportTicketMutation
} from "./MentorSupportapislice";
import Loader from '../../../global/Loader';

// ── Status badge ──────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const map = {
    pending:     { label: 'Pending',     icon: Clock,       cls: 'bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/30' },
    in_progress: { label: 'In Progress', icon: CircleDot,   cls: 'bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/30' },
    resolved:    { label: 'Resolved',    icon: CircleCheck, cls: 'bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/30' },
    closed:      { label: 'Closed',      icon: CheckCircle, cls: 'bg-white/5 text-white/40 ring-1 ring-white/10' },
  };
  const cfg = map[status] || map.pending;
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${cfg.cls}`}>
      <Icon size={11} />
      {cfg.label}
    </span>
  );
};

// ── Priority badge ────────────────────────────────────────────
const PriorityBadge = ({ priority }) => {
  const map = {
    low:    'bg-white/5 text-white/40 ring-1 ring-white/10',
    medium: 'bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20',
    high:   'bg-orange-500/10 text-orange-400 ring-1 ring-orange-500/20',
    urgent: 'bg-red-500/10 text-red-400 ring-1 ring-red-500/20',
  };
  return (
    <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${map[priority] || map.low}`}>
      {priority?.charAt(0).toUpperCase() + priority?.slice(1)}
    </span>
  );
};

// ── Main Component ────────────────────────────────────────────
const MentorHelpSupport = () => {
  // ── Get full userData from localStorage ──
  const [userData, setUserData] = useState(null);
  const [mentorId, setMentorId] = useState(null);

  useEffect(() => {
    try {
      // Try common localStorage keys
      const raw =
        localStorage.getItem('userData') ||
        localStorage.getItem('mentorData') ||
        localStorage.getItem('user');

      if (raw) {
        const parsed = JSON.parse(raw);
        setUserData(parsed);
        // _id is the mentor's id
        const id = parsed._id || parsed.id || localStorage.getItem('mentorId');
        if (id) setMentorId(id);
      } else {
        // Fallback: plain mentorId key
        const id = localStorage.getItem('mentorId');
        if (id) setMentorId(id);
      }
    } catch {
      const id = localStorage.getItem('mentorId');
      if (id) setMentorId(id);
    }
  }, []);

  const [isModalOpen, setIsModalOpen]   = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery]   = useState('');
  const [feedbackModal, setFeedbackModal] = useState({ isOpen: false, ticket: null });
  const [feedbackForm, setFeedbackForm] = useState({ status: '', remarks: '' });

  const { data: ticketsData, isLoading, isError, error, refetch } =
    useGetMentorSupportTicketsQuery(mentorId, { skip: !mentorId });

  const [createTicket, { isLoading: isCreating }] = useCreateMentorSupportTicketMutation();
  const [updateTicket, { isLoading: isUpdating }] = useUpdateMentorSupportTicketMutation();

  const [formData, setFormData] = useState({
    subject: '', category: '', priority: '', description: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // ── Build full payload with userData fields ───────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        mentorId,
        ...formData,
        // Optional: include extra userData fields if your API needs them
        mentorName:  userData?.name  || '',
        mentorEmail: userData?.email || '',
        mentorPhone: userData?.phone || '',
      };
      await createTicket(payload).unwrap();
      setFormData({ subject: '', category: '', priority: '', description: '' });
      setIsModalOpen(false);
      refetch();
    } catch (err) {
      console.error('Failed to create ticket:', err);
      alert('Failed to create ticket. Please try again.');
    }
  };

  const openFeedbackModal = (ticket) => {
    setFeedbackModal({ isOpen: true, ticket });
    setFeedbackForm({ status: '', remarks: '' });
  };

  const closeFeedbackModal = () => {
    setFeedbackModal({ isOpen: false, ticket: null });
    setFeedbackForm({ status: '', remarks: '' });
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTicket({
        ticketId: feedbackModal.ticket._id,
        updates: {
          status:      feedbackForm.status,
          userRemarks: feedbackForm.remarks,
          feedbackAt:  new Date().toISOString(),
          // Include mentorId so backend can verify ownership
          mentorId,
        }
      }).unwrap();
      closeFeedbackModal();
      refetch();
    } catch (err) {
      console.error('Failed to update ticket:', err);
      alert('Failed to submit feedback. Please try again.');
    }
  };

  const filteredTickets = ticketsData?.tickets?.filter(ticket => {
    const matchesStatus = selectedStatus === 'all' || ticket.status === selectedStatus;
    const matchesSearch =
      ticket.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.ticketId?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  }) || [];

  // ── Shared input style ────────────────────────────────────
  const inputCls = "w-full px-3 py-2.5 bg-[#031610] border border-white/10 rounded-lg text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#0098cc]/60 focus:ring-1 focus:ring-[#0098cc]/40 transition-colors";

  // ── Loading ───────────────────────────────────────────────
  if (isLoading) return (
    <div className="flex-1 flex items-center justify-center bg-[#031610] min-h-[300px]">
      <div className="flex flex-col items-center gap-3">
       <Loader />
      </div>
    </div>
  );

  // ── Error ─────────────────────────────────────────────────
  if (isError) return (
    <div className="flex-1 flex items-center justify-center bg-[#031610] p-6 min-h-[300px]">
      <div className="bg-[#062117] border border-white/10 rounded-xl p-8 max-w-sm w-full text-center">
        <TriangleAlert size={40} className="text-red-400 mx-auto mb-4" />
        <h2 className="text-white font-semibold text-lg mb-1">Failed to Load</h2>
        <p className="text-white/50 text-sm mb-5">{error?.data?.message || 'Unable to load support tickets.'}</p>
        <button onClick={() => refetch()} className="bg-[#0098cc] hover:bg-[#0098cc]/80 text-white px-5 py-2 rounded-lg text-sm transition-colors">
          Retry
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col bg-[#031610] p-3 sm:p-4 gap-4 min-h-full">

      {/* ── Top bar ─────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-white text-lg sm:text-xl font-semibold tracking-tight flex items-center gap-2">
            <TicketCheck size={20} className="text-[#0098cc] shrink-0" />
            Help &amp; Support
          </h1>
          <p className="text-white/40 text-xs sm:text-sm mt-0.5">Raise and track your support queries</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-[#0098cc] hover:bg-[#0098cc]/85 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors w-full sm:w-auto"
        >
          <Plus size={15} />
          Raise a Query
        </button>
      </div>

      {/* ── Search + Filter ──────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            placeholder="Search by ID or subject…"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className={`${inputCls} pl-9`}
          />
        </div>
        <div className="relative sm:min-w-[160px]">
          <SlidersHorizontal size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            className={`${inputCls} pl-9 pr-8 appearance-none cursor-pointer`}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {/* ── Table (desktop) / Cards (mobile) ─────────────────── */}
      <div className="flex-1 bg-[#062117] border border-white/10 rounded-xl overflow-hidden flex flex-col">

        {/* ── DESKTOP TABLE (hidden on mobile) ── */}
        <div className="hidden md:block overflow-x-auto flex-1">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                {['Ticket ID', 'Subject', 'Category', 'Priority', 'Status', 'Created', 'Response', 'Action'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold text-white/40 uppercase tracking-widest whitespace-nowrap bg-[#031610]/60">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredTickets.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-20 text-center">
                    <TicketCheck size={36} className="mx-auto text-white/10 mb-3" />
                    <p className="text-white/40 text-sm font-medium">No tickets found</p>
                    <p className="text-white/20 text-xs mt-1">
                      {searchQuery || selectedStatus !== 'all'
                        ? 'Try adjusting your filters'
                        : 'Click "Raise a Query" to get started'}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredTickets.map((ticket, i) => (
                  <tr
                    key={ticket.ticketId}
                    className={`border-b border-white/5 transition-colors hover:bg-white/[0.02] ${i % 2 !== 0 ? 'bg-white/[0.01]' : ''}`}
                  >
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span className="text-[#0098cc] text-xs font-mono font-medium">{ticket.ticketId}</span>
                    </td>
                    <td className="px-4 py-3.5 max-w-[200px]">
                      <p className="text-white text-sm font-medium truncate">{ticket.subject}</p>
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span className="text-white/60 text-xs">{ticket.category}</span>
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <PriorityBadge priority={ticket.priority} />
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <StatusBadge status={ticket.status} />
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap text-xs text-white/40">
                      {new Date(ticket.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-4 py-3.5 max-w-[200px]">
                      {ticket.response ? (
                        <div>
                          <p className="text-white/70 text-xs line-clamp-2">{ticket.response}</p>
                          {ticket.respondedAt && (
                            <p className="text-white/25 text-[10px] mt-1">{new Date(ticket.respondedAt).toLocaleDateString()}</p>
                          )}
                        </div>
                      ) : (
                        <span className="text-white/20 text-xs italic">Awaiting response</span>
                      )}
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <ActionButton ticket={ticket} onFeedback={openFeedbackModal} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ── MOBILE CARDS (visible only on mobile) ── */}
        <div className="md:hidden flex flex-col divide-y divide-white/5">
          {filteredTickets.length === 0 ? (
            <div className="py-16 text-center px-4">
              <TicketCheck size={36} className="mx-auto text-white/10 mb-3" />
              <p className="text-white/40 text-sm font-medium">No tickets found</p>
              <p className="text-white/20 text-xs mt-1">
                {searchQuery || selectedStatus !== 'all'
                  ? 'Try adjusting your filters'
                  : 'Click "Raise a Query" to get started'}
              </p>
            </div>
          ) : (
            filteredTickets.map((ticket) => (
              <div key={ticket.ticketId} className="p-4 flex flex-col gap-3">
                {/* Row 1: Ticket ID + Date */}
                <div className="flex items-center justify-between">
                  <span className="text-[#0098cc] text-xs font-mono font-medium">{ticket.ticketId}</span>
                  <span className="text-white/30 text-[11px]">
                    {new Date(ticket.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </span>
                </div>

                {/* Row 2: Subject */}
                <p className="text-white text-sm font-medium leading-snug">{ticket.subject}</p>

                {/* Row 3: Badges */}
                <div className="flex flex-wrap gap-2">
                  <StatusBadge status={ticket.status} />
                  <PriorityBadge priority={ticket.priority} />
                  <span className="text-white/50 text-xs px-2.5 py-1 rounded-md bg-white/5 ring-1 ring-white/10">
                    {ticket.category}
                  </span>
                </div>

                {/* Row 4: Response snippet */}
                {ticket.response ? (
                  <div className="bg-[#031610] rounded-lg px-3 py-2.5">
                    <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1">Admin Response</p>
                    <p className="text-white/60 text-xs line-clamp-2">{ticket.response}</p>
                  </div>
                ) : (
                  <p className="text-white/20 text-xs italic">Awaiting admin response…</p>
                )}

                {/* Row 5: Action */}
                <div className="flex justify-end">
                  <ActionButton ticket={ticket} onFeedback={openFeedbackModal} />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer count */}
        {filteredTickets.length > 0 && (
          <div className="px-4 py-2.5 border-t border-white/5 bg-[#031610]/40">
            <p className="text-white/25 text-xs">{filteredTickets.length} ticket{filteredTickets.length !== 1 ? 's' : ''}</p>
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════
          Create Ticket Modal
      ══════════════════════════════════════════════════════ */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-[#062117] border border-white/10 rounded-t-2xl sm:rounded-xl w-full sm:max-w-xl max-h-[92vh] flex flex-col shadow-2xl">

            {/* Modal header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <h2 className="text-white font-semibold text-base flex items-center gap-2">
                <Plus size={16} className="text-[#0098cc]" />
                Raise a Support Query
              </h2>
              <button onClick={() => setIsModalOpen(false)} disabled={isCreating} className="text-white/30 hover:text-white/70 transition-colors disabled:opacity-40">
                <X size={18} />
              </button>
            </div>

            {/* Modal body */}
            <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-y-auto">
              <div className="px-5 py-4 space-y-4 flex-1">

                {/* Auto-filled mentor info (read-only, for reference) */}
                {userData && (
                  <div className="bg-[#031610] rounded-lg px-4 py-3 flex flex-col gap-0.5">
                    <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1">Submitting as</p>
                    <p className="text-white text-sm font-medium">{userData.name}</p>
                    <p className="text-white/40 text-xs">{userData.email}</p>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-white/50 mb-1.5">
                    Subject <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text" name="subject" value={formData.subject}
                    onChange={handleInputChange} required
                    className={inputCls}
                    placeholder="Brief description of your issue"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-white/50 mb-1.5">
                      Category <span className="text-red-400">*</span>
                    </label>
                    <select name="category" value={formData.category} onChange={handleInputChange} required className={inputCls}>
                      <option value="">Select category</option>
                      <option value="Technical Issue">Technical Issue</option>
                      <option value="Session Management">Session Management</option>
                      <option value="Mentee Related">Mentee Related</option>
                      <option value="Payment/Billing">Payment / Billing</option>
                      <option value="Account Settings">Account Settings</option>
                      <option value="Platform Features">Platform Features</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-white/50 mb-1.5">
                      Priority <span className="text-red-400">*</span>
                    </label>
                    <select name="priority" value={formData.priority} onChange={handleInputChange} required className={inputCls}>
                      <option value="">Select priority</option>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/50 mb-1.5">
                    Description <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="description" value={formData.description}
                    onChange={handleInputChange} required rows={5}
                    className={`${inputCls} resize-none`}
                    placeholder="Provide detailed information about your issue…"
                  />
                  <p className="text-white/20 text-xs mt-1.5">The more detail you provide, the faster we can help.</p>
                </div>
              </div>

              {/* Modal footer */}
              <div className="flex flex-col sm:flex-row justify-end gap-3 px-5 py-4 border-t border-white/10">
                <button
                  type="button" onClick={() => setIsModalOpen(false)} disabled={isCreating}
                  className="w-full sm:w-auto px-4 py-2.5 sm:py-2 text-sm text-white/50 hover:text-white border border-white/10 hover:border-white/20 rounded-lg transition-colors disabled:opacity-40 order-2 sm:order-1"
                >
                  Cancel
                </button>
                <button
                  type="submit" disabled={isCreating}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 bg-[#0098cc] hover:bg-[#0098cc]/85 text-white text-sm rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed order-1 sm:order-2"
                >
                  {isCreating ? (
                    <><Loader2 size={14} className="animate-spin" /> Submitting…</>
                  ) : (
                    <><SendHorizonal size={14} /> Submit Query</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
          Feedback Modal
      ══════════════════════════════════════════════════════ */}
      {feedbackModal.isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-[#062117] border border-white/10 rounded-t-2xl sm:rounded-xl w-full sm:max-w-md shadow-2xl">

            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <h2 className="text-white font-semibold text-base flex items-center gap-2">
                <MessageSquare size={15} className="text-[#0098cc]" />
                Provide Feedback
              </h2>
              <button onClick={closeFeedbackModal} disabled={isUpdating} className="text-white/30 hover:text-white/70 transition-colors disabled:opacity-40">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleFeedbackSubmit} className="px-5 py-4 space-y-4">

              {/* Ticket info pill */}
              <div className="bg-[#031610] rounded-lg px-4 py-3 flex flex-col gap-1">
                <p className="text-[10px] text-white/30 uppercase tracking-widest">Ticket</p>
                <p className="text-[#0098cc] text-xs font-mono font-medium">{feedbackModal.ticket?.ticketId}</p>
                <p className="text-white/60 text-xs truncate">{feedbackModal.ticket?.subject}</p>
              </div>

              {/* Resolved / Not Resolved */}
              <div>
                <label className="block text-xs font-medium text-white/50 mb-2.5">
                  Was your issue resolved? <span className="text-red-400">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFeedbackForm(prev => ({ ...prev, status: 'resolved' }))}
                    className={`flex items-center justify-center gap-2 py-3 rounded-lg border transition-all text-sm font-medium ${
                      feedbackForm.status === 'resolved'
                        ? 'border-emerald-500/60 bg-emerald-500/10 text-emerald-400'
                        : 'border-white/10 text-white/40 hover:border-emerald-500/30 hover:text-white/70'
                    }`}
                  >
                    <ThumbsUp size={15} />
                    Solved
                  </button>
                  <button
                    type="button"
                    onClick={() => setFeedbackForm(prev => ({ ...prev, status: 'in_progress' }))}
                    className={`flex items-center justify-center gap-2 py-3 rounded-lg border transition-all text-sm font-medium ${
                      feedbackForm.status === 'in_progress'
                        ? 'border-red-500/60 bg-red-500/10 text-red-400'
                        : 'border-white/10 text-white/40 hover:border-red-500/30 hover:text-white/70'
                    }`}
                  >
                    <ThumbsDown size={15} />
                    Not Solved
                  </button>
                </div>
              </div>

              {/* Remarks */}
              <div>
                <label className="block text-xs font-medium text-white/50 mb-1.5">
                  Additional Remarks <span className="text-white/20">(optional)</span>
                </label>
                <textarea
                  value={feedbackForm.remarks}
                  onChange={e => setFeedbackForm(prev => ({ ...prev, remarks: e.target.value }))}
                  rows={3}
                  className={`${inputCls} resize-none`}
                  placeholder="Any additional comments…"
                />
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-1">
                <button
                  type="button" onClick={closeFeedbackModal} disabled={isUpdating}
                  className="w-full sm:w-auto px-4 py-2.5 sm:py-2 text-sm text-white/50 hover:text-white border border-white/10 hover:border-white/20 rounded-lg transition-colors disabled:opacity-40 order-2 sm:order-1"
                >
                  Cancel
                </button>
                <button
                  type="submit" disabled={isUpdating || !feedbackForm.status}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 bg-[#0098cc] hover:bg-[#0098cc]/85 text-white text-sm rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed order-1 sm:order-2"
                >
                  {isUpdating ? (
                    <><Loader2 size={14} className="animate-spin" /> Submitting…</>
                  ) : (
                    <><SendHorizonal size={14} /> Submit Feedback</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// ── Extracted Action Button ──────────────────────────────────
const ActionButton = ({ ticket, onFeedback }) => {
  if (ticket.response && ticket.status !== 'resolved' && ticket.status !== 'closed') {
    return (
      <button
        onClick={() => onFeedback(ticket)}
        className="flex items-center gap-1.5 text-xs bg-[#0098cc]/10 hover:bg-[#0098cc]/20 text-[#0098cc] px-3 py-1.5 rounded-md transition-colors border border-[#0098cc]/20"
      >
        <MessageSquare size={11} />
        Feedback
      </button>
    );
  }
  if (ticket.userRemarks || ticket.status === 'resolved' || ticket.status === 'closed') {
    return (
      <span className="flex items-center gap-1 text-emerald-400 text-xs font-medium">
        <CircleCheck size={12} />
        Done
      </span>
    );
  }
  return <span className="text-white/20 text-xs italic">—</span>;
};

export default MentorHelpSupport;

