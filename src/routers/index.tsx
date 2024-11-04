import { Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { routes } from './routerPath'
import LazyLoading from '../components/LazyLoading'
import ScrollToTop from './ScrollToTop'
const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <ScrollToTop />
        <Routes>
          {routes.map(route => (
            <Route
              key={route.label}
              path={route.path}
              element={<route.layout />}
            >
              {route.children &&
                route.children.map(child => (
                  <Route
                    key={child.label}
                    path={child.path}
                    element={
                      <Suspense fallback={<LazyLoading />}>
                        <child.component />
                      </Suspense>
                    }
                  />
                ))}
              {route.component && (
                <Route
                  index
                  element={
                    <Suspense fallback={<LazyLoading />}>
                      <route.component />
                    </Suspense>
                  }
                />
              )}
            </Route>
          ))}
        </Routes>
      </Router>
    </Suspense>
  )
}

export default AppRoutes
