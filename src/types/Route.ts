import { LazyExoticComponent } from 'react'

export interface Route {
  label: string
  path: string
  exact?: boolean
  layout?: React.FC // Optional layout
  component?: LazyExoticComponent<() => JSX.Element>
  children?: Route[]
  params?: Record<string, string>
  allowedRoles?: string[]
}
