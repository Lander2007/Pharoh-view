'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export default class CanvasErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('WebGL Canvas caught error (switching to architectural fallback):', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }
      return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-6">
          <div className="glass-architectural p-6 rounded-xl border border-[#C89D54]/40 max-w-sm text-center">
            <span className="w-2 h-2 rounded-full bg-[#C89D54] inline-block mb-2 animate-pulse" />
            <p className="font-mono text-xs uppercase tracking-wider text-[#C89D54] font-bold">
              2D Architectural Blueprint Mode
            </p>
            <p className="font-sans text-xs text-[#57534E] mt-1.5 leading-relaxed">
              Hardware WebGL acceleration is currently disabled or restricted in your browser. All interactive UI,
              Bento grids, and audio features remain fully active.
            </p>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

