/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from '@reduxjs/toolkit/query/react'
import customBaseQuery from './fetchBase'
import { IQuizAnswer, IQuizResponse } from '../../types/quiz'
import { IDoctorDetailResponse } from '../../types/doctor'
import { IPatientDetailResponse } from '../../types/patient'

import {
  IPostsResponse,
  IUsersResponse,
  IDoctorsBasicInforResponse,
  ITagsResponse,
  ICommentsResponse,
  ISchedulesResponse,
} from '../../types/paginatedResponse'
import { IUserRegister } from '../../types/user'

export const apiCaller = createApi({
  reducerPath: 'apiCaller',
  refetchOnMountOrArgChange: 30,
  baseQuery: customBaseQuery(),
  tagTypes: ['Products', 'Quizzes', 'Posts'],
  endpoints: builder => ({
    login: builder.mutation({
      query: user => ({
        url: '/auth/login',
        method: 'POST',
        body: user,
      }),
    }),
    adminLogin: builder.mutation({
      query: user => ({
        url: '/auth/admin/login',
        method: 'POST',
        body: user,
      }),
    }),
    register: builder.mutation<IUserRegister, IUserRegister>({
      query: user => ({
        url: '/auth/register',
        method: 'POST',
        body: user,
      }),
    }),
    uploadCertificates: builder.mutation({
      query: ({ images, name }) => {
        const formData = new FormData()
        images.forEach((image: File) => {
          formData.append('images', image)
        })
        formData.append('name', name)
        return {
          url: '/certificates',
          method: 'POST',
          body: formData,
        }
      },
    }),

    forgotPassword: builder.mutation({
      query: () => ({
        url: '/auth/forgot-password',
        method: 'POST',
      }),
    }),
    changePassword: builder.mutation({
      query: ({ currentPassword, newPassword }) => ({
        url: '/auth/change-password',
        method: 'PUT',
        body: { currentPassword, newPassword },
      }),
    }),

    getQuizzes: builder.query<IQuizResponse, void>({
      query: () => ({
        url: `/quizzes`,
        method: 'GET',
      }),
      providesTags: ['Quizzes'], // To manage cache invalidation
    }),
    submitQuizzes: builder.mutation<void, IQuizAnswer[]>({
      query: iQuizSubmit => ({
        url: `/quizzes/submit`,
        method: 'POST',
        body: iQuizSubmit,
      }),
    }),
    getPosts: builder.query<IPostsResponse, { page: number; size: number }>({
      query: ({ page, size }) => ({
        url: `/posts?page=${page}&size=${size}`,
        method: 'GET',
      }),
      providesTags: ['Posts'], // To manage cache invalidation
    }),
    getOwnPosts: builder.query<IPostsResponse, { page: number; size: number }>({
      query: ({ page, size }) => ({
        url: `/posts/user?page=${page}&size=${size}`,
        method: 'GET',
      }),
      providesTags: ['Posts'], // To manage cache invalidation
    }),
    getPostDetail: builder.query({
      query: (postId: number) => `/posts/${postId}`,
    }),
    addPost: builder.mutation({
      query: ({ title, content, tagId, image }) => {
        const formData = new FormData()
        formData.append('title', title)
        formData.append('content', content)
        formData.append('tagId', tagId)
        formData.append('image', image)

        return {
          url: '/posts',
          method: 'POST',
          body: formData,
        }
      },
    }),
    updatePost: builder.mutation({
      query: ({ postId, title, content, tagId, thumbnail }) => {
        const formData = new FormData()
        formData.append('title', title)
        formData.append('content', content)
        formData.append('tagId', tagId.toString())
        formData.append('thumbnail', thumbnail)

        return {
          url: `/posts/${postId}`,
          method: 'PUT',
          body: formData,
        }
      },
    }),

    getAccounts: builder.query<IUsersResponse, { page: number; size: number }>({
      query: ({ page, size }) => ({
        url: `/users?page=${page}&size=${size}`,
        method: 'GET',
      }),
    }),
    getDoctorProfile: builder.query<IDoctorDetailResponse, void>({
      query: () => ({
        url: `/users/profile`,
        method: 'GET',
      }),
    }),
    getPatientProfile: builder.query<IPatientDetailResponse, void>({
      query: () => ({
        url: `/users/profile`,
        method: 'GET',
      }),
    }),
    getDoctorDetail: builder.query<IDoctorDetailResponse, number>({
      query: id => ({
        url: `/users/${id}`,
        method: 'GET',
      }),
    }),
    getPatientDetail: builder.query<IPatientDetailResponse, number>({
      query: id => ({
        url: `/users/${id}`,
        method: 'GET',
      }),
    }),
    getDoctorComments: builder.query({
      query: (doctorId: number) => `/comments/rating/${doctorId}`,
    }),
    getSpecializations: builder.query({
      query: () => `/users/doctors/specializations`,
    }),
    getDoctorsBasicInfor: builder.query<
      IDoctorsBasicInforResponse,
      { page: number; size: number; specialization?: string } // specialization is optional
    >({
      query: ({ page, size, specialization }) => {
        // Construct the base URL
        let url = `/users/doctors?page=${page}&size=${size}`

        // Add specialization if it's provided
        if (specialization) {
          url += `&specialization=${specialization}`
        }

        return {
          url, // use the constructed URL
          method: 'GET',
        }
      },
    }),

    deletePost: builder.mutation({
      query: postId => ({
        url: `/posts/${postId}`,
        method: 'DELETE',
      }),
    }),
    getTags: builder.query<ITagsResponse, void>({
      query: () => ({
        url: '/tags?page=0&size=10',
        method: 'GET',
      }),
    }),
    getChat: builder.query({
      query: (receiverName: string) => `/chats?receiverName=${receiverName}`,
    }),
    getChatList: builder.query({
      query: () => '/chats/categories', // Your endpoint
    }),
    approveDoctor: builder.mutation({
      query: (doctorId: number) => ({
        url: `/auth/approve/${doctorId}`,
        method: 'PUT',
      }),
    }),
    rejectDoctor: builder.mutation({
      query: ({ doctorId, reason }: { doctorId: number; reason: string }) => ({
        url: `/auth/reject/${doctorId}`,
        method: 'PUT',
        body: { reason },
      }),
    }),
    likePost: builder.mutation({
      query: postId => ({
        url: `/posts/like/${postId}`,
        method: 'PUT',
      }),
    }),
    unLikePost: builder.mutation({
      query: postId => ({
        url: `/posts/unlike/${postId}`,
        method: 'PUT',
      }),
    }),
    getPostComments: builder.query<ICommentsResponse, number>({
      query: postId => `/comments/${postId}`,
    }),
    commentPost: builder.mutation({
      query: ({ postId, content }) => ({
        url: `/comments`,
        method: 'POST',
        body: { postId, content },
      }),
    }),

    getDoctorSchedules: builder.query<ISchedulesResponse, void>({
      query: () => `/schedules/doctor`,
    }),
    getPatientSchedules: builder.query<ISchedulesResponse, void>({
      query: () => `/schedules/patient`,
    }),
    makeSchedule: builder.mutation({
      query: ({ doctorId, notes, appointmentDate }) => ({
        url: `/schedules`,
        method: 'POST',
        body: { doctorId, notes, appointmentDate },
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),

    changeStatusSchedule: builder.mutation({
      query: ({ scheduleId, status }) => ({
        url: `/schedules/${scheduleId}?status=${status}`,
        method: 'PUT',
      }),
    }),

    rateDoctor: builder.mutation({
      query: ({ doctorId, rating, review }) => ({
        url: `/comments/rating`,
        method: 'POST',
        body: { doctorId, rating, review },
      }),
    }),

    updateProfileDoctor: builder.mutation({
      query: ({
        name,
        email,
        phone,
        address,
        dob,
        avatar,
        about,
        degree,
        experience,
        specialization,
      }) => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('email', email)
        formData.append('phone', phone)
        formData.append('address', address)
        formData.append('dob', dob)
        formData.append('avatar', avatar)
        formData.append('about', about)
        formData.append('degree', degree)
        formData.append('experience', experience)
        formData.append('specialization', specialization)
        return {
          url: '/users/doctor',
          method: 'PUT',
          body: formData,
        }
      },
    }),
  }),
})

export const {
  useSubmitQuizzesMutation,
  useGetQuizzesQuery,

  useLoginMutation,
  useAdminLoginMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useRegisterMutation,
  useUploadCertificatesMutation,

  useGetPostsQuery,
  useGetOwnPostsQuery,
  useGetPostDetailQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useLikePostMutation,
  useUnLikePostMutation,

  useGetPostCommentsQuery,
  useCommentPostMutation,

  useGetAccountsQuery,
  useApproveDoctorMutation,
  useRejectDoctorMutation,

  useGetDoctorDetailQuery,
  useGetDoctorProfileQuery,
  useGetPatientProfileQuery,
  useGetPatientDetailQuery,
  useGetDoctorsBasicInforQuery,
  useGetDoctorCommentsQuery,
  useGetSpecializationsQuery,
  useLazyGetDoctorsBasicInforQuery,

  useGetTagsQuery,

  useGetChatListQuery,
  useGetChatQuery,

  useGetDoctorSchedulesQuery,
  useGetPatientSchedulesQuery,
  useMakeScheduleMutation,
  useChangeStatusScheduleMutation,

  useRateDoctorMutation,

  useUpdateProfileDoctorMutation,
} = apiCaller
