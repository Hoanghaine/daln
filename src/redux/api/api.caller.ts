import { ITag } from './../../types/tag'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from '@reduxjs/toolkit/query/react'
import customBaseQuery from './fetchBase'
import { IQuizAnswer, IQuizResponse } from '../../types/quiz'
import { IDoctor, IDoctorDetailResponse } from '../../types/doctor'
import { Ipatient } from '../../types/patient'

import {
  IDoctorsResponse,
  IPostsResponse,
  IUsersResponse,
  IDoctorsBasicInforResponse,
} from '../../types/paginatedResponse'
import { register } from 'module'
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
    register: builder.mutation<IUserRegister, IUserRegister>({
      query: user => ({
        url: '/auth/register',
        method: 'POST',
        body: user,
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
    getPostDetail: builder.query({
      query: (postId: number) => `/posts/details/${postId}`,
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

    getAccounts: builder.query<IUsersResponse, { page: number; size: number }>({
      query: ({ page, size }) => ({
        url: `/users?page=${page}&size=${size}`,
        method: 'GET',
      }),
    }),
    getDoctorDetail: builder.query<IDoctorDetailResponse, number>({
      query: id => ({
        url: `/users/${id}`,
        method: 'GET',
      }),
    }),
    getPatientDetail: builder.query<Ipatient, number>({
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
  }),
})

export const {
  useSubmitQuizzesMutation,
  useLoginMutation,
  useGetQuizzesQuery,
  useGetPostsQuery,
  useGetPostDetailQuery,
  useAddPostMutation,
  useGetAccountsQuery,
  useGetDoctorDetailQuery,
  useGetPatientDetailQuery,
  useGetDoctorsBasicInforQuery,
  useRegisterMutation,
  useGetDoctorCommentsQuery,
  useGetSpecializationsQuery,
  useLazyGetDoctorsBasicInforQuery, // Lazy query for all doctors
  
} = apiCaller
