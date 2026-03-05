import { useState, useRef, useEffect, useCallback } from "react";
import {
  useFetchInboxQuery,
  useFetchMessagesQuery,
  useSendMessageMutation,
  useFetchUnreadCountQuery,
} from "./mymessagesapislice"; // your slice
import { useSSE } from "./Usesse";

// ─── AVATAR ───────────────────────────────────────────────────────────────────
const PALETTE = [
  { bg: "#e8eaf6", text: "#3949ab" },
  { bg: "#fce4ec", text: "#c62828" },
  { bg: "#e3f2fd", text: "#1565c0" },
  { bg: "#e8f5e9", text: "#2e7d32" },
  { bg: "#fff3e0", text: "#e65100" },
  { bg: "#f3e5f5", text: "#7b1fa2" },
  { bg: "#e0f2f1", text: "#00695c" },
];

function getInitials(name = "") {
  return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
}

function getPalette(name = "") {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return PALETTE[Math.abs(hash) % PALETTE.length];
}

function Avatar({ name = "", size = 38, showOnline = false, online = false }) {
  const c = getPalette(name);
  return (
    <div style={{ position: "relative", flexShrink: 0 }}>
      <div style={{
        width: size, height: size, borderRadius: "50%",
        background: c.bg, color: c.text,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: size * 0.34, fontWeight: 700,
      }}>
        {getInitials(name)}
      </div>
      {showOnline && (
        <div style={{
          position: "absolute", bottom: 1, right: 1,
          width: size * 0.26, height: size * 0.26, borderRadius: "50%",
          background: online ? "#22c55e" : "#d1d5db",
          border: "2px solid #fff",
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
  const senderName = isOwn ? "You" : peerName || "Mentor";
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
          <span style={{ fontSize: 10.5, fontWeight: 600, color: "#8e99b0", marginBottom: 3, paddingLeft: 2 }}>
            {senderName}
          </span>
        )}
        <div style={{
          background: isOwn
            ? "linear-gradient(135deg,#667eea,#5c6bc0)"
            : msg.isAutomatic ? "linear-gradient(135deg,#f0fdf4,#dcfce7)" : "#fff",
          color: isOwn ? "#fff" : "#2d3348",
          borderRadius: isOwn ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
          padding: "11px 16px", fontSize: 14, lineHeight: 1.6,
          boxShadow: isOwn ? "0 2px 14px rgba(92,107,192,0.22)" : "0 1px 6px rgba(0,0,0,0.07)",
          wordBreak: "break-word", maxWidth: "72%",
          border: msg.isAutomatic && !isOwn ? "1px solid #bbf7d0" : "none",
        }}>
          {msg.isAutomatic && !isOwn && (
            <div style={{ fontSize: 10, color: "#2563eb", fontWeight: 700, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              ✦ Auto Message
            </div>
          )}
          {msg.text}
        </div>
        <span style={{ fontSize: 10, color: "#eff6ff", marginTop: 4, paddingLeft: 2, paddingRight: 2 }}>
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
      background: "linear-gradient(90deg,#f0f2f8 25%,#e8eaf6 50%,#f0f2f8 75%)",
      backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite",
    }} />
  );
}

function EmptyState({ icon, title, subtitle }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 12 }}>
      <div style={{ fontSize: 42 }}>{icon}</div>
      <div style={{ fontSize: 15, fontWeight: 600, color: "#6e7aa0" }}>{title}</div>
      {subtitle && <div style={{ fontSize: 12, color: "#b0b8cc", textAlign: "center", maxWidth: 240 }}>{subtitle}</div>}
    </div>
  );
}

const TABS = ["Unread", "All Messages"];

