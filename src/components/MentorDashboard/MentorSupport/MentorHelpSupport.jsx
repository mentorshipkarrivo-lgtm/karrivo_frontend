import React, { useState, useEffect } from 'react';
import { MessageCircle, Plus, X, Clock, CheckCircle, AlertCircle, Search, Filter, ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';
import { 
    useGetMentorSupportTicketsQuery, 
    useCreateMentorSupportTicketMutation, 
    useUpdateMentorSupportTicketMutation 
} from "./MentorSecapislice"

const MentorHelpSupport = () => {
    const [mentorId, setMentorId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [feedbackModal, setFeedbackModal] = useState({ isOpen: false, ticket: null });
    const [feedbackForm, setFeedbackForm] = useState({ status: '', remarks: '' });

    // Get mentorId from localStorage
    useEffect(() => {
        const storedMentorId = localStorage.getItem('mentorId');
        if (storedMentorId) {
            setMentorId(storedMentorId);
        }
    }, []);

    const { data: ticketsData, isLoading, isError, error, refetch } = useGetMentorSupportTicketsQuery(mentorId, {
        skip: !mentorId,
    });
    
    const [createTicket, { isLoading: isCreating }] = useCreateMentorSupportTicketMutation();
    const [updateTicket, { isLoading: isUpdating }] = useUpdateMentorSupportTicketMutation();

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createTicket({
                mentorId,
                ...formData
            }).unwrap();

            setFormData({
                subject: '',
                category: '',
                priority: '',
                description: '',
            });

            setIsModalOpen(false);
            refetch();
        } catch (err) {
            console.error("Failed to create ticket:", err);
            alert("Failed to create ticket. Please try again.");
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
                    status: feedbackForm.status,
                    userRemarks: feedbackForm.remarks,
                    feedbackAt: new Date().toISOString()
                }
            }).unwrap();

            closeFeedbackModal();
            refetch();
        } catch (err) {
            console.error("Failed to update ticket:", err);
            alert("Failed to submit feedback. Please try again.");
        }
    };

    const getStatusBadge = (status) => {
        const statusConfig = {
            pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, label: 'Pending' },
            in_progress: { color: 'bg-blue-100 text-blue-800', icon: Clock, label: 'In Progress' },
            resolved: { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Resolved' },
            closed: { color: 'bg-gray-100 text-gray-800', icon: CheckCircle, label: 'Closed' },
        };

        const config = statusConfig[status] || statusConfig.pending;
        const Icon = config.icon;

        return (
            <span className={`inline-flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
                <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                {config.label}
            </span>
        );
    };

    const getPriorityBadge = (priority) => {
        const priorityConfig = {
            low: 'bg-gray-100 text-gray-800',
            medium: 'bg-blue-100 text-blue-800',
            high: 'bg-orange-100 text-orange-800',
            urgent: 'bg-red-100 text-red-800',
        };

        return (
            <span className={`px-2 py-1 rounded text-xs font-medium ${priorityConfig[priority] || priorityConfig.low}`}>
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </span>
        );
    };

    const filteredTickets = ticketsData?.tickets?.filter(ticket => {
        const matchesStatus = selectedStatus === 'all' || ticket.status === selectedStatus;
        const matchesSearch = ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ticket.ticketId.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    }) || [];

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#031610] flex items-center justify-center p-4">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#0098cc] border-t-transparent mx-auto mb-4"></div>
                    <p className="text-gray-300 text-sm sm:text-base">Loading support tickets...</p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-[#031610] flex items-center justify-center p-4">
                <div className="bg-[#062117] border border-[#0098cc]/30 rounded-lg p-6 sm:p-8 max-w-md w-full text-center">
                    <AlertCircle className="text-red-500 h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-4" />
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Error Loading Tickets</h2>
                    <p className="text-sm sm:text-base text-gray-400 mb-4">
                        {error?.data?.message || "Failed to load support tickets. Please try again."}
                    </p>
                    <button
                        onClick={() => refetch()}
                        className="bg-[#0098cc] hover:bg-[#0098cc]/80 text-white px-6 py-2 rounded-lg transition-colors w-full sm:w-auto"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#031610] p-3 sm:p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-[#062117] border border-[#0098cc]/30 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
                        <div className="w-full sm:w-auto">
                            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white flex items-center gap-2 sm:gap-3">
                                <MessageCircle className="text-[#0098cc] w-6 h-6 sm:w-8 sm:h-8" />
                                Mentor Help & Support
                            </h1>
                            <p className="text-gray-400 mt-1 text-sm sm:text-base">
                                Raise queries related to mentorship, sessions, or platform issues
                            </p>
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="w-full sm:w-auto bg-[#0098cc] hover:bg-[#0098cc]/80 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-md text-sm sm:text-base"
                        >
                            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                            Raise a Query
                        </button>
                    </div>
                </div>

                {/* Search and Filter */}
                <div className="bg-[#062117] border border-[#0098cc]/30 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
                    <div className="flex flex-col md:flex-row gap-3 sm:gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                            <input
                                type="text"
                                placeholder="Search by ticket ID or subject..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 bg-[#031610] border border-[#0098cc]/30 rounded-lg focus:ring-2 focus:ring-[#0098cc] focus:border-transparent outline-none text-sm sm:text-base text-white"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Filter className="text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="flex-1 md:flex-none px-3 sm:px-4 py-2.5 sm:py-3 bg-[#031610] border border-[#0098cc]/30 rounded-lg focus:ring-2 focus:ring-[#0098cc] focus:border-transparent outline-none text-sm sm:text-base text-white"
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

                {/* Tickets Table */}
                <div className="bg-[#062117] border border-[#0098cc]/30 rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-[#031610] border-b border-[#0098cc]/30">
                                <tr>
                                    <th className="px-3 lg:px-4 xl:px-6 py-3 xl:py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Ticket ID</th>
                                    <th className="px-3 lg:px-4 xl:px-6 py-3 xl:py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Subject</th>
                                    <th className="px-3 lg:px-4 xl:px-6 py-3 xl:py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Category</th>
                                    <th className="px-3 lg:px-4 xl:px-6 py-3 xl:py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Priority</th>
                                    <th className="px-3 lg:px-4 xl:px-6 py-3 xl:py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Status</th>
                                    <th className="px-3 lg:px-4 xl:px-6 py-3 xl:py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Created Date</th>
                                    <th className="px-3 lg:px-4 xl:px-6 py-3 xl:py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Response</th>
                                    <th className="px-3 lg:px-4 xl:px-6 py-3 xl:py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#0098cc]/20">
                                {filteredTickets.length === 0 ? (
                                    <tr>
                                        <td colSpan="8" className="px-6 py-12 text-center">
                                            <MessageCircle className="mx-auto text-gray-500 mb-4 w-12 h-12" />
                                            <p className="text-gray-400 font-medium">No support tickets found</p>
                                            <p className="text-gray-500 text-sm mt-1">
                                                {searchQuery || selectedStatus !== 'all' ? 'Try adjusting your filters' : 'Create your first support ticket to get started'}
                                            </p>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredTickets.map((ticket) => (
                                        <tr key={ticket.ticketId} className="hover:bg-[#031610]/50 transition-colors">
                                            <td className="px-3 lg:px-4 xl:px-6 py-4 whitespace-nowrap">
                                                <span className="text-xs lg:text-sm font-medium text-[#0098cc]">{ticket.ticketId}</span>
                                            </td>
                                            <td className="px-3 lg:px-4 xl:px-6 py-4">
                                                <p className="text-xs lg:text-sm font-medium text-white line-clamp-2 max-w-xs">{ticket.subject}</p>
                                            </td>
                                            <td className="px-3 lg:px-4 xl:px-6 py-4 whitespace-nowrap">
                                                <span className="text-xs lg:text-sm text-gray-300">{ticket.category}</span>
                                            </td>
                                            <td className="px-3 lg:px-4 xl:px-6 py-4 whitespace-nowrap">
                                                {getPriorityBadge(ticket.priority)}
                                            </td>
                                            <td className="px-3 lg:px-4 xl:px-6 py-4 whitespace-nowrap">
                                                {getStatusBadge(ticket.status)}
                                            </td>
                                            <td className="px-3 lg:px-4 xl:px-6 py-4 whitespace-nowrap text-xs lg:text-sm text-gray-300">
                                                {new Date(ticket.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-3 lg:px-4 xl:px-6 py-4">
                                                {ticket.response ? (
                                                    <div className="max-w-xs">
                                                        <p className="text-xs lg:text-sm text-white line-clamp-2">{ticket.response}</p>
                                                        {ticket.respondedAt && (
                                                            <p className="text-xs text-gray-400 mt-1">{new Date(ticket.respondedAt).toLocaleDateString()}</p>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <span className="text-xs lg:text-sm text-gray-500 italic">No response yet</span>
                                                )}
                                            </td>
                                            <td className="px-3 lg:px-4 xl:px-6 py-4 whitespace-nowrap">
                                                {ticket.response && ticket.status !== 'resolved' && ticket.status !== 'closed' ? (
                                                    <button
                                                        onClick={() => openFeedbackModal(ticket)}
                                                        className="text-xs lg:text-sm bg-[#0098cc] hover:bg-[#0098cc]/80 text-white px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 whitespace-nowrap"
                                                    >
                                                        <MessageSquare className="w-3 h-3" />
                                                        Feedback
                                                    </button>
                                                ) : ticket.userRemarks || ticket.status === 'resolved' || ticket.status === 'closed' ? (
                                                    <span className="text-xs text-green-400 font-medium">Completed</span>
                                                ) : (
                                                    <span className="text-xs text-gray-500 italic">Pending</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Create Ticket Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-[#062117] border border-[#0098cc]/30 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#0098cc]/30 sticky top-0 bg-[#062117] rounded-t-lg z-10">
                            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                                <MessageCircle className="text-[#0098cc] w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                                Raise a Support Query
                            </h2>
                            <button onClick={() => setIsModalOpen(false)} disabled={isCreating} className="text-gray-400 hover:text-gray-300 transition-colors disabled:opacity-50 p-1">
                                <X className="w-5 h-5 sm:w-6 sm:h-6" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-4 sm:p-6">
                            <div className="space-y-4 sm:space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Subject <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#031610] border border-[#0098cc]/30 rounded-lg focus:ring-2 focus:ring-[#0098cc] focus:border-transparent outline-none text-sm sm:text-base text-white"
                                        placeholder="Brief description of your issue"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Category <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleInputChange}
                                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#031610] border border-[#0098cc]/30 rounded-lg focus:ring-2 focus:ring-[#0098cc] focus:border-transparent outline-none text-sm sm:text-base text-white"
                                            required
                                        >
                                            <option value="">Select category</option>
                                            <option value="Technical Issue">Technical Issue</option>
                                            <option value="Session Management">Session Management</option>
                                            <option value="Mentee Related">Mentee Related</option>
                                            <option value="Payment/Billing">Payment/Billing</option>
                                            <option value="Account Settings">Account Settings</option>
                                            <option value="Platform Features">Platform Features</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Priority <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            name="priority"
                                            value={formData.priority}
                                            onChange={handleInputChange}
                                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#031610] border border-[#0098cc]/30 rounded-lg focus:ring-2 focus:ring-[#0098cc] focus:border-transparent outline-none text-sm sm:text-base text-white"
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
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Description <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        rows={6}
                                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#031610] border border-[#0098cc]/30 rounded-lg focus:ring-2 focus:ring-[#0098cc] focus:border-transparent resize-none outline-none text-sm sm:text-base text-white"
                                        placeholder="Please provide detailed information about your issue or query..."
                                        required
                                    />
                                    <p className="text-xs text-gray-400 mt-2">Provide as much detail as possible to help us resolve your issue quickly.</p>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 mt-6 pt-4 sm:pt-6 border-t border-[#0098cc]/30">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    disabled={isCreating}
                                    className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 border border-[#0098cc]/30 text-gray-300 rounded-lg hover:bg-[#031610] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isCreating}
                                    className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-[#0098cc] text-white rounded-lg hover:bg-[#0098cc]/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
                                >
                                    {isCreating ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                                            Submit Query
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Feedback Modal */}
            {feedbackModal.isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-[#062117] border border-[#0098cc]/30 rounded-lg w-full max-w-lg">
                        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#0098cc]/30">
                            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                                <MessageSquare className="text-[#0098cc] w-5 h-5 sm:w-6 sm:h-6" />
                                Provide Feedback
                            </h2>
                            <button onClick={closeFeedbackModal} disabled={isUpdating} className="text-gray-400 hover:text-gray-300 transition-colors disabled:opacity-50 p-1">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleFeedbackSubmit} className="p-4 sm:p-6">
                            <div className="mb-4 bg-[#031610] p-3 rounded-lg">
                                <p className="text-sm text-gray-300 mb-1">
                                    Ticket: <span className="font-medium text-[#0098cc]">{feedbackModal.ticket?.ticketId}</span>
                                </p>
                                <p className="text-sm text-gray-300">
                                    Subject: <span className="font-medium">{feedbackModal.ticket?.subject}</span>
                                </p>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-3">
                                        Was your issue resolved? <span className="text-red-500">*</span>
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setFeedbackForm(prev => ({ ...prev, status: 'resolved' }))}
                                            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                                                feedbackForm.status === 'resolved'
                                                    ? 'border-green-500 bg-green-500/20 text-green-400'
                                                    : 'border-[#0098cc]/30 hover:border-green-500/50 text-gray-300'
                                            }`}
                                        >
                                            <ThumbsUp className="w-5 h-5" />
                                            <span className="font-medium">Solved</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setFeedbackForm(prev => ({ ...prev, status: 'in_progress' }))}
                                            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                                                feedbackForm.status === 'in_progress'
                                                    ? 'border-red-500 bg-red-500/20 text-red-400'
                                                    : 'border-[#0098cc]/30 hover:border-red-500/50 text-gray-300'
                                            }`}
                                        >
                                            <ThumbsDown className="w-5 h-5" />
                                            <span className="font-medium">Not Solved</span>
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Additional Remarks (Optional)
                                    </label>
                                    <textarea
                                        value={feedbackForm.remarks}
                                        onChange={(e) => setFeedbackForm(prev => ({ ...prev, remarks: e.target.value }))}
                                        rows={4}
                                        className="w-full px-3 py-2.5 bg-[#031610] border border-[#0098cc]/30 rounded-lg focus:ring-2 focus:ring-[#0098cc] focus:border-transparent resize-none outline-none text-sm text-white"
                                        placeholder="Share any additional feedback or comments..."
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6 pt-4 border-t border-[#0098cc]/30">
                                <button
                                    type="button"
                                    onClick={closeFeedbackModal}
                                    disabled={isUpdating}
                                    className="w-full sm:w-auto px-4 py-2.5 border border-[#0098cc]/30 text-gray-300 rounded-lg hover:bg-[#031610] transition-colors disabled:opacity-50 text-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isUpdating || !feedbackForm.status}
                                    className="w-full sm:w-auto px-4 py-2.5 bg-[#0098cc] text-white rounded-lg hover:bg-[#0098cc]/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                                >
                                    {isUpdating ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                            Submitting...
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

export default MentorHelpSupport;