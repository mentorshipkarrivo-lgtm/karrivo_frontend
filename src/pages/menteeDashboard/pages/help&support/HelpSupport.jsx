// import React, { useState } from 'react';
// import { MessageCircle, Plus, X, Clock, CheckCircle, AlertCircle, Search, Filter, ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';
// import { useGetSupportTicketsQuery, useCreateSupportTicketMutation, useUpdateSupportTicketMutation } from "./Helpsupportapislice"

// const HelpSupport = () => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [selectedStatus, setSelectedStatus] = useState('all');
//     const [searchQuery, setSearchQuery] = useState('');
//     const [feedbackModal, setFeedbackModal] = useState({ isOpen: false, ticket: null });
//     const [feedbackForm, setFeedbackForm] = useState({ status: '', remarks: '' });

//     const userData = localStorage.getItem("userData"); // returns string

//     // Parse it to object
//     const user = userData ? JSON.parse(userData) : null;

//     // Get username safely
//     const username = user?.username || null;
//     const userFullName = user?.name || user?.fullName || user?.username || null;

//     console.log(userFullName, 'naemheb')

//     const { data: ticketsData, isLoading, isError, error, refetch } = useGetSupportTicketsQuery(username);
//     const [createTicket, { isLoading: isCreating }] = useCreateSupportTicketMutation();
//     const [updateTicket, { isLoading: isUpdating }] = useUpdateSupportTicketMutation();

