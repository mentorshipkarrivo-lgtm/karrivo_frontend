import { useState, useRef, useEffect, useCallback } from "react";
import {
    useFetchInboxQuery,
    useFetchMessagesQuery,
    useSendMessageMutation,
    useFetchUnreadCountQuery,
} from "../../../pages/LongTermMentorship/messages/mymessagesapislice";
import { useSSE } from "../../../pages/LongTermMentorship/messages/Usesse";

const AVATAR_PALETTE = [
    { bg: "#e0f4ff", text: "#0098cc" },
    { bg: "#d0efe8", text: "#007a5e" },
    { bg: "#fde8d8", text: "#c45a00" },
    { bg: "#e8e0fd", text: "#5c00cc" },
    { bg: "#fde8f0", text: "#cc0055" },
    { bg: "#e0fde8", text: "#007a2e" },
    { bg: "#fdf8d0", text: "#8a7200" },
];

function getInitials(name = "") {
    return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
}
function getPalette(name = "") {
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return AVATAR_PALETTE[Math.abs(hash) % AVATAR_PALETTE.length];
}

function Avatar({ name = "", size = 38, showOnline = false }) {
    const c = getPalette(name);
    return (
        <div style={{ position: "relative", flexShrink: 0 }}>
            <div style={{
                width: size, height: size, borderRadius: "50%",
                background: c.bg, color: c.text,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: size * 0.34, fontWeight: 700,
                border: `2px solid ${c.text}22`,
            }}>
                {getInitials(name)}
            </div>
            {showOnline && (
                <div style={{
                    position: "absolute", bottom: 1, right: 1,
                    width: size * 0.26, height: size * 0.26, borderRadius: "50%",
                    background: "#37474f", border: "2px solid #031610",
                }} />
            )}
        </div>
    );
}

function formatTime(dateStr) {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    const diffDays = Math.floor((Date.now() - d) / 86400000);
    if (diffDays === 0) return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return d.toLocaleDateString([], { weekday: "long" });
    return d.toLocaleDateString([], { day: "numeric", month: "short" });
}

function MessageBubble({ msg, showMeta, currentUserId, peerName }) {
    const isOwn = (msg.senderId?._id || msg.senderId) === currentUserId;
    const senderName = isOwn ? "You" : peerName || "Mentee";
    return (
        <div style={{
            display: "flex", flexDirection: isOwn ? "row-reverse" : "row",
            alignItems: "flex-end", gap: 10, marginBottom: 4,
            animation: "fadeUp 0.22s ease both",
        }}>
            {!isOwn && (
                <div style={{ width: 36, flexShrink: 0 }}>
                    {showMeta && <Avatar name={senderName} size={36} />}
                </div>
            )}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: isOwn ? "flex-end" : "flex-start", minWidth: 0 }}>
                {showMeta && !isOwn && (
                    <span style={{ fontSize: 10.5, fontWeight: 600, color: "#0098cc", marginBottom: 3, paddingLeft: 2 }}>
                        {senderName}
                    </span>
                )}
                <div style={{
                    background: isOwn
                        ? "linear-gradient(135deg, #0098cc, #006fa3)"
                        : msg.isAutomatic ? "linear-gradient(135deg,#e6fdf0,#c8f5e0)" : "#ffffff",
                    color: isOwn ? "#fff" : "#031610",
                    borderRadius: isOwn ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                    padding: "11px 16px", fontSize: 14, lineHeight: 1.6,
                    boxShadow: isOwn ? "0 2px 16px rgba(0,152,204,0.30)" : "0 1px 8px rgba(3,22,16,0.10)",
                    wordBreak: "break-word", maxWidth: "72%",
                    border: msg.isAutomatic && !isOwn ? "1px solid #a7f3d0" : isOwn ? "none" : "1px solid #e8f4ff",
                }}>
                    {msg.isAutomatic && !isOwn && (
                        <div style={{ fontSize: 10, color: "#0098cc", fontWeight: 700, marginBottom: 4,  letterSpacing: "0.05em" }}>
                            ✦ Auto Message
                        </div>
                    )}
                    {msg.text}
                </div>
                <span style={{ fontSize: 10, color: "#4a8070", marginTop: 4, paddingLeft: 2, paddingRight: 2 }}>
                    {formatTime(msg.createdAt)}
                </span>
            </div>
        </div>
    );
}

