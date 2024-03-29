import React, { ReactNode, useEffect, useState } from 'react'

interface ErrorBoundaryProps {
  children?: ReactNode
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const handleError = (error: Event) => {
      console.error(error)
      setHasError(true)
    }

    window.addEventListener('error', handleError)

    return () => {
      window.removeEventListener('error', handleError)
    }
  }, [])

  const reloadPage = () => {
    window.location.pathname = '/'
    setTimeout(() => window.location.reload(), 1000)
  }

  if (hasError || !children) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-red-700 mb-4">
            Ups! Something went wrong.
          </h2>
          <p className="text-gray-600 mb-4">
            An unexpected error has ocurred. Please try to reload the page.
          </p>
          <button
            type="submit"
            className="px-4 py-2 bg-blueFM text-white rounded"
            onClick={reloadPage}
          >
            Refresh
          </button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

export default ErrorBoundary