//     const [formData, setFormData] = useState({
//         subject: '',
//         category: '',
//         priority: '',
//         description: '',
//     });

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await createTicket({
//                 username,
//                 userFullName,
//                 ...formData
//             }).unwrap();

//             setFormData({
//                 subject: '',
//                 category: '',
//                 priority: '',
//                 description: '',
//             });

//             setIsModalOpen(false);
//             refetch();
//         } catch (err) {
//             console.error("Failed to create ticket:", err);
//             alert("Failed to create ticket. Please try again.");
//         }
//     };

//     const openFeedbackModal = (ticket) => {
//         setFeedbackModal({ isOpen: true, ticket });
//         setFeedbackForm({ status: '', remarks: '' });
//     };

//     const closeFeedbackModal = () => {
//         setFeedbackModal({ isOpen: false, ticket: null });
//         setFeedbackForm({ status: '', remarks: '' });
//     };

//     const handleFeedbackSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await updateTicket({
//                 ticketId: feedbackModal.ticket._id,
//                 updates: {
//                     status: feedbackForm.status,
//                     userRemarks: feedbackForm.remarks,
//                     feedbackAt: new Date().toISOString()
//                 }
//             }).unwrap();

//             closeFeedbackModal();
//             refetch();
//         } catch (err) {
//             console.error("Failed to update ticket:", err);
//             alert("Failed to submit feedback. Please try again.");
//         }
//     };

//     const getStatusBadge = (status) => {
//         const statusConfig = {
//             pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, label: 'Pending' },
//             in_progress: { color: 'bg-blue-100 text-blue-800', icon: Clock, label: 'In Progress' },
//             resolved: { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Resolved' },
//             closed: { color: 'bg-gray-100 text-gray-800', icon: CheckCircle, label: 'Closed' },
//         };

//         const config = statusConfig[status] || statusConfig.pending;
//         const Icon = config.icon;

//         return (
//             <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
//                 <Icon className="w-3 h-3" />
//                 <span className="hidden sm:inline">{config.label}</span>
//                 <span className="sm:hidden">{config.label.substring(0, 3)}</span>
//             </span>
//         );
//     };

//     const getPriorityBadge = (priority) => {
//         const priorityConfig = {
//             low: 'bg-gray-100 text-gray-800',
//             medium: 'bg-blue-100 text-blue-800',
//             high: 'bg-orange-100 text-orange-800',
//             urgent: 'bg-red-100 text-red-800',
//         };

//         return (
//             <span className={`px-2 py-1 rounded text-xs font-medium ${priorityConfig[priority] || priorityConfig.low}`}>
//                 {priority.charAt(0).toUpperCase() + priority.slice(1)}
//             </span>
//         );
//     };

//     const filteredTickets = ticketsData?.tickets?.filter(ticket => {
//         const matchesStatus = selectedStatus === 'all' || ticket.status === selectedStatus;
//         const matchesSearch = ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             ticket.ticketId.toLowerCase().includes(searchQuery.toLowerCase());
//         return matchesStatus && matchesSearch;
//     }) || [];

//     if (isLoading) {
//         return (
//             <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//                 <div className="text-center">
//                     <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#ea580c] border-t-transparent mx-auto mb-4"></div>
//                     <p className="text-gray-600 text-sm sm:text-base">Loading support tickets...</p>
//                 </div>
//             </div>
//         );
//     }

//     if (isError) {
//         return (
//             <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//                 <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 max-w-md w-full text-center">
//                     <AlertCircle className="text-red-500 h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-4" />
//                     <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Error Loading Tickets</h2>
//                     <p className="text-sm sm:text-base text-gray-600 mb-4">
//                         {error?.data?.message || "Failed to load support tickets. Please try again."}
//                     </p>
//                     <button
//                         onClick={() => refetch()}
//                         className="bg-[#ea580c] hover:bg-[#c2410c] text-white px-6 py-2 rounded-lg transition-colors w-full sm:w-auto"
//                     >
//                         Retry
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6 lg:p-8">
//             <div className="max-w-7xl mx-auto">
//                 {/* Header */}
//                 <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
//                     <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
//                         <div className="w-full sm:w-auto">
//                             <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
//                                 {/* <MessageCircle className="text-[#ea580c] w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" /> */}
//                                 Help & Support
//                             </h1>
//                             <p className="text-gray-500 mt-1 text-xs sm:text-sm md:text-base">
//                                 Raise queries and track your support requests
//                             </p>
//                         </div>
//                         <button
//                             onClick={() => setIsModalOpen(true)}
//                             className="w-full sm:w-auto bg-[#ea580c] hover:bg-[#c2410c] text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-md text-sm"
//                         >
//                             <Plus className="w-4 h-4" />
//                             <span className="hidden xs:inline">Raise a Query</span>
//                             <span className="xs:hidden">New Query</span>
//                         </button>
//                     </div>
//                 </div>

//                 {/* Search and Filter */}
//                 <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 md:p-6 mb-4 sm:mb-6">
//                     <div className="flex flex-col sm:flex-row gap-3">
//                         <div className="flex-1 relative">
//                             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                             <input
//                                 type="text"
//                                 placeholder="Search tickets..."
//                                 value={searchQuery}
//                                 onChange={(e) => setSearchQuery(e.target.value)}
//                                 className="w-full pl-9 pr-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent outline-none text-sm"
//                             />
//                         </div>
//                         <div className="flex items-center gap-2">
//                             <Filter className="text-gray-400 w-4 h-4" />
//                             <select
//                                 value={selectedStatus}
//                                 onChange={(e) => setSelectedStatus(e.target.value)}
//                                 className="flex-1 sm:flex-none px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent outline-none bg-white text-sm"
//                             >
//                                 <option value="all">All Status</option>
//                                 <option value="pending">Pending</option>
//                                 <option value="in_progress">In Progress</option>
//                                 <option value="resolved">Resolved</option>
//                                 <option value="closed">Closed</option>
//                             </select>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Desktop Table View */}
//                 <div className="hidden lg:block bg-white rounded-lg shadow-sm overflow-hidden">
//                     <div className="overflow-x-auto">
//                         <table className="w-full">
//                             <thead className="bg-gray-50 border-b border-gray-200">
//                                 <tr>
//                                     <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Ticket ID</th>
//                                     <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Subject</th>
//                                     <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Category</th>
//                                     <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Priority</th>
//                                     <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
//                                     <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Created</th>
//                                     <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Response</th>
//                                     <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Action</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="divide-y divide-gray-200">
//                                 {filteredTickets.length === 0 ? (
//                                     <tr>
//                                         <td colSpan="8" className="px-6 py-12 text-center">
//                                             <MessageCircle className="mx-auto text-gray-300 mb-4 w-12 h-12" />
//                                             <p className="text-gray-500 font-medium">No support tickets found</p>
//                                             <p className="text-gray-400 text-sm mt-1">
//                                                 {searchQuery || selectedStatus !== 'all' ? 'Try adjusting your filters' : 'Create your first support ticket to get started'}
//                                             </p>
//                                         </td>
//                                     </tr>
//                                 ) : (
//                                     filteredTickets.map((ticket) => (
//                                         <tr key={ticket.ticketId} className="hover:bg-gray-50 transition-colors">
//                                             <td className="px-4 py-3 whitespace-nowrap">
//                                                 <span className="text-sm font-medium text-[#ea580c]">{ticket.ticketId}</span>
//                                             </td>
//                                             <td className="px-4 py-3">
//                                                 <p className="text-sm font-medium text-gray-900 line-clamp-2 max-w-xs">{ticket.subject}</p>
//                                             </td>
//                                             <td className="px-4 py-3 whitespace-nowrap">
//                                                 <span className="text-sm text-gray-600">{ticket.category}</span>
//                                             </td>
//                                             <td className="px-4 py-3 whitespace-nowrap">
//                                                 {getPriorityBadge(ticket.priority)}
//                                             </td>
//                                             <td className="px-4 py-3 whitespace-nowrap">
//                                                 {getStatusBadge(ticket.status)}
//                                             </td>
//                                             <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
//                                                 {new Date(ticket.createdAt).toLocaleDateString()}
//                                             </td>
//                                             <td className="px-4 py-3">
//                                                 {ticket.response ? (
//                                                     <div className="max-w-xs">
//                                                         <p className="text-sm text-gray-900 line-clamp-2">{ticket.response}</p>
//                                                         {ticket.respondedAt && (
//                                                             <p className="text-xs text-gray-500 mt-1">{new Date(ticket.respondedAt).toLocaleDateString()}</p>
//                                                         )}
//                                                     </div>
//                                                 ) : (
//                                                     <span className="text-sm text-gray-400 italic">No response yet</span>
//                                                 )}
//                                             </td>
//                                             <td className="px-4 py-3 whitespace-nowrap">
//                                                 {ticket.response && ticket.status !== 'resolved' && ticket.status !== 'closed' ? (
//                                                     <button
//                                                         onClick={() => openFeedbackModal(ticket)}
//                                                         className="text-sm bg-[#ea580c] hover:bg-[#c2410c] text-white px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
//                                                     >
//                                                         <MessageSquare className="w-3 h-3" />
//                                                         Feedback
//                                                     </button>
//                                                 ) : ticket.userRemarks || ticket.status === 'resolved' || ticket.status === 'closed' ? (
//                                                     <span className="text-xs text-green-600 font-medium">Completed</span>
//                                                 ) : (
//                                                     <span className="text-xs text-gray-400 italic">Pending</span>
//                                                 )}
//                                             </td>
//                                         </tr>
//                                     ))
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>

//                 {/* Mobile/Tablet Card View */}
//                 <div className="lg:hidden space-y-3 sm:space-y-4">
//                     {filteredTickets.length === 0 ? (
//                         <div className="bg-white rounded-lg shadow-sm p-8 text-center">
//                             <MessageCircle className="mx-auto text-gray-300 mb-4 w-12 h-12" />
//                             <p className="text-gray-500 font-medium">No support tickets found</p>
//                             <p className="text-gray-400 text-sm mt-1">
//                                 {searchQuery || selectedStatus !== 'all' ? 'Try adjusting your filters' : 'Create your first support ticket'}
//                             </p>
//                         </div>
//                     ) : (
//                         filteredTickets.map((ticket) => (
//                             <div key={ticket.ticketId} className="bg-white rounded-lg shadow-sm p-4 space-y-3">
//                                 {/* Ticket Header */}
//                                 <div className="flex items-start justify-between gap-2">
//                                     <div className="flex-1 min-w-0">
//                                         <p className="text-xs font-medium text-[#ea580c] mb-1">{ticket.ticketId}</p>
//                                         <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">{ticket.subject}</h3>
//                                     </div>
//                                     {getStatusBadge(ticket.status)}
//                                 </div>

//                                 {/* Ticket Details Grid */}
//                                 <div className="grid grid-cols-2 gap-3 text-xs">
//                                     <div>
//                                         <p className="text-gray-500 mb-1">Category</p>
//                                         <p className="text-gray-900 font-medium">{ticket.category}</p>
//                                     </div>
//                                     <div>
//                                         <p className="text-gray-500 mb-1">Priority</p>
//                                         {getPriorityBadge(ticket.priority)}
//                                     </div>
//                                     <div>
//                                         <p className="text-gray-500 mb-1">Created</p>
//                                         <p className="text-gray-900 font-medium">{new Date(ticket.createdAt).toLocaleDateString()}</p>
//                                     </div>
//                                     <div>
//                                         <p className="text-gray-500 mb-1">Status</p>
//                                         <p className="text-gray-900 font-medium capitalize">{ticket.status.replace('_', ' ')}</p>
//                                     </div>
//                                 </div>

//                                 {/* Response Section */}
//                                 {ticket.response && (
//                                     <div className="pt-3 border-t border-gray-100">
//                                         <p className="text-xs text-gray-500 mb-1">Response</p>
//                                         <p className="text-sm text-gray-900 line-clamp-3">{ticket.response}</p>
//                                         {ticket.respondedAt && (
//                                             <p className="text-xs text-gray-500 mt-1">Responded: {new Date(ticket.respondedAt).toLocaleDateString()}</p>
//                                         )}
//                                     </div>
//                                 )}

//                                 {/* Action Button */}
//                                 <div className="pt-3 border-t border-gray-100">
//                                     {ticket.response && ticket.status !== 'resolved' && ticket.status !== 'closed' ? (
//                                         <button
//                                             onClick={() => openFeedbackModal(ticket)}
//                                             className="w-full text-sm bg-[#ea580c] hover:bg-[#c2410c] text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
//                                         >
//                                             <MessageSquare className="w-4 h-4" />
//                                             Provide Feedback
//                                         </button>
//                                     ) : ticket.userRemarks || ticket.status === 'resolved' || ticket.status === 'closed' ? (
//                                         <div className="text-center text-sm text-green-600 font-medium py-2">
//                                             ✓ Completed
//                                         </div>
//                                     ) : (
//                                         <div className="text-center text-sm text-gray-400 italic py-2">
//                                             Awaiting Response
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         ))
//                     )}
//                 </div>
//             </div>

