import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles: string[] // Array of allowed roles
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const navigate = useNavigate()
  const userInfo = localStorage.getItem('userInfo')

  if (!userInfo) {
    // If not logged in, redirect to login
    navigate('/login')
    return null
  }

  const { role } = JSON.parse(userInfo)

  if (!allowedRoles.includes(role)) {
    navigate('/403')
    return null
  }

  return <>{children}</>
}

export default ProtectedRoute
