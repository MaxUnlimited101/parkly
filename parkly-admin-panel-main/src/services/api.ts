import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '@/store';
import type { User } from '@/features/users/data/schema';

// =======================================================
// Schema Types (based on OpenAPI definitions)
// =======================================================

export interface CreateUserDTO {
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: string;
}

export interface LoginDTO {
  username: string;
}

export interface CreateReservationDTO {
  parkingSpotId: number;
  userId: number;
  startTime: string; // ISO date-time string
  endTime: string;
  totalCost: number;
}

export interface ReturnReservationDTO {
  id: number;
  parkingSpotId: number;
  userId: number;
  startTime: string;
  endTime: string;
  totalCost: number;
}

export interface ParkingArea {
  id: number;
  name: string;
  address: string;
  city: string;
  hourlyRate: number;
  longitude: number;
  latitude: number;
}

export interface ParkingSpot {
  id: number;
  spotNumber: string;
  parkingArea: ParkingArea;
  isAvailable: boolean;
}

export interface ReturnParkingSpotDTO {
  Id: number;
  spotNumber: string;
  parkingAreaId: number;
  isAvailable: boolean;
}

export interface CreateParkingSpotDTO {
  spotNumber: string;
  parkingAreaId: number;
  isAvailable: boolean;
}

export interface CreateParkingAreaDTO {
  name: string;
  address: string;
  city: string;
  hourlyRate: number;
  longitude: number;
  latitude: number;
}

