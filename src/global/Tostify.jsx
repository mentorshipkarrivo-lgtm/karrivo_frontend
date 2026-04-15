// // Toast.jsx — Global Toast System
// // 1. Wrap your app with <ToastProvider> in main.jsx / App.jsx
// // 2. Call useToast() in any component to trigger toasts
// //
// // Usage:
// //   const toast = useToast()
// //   toast.success('Saved!', 'Your changes were applied.')
// //   toast.error('Failed', 'Something went wrong.')
// //   toast.warning('Low storage')
// //   toast.info('Update available')
// //   const id = toast.loading('Uploading...')
// //   toast.dismiss(id)

// import { createContext, useContext, useState, useCallback, useRef } from 'react'

// // ─── Icons ────────────────────────────────────────────────────────────────────

// const CheckIcon = () => (
//     <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
//         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <circle cx="8" cy="8" r="7" />
//         <polyline points="5,8 7,10 11,6" />
//     </svg>
// )

// const XCircleIcon = () => (
//     <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
//         stroke="currentColor" strokeWidth="2" strokeLinecap="round">
//         <circle cx="8" cy="8" r="7" />
//         <line x1="5.5" y1="5.5" x2="10.5" y2="10.5" />
//         <line x1="10.5" y1="5.5" x2="5.5" y2="10.5" />
//     </svg>
// )

// const WarnIcon = () => (
//     <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
//         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M8 2L14.5 13H1.5Z" />
//         <line x1="8" y1="6.5" x2="8" y2="9.5" />
//         <circle cx="8" cy="11.5" r="0.5" fill="currentColor" />
//     </svg>
// )

// const InfoIcon = () => (
//     <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
//         stroke="currentColor" strokeWidth="2" strokeLinecap="round">
//         <circle cx="8" cy="8" r="7" />
//         <line x1="8" y1="7" x2="8" y2="11" />
//         <circle cx="8" cy="5" r="0.5" fill="currentColor" />
//     </svg>
// )

// const Spinner = () => (
//     <span style={{
//         display: 'inline-block',
//         width: 16,
//         height: 16,
//         border: '2px solid transparent',
//         borderTopColor: 'currentColor',
//         borderRadius: '50%',
//         animation: 'toast-spin 0.7s linear infinite',
//     }} />
// )

// // ─── Config per variant ───────────────────────────────────────────────────────

// const VARIANTS = {
//     success: {
//         icon: <CheckIcon />,
//         border: '#9FE1CB',
//         bg: '#F2FBF7',
//         progress: '#1D9E75',
//         color: '#0F6E56',
//     },
//     error: {
//         icon: <XCircleIcon />,
//         border: '#F7C1C1',
//         bg: '#FEF5F5',
//         progress: '#E24B4A',
//         color: '#A32D2D',
//     },
//     warning: {
//         icon: <WarnIcon />,
//         border: '#FAC775',
//         bg: '#FEFAF2',
//         progress: '#BA7517',
//         color: '#854F0B',
//     },
//     info: {
//         icon: <InfoIcon />,
//         border: '#B5D4F4',
//         bg: '#F2F8FE',
//         progress: '#378ADD',
//         color: '#185FA5',
//     },
//     loading: {
//         icon: <Spinner />,
//         border: '#CECBF6',
//         bg: '#F7F7FE',
//         progress: '#7F77DD',
//         color: '#534AB7',
//     },
//     default: {
//         icon: <InfoIcon />,
//         border: '#e0ddd8',
//         bg: '#ffffff',
//         progress: '#888780',
//         color: '#444441',
//     },
// }

// // ─── Context ──────────────────────────────────────────────────────────────────

// const ToastContext = createContext(null)

// // ─── Single Toast Item ────────────────────────────────────────────────────────

// function ToastItem({ id, type, title, message, duration, onDismiss }) {
//     const v = VARIANTS[type] || VARIANTS.default

//     const itemStyle = {
//         display: 'flex',
//         alignItems: 'flex-start',
//         gap: 12,
//         padding: '12px 14px',
//         borderRadius: 12,
//         border: `0.5px solid ${v.border}`,
//         background: v.bg,
//         position: 'relative',
//         overflow: 'hidden',
//         minWidth: 280,
//         maxWidth: 360,
//         boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
//         animation: 'toast-in 0.28s cubic-bezier(0.34,1.56,0.64,1) forwards',
//         fontFamily: "'DM Sans', system-ui, sans-serif",
//     }

//     return (
//         <div style={itemStyle}>
//             {/* Icon */}
//             <div style={{ color: v.color, marginTop: 1, flexShrink: 0, width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                 {v.icon}
//             </div>

