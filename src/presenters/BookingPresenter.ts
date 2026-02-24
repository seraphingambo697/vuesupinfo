import { checkAvailability, createBooking } from "@/api/bookingApi"
import { BookingViewModel } from "@/BookingViewModel/BookingViewModel"
import { BookingRequest } from "@/components/BookingRequest"

export default class BookingPresenter {
    constructor(private vm: BookingViewModel) { }



    async bookRoom(): Promise<void> {
        this.vm.setError(null)
        this.vm.setSuccess(false)
        this.vm.setLoading(true)

        try {
            const nights = this.vm.calculateNights()
            if (nights <= 0) throw new Error("Sélectionnez des dates valides")

            const available = await checkAvailability(
                this.vm.roomId.value,
                this.vm.startDate.value,
                this.vm.endDate.value
            )
            if (!available) {
                this.vm.setSuccess(false)
                throw new Error("Chambre indisponible")
            }


            this.vm.totalPrice.value = this.vm.calculateTotal()
            const bookingData: BookingRequest = {
                roomId: this.vm.roomId.value,
                startDate: this.vm.startDate.value,
                endDate: this.vm.endDate.value,
                total: this.vm.totalPrice.value
            }

            await createBooking(bookingData)
            this.vm.setSuccess(true)

        } catch (e: unknown) {
            this.vm.setSuccess(false)
            this.vm.setError(e instanceof Error ? e.message : "Erreur inconnue")
        } finally {
            this.vm.setLoading(false)

        }
    }
}