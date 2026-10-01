'use client'



export function ActionButton({ children, onClick, secondary = false, className = '', type = 'button' }: {
  children: React.ReactNode; onClick?: () => void; secondary?: boolean; className?: string; type?: 'button' | 'submit'
}) {
  return <button type={type} onClick={onClick} className={`action-button ${secondary ? 'action-secondary' : ''} ${className}`}>{children}</button>
}
