import React, { ReactNode } from 'react'

interface ProtectedRouteProps {
    children: ReactNode;
  }

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  return (
    <div>ProtectedRoute</div>
  )
}
