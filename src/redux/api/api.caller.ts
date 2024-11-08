/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./fetchBase";
import { IDoctorResponse } from "../../types/doctor"; // Adjust the import path as necessary

export const apiCaller = createApi({
  reducerPath: "apiCaller",
  refetchOnMountOrArgChange: 30,
  baseQuery: customBaseQuery(),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (user) => ({
        url: "/auth/login",
        method: "POST",
        body: user,
      }),
    }),
    getDoctors: builder.query<IDoctorResponse, void>({
      query: () => ({
        url: `/users/all?page=0&limit=100&role=doctor`,
        method: "GET",
      }),
    }),
    getURLImage: builder.mutation<{ data: string }, FormData>({
      query: (formData) => ({
        url: `/menu/getUrlImage`,
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useGetDoctorsQuery,
  useLoginMutation,
  useGetURLImageMutation,
} = apiCaller;