function Skeleton({ width = "100%", height = 14, radius = 8 }) {
    return (
        <div style={{
            width, height, borderRadius: radius, flexShrink: 0,
            background: "linear-gradient(90deg,#0a2820 25%,#0d3028 50%,#0a2820 75%)",
            backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite",
        }} />
    );
}

const TABS = ["Unread", "All Messages"];

export default function MentorMessages() {
    const storedUser = JSON.parse(localStorage.getItem("userData") || "{}");
    const userId = storedUser?._id || storedUser?.id || null;
    const userRole = "mentor";

    const [activeSessionId, setActiveSessionId] = useState(null);
    const [sideTab, setSideTab] = useState("All Messages");
    const [input, setInput] = useState("");
    const [optimisticMsgs, setOptimisticMsgs] = useState([]);
    const bottomRef = useRef(null);
    const inputRef = useRef(null);

    const { data: inboxRes, isLoading: inboxLoading, refetch: refetchInbox } =
        useFetchInboxQuery(userId, { skip: !userId, refetchOnMountOrArgChange: true, pollingInterval: 5000 });

    const { data: messagesRes, isLoading: messagesLoading, refetch: refetchMessages } =
        useFetchMessagesQuery(
            { sessionId: activeSessionId, userId },
            { skip: !activeSessionId || !userId, refetchOnMountOrArgChange: true, pollingInterval: 5000 }
        );

    const { data: unreadRes, refetch: refetchUnread } =
        useFetchUnreadCountQuery(userId, { skip: !userId, refetchOnMountOrArgChange: true, pollingInterval: 10000 });

    const [sendMessage, { isLoading: sending }] = useSendMessageMutation();

    // ── KEY DIFFERENCE: filter inbox to only sessions where THIS user is the mentor ──
    const allInbox = inboxRes?.data || [];
    const inbox = allInbox.filter(
        (s) => s.mentor?._id?.toString() === userId || s.mentor?.toString() === userId
    );

    const fetchedMessages = messagesRes?.data || [];
    const unreadCount = unreadRes?.unreadCount || 0;

    const messages = [
        ...fetchedMessages,
        ...optimisticMsgs.filter((om) => !fetchedMessages.some((fm) => fm._id === om._id)),
    ];

    const activeSession = inbox.find((s) => s.sessionId === activeSessionId);

    const handleSSEMessage = useCallback(() => {
        refetchMessages(); refetchInbox(); refetchUnread();
    }, [refetchMessages, refetchInbox, refetchUnread]);

    useSSE(activeSessionId, handleSSEMessage);

    useEffect(() => { if (fetchedMessages.length > 0) setOptimisticMsgs([]); }, [fetchedMessages.length]);
    useEffect(() => { if (inbox.length > 0 && !activeSessionId) setActiveSessionId(inbox[0].sessionId); }, [inbox.length]);
    useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages.length]);

    const handleSend = async () => {
        const text = input.trim();
        if (!text || !activeSessionId || sending) return;
        setInput(""); inputRef.current?.focus();
        const tempMsg = {
            _id: `temp-${Date.now()}`, sessionId: activeSessionId,
            senderId: userId, senderRole: userRole,
            text, isAutomatic: false, isRead: false, createdAt: new Date().toISOString(),
        };
        setOptimisticMsgs((prev) => [...prev, tempMsg]);
        try {
            await sendMessage({ sessionId: activeSessionId, senderId: userId, senderRole: userRole, text });
            refetchMessages(); refetchInbox();
        } catch {
            setOptimisticMsgs((prev) => prev.filter((m) => m._id !== tempMsg._id));
        }
    };

    const grouped = messages.map((msg, i) => {
        const curr = msg.senderId?._id || msg.senderId;
        const prev = i > 0 ? (messages[i - 1].senderId?._id || messages[i - 1].senderId) : null;
        return { ...msg, showMeta: i === 0 || curr !== prev };
    });

    // For mentor, peer is always the mentee
    const getPeerName = (session) => {
        if (!session) return "";
        return session.mentee?.username || session.mentee?.fullName || session.mentee?.email || "Mentee";
    };

    const displayInbox = sideTab === "Unread" ? inbox.filter((s) => s.unreadCount > 0) : inbox;

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { height: 100%; font-family: 'Inter', sans-serif; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-track{background:#031610}
        ::-webkit-scrollbar-thumb{background:#0d4030;border-radius:99px}
        ::-webkit-scrollbar-thumb:hover{background:#0098cc}
        .mi-row:hover{background:#0a2820 !important}
      `}</style>

            <div style={{ display: "flex", height: "100%", overflow: "hidden", background: "#031610", fontFamily: "'Inter', sans-serif" }}>

                {/* ── SIDEBAR ── */}
                <div style={{ width: 300, flexShrink: 0, display: "flex", flexDirection: "column", background: "#041f16", borderRight: "1px solid #0d3828" }}>

                    <div style={{ padding: "18px 16px 12px", borderBottom: "1px solid #0d3828" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                            <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg, #0098cc, #006fa3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>💬</div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 14, fontWeight: 700, color: "#ffffff" }}>My Messages</div>
                                <div style={{ fontSize: 10, color: "#4a8070", fontWeight: 600, letterSpacing: "0.06em" }}>MENTOR PORTAL</div>
                            </div>
                            {unreadCount > 0 && (
                                <div style={{ background: "#0098cc", color: "#fff", fontSize: 10, fontWeight: 700, borderRadius: 99, padding: "2px 8px", animation: "pulse 2s infinite" }}>
                                    {unreadCount} new
                                </div>
                            )}
                        </div>
                        <div style={{ display: "flex", background: "#031610", borderRadius: 10, padding: 3, gap: 2 }}>
                            {TABS.map((tab) => (
                                <button key={tab} onClick={() => setSideTab(tab)} style={{
                                    flex: 1, border: "none", cursor: "pointer", borderRadius: 8,
                                    padding: "7px 4px", fontSize: 11.5, fontWeight: 600, fontFamily: "inherit",
                                    color: sideTab === tab ? "#fff" : "#4a8070",
                                    background: sideTab === tab ? "linear-gradient(135deg, #0098cc, #006fa3)" : "transparent",
                                    transition: "all 0.15s", whiteSpace: "nowrap",
                                }}>
                                    {tab}
                                    {tab === "Unread" && unreadCount > 0 && (
                                        <span style={{ marginLeft: 5, fontSize: 9, fontWeight: 700, borderRadius: 99, padding: "1px 5px", background: sideTab === tab ? "rgba(255,255,255,0.25)" : "#0098cc", color: "#fff" }}>{unreadCount}</span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={{ flex: 1, overflowY: "auto", padding: "6px 0" }}>
                        {inboxLoading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} style={{ display: "flex", gap: 12, padding: "12px 16px", alignItems: "center" }}>
                                    <Skeleton width={42} height={42} radius={50} />
                                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                                        <Skeleton width="60%" height={12} /><Skeleton width="85%" height={10} />
                                    </div>
                                </div>
                            ))
                        ) : displayInbox.length === 0 ? (
                            <div style={{ textAlign: "center", padding: "48px 20px", color: "#4a8070", fontSize: 13 }}>
                                <div style={{ fontSize: 32, marginBottom: 12 }}>{sideTab === "Unread" ? "✓" : "📭"}</div>
                                {sideTab === "Unread" ? "All caught up!" : "No mentee sessions yet"}
                            </div>
                        ) : (
                            displayInbox.map((conv) => {
                                const isActive = conv.sessionId === activeSessionId;
                                const peerName = getPeerName(conv);
                                return (
                                    <div key={conv.sessionId} className="mi-row"
                                        onClick={() => { setActiveSessionId(conv.sessionId); setOptimisticMsgs([]); }}
                                        style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 16px", cursor: "pointer", background: isActive ? "#0a2820" : "transparent", borderLeft: isActive ? "3px solid #0098cc" : "3px solid transparent", transition: "all 0.12s" }}
                                    >
                                        <Avatar name={peerName} size={42} showOnline />
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 3 }}>
                                                <span style={{ fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontWeight: conv.unreadCount > 0 ? 700 : 600, color: conv.unreadCount > 0 ? "#ffffff" : "#a0c4b8" }}>{peerName}</span>
                                                <span style={{ fontSize: 10, flexShrink: 0, marginLeft: 6, fontWeight: conv.unreadCount > 0 ? 700 : 400, color: conv.unreadCount > 0 ? "#0098cc" : "#2a5040" }}>{formatTime(conv.lastMessage?.createdAt || conv.sessionDate)}</span>
                                            </div>
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                <span style={{ fontSize: 11.5, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1, fontWeight: conv.unreadCount > 0 ? 600 : 400, color: conv.unreadCount > 0 ? "#0098cc" : "#2a6050" }}>{conv.lastMessage?.text || "No messages yet"}</span>
                                                {conv.unreadCount > 0 && (
                                                    <span style={{ marginLeft: 8, background: "#0098cc", color: "#fff", fontSize: 10, fontWeight: 700, borderRadius: 99, minWidth: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 5px", flexShrink: 0 }}>{conv.unreadCount}</span>
                                                )}
                                            </div>
                                            {conv.topic && (
                                                <div style={{ marginTop: 4 }}>
                                                    <span style={{ fontSize: 9.5, borderRadius: 99, padding: "2px 8px", fontWeight: 600, background: "#0d3028", color: "#0098cc", border: "1px solid #0d4838" }}>{conv.topic}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* ── CHAT PANEL ── */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
                    {!activeSessionId ? (
                        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "#031610" }}>
                            <div style={{ background: "#041f16", borderRadius: 20, padding: "48px 56px", border: "1px solid #0d3828", textAlign: "center" }}>
                                <div style={{ fontSize: 52, marginBottom: 16 }}>💬</div>
                                <div style={{ fontSize: 16, fontWeight: 700, color: "#0098cc", marginBottom: 8 }}>Select a conversation</div>
                                <div style={{ fontSize: 13, color: "#4a8070", maxWidth: 220 }}>Pick a mentee session from the left to start chatting</div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div style={{ padding: "14px 20px", borderBottom: "1px solid #0d3828", display: "flex", alignItems: "center", gap: 14, background: "#041f16", flexShrink: 0 }}>
                                {activeSession ? (
                                    <>
                                        <Avatar name={getPeerName(activeSession)} size={46} showOnline />
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ fontWeight: 700, fontSize: 16, color: "#ffffff" }}>{getPeerName(activeSession)}</div>
                                            <div style={{ fontSize: 11, color: "#4a8070", marginTop: 2, display: "flex", gap: 8, alignItems: "center" }}>
                                                {activeSession.topic && <span style={{ color: "#0098cc", fontWeight: 600 }}>{activeSession.topic}</span>}
                                                {activeSession.topic && <span style={{ color: "#0d3828" }}>•</span>}
                                                <span style={{
                                                    fontSize: 10, fontWeight: 700, borderRadius: 99, padding: "2px 9px",
                                                    background: activeSession.status === "confirmed" ? "rgba(0,152,204,0.15)" : activeSession.status === "pending" ? "rgba(200,160,0,0.12)" : "rgba(255,80,80,0.12)",
                                                    color: activeSession.status === "confirmed" ? "#0098cc" : activeSession.status === "pending" ? "#c8a000" : "#ff5050",
                                                    border: `1px solid ${activeSession.status === "confirmed" ? "#0098cc44" : activeSession.status === "pending" ? "#c8a00044" : "#ff505044"}`,
                                                }}>{activeSession.status?.toUpperCase()}</span>
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 12px", background: "#031610", borderRadius: 99, border: "1px solid #0d3828" }}>
                                            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00e676", animation: "pulse 2s infinite" }} />
                                            <span style={{ fontSize: 10, color: "#4a8070", fontWeight: 600 }}>Live</span>
                                        </div>
                                    </>
                                ) : (
                                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                                        <Skeleton width={46} height={46} radius={50} />
                                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}><Skeleton width={130} height={14} /><Skeleton width={90} height={10} /></div>
                                    </div>
                                )}
                            </div>

                            <div style={{ flex: 1, overflowY: "auto", padding: "20px 28px 8px", display: "flex", flexDirection: "column", gap: 4, background: "#031610" }}>
                                {messagesLoading ? (
                                    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <div key={i} style={{ display: "flex", flexDirection: i % 2 === 0 ? "row" : "row-reverse", gap: 10, alignItems: "flex-end" }}>
                                                <Skeleton width={36} height={36} radius={50} />
                                                <Skeleton width={`${35 + i * 8}%`} height={48} radius={18} />
                                            </div>
                                        ))}
                                    </div>
                                ) : grouped.length === 0 ? (
                                    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
                                        <div style={{ fontSize: 44 }}>👋</div>
                                        <div style={{ fontSize: 15, fontWeight: 600, color: "#0098cc" }}>No messages yet</div>
                                        <div style={{ fontSize: 12, color: "#4a8070", textAlign: "center", maxWidth: 240 }}>Be the first to reach out to your mentee!</div>
                                    </div>
                                ) : (
                                    <>
                                        <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                                            <span style={{ background: "#041f16", color: "#4a8070", fontSize: 10.5, fontWeight: 600, borderRadius: 99, padding: "4px 14px", letterSpacing: "0.06em", border: "1px solid #0d3828" }}>
                                                {new Date(messages[0]?.createdAt).toDateString() === new Date().toDateString() ? "TODAY" : new Date(messages[0]?.createdAt).toLocaleDateString([], { weekday: "long", month: "short", day: "numeric" })}
                                            </span>
                                        </div>
                                        {grouped.map((msg) => (
                                            <MessageBubble key={msg._id} msg={msg} showMeta={msg.showMeta} currentUserId={userId} peerName={getPeerName(activeSession)} />
                                        ))}
                                    </>
                                )}
                                <div ref={bottomRef} />
                            </div>

                            <div style={{ padding: "10px 20px 14px", borderTop: "1px solid #0d3828", display: "flex", alignItems: "center", gap: 8, background: "#041f16", flexShrink: 0 }}>
                                <div style={{ flex: 1, background: "#031610", borderRadius: 16, display: "flex", alignItems: "center", padding: "0 16px", border: "1px solid #0d3828", transition: "border-color 0.15s" }}>
                                    <input
                                        ref={inputRef} value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                                        onFocus={(e) => { e.currentTarget.parentElement.style.borderColor = "#0098cc"; }}
                                        onBlur={(e) => { e.currentTarget.parentElement.style.borderColor = "#0d3828"; }}
                                        placeholder="Message your mentee..."
                                        style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontSize: 14, color: "#ffffff", fontFamily: "inherit", padding: "12px 0" }}
                                    />
                                </div>
                                <button onClick={handleSend} disabled={!input.trim() || sending} style={{
                                    width: 44, height: 44, borderRadius: "50%", border: "none",
                                    background: input.trim() && !sending ? "linear-gradient(135deg, #0098cc, #006fa3)" : "#0a2820",
                                    color: input.trim() && !sending ? "#fff" : "#2a5040",
                                    cursor: input.trim() && !sending ? "pointer" : "default",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    transition: "all 0.2s", flexShrink: 0,
                                    boxShadow: input.trim() && !sending ? "0 2px 16px rgba(0,152,204,0.40)" : "none",
                                }}>
                                    {sending ? (
                                        <div style={{ width: 14, height: 14, border: "2px solid #2a5040", borderTopColor: "#0098cc", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                                    ) : (
                                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="22" y1="2" x2="11" y2="13" />
                                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}