import { BookingRequest } from "@/components/BookingRequest.ts";
import { BookingResponse } from "@/components/BookingResponse.ts";

export async function checkAvailability(
    roomId: string,
    startDate: string,
    endDate: string
): Promise<boolean> {
    const response = await fetch('/api/check-availability', {
        method: 'POST',
        body: JSON.stringify({ roomId, startDate, endDate })
    })

    const data = await response.json()
    return data.available
}

export async function createBooking(
    data: BookingRequest
): Promise<BookingResponse> {
    const response = await fetch('/api/booking', {
        method: 'POST',
        body: JSON.stringify(data)
    })

    return await response.json()
}