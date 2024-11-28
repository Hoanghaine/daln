import { ROUTE_PATH } from '../constants/routePath.constant'
import React, { Children } from 'react'
import ProtectedLayout from '../components/layouts/ProtectedLayout/ProtectedLayout'
import BlankLayout from '../components/layouts/BlankLayout/BlankLayout'
import { Route } from '../types/Route.ts'

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
        exact: true,

        component: React.lazy(
          () => import('../pages/MainPage/AboutUs/AboutUs.tsx'),
        ),
      },
      {
        label: 'Profile',
        path: ROUTE_PATH.ROOT.PERSONAL,
        exact: true,

        component: React.lazy(
          () => import('../pages/MainPage/Personal/Personal.tsx'),
        ),
      },
      {
        label: 'Disease Test',
        path: ROUTE_PATH.ROOT.TEST,
        exact: true,

        component: React.lazy(
          () => import('../pages/MainPage/DiseaseTest/DiseaseTest.tsx'),
        ),
      },
      {
        label: 'Disease Test',
        path: ROUTE_PATH.ROOT.DEPRESION_TEST,
        exact: true,

        component: React.lazy(
          () =>
            import(
              '../pages/MainPage/DiseaseTest/DepresionTest/DepressionTest.tsx'
            ),
        ),
      },
      {
        label: 'Register',
        path: ROUTE_PATH.ROOT.REGISTER,
        exact: true,

        component: React.lazy(
          () => import('../pages/MainPage/Auth/Register/Register.tsx'),
        ),
      },
      {
        label: 'Find Doctor',
        path: ROUTE_PATH.ROOT.FIND_DOCTOR,
        exact: true,

        component: React.lazy(
          () => import('../pages/MainPage/FindDoctor/FindDoctor.tsx'),
        ),
      },
      {
        label: 'Detail Doctor',
        path: ROUTE_PATH.ROOT.DOCTOR_DETAIL,
        exact: true,

        component: React.lazy(
          () => import('../pages/MainPage/FindDoctor/DoctorDetail.tsx'),
        ),
        params: {
          doctorId: ':doctorId',
        },
      },
      {
        label: 'Forum',
        path: ROUTE_PATH.ROOT.FORUM,
        exact: true,

        component: React.lazy(
          () => import('../pages/MainPage/Forum/Forum.tsx'),
        ),
      },
      {
        label: 'Deatil Post',
        path: ROUTE_PATH.ROOT.DETAIL_POST,
        exact: true,

        component: React.lazy(
          () => import('../pages/MainPage/Forum/DetailPost.tsx'),
        ),
        params: {
          postId: ':postId',
        },
      },
      {
        label: 'New and Event',
        path: ROUTE_PATH.ROOT.NEWS_EVENT,
        exact: true,

        component: React.lazy(
          () => import('../pages/MainPage/NewsAndEvent/NewsAndEvent.tsx'),
        ),
      },
      {
        label: 'Contact',
        path: ROUTE_PATH.ROOT.CONTACT,
        exact: true,

        component: React.lazy(
          () => import('../pages/MainPage/Contact/Contact.tsx'),
        ),
      },
      {
        label: 'Doctor Detail',
        path: ROUTE_PATH.ROOT.DOCTOR_DETAIL,
        exact: true,

        component: React.lazy(
          () => import('../pages/MainPage/FindDoctor/DoctorDetail.tsx'),
        ),
        params: {
          id: ':id',
        },
      },
      {
        label: 'Treatment History',
        path: ROUTE_PATH.ROOT.TREATMENT_HISTORY,
        exact: true,

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
    component: React.lazy(
      () => import('../pages/MainPage/Auth/Login/Login.tsx'),
    ),
  },
  {
    label: 'Doctor Page',
    layout: ProtectedLayout,
    path: ROUTE_PATH.DOCTOR.INDEX,
    exact: true,
    allowedRoles: ['doctor'],
    children: [
      {
        label: 'Doctor Dashboard',
        path: ROUTE_PATH.DOCTOR.INDEX,
        component: React.lazy(
          () => import('../pages/Doctor/Dashboard/Dashboard'),
        ),
        allowedRoles: ['doctor'],
        exact: true,
      },
      {
        label: 'Schedule management',
        path: ROUTE_PATH.DOCTOR.SCHEDULE,
        component: React.lazy(
          () => import('../pages/Doctor/Schedule/Schedule'),
        ),
        allowedRoles: ['doctor'],

        exact: true,
      },

      {
        label: 'Treatment management',
        path: ROUTE_PATH.DOCTOR.MESSAGE,
        component: React.lazy(
          () => import('../pages/Doctor/Message/Message.tsx'),
        ),
        allowedRoles: ['doctor'],

        exact: true,
      },
      {
        label: 'Profile',
        path: ROUTE_PATH.DOCTOR.PROFILE,
        component: React.lazy(
          () => import('../pages/Doctor/Profile/Profile.tsx'),
        ),
        allowedRoles: ['doctor'],
        exact: true,
      },
      {
        label: 'Post management',
        path: ROUTE_PATH.DOCTOR.POST,
        component: React.lazy(
          () => import('../pages/Doctor/PostManagement/PostManagement.tsx'),
        ),
        allowedRoles: ['doctor'],
        exact: true,
      },
    ],
  },
  {
    label: 'Admin',
    path: ROUTE_PATH.ADMIN.LOGIN,
    layout: BlankLayout,
    component: React.lazy(() => import('../pages/Admin/Login/Login')),
    exact: true,
  },
  {
    label: 'Admin Dashboard',
    path: ROUTE_PATH.ADMIN.INDEX,
    layout: ProtectedLayout,
    allowedRoles: ['admin'],

    children: [
      {
        label: 'Admin list',
        path: ROUTE_PATH.ADMIN.INDEX,
        component: React.lazy(
          () => import('../pages/Admin/Dashboard/Dashboard'),
        ),
        allowedRoles: ['admin'],
      },
      {
        label: 'Post management',
        path: ROUTE_PATH.ADMIN.POST_MANAGEMENT,
        component: React.lazy(
          () => import('../pages/Admin/PostManagement/PostManagement.tsx'),
        ),
        allowedRoles: ['admin'],
      },
      {
        label: 'Account management',
        path: ROUTE_PATH.ADMIN.ACCOUNT_MANAGEMENT,
        component: React.lazy(
          () => import('../pages/Admin/AccountManagement/AccountManagement'),
        ),
        allowedRoles: ['admin'],
      },
    ],
  },
  {
    label: 'Message',
    path: ROUTE_PATH.MESSAGE.INDEX,
    layout: ProtectedLayout,
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
