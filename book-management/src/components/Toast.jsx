const Toast = ({ message, type = 'success' }) => (
  <div className={`toast toast--${type}`}>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {type === 'success' ? (
        <polyline points="20 6 9 17 4 12"/>
      ) : (
        <>
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </>
      )}
    </svg>
    {message}
  </div>
);

export default Toast;