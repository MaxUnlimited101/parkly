import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const reservationSchema = z.object({
  id: z.number(),
  parkingSpotId: z.number(),
  userId: z.number(),
  startTime: z.string(),
  endTime: z.string(),
  totalCost: z.number()
})

export type Reservation = z.infer<typeof reservationSchema>
