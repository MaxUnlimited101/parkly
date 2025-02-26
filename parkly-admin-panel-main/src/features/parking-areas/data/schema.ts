import { z } from 'zod'

export const parkingAreaSchema = z.object({
  id: z.number(),
  name: z.string(),
  address: z.string(),
  city: z.string(),
  hourlyRate: z.number(),
  longitude: z.number(),
  latitude: z.number()
})

export type ParkingArea = z.infer<typeof parkingAreaSchema>