//             {/* Create Ticket Modal */}
//             {isModalOpen && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
//                     <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//                         <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white rounded-t-lg z-10">
//                             <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
//                                 {/* <MessageCircle className="text-[#ea580c] w-5 h-5 sm:w-6 sm:h-6" /> */}
//                                 Raise a Support Query
//                             </h2>
//                             <button onClick={() => setIsModalOpen(false)} disabled={isCreating} className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50 p-1">
//                                 <X className="w-5 h-5 sm:w-6 sm:h-6" />
//                             </button>
//                         </div>
//                         <form onSubmit={handleSubmit} className="p-4 sm:p-6">
//                             <div className="space-y-4">
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                                         Subject <span className="text-red-500">*</span>
//                                     </label>
//                                     <input
//                                         type="text"
//                                         name="subject"
//                                         value={formData.subject}
//                                         onChange={handleInputChange}
//                                         className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent outline-none text-sm"
//                                         placeholder="Brief description of your issue"
//                                         required
//                                     />
//                                 </div>
//                                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                                             Category <span className="text-red-500">*</span>
//                                         </label>
//                                         <select
//                                             name="category"
//                                             value={formData.category}
//                                             onChange={handleInputChange}
//                                             className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent outline-none bg-white text-sm"
//                                             required
//                                         >
//                                             <option value="">Select category</option>
//                                             <option value="Technical Issue">Technical Issue</option>
//                                             <option value="Account Related">Account Related</option>
//                                             <option value="Billing">Billing</option>
//                                             <option value="Mentorship">Mentorship</option>
//                                             <option value="Feature Request">Feature Request</option>
//                                             <option value="Other">Other</option>
//                                         </select>
//                                     </div>
//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                                             Priority <span className="text-red-500">*</span>
//                                         </label>
//                                         <select
//                                             name="priority"
//                                             value={formData.priority}
//                                             onChange={handleInputChange}
//                                             className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent outline-none bg-white text-sm"
//                                             required
//                                         >
//                                             <option value="">Select priority</option>
//                                             <option value="low">Low</option>
//                                             <option value="medium">Medium</option>
//                                             <option value="high">High</option>
//                                             <option value="urgent">Urgent</option>
//                                         </select>
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                                         Description <span className="text-red-500">*</span>
//                                     </label>
//                                     <textarea
//                                         name="description"
//                                         value={formData.description}
//                                         onChange={handleInputChange}
//                                         rows={5}
//                                         className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent resize-none outline-none text-sm"
//                                         placeholder="Please provide detailed information about your issue or query..."
//                                         required
//                                     />
//                                     <p className="text-xs text-gray-500 mt-2">Provide as much detail as possible to help us resolve your issue quickly.</p>
//                                 </div>
//                             </div>
//                             <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
//                                 <button
//                                     type="button"
//                                     onClick={() => setIsModalOpen(false)}
//                                     disabled={isCreating}
//                                     className="w-full sm:w-auto px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 text-sm"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     type="submit"
//                                     disabled={isCreating}
//                                     className="w-full sm:w-auto px-4 py-2.5 bg-[#ea580c] text-white rounded-lg hover:bg-[#c2410c] transition-colors disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
//                                 >
//                                     {isCreating ? (
//                                         <>
//                                             <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
//                                             Submitting...
//                                         </>
//                                     ) : (
//                                         <>
//                                             <Plus className="w-4 h-4" />
//                                             Submit Query
//                                         </>
//                                     )}
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}

