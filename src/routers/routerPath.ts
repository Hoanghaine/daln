import { ROUTE_PATH } from '../constants/routePath.constant'
import React from 'react'
import ProtectedLayout from '../components/layouts/ProtectedLayout/ProtectedLayout'
import BlankLayout from '../components/layouts/BlankLayout/BlankLayout'

export const routes = [
  {
    label: 'Main',
    path: ROUTE_PATH.ROOT.INDEX,
    layout: ProtectedLayout,
    component: React.lazy(() => import('../pages/MainPage/Home/Home.tsx')),
    exact: true,
    children: [
      {
        label: 'About US',
        path: ROUTE_PATH.ROOT.ABOUT,
        component: React.lazy(
          () => import('../pages/MainPage/AboutUs/AboutUs.tsx'),
        ),
      },
      {
        label: 'Disease Test',
        path: ROUTE_PATH.ROOT.TEST,
        component: React.lazy(
          () => import('../pages/MainPage/DiseaseTest/DiseaseTest.tsx'),
        ),
      },
      {
        label: 'Register',
        path: ROUTE_PATH.ROOT.REGISTER,
        component: React.lazy(
          () => import('../pages/MainPage/Register/Register.tsx'),
        ),
      },
      {
        label: 'Find Doctor',
        path: ROUTE_PATH.ROOT.FIND_DOCTOR,
        component: React.lazy(
          () => import('../pages/MainPage/FindDoctor/FindDoctor.tsx'),
        ),
      },
      {
        label: 'Doctor Detail',
        path: ROUTE_PATH.ROOT.DOCTOR_DETAIL,
        component: React.lazy(
          () => import('../pages/MainPage/DoctorDetail/DoctorDetail.tsx'),
        ),
      },
      {
        label: 'Treatment History',
        path: ROUTE_PATH.ROOT.TREATMENT_HISTORY,
        component: React.lazy(
          () =>
            import('../pages/MainPage/TreatmentHistory/TreatmentHistory.tsx'),
        ),
      },
    ],
  },
  {
    label: 'Login',
    layout: BlankLayout,
    path: ROUTE_PATH.ROOT.LOGIN,
    component: React.lazy(() => import('../pages/MainPage/Login/Login.tsx')),
  },
  {
    label: 'Doctor',
    path: ROUTE_PATH.DOCTOR.INDEX,
    layout: BlankLayout,
    component: React.lazy(() => import('../pages/MainPage/Login/Login.tsx')),
    exact: true,
  },
  {
    label: 'Doctor Dashboard',
    path: ROUTE_PATH.DOCTOR.INDEX,
    layout: ProtectedLayout,
    children: [
      {
        label: 'Doctor list',
        path: ROUTE_PATH.DOCTOR.DASHBOARD,
        component: React.lazy(
          () => import('../pages/Doctor/Dashboard/Dashboard'),
        ),
      },
      {
        label: 'Schedule management',
        path: ROUTE_PATH.DOCTOR.SCHEDULE,
        component: React.lazy(
          () => import('../pages/Doctor/Schedule/Schedule'),
        ),
      },
      {
        label: 'Notification management',
        path: ROUTE_PATH.DOCTOR.NOTIFICATION,
        component: React.lazy(
          () => import('../pages/Doctor/Notification/Notification.tsx'),
        ),
      },
      {
        label: 'Treatment management',
        path: ROUTE_PATH.DOCTOR.TREATMENT,
        component: React.lazy(
          () => import('../pages/Doctor/Treatment/Treatment.tsx'),
        ),
      },
      {
        label: 'Profile',
        path: ROUTE_PATH.DOCTOR.PROFILE,
        component: React.lazy(
          () => import('../pages/Doctor/Profile/Profile.tsx'),
        ),
      },
      {
        label: 'Post management',
        path: ROUTE_PATH.DOCTOR.POST,
        component: React.lazy(
          () => import('../pages/Doctor/PostManagement/PostManagement.tsx'),
        ),
      },
    ],
  },
  {
    label: 'Admin',
    path: ROUTE_PATH.ADMIN.INDEX,
    layout: BlankLayout,
    component: React.lazy(() => import('../pages/Admin/Login/Login')),
    exact: true,
  },
  {
    label: 'Admin Dashboard',
    path: ROUTE_PATH.ADMIN.INDEX,
    layout: ProtectedLayout,
    children: [
      {
        label: 'Admin list',
        path: ROUTE_PATH.ADMIN.DASHBOARD,
        component: React.lazy(
          () => import('../pages/Admin/Dashboard/Dashboard'),
        ),
      },
      {
        label: 'Register management',
        path: ROUTE_PATH.ADMIN.REGISTER_MANAGEMENT,
        component: React.lazy(
          () =>
            import(
              '../pages/Admin/DoctorRegisterManagement/RegisterManagement'
            ),
        ),
      },
      {
        label: 'Account management',
        path: ROUTE_PATH.ADMIN.ACCOUNT_MANAGEMENT,
        component: React.lazy(
          () => import('../pages/Admin/AccountManagement/AccountManagement'),
        ),
      },
      {
        label: 'Post management',
        path: ROUTE_PATH.ADMIN.POST_MANAGEMENT,
        component: React.lazy(
          () => import('../pages/Admin/PostManagement/PostManagement'),
        ),
      },
    ],
  },
  {
    label: 'Message',
    path: ROUTE_PATH.MESSAGE.INDEX,
    layout: BlankLayout,
    component: React.lazy(() => import('../pages/MessagePage/MessagePage')),
    exact: true,
  },

  {
    label: 'Not Found',
    path: ROUTE_PATH.NOTFOUND.INDEX,
    layout: BlankLayout,
    component: React.lazy(
      () => import('../components/layouts/NotFoundPage/NotFoundPage'),
    ),
  },
]
