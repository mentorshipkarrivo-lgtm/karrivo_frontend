

import React, { useState } from 'react';
import { MessageCircle, Plus, X, Clock, CheckCircle, AlertCircle, Search, Filter, ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';
import { useGetSupportTicketsQuery, useCreateSupportTicketMutation, useUpdateSupportTicketMutation } from "./Helpsupportapislice";
import Loader from '../../../../global/Loader';

// ── Color tokens ─────────────────────────────────────────────────────────────
// Primary accent: #256cee (blue) on white — passes WCAG AA
// CTA buttons:   bg-[#256cee] text-white — passes AAA
// Ticket ID:     text-[#1a4fb5] (darker blue) on white — passes AAA
// Focus rings:   ring-[#256cee]
// Never use mid-blue or orange as text on white.

const HelpSupport = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [feedbackModal, setFeedbackModal] = useState({ isOpen: false, ticket: null });
    const [feedbackForm, setFeedbackForm] = useState({ status: '', remarks: '' });

    // ── User data from localStorage ──────────────────────────────────────────
    const userData = localStorage.getItem("userData");
    const user = userData ? JSON.parse(userData) : null;

    const username = user?.username || null;
    const userName = user?.fullName || user?.name || user?.firstName || user?.username || null;

    // ── API Hooks ────────────────────────────────────────────────────────────
    const { data: ticketsData, isLoading, isError, error, refetch } = useGetSupportTicketsQuery(username);
    const [createTicket, { isLoading: isCreating }] = useCreateSupportTicketMutation();
    const [updateTicket, { isLoading: isUpdating }] = useUpdateSupportTicketMutation();

    // ── Form State ───────────────────────────────────────────────────────────
    const [formData, setFormData] = useState({
        subject: '',
        category: '',
        priority: '',
        description: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // ── Submit Ticket ────────────────────────────────────────────────────────
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                username,
                name: userName,
                subject: formData.subject,
                category: formData.category,
                priority: formData.priority,
                description: formData.description,
            };
            await createTicket(payload).unwrap();
            setFormData({ subject: '', category: '', priority: '', description: '' });
            setIsModalOpen(false);
            refetch();
        } catch (err) {
            console.error("Failed to create ticket:", err);
            alert("Failed to create ticket. Please try again.");
        }
    };

    // ── Feedback Handlers ────────────────────────────────────────────────────
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
                    status: feedbackForm.status,
                    userRemarks: feedbackForm.remarks,
                    feedbackAt: new Date().toISOString(),
                },
            }).unwrap();
            closeFeedbackModal();
            refetch();
        } catch (err) {
            console.error("Failed to update ticket:", err);
            alert("Failed to submit feedback. Please try again.");
        }
    };

    // ── Badge Helpers ────────────────────────────────────────────────────────
    const getStatusBadge = (status) => {
        const statusConfig = {
            pending:     { cls: 'bg-amber-100 text-amber-900 border border-amber-200',  icon: Clock,         label: 'Pending'     },
            in_progress: { cls: 'bg-blue-100 text-blue-900 border border-blue-200',     icon: Clock,         label: 'In Progress' },
            resolved:    { cls: 'bg-green-100 text-green-900 border border-green-200',  icon: CheckCircle,   label: 'Resolved'    },
            closed:      { cls: 'bg-gray-100 text-gray-800 border border-gray-200',     icon: CheckCircle,   label: 'Closed'      },
        };
        const config = statusConfig[status] || statusConfig.pending;
        const Icon = config.icon;
        return (
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${config.cls}`}>
                <Icon className="w-3 h-3" />
                <span className="hidden sm:inline">{config.label}</span>
                <span className="sm:hidden">{config.label.substring(0, 3)}</span>
            </span>
        );
    };

    const getPriorityBadge = (priority) => {
        const cfg = {
            low:    'bg-gray-100 text-gray-800 border border-gray-200',
            medium: 'bg-sky-100 text-sky-900 border border-sky-200',
            high:   'bg-orange-100 text-orange-900 border border-orange-200',
            urgent: 'bg-red-100 text-red-900 border border-red-200',
        };
        return (
            <span className={`px-2 py-1 rounded text-xs font-semibold ${cfg[priority] || cfg.low}`}>
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </span>
        );
    };

    // ── Filter Tickets ───────────────────────────────────────────────────────
    const filteredTickets = ticketsData?.tickets?.filter(ticket => {
        const matchesStatus = selectedStatus === 'all' || ticket.status === selectedStatus;
        const matchesSearch =
            ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ticket.ticketId.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    }) || [];

    // ── Loading / Error States ───────────────────────────────────────────────
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="text-center"><Loader /></div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8 max-w-md w-full text-center">
                    <AlertCircle className="text-red-500 h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-4" />
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Error Loading Tickets</h2>
                    <p className="text-sm sm:text-base text-gray-600 mb-4">
                        {error?.data?.message || "Failed to load support tickets. Please try again."}
                    </p>
                    <button
                        onClick={() => refetch()}
                        className="bg-[#256cee] hover:bg-[#1a4fb5] text-white px-6 py-2.5 rounded-lg font-medium transition-colors w-full sm:w-auto"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    // ── Shared input classes ─────────────────────────────────────────────────
    const inputCls = "w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#256cee] focus:border-[#256cee] outline-none text-sm text-gray-900 placeholder-gray-400 bg-white";
    const selectCls = `${inputCls} bg-white`;

    // ── Render ───────────────────────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">

                {/* ── Header ─────────────────────────────────────────────── */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-4 sm:mb-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
                        <div>
                            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                                Help &amp; Support
                            </h1>
                            <p className="text-gray-500 mt-1 text-xs sm:text-sm md:text-base">
                                Raise queries and track your support requests
                            </p>
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="w-full sm:w-auto bg-[#256cee] hover:bg-[#1a4fb5] active:bg-[#163fa0] text-white px-4 sm:px-6 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm font-medium text-sm"
                        >
                            <Plus className="w-4 h-4" />
                            Raise a Query
                        </button>
                    </div>
                </div>

                {/* ── Search & Filter ─────────────────────────────────────── */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 md:p-5 mb-4 sm:mb-6">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                            <input
                                type="text"
                                placeholder="Search by subject or ticket ID…"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={`${inputCls} pl-9`}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Filter className="text-gray-400 w-4 h-4 flex-shrink-0" />
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className={`${selectCls} flex-1 sm:flex-none sm:w-40`}
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="in_progress">In Progress</option>
                                <option value="resolved">Resolved</option>
                                <option value="closed">Closed</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* ── Desktop Table View ──────────────────────────────────── */}
                <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    {['Ticket ID', 'Subject', 'Category', 'Priority', 'Status', 'Created', 'Response'].map(h => (
                                        <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredTickets.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-16 text-center">
                                            <MessageCircle className="mx-auto text-gray-200 mb-4 w-12 h-12" />
                                            <p className="text-gray-700 font-semibold">No support tickets found</p>
                                            <p className="text-gray-400 text-sm mt-1">
                                                {searchQuery || selectedStatus !== 'all'
                                                    ? 'Try adjusting your filters'
                                                    : 'Create your first support ticket to get started'}
                                            </p>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredTickets.map((ticket) => (
                                        <tr key={ticket.ticketId} className="hover:bg-gray-50/70 transition-colors">
                                            {/* Ticket ID — dark blue on white: AAA */}
                                            <td className="px-4 py-3.5 whitespace-nowrap">
                                                <span className="text-sm font-bold text-[#1a4fb5]">{ticket.ticketId}</span>
                                            </td>
                                            <td className="px-4 py-3.5">
                                                <p className="text-sm font-medium text-gray-900 line-clamp-2 max-w-xs">{ticket.subject}</p>
                                            </td>
                                            <td className="px-4 py-3.5 whitespace-nowrap">
                                                <span className="text-sm text-gray-700">{ticket.category}</span>
                                            </td>
                                            <td className="px-4 py-3.5 whitespace-nowrap">
                                                {getPriorityBadge(ticket.priority)}
                                            </td>
                                            <td className="px-4 py-3.5 whitespace-nowrap">
                                                {getStatusBadge(ticket.status)}
                                            </td>
                                            <td className="px-4 py-3.5 whitespace-nowrap text-sm text-gray-600">
                                                {new Date(ticket.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-4 py-3.5">
                                                {ticket.response ? (
                                                    <div className="max-w-xs">
                                                        <p className="text-sm text-gray-900 line-clamp-2">{ticket.response}</p>
                                                        {ticket.respondedAt && (
                                                            <p className="text-xs text-gray-500 mt-1">
                                                                {new Date(ticket.respondedAt).toLocaleDateString()}
                                                            </p>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <span className="text-sm text-gray-400 italic">No response yet</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* ── Mobile / Tablet Card View ───────────────────────────── */}
                <div className="lg:hidden space-y-3 sm:space-y-4">
                    {filteredTickets.length === 0 ? (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-10 text-center">
                            <MessageCircle className="mx-auto text-gray-200 mb-4 w-12 h-12" />
                            <p className="text-gray-700 font-semibold">No support tickets found</p>
                            <p className="text-gray-400 text-sm mt-1">
                                {searchQuery || selectedStatus !== 'all'
                                    ? 'Try adjusting your filters'
                                    : 'Create your first support ticket'}
                            </p>
                        </div>
                    ) : (
                        filteredTickets.map((ticket) => (
                            <div key={ticket.ticketId} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 space-y-3">
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex-1 min-w-0">
                                        {/* Ticket ID: dark blue on white */}
                                        <p className="text-xs font-bold text-[#1a4fb5] mb-1">{ticket.ticketId}</p>
                                        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">{ticket.subject}</h3>
                                    </div>
                                    {getStatusBadge(ticket.status)}
                                </div>

                                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                                    <div>
                                        <p className="text-gray-500 mb-1 font-medium">Category</p>
                                        <p className="text-gray-900 font-semibold">{ticket.category}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 mb-1 font-medium">Priority</p>
                                        {getPriorityBadge(ticket.priority)}
                                    </div>
                                    <div>
                                        <p className="text-gray-500 mb-1 font-medium">Created</p>
                                        <p className="text-gray-900 font-semibold">{new Date(ticket.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 mb-1 font-medium">Status</p>
                                        <p className="text-gray-900 font-semibold capitalize">{ticket.status.replace('_', ' ')}</p>
                                    </div>
                                </div>

                                {ticket.response && (
                                    <div className="pt-3 border-t border-gray-100">
                                        <p className="text-xs text-gray-500 mb-1 font-medium">Response</p>
                                        <p className="text-sm text-gray-900 line-clamp-3">{ticket.response}</p>
                                        {ticket.respondedAt && (
                                            <p className="text-xs text-gray-500 mt-1">
                                                Responded: {new Date(ticket.respondedAt).toLocaleDateString()}
                                            </p>
                                        )}
                                    </div>
                                )}

                                <div className="pt-3 border-t border-gray-100">
                                    {ticket.response && ticket.status !== 'resolved' && ticket.status !== 'closed' ? (
                                        <button
                                            onClick={() => openFeedbackModal(ticket)}
                                            className="w-full text-sm bg-[#256cee] hover:bg-[#1a4fb5] text-white px-4 py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium"
                                        >
                                            <MessageSquare className="w-4 h-4" />
                                            Provide Feedback
                                        </button>
                                    ) : ticket.userRemarks || ticket.status === 'resolved' || ticket.status === 'closed' ? (
                                        <div className="text-center text-sm text-green-700 font-semibold py-2 flex items-center justify-center gap-1.5">
                                            <CheckCircle className="w-4 h-4" />
                                            Completed
                                        </div>
                                    ) : (
                                        <div className="text-center text-sm text-gray-400 italic py-2">Awaiting Response</div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* ── Create Ticket Modal ─────────────────────────────────────────── */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
                        {/* Modal header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 sticky top-0 bg-white rounded-t-xl z-10">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                    <MessageCircle className="w-4 h-4 text-[#256cee]" />
                                </div>
                                <h2 className="text-lg font-bold text-gray-900">Raise a Support Query</h2>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                disabled={isCreating}
                                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50 p-1.5 rounded-lg"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-5 sm:p-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                        Subject <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        className={inputCls}
                                        placeholder="Brief description of your issue"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                            Category <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleInputChange}
                                            className={selectCls}
                                            required
                                        >
                                            <option value="">Select category</option>
                                            <option value="Technical Issue">Technical Issue</option>
                                            <option value="Account Related">Account Related</option>
                                            <option value="Billing">Billing</option>
                                            <option value="Mentorship">Mentorship</option>
                                            <option value="Feature Request">Feature Request</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                            Priority <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            name="priority"
                                            value={formData.priority}
                                            onChange={handleInputChange}
                                            className={selectCls}
                                            required
                                        >
                                            <option value="">Select priority</option>
                                            <option value="low">Low</option>
                                            <option value="medium">Medium</option>
                                            <option value="high">High</option>
                                            <option value="urgent">Urgent</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                        Description <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        rows={5}
                                        className={`${inputCls} resize-none`}
                                        placeholder="Provide detailed information about your issue or query…"
                                        required
                                    />
                                    <p className="text-xs text-gray-500 mt-1.5">
                                        The more detail you provide, the faster we can help you.
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    disabled={isCreating}
                                    className="w-full sm:w-auto px-5 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 text-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isCreating}
                                    className="w-full sm:w-auto px-5 py-2.5 bg-[#256cee] hover:bg-[#1a4fb5] text-white font-medium rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2 text-sm shadow-sm"
                                >
                                    {isCreating ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                                            Submitting…
                                        </>
                                    ) : (
                                        <>
                                            <Plus className="w-4 h-4" />
                                            Submit Query
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ── Feedback Modal ──────────────────────────────────────────────── */}
            {feedbackModal.isOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl">
                        {/* Modal header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 sticky top-0 bg-white rounded-t-xl">
                            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <MessageSquare className="text-[#256cee] w-5 h-5" />
                                Provide Feedback
                            </h2>
                            <button
                                onClick={closeFeedbackModal}
                                disabled={isUpdating}
                                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50 p-1.5 rounded-lg"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleFeedbackSubmit} className="p-5 sm:p-6">
                            {/* Ticket summary */}
                            <div className="mb-5 bg-blue-50 border border-blue-100 p-3.5 rounded-lg">
                                <p className="text-sm text-gray-600 mb-0.5">
                                    Ticket: <span className="font-bold text-[#1a4fb5]">{feedbackModal.ticket?.ticketId}</span>
                                </p>
                                <p className="text-sm text-gray-600">
                                    Subject: <span className="font-semibold text-gray-900">{feedbackModal.ticket?.subject}</span>
                                </p>
                            </div>

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        Was your issue resolved? <span className="text-red-500">*</span>
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setFeedbackForm(prev => ({ ...prev, status: 'resolved' }))}
                                            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 font-semibold transition-all text-sm ${
                                                feedbackForm.status === 'resolved'
                                                    ? 'border-green-500 bg-green-50 text-green-800'
                                                    : 'border-gray-200 hover:border-green-300 text-gray-700 hover:bg-green-50/40'
                                            }`}
                                        >
                                            <ThumbsUp className="w-4 h-4" />
                                            Yes, Solved
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setFeedbackForm(prev => ({ ...prev, status: 'in_progress' }))}
                                            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 font-semibold transition-all text-sm ${
                                                feedbackForm.status === 'in_progress'
                                                    ? 'border-red-500 bg-red-50 text-red-800'
                                                    : 'border-gray-200 hover:border-red-300 text-gray-700 hover:bg-red-50/40'
                                            }`}
                                        >
                                            <ThumbsDown className="w-4 h-4" />
                                            Not Solved
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                        Additional Remarks <span className="text-gray-400 font-normal">(Optional)</span>
                                    </label>
                                    <textarea
                                        value={feedbackForm.remarks}
                                        onChange={(e) => setFeedbackForm(prev => ({ ...prev, remarks: e.target.value }))}
                                        rows={4}
                                        className={`${inputCls} resize-none`}
                                        placeholder="Share any additional feedback or comments…"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={closeFeedbackModal}
                                    disabled={isUpdating}
                                    className="w-full sm:w-auto px-5 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 text-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isUpdating || !feedbackForm.status}
                                    className="w-full sm:w-auto px-5 py-2.5 bg-[#256cee] hover:bg-[#1a4fb5] text-white font-medium rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm shadow-sm"
                                >
                                    {isUpdating ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                                            Submitting…
                                        </>
                                    ) : (
                                        'Submit Feedback'
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

export default HelpSupport;