//             {/* Feedback Modal */}
//             {feedbackModal.isOpen && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
//                     <div className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
//                         <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white rounded-t-lg">
//                             <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
//                                 <MessageSquare className="text-[#ea580c] w-5 h-5 sm:w-6 sm:h-6" />
//                                 Provide Feedback
//                             </h2>
//                             <button onClick={closeFeedbackModal} disabled={isUpdating} className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50 p-1">
//                                 <X className="w-5 h-5" />
//                             </button>
//                         </div>
//                         <form onSubmit={handleFeedbackSubmit} className="p-4 sm:p-6">
//                             <div className="mb-4 bg-gray-50 p-3 rounded-lg">
//                                 <p className="text-sm text-gray-600 mb-1">
//                                     Ticket: <span className="font-medium text-[#ea580c]">{feedbackModal.ticket?.ticketId}</span>
//                                 </p>
//                                 <p className="text-sm text-gray-600">
//                                     Subject: <span className="font-medium">{feedbackModal.ticket?.subject}</span>
//                                 </p>
//                             </div>
//                             <div className="space-y-4">
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-3">
//                                         Was your issue resolved? <span className="text-red-500">*</span>
//                                     </label>
//                                     <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
//                                         <button
//                                             type="button"
//                                             onClick={() => setFeedbackForm(prev => ({ ...prev, status: 'resolved' }))}
//                                             className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${feedbackForm.status === 'resolved'
//                                                 ? 'border-green-500 bg-green-50 text-green-700'
//                                                 : 'border-gray-300 hover:border-green-300 text-gray-700'
//                                                 }`}
//                                         >
//                                             <ThumbsUp className="w-5 h-5" />
//                                             <span className="font-medium">Solved</span>
//                                         </button>
//                                         <button
//                                             type="button"
//                                             onClick={() => setFeedbackForm(prev => ({ ...prev, status: 'in_progress' }))}
//                                             className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${feedbackForm.status === 'in_progress'
//                                                 ? 'border-red-500 bg-red-50 text-red-700'
//                                                 : 'border-gray-300 hover:border-red-300 text-gray-700'
//                                                 }`}
//                                         >
//                                             <ThumbsDown className="w-5 h-5" />
//                                             <span className="font-medium">Not Solved</span>
//                                         </button>
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                                         Additional Remarks (Optional)
//                                     </label>
//                                     <textarea
//                                         value={feedbackForm.remarks}
//                                         onChange={(e) => setFeedbackForm(prev => ({ ...prev, remarks: e.target.value }))}
//                                         rows={4}
//                                         className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent resize-none outline-none text-sm"
//                                         placeholder="Share any additional feedback or comments..."
//                                     />
//                                 </div>
//                             </div>
//                             <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
//                                 <button
//                                     type="button"
//                                     onClick={closeFeedbackModal}
//                                     disabled={isUpdating}
//                                     className="w-full sm:w-auto px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 text-sm"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     type="submit"
//                                     disabled={isUpdating || !feedbackForm.status}
//                                     className="w-full sm:w-auto px-4 py-2.5 bg-[#ea580c] text-white rounded-lg hover:bg-[#c2410c] transition-colors disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
//                                 >
//                                     {isUpdating ? (
//                                         <>
//                                             <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
//                                             Submitting...
//                                         </>
//                                     ) : (
//                                         'Submit Feedback'
//                                     )}
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default HelpSupport;




