import React, { useState } from 'react';
import { MessageCircle, Plus, X, Clock, CheckCircle, AlertCircle, Search, Filter, ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';
import { useGetSupportTicketsQuery, useCreateSupportTicketMutation, useUpdateSupportTicketMutation } from "./Helpsupportapislice";
import Loader from '../../../../global/Loader';

const HelpSupport = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [feedbackModal, setFeedbackModal] = useState({ isOpen: false, ticket: null });
    const [feedbackForm, setFeedbackForm] = useState({ status: '', remarks: '' });

    const userData = localStorage.getItem("userData");
    const user = userData ? JSON.parse(userData) : null;
    const username = user?.username || null;
    const userName = user?.fullName || user?.name || user?.firstName || user?.username || null;

    const { data: ticketsData, isLoading, isError, error, refetch } = useGetSupportTicketsQuery(username);
    const [createTicket, { isLoading: isCreating }] = useCreateSupportTicketMutation();
    const [updateTicket, { isLoading: isUpdating }] = useUpdateSupportTicketMutation();

    const [formData, setFormData] = useState({
        subject: '', category: '', priority: '', description: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                username, name: userName,
                subject: formData.subject, category: formData.category,
                priority: formData.priority, description: formData.description,
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

    const getStatusBadge = (status) => {
        const statusConfig = {
            pending: { color: '#0091c3', label: 'Pending', icon: Clock },
            in_progress: { color: '#0091c3', label: 'In Progress', icon: Clock },
            resolved: { color: '#16a34a', label: 'Resolved', icon: CheckCircle },
            closed: { color: '#6b7280', label: 'Closed', icon: CheckCircle },
        };
        const config = statusConfig[status] || statusConfig.pending;
        const Icon = config.icon;
        return (
            <span style={{ color: config.color, fontSize: '12px', fontWeight: 600, letterSpacing: '0.2px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Icon size={12} />
                {config.label}
            </span>
        );
    };

    const getPriorityBadge = (priority) => {
        const colorMap = {
            low: '#6b7280',
            medium: '#0091c3',
            high: '#d97706',
            urgent: '#dc2626',
        };
        return (
            <span style={{ color: colorMap[priority] || '#6b7280', fontSize: '12px', fontWeight: 600, letterSpacing: '0.2px' }}>
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </span>
        );
    };

    const filteredTickets = ticketsData?.tickets?.filter(ticket => {
        const matchesStatus = selectedStatus === 'all' || ticket.status === selectedStatus;
        const matchesSearch =
            ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ticket.ticketId.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    }) || [];

    if (isLoading) {
        return (
            <div style={{ minHeight: '100vh', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                <Loader />
            </div>
        );
    }

    if (isError) {
        return (
            <div style={{ minHeight: '100vh', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '2rem', maxWidth: '400px', width: '100%', textAlign: 'center' }}>
                    <AlertCircle size={48} style={{ color: '#1a1a2e', margin: '0 auto 1rem' }} />
                    <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1a1a2e', marginBottom: '8px' }}>Error Loading Tickets</h2>
                    <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '16px' }}>
                        {error?.data?.message || "Failed to load support tickets. Please try again."}
                    </p>
                    <button
                        onClick={() => refetch()}
                        style={{ background: '#1a1a2e', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 24px', fontWeight: 600, fontSize: '14px', cursor: 'pointer', width: '100%' }}
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    const inputStyle = {
        width: '100%',
        padding: '10px 12px',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        fontSize: '13px',
        color: '#1a1a2e',
        background: '#fff',
        outline: 'none',
        boxSizing: 'border-box',
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        transition: 'border-color 0.15s',
    };

    const thStyle = {
        padding: '11px 14px',
        textAlign: 'left',
        fontSize: '11px',
        fontWeight: 700,
        color: '#ffffff',
        letterSpacing: '0.6px',
        whiteSpace: 'nowrap',
        borderBottom: '1px solid #e2e8f0',
        background: '#1a1a2e',
    };

    const tdStyle = {
        padding: '13px 14px',
        fontSize: '13px',
        color: '#1a1a2e',
        verticalAlign: 'middle',
        borderBottom: '1px solid #f1f5f9',
        whiteSpace: 'nowrap',
        background: '#fff',
    };

    const primaryBtnStyle = {
        background: '#1a1a2e',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        padding: '10px 20px',
        fontWeight: 600,
        fontSize: '14px',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        transition: 'opacity 0.15s',
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    };

    const ghostBtnStyle = {
        background: '#fff',
        color: '#1a1a2e',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        padding: '10px 20px',
        fontWeight: 600,
        fontSize: '14px',
        cursor: 'pointer',
        transition: 'background 0.15s',
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    };

    const labelStyle = {
        display: 'block',
        fontSize: '11px',
        fontWeight: 700,
        color: '#475569',
        letterSpacing: '0.6px',
        marginBottom: '6px',
    };

    return (
        <div style={{ minHeight: '80vh', background: '#fff', padding: '24px', fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

                {/* Header */}
                <div style={{ background: '#fff', borderRadius: '10px', border: '1px solid #e2e8f0', padding: '20px 24px', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                        <div>
                            <h1 style={{ fontSize: '18px', fontWeight: 700, color: '#1a1a2e', margin: '0 0 4px' }}>
                                Help &amp; Support
                            </h1>
                            <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0 }}>
                                Raise queries and track your support requests
                            </p>
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            style={{ ...primaryBtnStyle, whiteSpace: 'nowrap' }}
                            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                        >
                            <Plus size={16} />
                            Raise a Query
                        </button>
                    </div>
                </div>

                {/* Search & Filter */}
                <div style={{ background: '#fff', borderRadius: '10px', border: '1px solid #e2e8f0', padding: '14px 18px', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        <div style={{ flex: '1 1 200px', position: 'relative' }}>
                            <Search size={15} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
                            <input
                                type="text"
                                placeholder="Search by subject or ticket ID…"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{ ...inputStyle, paddingLeft: '32px' }}
                                onFocus={e => e.target.style.borderColor = '#1a1a2e'}
                                onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                            />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: '0 1 auto' }}>
                            <Filter size={15} style={{ color: '#94a3b8', flexShrink: 0 }} />
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                style={{ ...inputStyle, width: '150px', cursor: 'pointer' }}
                                onFocus={e => e.target.style.borderColor = '#1a1a2e'}
                                onBlur={e => e.target.style.borderColor = '#e2e8f0'}
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

                {/* Desktop Table */}
                <div className="scroll-hide" style={{ display: 'block', background: '#fff', borderRadius: '10px', border: '1px solid #e2e8f0', overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '820px' }}>
                        <thead style={{ backgroundColor: '#1a1a2e' }}>
                            <tr>
                                {['Ticket ID', 'Subject', 'Category', 'Priority', 'Status', 'Created', 'Response', 'Action'].map(h => (
                                    <th key={h} style={thStyle}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTickets.length === 0 ? (
                                <tr>
                                    <td colSpan="8" style={{ ...tdStyle, textAlign: 'center', padding: '48px', color: '#94a3b8' }}>
                                        <MessageCircle size={40} style={{ color: '#cbd5e1', margin: '0 auto 12px', display: 'block' }} />
                                        <p style={{ fontWeight: 600, color: '#1a1a2e', margin: '0 0 4px' }}>No support tickets found</p>
                                        <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>
                                            {searchQuery || selectedStatus !== 'all'
                                                ? 'Try adjusting your filters'
                                                : 'Create your first support ticket to get started'}
                                        </p>
                                    </td>
                                </tr>
                            ) : (
                                filteredTickets.map((ticket) => (
                                    <tr key={ticket.ticketId} style={{ transition: 'background 0.15s' }}
                                        onMouseEnter={e => { Array.from(e.currentTarget.cells).forEach(c => c.style.background = '#f8fafc'); }}
                                        onMouseLeave={e => { Array.from(e.currentTarget.cells).forEach(c => c.style.background = '#fff'); }}
                                    >
                                        <td style={{ ...tdStyle, fontWeight: 700, color: '#0091c3' }}>{ticket.ticketId}</td>
                                        <td style={{ ...tdStyle, maxWidth: '180px' }}>
                                            <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 600, color: '#1a1a2e' }} title={ticket.subject}>
                                                {ticket.subject}
                                            </span>
                                        </td>
                                        <td style={{ ...tdStyle, color: '#475569' }}>{ticket.category}</td>
                                        <td style={tdStyle}>{getPriorityBadge(ticket.priority)}</td>
                                        <td style={tdStyle}>{getStatusBadge(ticket.status)}</td>
                                        <td style={{ ...tdStyle, color: '#475569' }}>{new Date(ticket.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                                        <td style={{ ...tdStyle, maxWidth: '180px' }}>
                                            {ticket.response ? (
                                                <div>
                                                    <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#1a1a2e' }} title={ticket.response}>
                                                        {ticket.response}
                                                    </span>
                                                    {ticket.respondedAt && (
                                                        <span style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginTop: '2px' }}>
                                                            {new Date(ticket.respondedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                                                        </span>
                                                    )}
                                                </div>
                                            ) : (
                                                <span style={{ fontSize: '13px', color: '#cbd5e1', fontStyle: 'italic' }}>No response yet</span>
                                            )}
                                        </td>
                                        <td style={{ ...tdStyle, textAlign: 'center' }}>
                                            {ticket.response && ticket.status !== 'resolved' && ticket.status !== 'closed' ? (
                                                <button
                                                    onClick={() => openFeedbackModal(ticket)}
                                                    style={{ ...primaryBtnStyle, padding: '5px 14px', fontSize: '12px' }}
                                                    onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                                                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                                                >
                                                    <MessageSquare size={12} />
                                                    Feedback
                                                </button>
                                            ) : ticket.userRemarks || ticket.status === 'resolved' || ticket.status === 'closed' ? (
                                                <span style={{ fontSize: '12px', fontWeight: 600, color: '#16a34a', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                                    <CheckCircle size={12} /> Done
                                                </span>
                                            ) : (
                                                <span style={{ fontSize: '12px', color: '#cbd5e1', fontStyle: 'italic' }}>Awaiting</span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Card View — hidden on large screens via inline media via className */}
                <div className="mobile-cards">
                    {filteredTickets.length === 0 ? (
                        <div style={{ background: '#fff', borderRadius: '10px', border: '1px solid #e2e8f0', padding: '40px', textAlign: 'center' }}>
                            <MessageCircle size={40} style={{ color: '#cbd5e1', margin: '0 auto 12px', display: 'block' }} />
                            <p style={{ fontWeight: 600, color: '#1a1a2e', margin: '0 0 4px' }}>No support tickets found</p>
                            <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>
                                {searchQuery || selectedStatus !== 'all' ? 'Try adjusting your filters' : 'Create your first support ticket'}
                            </p>
                        </div>
                    ) : (
                        filteredTickets.map((ticket) => (
                            <div key={ticket.ticketId} style={{ background: '#fff', borderRadius: '10px', border: '1px solid #e2e8f0', padding: '16px', marginBottom: '12px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '12px' }}>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <p style={{ fontSize: '11px', fontWeight: 700, color: '#0091c3', margin: '0 0 4px', letterSpacing: '0.3px' }}>{ticket.ticketId}</p>
                                        <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#1a1a2e', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ticket.subject}</h3>
                                    </div>
                                    {getStatusBadge(ticket.status)}
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 16px', marginBottom: '12px' }}>
                                    {[
                                        { label: 'Category', value: ticket.category },
                                        { label: 'Priority', value: null, badge: getPriorityBadge(ticket.priority) },
                                        { label: 'Created', value: new Date(ticket.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) },
                                        { label: 'Status', value: ticket.status.replace('_', ' ') },
                                    ].map(({ label, value, badge }) => (
                                        <div key={label}>
                                            <p style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600, margin: '0 0 3px', letterSpacing: '0.4px' }}>{label}</p>
                                            {badge || <p style={{ fontSize: '13px', color: '#1a1a2e', fontWeight: 600, margin: 0, }}>{value}</p>}
                                        </div>
                                    ))}
                                </div>

                                {ticket.response && (
                                    <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '12px', marginBottom: '12px' }}>
                                        <p style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600, margin: '0 0 4px', letterSpacing: '0.4px' }}>Response</p>
                                        <p style={{ fontSize: '13px', color: '#1a1a2e', margin: 0, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{ticket.response}</p>
                                        {ticket.respondedAt && (
                                            <p style={{ fontSize: '11px', color: '#94a3b8', margin: '4px 0 0' }}>
                                                Responded: {new Date(ticket.respondedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                                            </p>
                                        )}
                                    </div>
                                )}

                                <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
                                    {ticket.response && ticket.status !== 'resolved' && ticket.status !== 'closed' ? (
                                        <button
                                            onClick={() => openFeedbackModal(ticket)}
                                            style={{ ...primaryBtnStyle, width: '100%', justifyContent: 'center' }}
                                            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                                            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                                        >
                                            <MessageSquare size={14} />
                                            Provide Feedback
                                        </button>
                                    ) : ticket.userRemarks || ticket.status === 'resolved' || ticket.status === 'closed' ? (
                                        <div style={{ textAlign: 'center', fontSize: '13px', fontWeight: 700, color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '8px 0' }}>
                                            <CheckCircle size={14} /> Completed
                                        </div>
                                    ) : (
                                        <div style={{ textAlign: 'center', fontSize: '13px', color: '#94a3b8', fontStyle: 'italic', padding: '8px 0' }}>Awaiting Response</div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Create Ticket Modal */}
            {isModalOpen && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
                    <div style={{ background: '#fff', borderRadius: '12px', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
                        {/* Modal Header */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid #f1f5f9', position: 'sticky', top: 0, background: '#fff', borderRadius: '12px 12px 0 0', zIndex: 10 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#1a1a2e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <MessageCircle size={16} color="#fff" />
                                </div>
                                <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#1a1a2e', margin: 0 }}>Raise a Support Query</h2>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                disabled={isCreating}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: '6px', borderRadius: '6px', display: 'flex', alignItems: 'center' }}
                                onMouseEnter={e => e.currentTarget.style.background = '#f1f5f9'}
                                onMouseLeave={e => e.currentTarget.style.background = 'none'}
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} style={{ padding: '20px 24px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div>
                                    <label style={labelStyle}>Subject <span style={{ color: '#dc2626' }}>*</span></label>
                                    <input
                                        type="text" name="subject" value={formData.subject}
                                        onChange={handleInputChange} style={inputStyle}
                                        placeholder="Brief description of your issue" required
                                        onFocus={e => e.target.style.borderColor = '#1a1a2e'}
                                        onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                                    />
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                                    <div>
                                        <label style={labelStyle}>Category <span style={{ color: '#dc2626' }}>*</span></label>
                                        <select name="category" value={formData.category} onChange={handleInputChange} style={{ ...inputStyle, cursor: 'pointer' }} required
                                            onFocus={e => e.target.style.borderColor = '#1a1a2e'}
                                            onBlur={e => e.target.style.borderColor = '#e2e8f0'}>
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
                                        <label style={labelStyle}>Priority <span style={{ color: '#dc2626' }}>*</span></label>
                                        <select name="priority" value={formData.priority} onChange={handleInputChange} style={{ ...inputStyle, cursor: 'pointer' }} required
                                            onFocus={e => e.target.style.borderColor = '#1a1a2e'}
                                            onBlur={e => e.target.style.borderColor = '#e2e8f0'}>
                                            <option value="">Select priority</option>
                                            <option value="low">Low</option>
                                            <option value="medium">Medium</option>
                                            <option value="high">High</option>
                                            <option value="urgent">Urgent</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label style={labelStyle}>Description <span style={{ color: '#dc2626' }}>*</span></label>
                                    <textarea
                                        name="description" value={formData.description}
                                        onChange={handleInputChange} rows={5}
                                        style={{ ...inputStyle, resize: 'none' }}
                                        placeholder="Provide detailed information about your issue or query…"
                                        required
                                        onFocus={e => e.target.style.borderColor = '#1a1a2e'}
                                        onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                                    />
                                    <p style={{ fontSize: '12px', color: '#94a3b8', margin: '4px 0 0' }}>
                                        The more detail you provide, the faster we can help you.
                                    </p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: '10px', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
                                <button type="button" onClick={() => setIsModalOpen(false)} disabled={isCreating}
                                    style={{ ...ghostBtnStyle, opacity: isCreating ? 0.5 : 1 }}
                                    onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                                    onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                                >
                                    Cancel
                                </button>
                                <button type="submit" disabled={isCreating}
                                    style={{ ...primaryBtnStyle, opacity: isCreating ? 0.6 : 1 }}
                                    onMouseEnter={e => { if (!isCreating) e.currentTarget.style.opacity = '0.85'; }}
                                    onMouseLeave={e => e.currentTarget.style.opacity = isCreating ? '0.6' : '1'}
                                >
                                    {isCreating ? (
                                        <>
                                            <div style={{ width: '14px', height: '14px', border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                                            Submitting…
                                        </>
                                    ) : (
                                        <>
                                            <Plus size={15} />
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
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
                    <div style={{ background: '#fff', borderRadius: '12px', width: '100%', maxWidth: '480px', maxHeight: '90vh', overflowY: 'auto' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid #f1f5f9', position: 'sticky', top: 0, background: '#fff', borderRadius: '12px 12px 0 0' }}>
                            <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#1a1a2e', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <MessageSquare size={16} style={{ color: '#0091c3' }} />
                                Provide Feedback
                            </h2>
                            <button onClick={closeFeedbackModal} disabled={isUpdating}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: '6px', borderRadius: '6px', display: 'flex', alignItems: 'center' }}
                                onMouseEnter={e => e.currentTarget.style.background = '#f1f5f9'}
                                onMouseLeave={e => e.currentTarget.style.background = 'none'}
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <form onSubmit={handleFeedbackSubmit} style={{ padding: '20px 24px' }}>
                            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px 14px', marginBottom: '20px' }}>
                                <p style={{ fontSize: '12px', color: '#475569', margin: '0 0 2px' }}>
                                    Ticket: <span style={{ fontWeight: 700, color: '#0091c3' }}>{feedbackModal.ticket?.ticketId}</span>
                                </p>
                                <p style={{ fontSize: '12px', color: '#475569', margin: 0 }}>
                                    Subject: <span style={{ fontWeight: 600, color: '#1a1a2e' }}>{feedbackModal.ticket?.subject}</span>
                                </p>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div>
                                    <label style={labelStyle}>Was your issue resolved? <span style={{ color: '#dc2626' }}>*</span></label>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                        <button type="button"
                                            onClick={() => setFeedbackForm(prev => ({ ...prev, status: 'resolved' }))}
                                            style={{
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                                padding: '12px', borderRadius: '8px', fontWeight: 700, fontSize: '13px',
                                                cursor: 'pointer', transition: 'all 0.15s',
                                                border: feedbackForm.status === 'resolved' ? '2px solid #1a1a2e' : '1px solid #e2e8f0',
                                                background: feedbackForm.status === 'resolved' ? '#1a1a2e' : '#fff',
                                                color: feedbackForm.status === 'resolved' ? '#fff' : '#475569',
                                                fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
                                            }}
                                        >
                                            <ThumbsUp size={15} />
                                            Yes, Solved
                                        </button>
                                        <button type="button"
                                            onClick={() => setFeedbackForm(prev => ({ ...prev, status: 'in_progress' }))}
                                            style={{
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                                padding: '12px', borderRadius: '8px', fontWeight: 700, fontSize: '13px',
                                                cursor: 'pointer', transition: 'all 0.15s',
                                                border: feedbackForm.status === 'in_progress' ? '2px solid #dc2626' : '1px solid #e2e8f0',
                                                background: feedbackForm.status === 'in_progress' ? '#fff8f8' : '#fff',
                                                color: feedbackForm.status === 'in_progress' ? '#dc2626' : '#475569',
                                                fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
                                            }}
                                        >
                                            <ThumbsDown size={15} />
                                            Not Solved
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label style={labelStyle}>
                                        Additional Remarks <span style={{ color: '#94a3b8', fontWeight: 400, letterSpacing: 0 }}>(Optional)</span>
                                    </label>
                                    <textarea
                                        value={feedbackForm.remarks}
                                        onChange={(e) => setFeedbackForm(prev => ({ ...prev, remarks: e.target.value }))}
                                        rows={4} style={{ ...inputStyle, resize: 'none' }}
                                        placeholder="Share any additional feedback or comments…"
                                        onFocus={e => e.target.style.borderColor = '#1a1a2e'}
                                        onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: '10px', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
                                <button type="button" onClick={closeFeedbackModal} disabled={isUpdating}
                                    style={{ ...ghostBtnStyle, opacity: isUpdating ? 0.5 : 1 }}
                                    onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                                    onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                                >
                                    Cancel
                                </button>
                                <button type="submit" disabled={isUpdating || !feedbackForm.status}
                                    style={{ ...primaryBtnStyle, opacity: isUpdating || !feedbackForm.status ? 0.5 : 1, cursor: isUpdating || !feedbackForm.status ? 'not-allowed' : 'pointer' }}
                                    onMouseEnter={e => { if (!isUpdating && feedbackForm.status) e.currentTarget.style.opacity = '0.85'; }}
                                    onMouseLeave={e => { e.currentTarget.style.opacity = isUpdating || !feedbackForm.status ? '0.5' : '1'; }}
                                >
                                    {isUpdating ? (
                                        <>
                                            <div style={{ width: '14px', height: '14px', border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                                            Submitting…
                                        </>
                                    ) : 'Submit Feedback'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <style>{`
                .scroll-hide::-webkit-scrollbar { display: none; }
                .scroll-hide { -ms-overflow-style: none; scrollbar-width: none; }
                @keyframes spin { to { transform: rotate(360deg); } }
                table tr:last-child td { border-bottom: none; }

                /* Desktop: show table, hide cards */
                @media (min-width: 1024px) {
                    .mobile-cards { display: none !important; }
                }
                /* Mobile/tablet: hide table, show cards */
                @media (max-width: 1023px) {
                    .scroll-hide { display: none !important; }
                    .mobile-cards { display: block !important; }
                }
            `}</style>
        </div>
    );
};

export default HelpSupport;