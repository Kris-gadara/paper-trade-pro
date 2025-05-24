"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

interface User {
  id: string
  username: string
  email: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<void>
  signup: (username: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("auth_token")
    const userData = localStorage.getItem("user_data")

    if (token && userData) {
      try {
        setUser(JSON.parse(userData))
        setIsAuthenticated(true)
      } catch (error) {
        localStorage.removeItem("auth_token")
        localStorage.removeItem("user_data")
      }
    }
  }, [])

  const login = async (username: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockUser = {
      id: "user_" + Date.now(),
      username,
      email: `${username}@example.com`,
    }

    const mockToken = "mock_jwt_token_" + Date.now()

    localStorage.setItem("auth_token", mockToken)
    localStorage.setItem("user_data", JSON.stringify(mockUser))

    setUser(mockUser)
    setIsAuthenticated(true)
  }

  const signup = async (username: string, email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockUser = {
      id: "user_" + Date.now(),
      username,
      email,
    }

    const mockToken = "mock_jwt_token_" + Date.now()

    localStorage.setItem("auth_token", mockToken)
    localStorage.setItem("user_data", JSON.stringify(mockUser))

    setUser(mockUser)
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("user_data")
    setUser(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