// --- Pagination types ---
export interface SortObject {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface PageableObject {
  offset: number;
  sort: SortObject;
  paged: boolean;
  pageNumber: number;
  pageSize: number;
  unpaged: boolean;
}

export interface Page<T> {
  totalPages: number;
  totalElements: number;
  first: boolean;
  last: boolean;
  size: number;
  content: T[];
  number: number;
  sort: SortObject;
  pageable: PageableObject;
  numberOfElements: number;
  empty: boolean;
}

// --- Actuator Link (for completeness) ---
export interface Link {
  href: string;
  templated?: boolean;
}

// =======================================================
// Create the RTK Query API service with endpoints
// =======================================================


export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    credentials: 'include',
    baseUrl: 'https://parkly-parkly.azuremicroservices.io/api/',
    prepareHeaders: (headers, { getState }) => {
      const { auth } = getState() as RootState;
      console.log("Request Prepare")
      console.log(auth.isAuthenticated && auth.user && auth.user?.role);
      if (auth.isAuthenticated && auth.user && auth.user?.role) {
        headers.set('Cookie', `userRole=${auth.user.role}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User', 'Reservation', 'ParkingSpot', 'ParkingArea'],
  endpoints: (builder) => ({
    // ---------------------------
    // USERS endpoints
    // ---------------------------
    getUserById: builder.query<User, number>({
      query: (id) => `users/${id}`,
    }),
    updateUser: builder.mutation<User, { id: number; data: User }>({
      query: ({ id, data }) => ({
        url: `users/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'User', id }]
    }),
    deleteUser: builder.mutation<void, number>({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: () => [{ type: 'User', id: 'LIST' }]
    }),
    createUser: builder.mutation<User, CreateUserDTO>({
      query: (data) => ({
        url: `users`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: () => [{ type: 'User', id: 'LIST' }]
    }),
    loginUser: builder.mutation<User, LoginDTO>({
      query: (data) => ({
        url: `users/login`,
        method: 'POST',
        body: data,
      }),
    }),
    getAllUsers: builder.query<
      Page<User>,
      {
        page: number;
        size?: number;
        sortDirection?: string;
        searchQuery?: string;
        searchQueryParameter?: string;
      }
    >({
      query: ({ page, size = 1000, sortDirection = 'asc', searchQuery, searchQueryParameter }) => ({
        url: `users/page/${page}`,
        params: { size, sortDirection, searchQuery, searchQueryParameter },
      }),
      // This allows RTK Query to manage caching for each individual user as well as the list.
      providesTags: (result) =>
        result
          ? [
              ...result.content.map(({ id }) => ({ type: 'User' as const, id })),
              { type: 'User', id: 'LIST' },
            ]
          : [{ type: 'User', id: 'LIST' }],
    }),

    // ---------------------------
    // RESERVATIONS endpoints
    // ---------------------------
    getReservationById: builder.query<ReturnReservationDTO, number>({
      query: (id) => `reservations/${id}`,
    }),
    updateReservation: builder.mutation<ReturnReservationDTO, { id: number; data: CreateReservationDTO }>({
      query: ({ id, data }) => ({
        url: `reservations/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Reservation', id }]
    }),
    deleteReservation: builder.mutation<void, number>({
      query: (id) => ({
        url: `reservations/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: () => [{ type: 'Reservation', id: 'LIST' }]
    }),
    createReservation: builder.mutation<ReturnReservationDTO, CreateReservationDTO>({
      query: (data) => ({
        url: `reservations`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: () => [{ type: 'Reservation', id: 'LIST' }]
    }),
    getAllUserReservations: builder.query<
      Page<ReturnReservationDTO>,
      { id: number; page: number; size?: number; sortDirection?: string }
    >({
      query: ({ id, page, size = 1000, sortDirection = 'asc' }) => ({
        url: `reservations/user/${id}/page/${page}`,
        params: { size, sortDirection },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.content.map(({ id }) => ({ type: 'Reservation' as const, id })),
              { type: 'Reservation', id: 'LIST' },
            ]
          : [{ type: 'Reservation', id: 'LIST' }],
    }),
    getAllReservations: builder.query<
      Page<ReturnReservationDTO>,
      { page: number; size?: number; sortDirection?: string }
    >({
      query: ({ page, size = 1000, sortDirection = 'asc' }) => ({
        url: `reservations/page/${page}`,
        params: { size, sortDirection },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.content.map(({ id }) => ({ type: 'Reservation' as const, id })),
              { type: 'Reservation', id: 'LIST' },
            ]
          : [{ type: 'Reservation', id: 'LIST' }],
    }),

    // ---------------------------
    // PARKING SPOTS endpoints
    // ---------------------------
    getParkingSpotById: builder.query<ReturnParkingSpotDTO, number>({
      query: (id) => `parking-spots/${id}`,
    }),
    updateParkingSpot: builder.mutation<ReturnParkingSpotDTO, { id: number; data: ParkingSpot }>({
      query: ({ id, data }) => ({
        url: `parking-spots/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: () => [{ type: 'ParkingSpot', id: 'LIST' }]
    }),
    deleteParkingSpot: builder.mutation<void, number>({
      query: (id) => ({
        url: `parking-spots/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: () => [{ type: 'ParkingSpot', id: 'LIST' }]
    }),
    createParkingSpot: builder.mutation<ReturnParkingSpotDTO, CreateParkingSpotDTO>({
      query: (data) => ({
        url: `parking-spots`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: () => [{ type: 'ParkingSpot', id: 'LIST' }]
    }),
    getAllParkingSpots: builder.query<
      Page<ReturnParkingSpotDTO>,
      { page: number; size?: number; sortBy?: string; sortDirection?: string }
    >({
      query: ({ page, size = 1000, sortBy = 'spotNumber', sortDirection = 'asc' }) => ({
        url: `parking-spots/page/${page}`,
        params: { size, sortBy, sortDirection },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.content.map(({ Id }) => ({ type: 'ParkingSpot' as const, Id })),
              { type: 'ParkingSpot', id: 'LIST' },
            ]
          : [{ type: 'ParkingSpot', id: 'LIST' }],
    }),
    getAllParkingSpotsByParkingAreaId: builder.query<ReturnParkingSpotDTO[], number>({
      query: (paId) => ({
        url: `parking-spots/pa`,
        params: { paId },
      })
    }),

    // ---------------------------
    // PARKING AREAS endpoints
    // ---------------------------
    getParkingAreaById: builder.query<ParkingArea, number>({
      query: (id) => `parking-areas/${id}`,
    }),
    updateParkingArea: builder.mutation<ParkingArea, { id: number; data: ParkingArea }>({
      query: ({ id, data }) => ({
        url: `parking-areas/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: () => [{ type: 'ParkingArea', id: 'LIST' }]
    }),
    deleteParkingArea: builder.mutation<void, number>({
      query: (id) => ({
        url: `parking-areas/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: () => [{ type: 'ParkingArea', id: 'LIST' }]
    }),
    createParkingArea: builder.mutation<ParkingArea, CreateParkingAreaDTO>({
      query: (data) => ({
        url: `parking-areas`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: () => [{ type: 'ParkingArea', id: 'LIST' }]
    }),
    getAllParkingAreas: builder.query<
      Page<ParkingArea>,
      {
        page: number;
        size?: number;
        sortDirection?: string;
        searchQuery?: string;
        searchQueryParameter?: string;
      }
    >({
      query: ({ page, size = 1000, sortDirection = 'asc', searchQuery, searchQueryParameter }) => ({
        url: `parking-areas/page/${page}`,
        params: { size, sortDirection, searchQuery, searchQueryParameter },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.content.map(({ id }) => ({ type: 'ParkingArea' as const, id })),
              { type: 'ParkingArea', id: 'LIST' },
            ]
          : [{ type: 'ParkingArea', id: 'LIST' }],
    }),

    // ---------------------------
    // ACTUATOR endpoints
    // ---------------------------
    actuatorLinks: builder.query<Record<string, Record<string, Link>>, void>({
      query: () => `actuator`,
    }),
    actuatorHealth: builder.query<Record<string, any>, void>({
      query: () => `actuator/health`,
    }),
    actuatorEnv: builder.query<Record<string, any>, void>({
      query: () => `actuator/env`,
    }),
    actuatorEnvToMatch: builder.query<Record<string, any>, string>({
      query: (toMatch) => `actuator/env/${toMatch}`,
    }),
  }),
});

// =======================================================
// Export hooks for usage in functional components
// =======================================================
export const {
  // Users
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useCreateUserMutation,
  useLoginUserMutation,
  useGetAllUsersQuery,
  // Reservations
  useGetReservationByIdQuery,
  useUpdateReservationMutation,
  useDeleteReservationMutation,
  useCreateReservationMutation,
  useGetAllUserReservationsQuery,
  useGetAllReservationsQuery,
  // Parking Spots
  useGetParkingSpotByIdQuery,
  useUpdateParkingSpotMutation,
  useDeleteParkingSpotMutation,
  useCreateParkingSpotMutation,
  useGetAllParkingSpotsQuery,
  useGetAllParkingSpotsByParkingAreaIdQuery,
  // Parking Areas
  useGetParkingAreaByIdQuery,
  useUpdateParkingAreaMutation,
  useDeleteParkingAreaMutation,
  useCreateParkingAreaMutation,
  useGetAllParkingAreasQuery,
  // Actuator
  useActuatorLinksQuery,
  useActuatorHealthQuery,
  useActuatorEnvQuery,
  useActuatorEnvToMatchQuery,
} = api;