//             {/* Body */}
//             <div style={{ flex: 1, minWidth: 0 }}>
//                 <div style={{ fontSize: 13, fontWeight: 500, color: '#1a1a18', lineHeight: 1.4 }}>
//                     {title}
//                 </div>
//                 {message && (
//                     <div style={{ fontSize: 12, color: '#5F5E5A', lineHeight: 1.5, marginTop: 2 }}>
//                         {message}
//                     </div>
//                 )}
//             </div>

//             {/* Close button */}
//             <button
//                 onClick={() => onDismiss(id)}
//                 style={{
//                     width: 20, height: 20, display: 'flex', alignItems: 'center',
//                     justifyContent: 'center', cursor: 'pointer', color: '#888780',
//                     border: 'none', background: 'none', fontSize: 14, lineHeight: 1,
//                     borderRadius: 4, flexShrink: 0, padding: 0,
//                 }}
//             >
//                 ✕
//             </button>

//             {/* Progress bar */}
//             {duration > 0 && (
//                 <div style={{
//                     position: 'absolute', bottom: 0, left: 0, height: 2,
//                     background: v.progress,
//                     animation: `toast-progress ${duration}ms linear forwards`,
//                 }} />
//             )}
//         </div>
//     )
// }

// // ─── Provider ─────────────────────────────────────────────────────────────────

// export function ToastProvider({ children }) {
//     const [toasts, setToasts] = useState([])
//     const counterRef = useRef(0)

//     const dismiss = useCallback((id) => {
//         setToasts(prev => prev.filter(t => t.id !== id))
//     }, [])

//     const show = useCallback((type, title, message, duration) => {
//         const id = ++counterRef.current
//         const dur = duration !== undefined
//             ? duration
//             : type === 'loading' ? 0 : 3800

//         setToasts(prev => [{ id, type, title, message, duration: dur }, ...prev])

//         if (dur > 0) {
//             setTimeout(() => dismiss(id), dur)
//         }

//         return id
//     }, [dismiss])

//     const api = {
//         success: (title, message, duration) => show('success', title, message, duration),
//         error: (title, message, duration) => show('error', title, message, duration),
//         warning: (title, message, duration) => show('warning', title, message, duration),
//         info: (title, message, duration) => show('info', title, message, duration),
//         loading: (title, message) => show('loading', title, message, 0),
//         default: (title, message, duration) => show('default', title, message, duration),
//         dismiss,
//     }

//     return (
//         <ToastContext.Provider value={api}>
//             {children}

//             {/* Keyframes injected once */}
//             <style>{`
//         @keyframes toast-in {
//           from { opacity: 0; transform: translateX(32px) scale(0.96); }
//           to   { opacity: 1; transform: translateX(0)    scale(1); }
//         }
//         @keyframes toast-spin {
//           to { transform: rotate(360deg); }
//         }
//         @keyframes toast-progress {
//           from { width: 100%; }
//           to   { width: 0%; }
//         }
//       `}</style>

//             {/* Portal-style fixed container */}
//             <div style={{
//                 position: 'fixed',
//                 bottom: 24,
//                 right: 24,
//                 display: 'flex',
//                 flexDirection: 'column',
//                 gap: 10,
//                 zIndex: 9999,
//                 pointerEvents: 'none',
//             }}>
//                 {toasts.map(t => (
//                     <div key={t.id} style={{ pointerEvents: 'all' }}>
//                         <ToastItem {...t} onDismiss={dismiss} />
//                     </div>
//                 ))}
//             </div>
//         </ToastContext.Provider>
//     )
// }

// // ─── Hook ─────────────────────────────────────────────────────────────────────

// export function useToast() {
//     const ctx = useContext(ToastContext)
//     if (!ctx) throw new Error('useToast must be used inside <ToastProvider>')
//     return ctx
// }

// export default useToast

// Toast.jsx — Global Toast System
// 
// Setup:
//   1. Import in App.jsx: import { ToastProvider } from './Toast'
//   2. Wrap your app: <ToastProvider><App /></ToastProvider>
//   3. Use in any component: const toast = useToast()
//
// API:
//   toast.success(title, message, duration)    // Auto-dismiss in 3.8s
//   toast.error(title, message, duration)      // Auto-dismiss in 3.8s
//   toast.warning(title, message, duration)    // Auto-dismiss in 3.8s
//   toast.info(title, message, duration)       // Auto-dismiss in 3.8s
//   const id = toast.loading(title, message)   // Never auto-dismiss
//   toast.dismiss(id)                          // Manual dismiss

import { createContext, useContext, useState, useCallback, useRef } from 'react'

// ─── Icons ────────────────────────────────────────────────────────────────────

const CheckIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="8" r="7" />
        <polyline points="5,8 7,10 11,6" />
    </svg>
)

const XCircleIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="8" cy="8" r="7" />
        <line x1="5.5" y1="5.5" x2="10.5" y2="10.5" />
        <line x1="10.5" y1="5.5" x2="5.5" y2="10.5" />
    </svg>
)

const WarnIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 2L14.5 13H1.5Z" />
        <line x1="8" y1="6.5" x2="8" y2="9.5" />
        <circle cx="8" cy="11.5" r="0.5" fill="currentColor" />
    </svg>
)

const InfoIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="8" cy="8" r="7" />
        <line x1="8" y1="7" x2="8" y2="11" />
        <circle cx="8" cy="5" r="0.5" fill="currentColor" />
    </svg>
)

const Spinner = () => (
    <span style={{
        display: 'inline-block',
        width: 16,
        height: 16,
        border: '2px solid transparent',
        borderTopColor: 'currentColor',
        borderRadius: '50%',
        animation: 'toast-spin 0.7s linear infinite',
    }} />
)

// ─── Config per variant ───────────────────────────────────────────────────────

const VARIANTS = {
    success: {
        icon: <CheckIcon />,
        border: '#4ca5f6',
        bg: '#E3F2FD',
        progress: '#4ca5f6',
        color: '#4ca5f6',
    },
    error: {
        icon: <XCircleIcon />,
        border: '#4ca5f6',
        bg: '#E3F2FD',
        progress: '#4ca5f6',
        color: '#4ca5f6',
    },
    warning: {
        icon: <WarnIcon />,
        border: '#4ca5f6',
        bg: '#E3F2FD',
        progress: '#4ca5f6',
        color: '#4ca5f6',
    },
    info: {
        icon: <InfoIcon />,
        border: '#4ca5f6',
        bg: '#E3F2FD',
        progress: '#4ca5f6',
        color: '#4ca5f6',
    },
    loading: {
        icon: <Spinner />,
        border: '#4ca5f6',
        bg: '#E3F2FD',
        progress: '#4ca5f6',
        color: '#4ca5f6',
    },
    default: {
        icon: <InfoIcon />,
        border: '#4ca5f6',
        bg: '#E3F2FD',
        progress: '#4ca5f6',
        color: '#4ca5f6',
    },
}

// ─── Context ──────────────────────────────────────────────────────────────────

const ToastContext = createContext(null)

// ─── Single Toast Item ────────────────────────────────────────────────────────

function ToastItem({ id, type, title, message, duration, onDismiss }) {
    const v = VARIANTS[type] || VARIANTS.default

    const itemStyle = {
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        padding: '12px 14px',
        borderRadius: 12,
        border: `0.5px solid ${v.border}`,
        background: v.bg,
        position: 'relative',
        overflow: 'hidden',
        minWidth: 280,
        maxWidth: 360,
        boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
        animation: 'toast-in 0.28s cubic-bezier(0.34,1.56,0.64,1) forwards',
        fontFamily: "'DM Sans', system-ui, sans-serif",
    }

    return (
        <div style={itemStyle}>
            {/* Icon */}
            <div style={{ color: v.color, marginTop: 1, flexShrink: 0, width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {v.icon}
            </div>

            {/* Body */}
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: '#1a1a18', lineHeight: 1.4 }}>
                    {title}
                </div>
                {message && (
                    <div style={{ fontSize: 12, color: '#5F5E5A', lineHeight: 1.5, marginTop: 2 }}>
                        {message}
                    </div>
                )}
            </div>

            {/* Close button */}
            <button
                onClick={() => onDismiss(id)}
                style={{
                    width: 20, height: 20, display: 'flex', alignItems: 'center',
                    justifyContent: 'center', cursor: 'pointer', color: '#888780',
                    border: 'none', background: 'none', fontSize: 14, lineHeight: 1,
                    borderRadius: 4, flexShrink: 0, padding: 0,
                }}
            >
                ✕
            </button>

            {/* Progress bar */}
            {duration > 0 && (
                <div style={{
                    position: 'absolute', bottom: 0, left: 0, height: 2,
                    background: v.progress,
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
            : type === 'loading' ? 0 : 3800

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
        @keyframes toast-in {
          from { opacity: 0; transform: translateX(32px) scale(0.96); }
          to   { opacity: 1; transform: translateX(0)    scale(1); }
        }
        @keyframes toast-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes toast-progress {
          from { width: 100%; }
          to   { width: 0%; }
        }
      `}</style>

            {/* Portal-style fixed container */}
            <div style={{
                position: 'fixed',
                bottom: 24,
                right: 24,
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
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