import React, { useState } from 'react';
import { MessageCircle, Plus, X, Clock, CheckCircle, AlertCircle, Search, Filter, ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';
import { useGetSupportTicketsQuery, useCreateSupportTicketMutation, useUpdateSupportTicketMutation } from "./Helpsupportapislice"

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

    console.log('full user object:', user);
    console.log('userName resolved to:', userName);

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

            console.log('payload being sent:', payload);

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

    // ── Badge Helpers ────────────────────────────────────────────────────────
    const getStatusBadge = (status) => {
        const statusConfig = {
            pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, label: 'Pending' },
            in_progress: { color: 'bg-blue-100 text-blue-800', icon: Clock, label: 'In Progress' },
            resolved: { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Resolved' },
            closed: { color: 'bg-gray-100 text-gray-800', icon: CheckCircle, label: 'Closed' },
        };

        const config = statusConfig[status] || statusConfig.pending;
        const IconComponent = config.icon;

        return (
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
                <IconComponent className="w-3 h-3" />
                <span className="hidden sm:inline">{config.label}</span>
                <span className="sm:hidden">{config.label.substring(0, 3)}</span>
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

    // ── Render ───────────────────────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
                        <div className="w-full sm:w-auto">
                            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                                Help & Support
                            </h1>
                            <p className="text-gray-500 mt-1 text-xs sm:text-sm md:text-base">
                                Raise queries and track your support requests
                            </p>
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="w-full sm:w-auto bg-[#ea580c] hover:bg-[#c2410c] text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-md text-sm"
                        >
                            <Plus className="w-4 h-4" />
                            Raise a Query
                        </button>
                    </div>
                </div>

                {/* Search and Filter */}
                <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 md:p-6 mb-4 sm:mb-6">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search tickets..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent outline-none text-sm"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Filter className="text-gray-400 w-4 h-4" />
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="flex-1 sm:flex-none px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent outline-none bg-white text-sm"
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

                {/* Desktop Table View */}
                <div className="hidden lg:block bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Ticket ID</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Subject</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Category</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Priority</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Created</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Response</th>
                                    {/* <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Action</th> */}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredTickets.length === 0 ? (
                                    <tr>
                                        <td colSpan="8" className="px-6 py-12 text-center">
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
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                <span className="text-sm font-medium text-[#ea580c]">{ticket.ticketId}</span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <p className="text-sm font-medium text-gray-900 line-clamp-2 max-w-xs">{ticket.subject}</p>
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                <span className="text-sm text-gray-600">{ticket.category}</span>
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                {getPriorityBadge(ticket.priority)}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                {getStatusBadge(ticket.status)}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                                                {new Date(ticket.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-4 py-3">
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
                                                {/* <td className="px-4 py-3 whitespace-nowrap">
                                                    {ticket.response && ticket.status !== 'resolved' && ticket.status !== 'closed' ? (
                                                        <button
                                                            onClick={() => openFeedbackModal(ticket)}
                                                            className="text-sm bg-[#ea580c] hover:bg-[#c2410c] text-white px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                                                        >
                                                            <MessageSquare className="w-3 h-3" />
                                                            Feedback
                                                        </button>
                                                    ) : ticket.userRemarks || ticket.status === 'resolved' || ticket.status === 'closed' ? (
                                                        <span className="text-xs text-green-600 font-medium">Completed</span>
                                                    ) : (
                                                        <span className="text-xs text-gray-400 italic">Pending</span>
                                                    )}
                                                </td> */}
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Mobile/Tablet Card View */}
                <div className="lg:hidden space-y-3 sm:space-y-4">
                    {filteredTickets.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                            <MessageCircle className="mx-auto text-gray-300 mb-4 w-12 h-12" />
                            <p className="text-gray-500 font-medium">No support tickets found</p>
                            <p className="text-gray-400 text-sm mt-1">
                                {searchQuery || selectedStatus !== 'all'
                                    ? 'Try adjusting your filters'
                                    : 'Create your first support ticket'}
                            </p>
                        </div>
                    ) : (
                        filteredTickets.map((ticket) => (
                            <div key={ticket.ticketId} className="bg-white rounded-lg shadow-sm p-4 space-y-3">
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-medium text-[#ea580c] mb-1">{ticket.ticketId}</p>
                                        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">{ticket.subject}</h3>
                                    </div>
                                    {getStatusBadge(ticket.status)}
                                </div>

                                <div className="grid grid-cols-2 gap-3 text-xs">
                                    <div>
                                        <p className="text-gray-500 mb-1">Category</p>
                                        <p className="text-gray-900 font-medium">{ticket.category}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 mb-1">Priority</p>
                                        {getPriorityBadge(ticket.priority)}
                                    </div>
                                    <div>
                                        <p className="text-gray-500 mb-1">Created</p>
                                        <p className="text-gray-900 font-medium">{new Date(ticket.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 mb-1">Status</p>
                                        <p className="text-gray-900 font-medium capitalize">{ticket.status.replace('_', ' ')}</p>
                                    </div>
                                </div>

                                {ticket.response && (
                                    <div className="pt-3 border-t border-gray-100">
                                        <p className="text-xs text-gray-500 mb-1">Response</p>
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
                                            className="w-full text-sm bg-[#ea580c] hover:bg-[#c2410c] text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                                        >
                                            <MessageSquare className="w-4 h-4" />
                                            Provide Feedback
                                        </button>
                                    ) : ticket.userRemarks || ticket.status === 'resolved' || ticket.status === 'closed' ? (
                                        <div className="text-center text-sm text-green-600 font-medium py-2">✓ Completed</div>
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
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white rounded-t-lg z-10">
                            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
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
                        <form onSubmit={handleSubmit} className="p-4 sm:p-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Subject <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent outline-none text-sm"
                                        placeholder="Brief description of your issue"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Category <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent outline-none bg-white text-sm"
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
                                            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent outline-none bg-white text-sm"
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
                                        rows={5}
                                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent resize-none outline-none text-sm"
                                        placeholder="Please provide detailed information about your issue or query..."
                                        required
                                    />
                                    <p className="text-xs text-gray-500 mt-2">
                                        Provide as much detail as possible to help us resolve your issue quickly.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    disabled={isCreating}
                                    className="w-full sm:w-auto px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 text-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isCreating}
                                    className="w-full sm:w-auto px-4 py-2.5 bg-[#ea580c] text-white rounded-lg hover:bg-[#c2410c] transition-colors disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
                                >
                                    {isCreating ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                            Submitting...
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
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white rounded-t-lg">
                            <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                                <MessageSquare className="text-[#ea580c] w-5 h-5 sm:w-6 sm:h-6" />
                                Provide Feedback
                            </h2>
                            <button
                                onClick={closeFeedbackModal}
                                disabled={isUpdating}
                                className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50 p-1"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleFeedbackSubmit} className="p-4 sm:p-6">
                            <div className="mb-4 bg-gray-50 p-3 rounded-lg">
                                <p className="text-sm text-gray-600 mb-1">
                                    Ticket: <span className="font-medium text-[#ea580c]">{feedbackModal.ticket?.ticketId}</span>
                                </p>
                                <p className="text-sm text-gray-600">
                                    Subject: <span className="font-medium">{feedbackModal.ticket?.subject}</span>
                                </p>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Was your issue resolved? <span className="text-red-500">*</span>
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setFeedbackForm(prev => ({ ...prev, status: 'resolved' }))}
                                            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                                                feedbackForm.status === 'resolved'
                                                    ? 'border-green-500 bg-green-50 text-green-700'
                                                    : 'border-gray-300 hover:border-green-300 text-gray-700'
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
                                                    ? 'border-red-500 bg-red-50 text-red-700'
                                                    : 'border-gray-300 hover:border-red-300 text-gray-700'
                                            }`}
                                        >
                                            <ThumbsDown className="w-5 h-5" />
                                            <span className="font-medium">Not Solved</span>
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Additional Remarks (Optional)
                                    </label>
                                    <textarea
                                        value={feedbackForm.remarks}
                                        onChange={(e) => setFeedbackForm(prev => ({ ...prev, remarks: e.target.value }))}
                                        rows={4}
                                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent resize-none outline-none text-sm"
                                        placeholder="Share any additional feedback or comments..."
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={closeFeedbackModal}
                                    disabled={isUpdating}
                                    className="w-full sm:w-auto px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 text-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isUpdating || !feedbackForm.status}
                                    className="w-full sm:w-auto px-4 py-2.5 bg-[#ea580c] text-white rounded-lg hover:bg-[#c2410c] transition-colors disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
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

export default HelpSupport;