interface FormMessageProps {
  type: 'success' | 'error'
  message: string
}

export const FormMessage = ({ type, message }: FormMessageProps) => {
  const styles = {
    success: {
      container: 'bg-green-500/10 border-green-500/30 text-green-400',
      icon: '✓',
    },
    error: {
      container: 'bg-red-500/10 border-red-500/30 text-red-400',
      icon: '✕',
    },
  }

  return (
    <div
      className={`
        flex items-start gap-3
        border rounded-lg
        px-4 py-3
        text-sm font-medium
        ${styles[type].container}
      `}
    >
      <span className="text-lg leading-none">
        {styles[type].icon}
      </span>

      <p>{message}</p>
    </div>
  )
}

export default FormMessage
