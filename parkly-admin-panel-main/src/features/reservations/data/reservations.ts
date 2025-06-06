import { Reservation } from "./schema";

export const reservations: Reservation[] = [
  // { id: 1, parkingSpot: 'A1', userId: '1', startTime: '2023-10-01T08:00:00Z', endTime: '2023-10-01T10:00:00Z', totalCost: 10.00 },
  // { id: 2, parkingSpot: 'A2', userId: '2', startTime: '2023-10-01T09:00:00Z', endTime: '2023-10-01T11:00:00Z', totalCost: 12.00 },
  // { id: 3, parkingSpot: 'A3', userId: '3', startTime: '2023-10-01T10:00:00Z', endTime: '2023-10-01T12:00:00Z', totalCost: 15.00 },
  // { id: 4, parkingSpot: 'B1', userId: '4', startTime: '2023-10-01T11:00:00Z', endTime: '2023-10-01T13:00:00Z', totalCost: 8.00 },
  // { id: 5, parkingSpot: 'B2', userId: '5', startTime: '2023-10-01T12:00:00Z', endTime: '2023-10-01T14:00:00Z', totalCost: 10.00 },
  // { id: 6, parkingSpot: 'B3', userId: '6', startTime: '2023-10-01T13:00:00Z', endTime: '2023-10-01T15:00:00Z', totalCost: 9.00 },
  // { id: 7, parkingSpot: 'C1', userId: '7', startTime: '2023-10-01T14:00:00Z', endTime: '2023-10-01T16:00:00Z', totalCost: 11.00 },
  // { id: 8, parkingSpot: 'C2', userId: '8', startTime: '2023-10-01T15:00:00Z', endTime: '2023-10-01T17:00:00Z', totalCost: 13.00 },
  // { id: 9, parkingSpot: 'C3', userId: '9', startTime: '2023-10-01T16:00:00Z', endTime: '2023-10-01T18:00:00Z', totalCost: 14.00 },
  // { id: 10, parkingSpot: 'D1', userId: '10', startTime: '2023-10-01T17:00:00Z', endTime: '2023-10-01T19:00:00Z', totalCost: 16.00 },
  // { id: 11, parkingSpot: 'D2', userId: '1', startTime: '2023-10-02T08:00:00Z', endTime: '2023-10-02T10:00:00Z', totalCost: 10.00 },
  // { id: 12, parkingSpot: 'D3', userId: '2', startTime: '2023-10-02T09:00:00Z', endTime: '2023-10-02T11:00:00Z', totalCost: 12.00 },
  // { id: 13, parkingSpot: 'E1', userId: '3', startTime: '2023-10-02T10:00:00Z', endTime: '2023-10-02T12:00:00Z', totalCost: 15.00 },
  // { id: 14, parkingSpot: 'E2', userId: '4', startTime: '2023-10-02T11:00:00Z', endTime: '2023-10-02T13:00:00Z', totalCost: 8.00 },
  // { id: 15, parkingSpot: 'E3', userId: '5', startTime: '2023-10-02T12:00:00Z', endTime: '2023-10-02T14:00:00Z', totalCost: 10.00 },
  // { id: 16, parkingSpot: 'F1', userId: '6', startTime: '2023-10-02T13:00:00Z', endTime: '2023-10-02T15:00:00Z', totalCost: 9.00 },
  // { id: 17, parkingSpot: 'F2', userId: '7', startTime: '2023-10-02T14:00:00Z', endTime: '2023-10-02T16:00:00Z', totalCost: 11.00 },
  // { id: 18, parkingSpot: 'F3', userId: '8', startTime: '2023-10-02T15:00:00Z', endTime: '2023-10-02T17:00:00Z', totalCost: 13.00 },
  // { id: 19, parkingSpot: 'G1', userId: '9', startTime: '2023-10-02T16:00:00Z', endTime: '2023-10-02T18:00:00Z', totalCost: 14.00 },
  // { id: 20, parkingSpot: 'G2', userId: '10', startTime: '2023-10-02T17:00:00Z', endTime: '2023-10-02T19:00:00Z', totalCost: 16.00 },
  // { id: 21, parkingSpot: 'G3', userId: '1', startTime: '2023-10-03T08:00:00Z', endTime: '2023-10-03T10:00:00Z', totalCost: 10.00 },
  // { id: 22, parkingSpot: 'H1', userId: '2', startTime: '2023-10-03T09:00:00Z', endTime: '2023-10-03T11:00:00Z', totalCost: 12.00 },
  // { id: 23, parkingSpot: 'H2', userId: '3', startTime: '2023-10-03T10:00:00Z', endTime: '2023-10-03T12:00:00Z', totalCost: 15.00 },
  // { id: 24, parkingSpot: 'H3', userId: '4', startTime: '2023-10-03T11:00:00Z', endTime: '2023-10-03T13:00:00Z', totalCost: 8.00 },
  // { id: 25, parkingSpot: 'I1', userId: '5', startTime: '2023-10-03T12:00:00Z', endTime: '2023-10-03T14:00:00Z', totalCost: 10.00 },
  // { id: 26, parkingSpot: 'I2', userId: '6', startTime: '2023-10-03T13:00:00Z', endTime: '2023-10-03T15:00:00Z', totalCost: 9.00 },
  // { id: 27, parkingSpot: 'I3', userId: '7', startTime: '2023-10-03T14:00:00Z', endTime: '2023-10-03T16:00:00Z', totalCost: 11.00 },
  // { id: 28, parkingSpot: 'J1', userId: '8', startTime: '2023-10-03T15:00:00Z', endTime: '2023-10-03T17:00:00Z', totalCost: 13.00 },
  // { id: 29, parkingSpot: 'J2', userId: '9', startTime: '2023-10-03T16:00:00Z', endTime: '2023-10-03T18:00:00Z', totalCost: 14.00 },
  // { id: 30, parkingSpot: 'J3', userId: '10', startTime: '2023-10-03T17:00:00Z', endTime: '2023-10-03T19:00:00Z', totalCost: 16.00 },
];