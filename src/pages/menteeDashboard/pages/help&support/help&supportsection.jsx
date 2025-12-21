import React, { useState } from 'react';
import { MessageCircle, Plus, X, Clock, CheckCircle, AlertCircle, Search, Filter } from 'lucide-react';
import { useGetSupportTicketsQuery, useCreateSupportTicketMutation } from "./help&supportapislice"

const HelpSupport = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const username = "Karrivo747IRNR"; // Replace with actual username

    // Fetch support tickets
    const { data: ticketsData, isLoading, isError, error, refetch } = useGetSupportTicketsQuery(username);

    // Create ticket mutation
    const [createTicket, { isLoading: isCreating }] = useCreateSupportTicketMutation();

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
                username,
                ...formData
            }).unwrap();

            // Reset form
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

    // Filter tickets
    const filteredTickets = ticketsData?.tickets?.filter(ticket => {
        const matchesStatus = selectedStatus === 'all' || ticket.status === selectedStatus;
        const matchesSearch = ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ticket.ticketId.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    }) || [];

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#ea580c] border-t-transparent mx-auto mb-4"></div>
                    <p className="text-gray-600 text-sm sm:text-base">Loading support tickets...</p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 max-w-md w-full text-center">
                    <AlertCircle className="text-red-500 h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-4" />
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Error Loading Tickets</h2>
                    <p className="text-sm sm:text-base text-gray-600 mb-4">
                        {error?.data?.message || "Failed to load support tickets. Please try again."}
                    </p>
                    <button
                        onClick={() => refetch()}
                        className="bg-[#ea580c] hover:bg-[#c2410c] text-white px-6 py-2 rounded-lg transition-colors w-full sm:w-auto"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
                        <div className="w-full sm:w-auto">
                            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2 sm:gap-3">
                                <MessageCircle className="text-[#ea580c] w-6 h-6 sm:w-8 sm:h-8" />
                                Help & Support
                            </h1>
                            <p className="text-gray-500 mt-1 text-sm sm:text-base">
                                Raise queries and track your support requests
                            </p>
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="w-full sm:w-auto bg-[#ea580c] hover:bg-[#c2410c] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-md text-sm sm:text-base"
                        >
                            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                            Raise a Query
                        </button>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
                    <div className="flex flex-col md:flex-row gap-3 sm:gap-4">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                            <input
                                type="text"
                                placeholder="Search by ticket ID or subject..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent outline-none text-sm sm:text-base"
                            />
                        </div>

                        {/* Status Filter */}
                        <div className="flex items-center gap-2">
                            <Filter className="text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="flex-1 md:flex-none px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent outline-none bg-white text-sm sm:text-base"
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

                {/* Tickets Table - Desktop */}
                <div className="hidden lg:block bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-4 xl:px-6 py-3 xl:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Ticket ID
                                    </th>
                                    <th className="px-4 xl:px-6 py-3 xl:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Subject
                                    </th>
                                    <th className="px-4 xl:px-6 py-3 xl:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Category
                                    </th>
                                    <th className="px-4 xl:px-6 py-3 xl:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Priority
                                    </th>
                                    <th className="px-4 xl:px-6 py-3 xl:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-4 xl:px-6 py-3 xl:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Created Date
                                    </th>
                                    <th className="px-4 xl:px-6 py-3 xl:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Response
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredTickets.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-12 text-center">
                                            <MessageCircle className="mx-auto text-gray-300 mb-4 w-12 h-12" />
                                            <p className="text-gray-500 font-medium">No support tickets found</p>
                                            <p className="text-gray-400 text-sm mt-1">
                                                {searchQuery || selectedStatus !== 'all'
                                                    ? 'Try adjusting your filters'
                                                    : 'Create your first support ticket to get started'}
                                            </p>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredTickets.map((ticket) => (
                                        <tr key={ticket.ticketId} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-4 xl:px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm font-medium text-[#ea580c]">
                                                    {ticket.ticketId}
                                                </span>
                                            </td>
                                            <td className="px-4 xl:px-6 py-4">
                                                <p className="text-sm font-medium text-gray-900">
                                                    {ticket.subject}
                                                </p>
                                            </td>
                                            <td className="px-4 xl:px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm text-gray-600">
                                                    {ticket.category}
                                                </span>
                                            </td>
                                            <td className="px-4 xl:px-6 py-4 whitespace-nowrap">
                                                {getPriorityBadge(ticket.priority)}
                                            </td>
                                            <td className="px-4 xl:px-6 py-4 whitespace-nowrap">
                                                {getStatusBadge(ticket.status)}
                                            </td>
                                            <td className="px-4 xl:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {new Date(ticket.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-4 xl:px-6 py-4">
                                                {ticket.response ? (
                                                    <div className="max-w-xs">
                                                        <p className="text-sm text-gray-900 line-clamp-2">
                                                            {ticket.response}
                                                        </p>
                                                        {ticket.respondedAt && (
                                                            <p className="text-xs text-gray-500 mt-1">
                                                                Responded: {new Date(ticket.respondedAt).toLocaleDateString()}
                                                            </p>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <span className="text-sm text-gray-400 italic">
                                                        No response yet
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Tickets Cards - Mobile & Tablet */}
                <div className="lg:hidden space-y-3 sm:space-y-4">
                    {filteredTickets.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-sm p-8 sm:p-12 text-center">
                            <MessageCircle className="mx-auto text-gray-300 mb-4 w-12 h-12" />
                            <p className="text-gray-500 font-medium">No support tickets found</p>
                            <p className="text-gray-400 text-sm mt-1">
                                {searchQuery || selectedStatus !== 'all'
                                    ? 'Try adjusting your filters'
                                    : 'Create your first support ticket to get started'}
                            </p>
                        </div>
                    ) : (
                        filteredTickets.map((ticket) => (
                            <div key={ticket.ticketId} className="bg-white rounded-lg shadow-sm p-4 sm:p-5 space-y-3">
                                {/* Header */}
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-[#ea580c] mb-1">
                                            {ticket.ticketId}
                                        </p>
                                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 break-words">
                                            {ticket.subject}
                                        </h3>
                                    </div>
                                    {getStatusBadge(ticket.status)}
                                </div>

                                {/* Details Grid */}
                                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Category</p>
                                        <p className="text-sm font-medium text-gray-900">{ticket.category}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Priority</p>
                                        {getPriorityBadge(ticket.priority)}
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Created</p>
                                        <p className="text-sm font-medium text-gray-900">
                                            {new Date(ticket.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Last Updated</p>
                                        <p className="text-sm font-medium text-gray-900">
                                            {ticket.respondedAt
                                                ? new Date(ticket.respondedAt).toLocaleDateString()
                                                : 'N/A'}
                                        </p>
                                    </div>
                                </div>

                                {/* Response */}
                                {ticket.response && (
                                    <div className="pt-3 border-t border-gray-100">
                                        <p className="text-xs text-gray-500 mb-1">Response</p>
                                        <p className="text-sm text-gray-900">{ticket.response}</p>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Create Ticket Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white rounded-t-lg z-10">
                            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
                                <MessageCircle className="text-[#ea580c] w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                                Raise a Support Query
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                disabled={isCreating}
                                className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50 p-1"
                            >
                                <X className="w-5 h-5 sm:w-6 sm:h-6" />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-4 sm:p-6">
                            <div className="space-y-4 sm:space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Subject <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent outline-none text-sm sm:text-base"
                                        placeholder="Brief description of your issue"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Category <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleInputChange}
                                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent outline-none bg-white text-sm sm:text-base"
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
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Priority <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            name="priority"
                                            value={formData.priority}
                                            onChange={handleInputChange}
                                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent outline-none bg-white text-sm sm:text-base"
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
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Description <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        rows={6}
                                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent resize-none outline-none text-sm sm:text-base"
                                        placeholder="Please provide detailed information about your issue or query..."
                                        required
                                    />
                                    <p className="text-xs text-gray-500 mt-2">
                                        Provide as much detail as possible to help us resolve your issue quickly.
                                    </p>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 mt-6 pt-4 sm:pt-6 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    disabled={isCreating}
                                    className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isCreating}
                                    className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-[#ea580c] text-white rounded-lg hover:bg-[#c2410c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
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
        </div>
    );
};

export default HelpSupport;