export default function Mymessages() {
  const storedUser = JSON.parse(localStorage.getItem("userData") || "{}");
  const userId = storedUser?._id || storedUser?.id || null;
  const userRole = "mentee";

  const [activeSessionId, setActiveSessionId] = useState(null);
  const [sideTab, setSideTab] = useState("All Messages");
  const [input, setInput] = useState("");
  const [optimisticMsgs, setOptimisticMsgs] = useState([]);
  const bottomRef = useRef(null);

  const {
    data: inboxRes,
    isLoading: inboxLoading,
    refetch: refetchInbox,
  } = useFetchInboxQuery(userId, {
    skip: !userId,
    refetchOnMountOrArgChange: true,
    pollingInterval: 5000,
  });

  const {
    data: messagesRes,
    isLoading: messagesLoading,
    refetch: refetchMessages,
  } = useFetchMessagesQuery(
    { sessionId: activeSessionId, userId },
    {
      skip: !activeSessionId || !userId,
      refetchOnMountOrArgChange: true,
      pollingInterval: 5000,
    }
  );

  const { data: unreadRes, refetch: refetchUnread } = useFetchUnreadCountQuery(userId, {
    skip: !userId,
    refetchOnMountOrArgChange: true,
    pollingInterval: 10000,
  });

  const [sendMessage, { isLoading: sending }] = useSendMessageMutation();

  const inbox = inboxRes?.data || [];
  const fetchedMessages = messagesRes?.data || [];
  const unreadCount = unreadRes?.unreadCount || 0;

  const messages = [
    ...fetchedMessages,
    ...optimisticMsgs.filter((om) => !fetchedMessages.some((fm) => fm._id === om._id)),
  ];

  const activeSession = inbox.find((s) => s.sessionId === activeSessionId);

  const handleSSEMessage = useCallback(() => {
    refetchMessages();
    refetchInbox();
    refetchUnread();
  }, [refetchMessages, refetchInbox, refetchUnread]);

  useSSE(activeSessionId, handleSSEMessage);

  useEffect(() => {
    if (fetchedMessages.length > 0) setOptimisticMsgs([]);
  }, [fetchedMessages.length]);

  useEffect(() => {
    if (inbox.length > 0 && !activeSessionId) {
      setActiveSessionId(inbox[0].sessionId);
    }
  }, [inbox.length]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || !activeSessionId || sending) return;
    setInput("");

    // show instantly (optimistic)
    const tempMsg = {
      _id: `temp-${Date.now()}`,
      sessionId: activeSessionId,
      senderId: userId,
      senderRole: userRole,
      text,
      isAutomatic: false,
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    setOptimisticMsgs((prev) => [...prev, tempMsg]);

    try {
      await sendMessage({
        sessionId: activeSessionId,
        senderId: userId,
        senderRole: userRole,
        text,
      });
      refetchMessages();
      refetchInbox();
    } catch {
      setOptimisticMsgs((prev) => prev.filter((m) => m._id !== tempMsg._id));
    }
  };

  const grouped = messages.map((msg, i) => {
    const curr = msg.senderId?._id || msg.senderId;
    const prev = i > 0 ? (messages[i - 1].senderId?._id || messages[i - 1].senderId) : null;
    return { ...msg, showMeta: i === 0 || curr !== prev };
  });

  const getPeerName = (session) => {
    if (!session) return "";
    const isMentee = session.mentee?._id === userId || session.mentee?.toString() === userId;
    return isMentee
      ? session.mentor?.fullName || session.mentor?.username || "Mentor"
      : session.mentee?.username || session.mentee?.email || "Mentee";
  };

  const displayInbox = sideTab === "Unread" ? inbox.filter((s) => s.unreadCount > 0) : inbox;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { height: 100%; font-family: 'DM Sans', sans-serif; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        @keyframes spin { to{transform:rotate(360deg)} }
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-thumb{background:#dce0ed;border-radius:99px}
      `}</style>

      <div style={{ display: "flex", height: "100%", background: "#f0f2f8", overflow: "hidden" }}>

        <div style={{ width: 300, flexShrink: 0, display: "flex", flexDirection: "column", background: "#fff", borderRight: "1px solid #eef0f7" }}>

          <div style={{ display: "flex", borderBottom: "1px solid #eef0f7", padding: "0 6px" }}>
            {TABS.map((tab) => (
              <button key={tab} onClick={() => setSideTab(tab)} style={{
                flex: 1, border: "none", background: "none", cursor: "pointer",
                padding: "11px 4px", fontSize: 12, fontWeight: 600, fontFamily: "inherit",
                color: sideTab === tab ? "#5c6bc0" : "#9aa3b8",
                borderBottom: sideTab === tab ? "2px solid #5c6bc0" : "2px solid transparent",
                transition: "all 0.15s", whiteSpace: "nowrap",
              }}>
                {tab}
                {tab === "Unread" && unreadCount > 0 && (
                  <span style={{ marginLeft: 5, background: "#5c6bc0", color: "#fff", fontSize: 10, fontWeight: 700, borderRadius: 99, padding: "1px 6px" }}>
                    {unreadCount}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "8px 0" }}>
            {inboxLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} style={{ display: "flex", gap: 12, padding: "10px 16px", alignItems: "center" }}>
                  <Skeleton width={40} height={40} radius={50} />
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                    <Skeleton width="60%" height={12} />
                    <Skeleton width="85%" height={10} />
                  </div>
                </div>
              ))
            ) : displayInbox.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px 20px", color: "#b0b8cc", fontSize: 13 }}>
                {/* <div style={{ fontSize: 28, marginBottom: 10 }}>✓</div> */}
                {sideTab === "Unread" ? "All caught up!" : "No conversations yet"}
              </div>
            ) : (
              displayInbox.map((conv) => {
                const isActive = conv.sessionId === activeSessionId;
                const peerName = getPeerName(conv);
                return (
                  <div
                    key={conv.sessionId}
                    onClick={() => { setActiveSessionId(conv.sessionId); setOptimisticMsgs([]); }}
                    style={{
                      display: "flex", alignItems: "center", gap: 12,
                      padding: "10px 16px", cursor: "pointer",
                      background: isActive ? "#f4f6fb" : "transparent",
                      borderLeft: isActive ? "3px solid #5c6bc0" : "3px solid transparent",
                      transition: "background 0.12s",
                    }}
                    onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = "#f7f9fd"; }}
                    onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
                  >
                    <Avatar name={peerName} size={40} showOnline />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 3 }}>
                        <span style={{ fontSize: 13.5, fontWeight: conv.unreadCount > 0 ? 700 : 600, color: "#2d3348", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {peerName}
                        </span>
                        <span style={{ fontSize: 10.5, color: conv.unreadCount > 0 ? "#5c6bc0" : "#b0b8cc", fontWeight: conv.unreadCount > 0 ? 700 : 400, flexShrink: 0, marginLeft: 6 }}>
                          {formatTime(conv.lastMessage?.createdAt || conv.sessionDate)}
                        </span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 12, color: conv.unreadCount > 0 ? "#5c6bc0" : "#9aa3b8", fontWeight: conv.unreadCount > 0 ? 600 : 400, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>
                          {conv.lastMessage?.text || "No messages yet"}
                        </span>
                        {conv.unreadCount > 0 && (
                          <span style={{ marginLeft: 8, background: "#5c6bc0", color: "#fff", fontSize: 10.5, fontWeight: 700, borderRadius: 99, minWidth: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 5px", flexShrink: 0 }}>
                            {conv.unreadCount}
                          </span>
                        )}
                      </div>
                      {conv.topic && (
                        <div style={{ marginTop: 3 }}>
                          <span style={{ fontSize: 10, background: "#e8eaf6", color: "#5c6bc0", borderRadius: 99, padding: "1px 7px", fontWeight: 600 }}>
                            {conv.topic}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {!activeSessionId ? (
            <EmptyState  title="Select a conversation" />
          ) : (
            <>
              <div style={{ padding: "14px 20px", borderBottom: "1px solid #eef0f7", display: "flex", alignItems: "center", gap: 12, background: "#fff", flexShrink: 0 }}>
                {activeSession ? (
                  <>
                    <Avatar name={getPeerName(activeSession)} size={44} showOnline />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: 16, color: "#2d3348" }}>{getPeerName(activeSession)}</div>
                      <div style={{ fontSize: 11.5, color: "#b0b8cc", marginTop: 1, display: "flex", gap: 8, alignItems: "center" }}>
                        <span>{activeSession.topic}</span>
                        <span style={{
                          background: activeSession.status === "confirmed" ? "#eafcf0" : activeSession.status === "pending" ? "#fef9c3" : "#fee2e2",
                          color: activeSession.status === "confirmed" ? "#2563eb" : activeSession.status === "pending" ? "#ca8a04" : "#dc2626",
                          fontSize: 10, fontWeight: 700, borderRadius: 99, padding: "1px 8px",
                        }}>
                          {activeSession.status?.toUpperCase()}
                        </span>
                      </div>
                    </div>

                  </>
                ) : (
                  <Skeleton width={200} height={16} />
                )}
              </div>

              <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px 8px", display: "flex", flexDirection: "column", gap: 4 }}>
                {messagesLoading ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} style={{ display: "flex", flexDirection: i % 2 === 0 ? "row" : "row-reverse", gap: 10, alignItems: "flex-end" }}>
                        <Skeleton width={36} height={36} radius={50} />
                        <Skeleton width={`${40 + i * 10}%`} height={44} radius={18} />
                      </div>
                    ))}
                  </div>
                ) : grouped.length === 0 ? (
                  <EmptyState icon="👋" title="No messages yet" subtitle="Session booked — auto-welcome message will appear here." />
                ) : (
                  <>
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                      <span style={{ background: "#e8eaf6", color: "#6e7aa0", fontSize: 11, fontWeight: 600, borderRadius: 99, padding: "3px 14px", letterSpacing: "0.04em" }}>
                        {new Date(messages[0]?.createdAt).toDateString() === new Date().toDateString()
                          ? "TODAY"
                          : new Date(messages[0]?.createdAt).toLocaleDateString([], { weekday: "long", month: "short", day: "numeric" })}
                      </span>
                    </div>
                    {grouped.map((msg) => (
                      <MessageBubble
                        key={msg._id}
                        msg={msg}
                        showMeta={msg.showMeta}
                        currentUserId={userId}
                        peerName={getPeerName(activeSession)}
                      />
                    ))}
                  </>
                )}
                <div ref={bottomRef} />
              </div>

              <div style={{ padding: "10px 20px 14px", borderTop: "1px solid #eef0f7", display: "flex", alignItems: "center", gap: 6, background: "#fff", flexShrink: 0 }}>
                <div style={{ flex: 1, background: "#f4f6fb", borderRadius: 14, display: "flex", alignItems: "center", padding: "0 16px" }}>
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                    placeholder="Say something..."
                    style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontSize: 14, color: "#2d3348", fontFamily: "inherit", padding: "11px 0" }}
                  />
                </div>
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || sending}
                  style={{
                    width: 42, height: 42, borderRadius: "50%", border: "none",
                    background: input.trim() && !sending ? "linear-gradient(135deg,#667eea,#5c6bc0)" : "#e8eaf6",
                    color: input.trim() && !sending ? "#fff" : "#9fa8da",
                    cursor: input.trim() && !sending ? "pointer" : "default",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.2s", flexShrink: 0,
                    boxShadow: input.trim() ? "0 2px 12px rgba(92,107,192,0.32)" : "none",
                  }}
                >
                  {sending ? (
                    <div style={{ width: 14, height: 14, border: "2px solid #9fa8da", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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