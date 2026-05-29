

import { createContext, useContext, useState, useCallback, useRef } from 'react'

// ─── Icons ────────────────────────────────────────────────────────────────────

const CheckIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="8,12 10,14 16,8" />
    </svg>
)

const XCircleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="8" y1="8" x2="16" y2="16" />
        <line x1="16" y1="8" x2="8" y2="16" />
    </svg>
)

const WarnIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 20h20Z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <circle cx="12" cy="17" r="1" fill="currentColor" />
    </svg>
)

const InfoIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <circle cx="12" cy="16" r="1" fill="currentColor" />
    </svg>
)

const Spinner = () => (
    <span style={{
        display: 'inline-block',
        width: 20,
        height: 20,
        border: '2.5px solid rgba(255,255,255,0.3)',
        borderTopColor: '#fff',
        borderRadius: '50%',
        animation: 'toast-spin 0.7s linear infinite',
    }} />
)

// ─── Config per variant ───────────────────────────────────────────────────────

const VARIANTS = {
    success: {
        icon: <CheckIcon />,
        bg: '#008fc4',
        textColor: '#ffffff',
        iconColor: '#2ecc71',
    },
    error: {
        icon: <XCircleIcon />,
        bg: '#008fc4',
        textColor: '#ffffff',
        iconColor: '#ffffff',
    },
    warning: {
        icon: <WarnIcon />,
        bg: '#008fc4',
        textColor: '#ffffff',
        iconColor: '#ffffff',
    },
    info: {
        icon: <InfoIcon />,
        bg: '#008fc4',
        textColor: '#ffffff',
        iconColor: '#ffffff',
    },
    loading: {
        icon: <Spinner />,
        bg: '#008fc4',
        textColor: '#ffffff',
        iconColor: '#ffffff',
    },
    default: {
        icon: <InfoIcon />,
        bg: '#008fc4',
        textColor: '#ffffff',
        iconColor: '#ffffff',
    },
}

// ─── Context ──────────────────────────────────────────────────────────────────

const ToastContext = createContext(null)

// ─── Single Toast Item ────────────────────────────────────────────────────────

function ToastItem({ id, type, title, message, duration, onDismiss }) {
    const v = VARIANTS[type] || VARIANTS.default

    const itemStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '14px 18px',
        borderRadius: 8,
        background: v.bg,
        position: 'relative',
        overflow: 'hidden',
        minWidth: 300,
        maxWidth: 420,
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
        animation: 'toast-slide-in 0.32s cubic-bezier(0.23, 1, 0.320, 1) forwards',
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
    }

    return (
        <div style={itemStyle}>
            {/* Icon */}
            <div style={{
                color: v.iconColor,
                flexShrink: 0,
                width: 24,
                height: 24,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                {v.icon}
            </div>

            {/* Body */}
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: v.textColor,
                    lineHeight: 1.3,
                    letterSpacing: '-0.3px',
                }}>
                    {title}
                </div>
                {message && (
                    <div style={{
                        fontSize: 13,
                        color: 'rgba(255, 255, 255, 0.85)',
                        lineHeight: 1.4,
                        marginTop: 4,
                    }}>
                        {message}
                    </div>
                )}
            </div>

            {/* Close button */}
            <button
                onClick={() => onDismiss(id)}
                style={{
                    width: 28,
                    height: 28,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'rgba(255, 255, 255, 0.7)',
                    border: 'none',
                    background: 'rgba(255, 255, 255, 0.1)',
                    fontSize: 16,
                    lineHeight: 1,
                    borderRadius: 5,
                    flexShrink: 0,
                    padding: 0,
                    transition: 'all 0.2s ease',
                    hoverColor: 'rgba(255, 255, 255, 1)',
                    hoverBg: 'rgba(255, 255, 255, 0.2)',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 1)'
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                }}
            >
                ✕
            </button>

            {/* Progress bar */}
            {duration > 0 && (
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    height: 3,
                    background: 'rgba(255, 255, 255, 0.3)',
                    animation: `toast-progress ${duration}ms linear forwards`,
                }} />
            )}
        </div>
    )
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([])
    const counterRef = useRef(0)

    const dismiss = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id))
    }, [])

    const show = useCallback((type, title, message, duration) => {
        const id = ++counterRef.current
        const dur = duration !== undefined
            ? duration
            : type === 'loading' ? 0 : 4000

        setToasts(prev => [{ id, type, title, message, duration: dur }, ...prev])

        if (dur > 0) {
            setTimeout(() => dismiss(id), dur)
        }

        return id
    }, [dismiss])

    const api = {
        success: (title, message, duration) => show('success', title, message, duration),
        error: (title, message, duration) => show('error', title, message, duration),
        warning: (title, message, duration) => show('warning', title, message, duration),
        info: (title, message, duration) => show('info', title, message, duration),
        loading: (title, message) => show('loading', title, message, 0),
        default: (title, message, duration) => show('default', title, message, duration),
        dismiss,
    }

    return (
        <ToastContext.Provider value={api}>
            {children}

            {/* Keyframes injected once */}
            <style>{`
        @keyframes toast-slide-in {
          from { 
            opacity: 0;
            transform: translateX(32px) translateY(-32px) scale(0.94);
          }
          to { 
            opacity: 1;
            transform: translateX(0) translateY(0) scale(1);
          }
        }
        @keyframes toast-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes toast-progress {
          from { width: 100%; }
          to   { width: 0%; }
        }
      `}</style>

            {/* Portal-style fixed container - TOP RIGHT */}
            <div style={{
                position: 'fixed',
                top: 24,
                right: 24,
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                zIndex: 9999,
                pointerEvents: 'none',
            }}>
                {toasts.map(t => (
                    <div key={t.id} style={{ pointerEvents: 'all' }}>
                        <ToastItem {...t} onDismiss={dismiss} />
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    )
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useToast() {
    const ctx = useContext(ToastContext)
    if (!ctx) throw new Error('useToast must be used inside <ToastProvider>')
    return ctx
}

export default useToast