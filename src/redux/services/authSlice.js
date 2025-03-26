import { apiSlice } from './apiSlice';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: 'auth/register',
        method: 'POST',
        body: credentials,
      }),
    }),
    otpVerify: builder.mutation({
      query: (userData) => ({
        url: 'auth/otp-verification',
        method: 'POST',
        body: userData,
      }),
    }),
    reSendOtp: builder.mutation({
      query: (userData) => ({
        url: 'auth/resend-otp',
        method: 'POST',
        body: userData,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (credentials) => ({
        url: 'auth/forgot-password',
        method: 'POST',
        body: credentials,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({token,credentials}) => ({
        url: `auth/reset-password/${token}`,
        method: 'POST',
        body: credentials,
      }),
    }),
    getUserProfile: builder.query({
      query: () => 'auth/profile',
    }),
  }),
});

export const {  useRegisterMutation,useOtpVerifyMutation, useReSendOtpMutation,useLoginMutation,useForgotPasswordMutation,useResetPasswordMutation, useGetUserProfileQuery, } = authApi;