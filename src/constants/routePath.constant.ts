
export const ROUTE_PATH = {
  ROOT: {
    INDEX: '/',
    ABOUT: 'about',
    TEST: 'test-chuan-doan',
    DEPRESION_TEST: 'test-tram-cam',
    LOGIN: 'login',
    REGISTER: 'register',
    FORUM: 'forum',
    DETAIL_POST: 'forum/:id',
    FORGOT_PASSWORD: 'forgot-password',
    RESET_PASSWORD: 'reset-password',
    FIND_DOCTOR: 'find-doctor',
    DOCTOR_DETAIL: 'find-doctor/:id',
    DOCTOR_SCHEDULE: 'doctor-schedule',
    TREATMENT_HISTORY: 'treatment-history',
    NEWS_EVENT: 'news-event',
    CONTACT: 'contact',
    RATE_DOCTOR: 'rate-doctor',
    PERSONAL: 'personal',
  },
  MESSAGE: {
    INDEX: '/message',
  },
  DOCTOR: {
    INDEX: '/doctor',
    SCHEDULE: '/doctor/schedule',
    MESSAGE: '/doctor/message',
    PROFILE: '/doctor/profile',
    POST: '/doctor/post',
  },
  ADMIN: {
    INDEX: '/admin',
    LOGIN: '/admin/login',
    DASHBOARD: '/admin/dashboard',
    POST_MANAGEMENT: '/admin/post-management',
    ACCOUNT_MANAGEMENT: '/admin/account-management',
  },
  NOTFOUND: {
    INDEX: '*',
  },
  FORBIDDEN: '/403',
}
