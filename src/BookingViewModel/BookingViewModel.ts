import { RoomOption } from '@/interfaces/RoomOption'
import { ref, computed } from 'vue'

export class BookingViewModel {

    roomId = ref<string>("1")
    startDate = ref<string>("")
    endDate = ref<string>("")
    promoCode = ref<string>("")
    loading = ref<boolean>(false)
    error = ref<string | null>(null)
    success = ref<boolean>(false)
    totalPrice = ref<number>(0)

    rooms = ref<RoomOption[]>([
        { id: "1", name: "Standard", price: 80 },
        { id: "2", name: "Deluxe", price: 120 },
    ])

    // getters et setters
    setError(msg: string | null) { this.error.value = msg }
    setSuccess(val: boolean) { this.success.value = val }
    setLoading(val: boolean) { this.loading.value = val }

    pricePerNight = computed<number>(() => {
        return this.roomId.value === "1" ? 80 : 120
    })

    calculateNights(): number {
        if (!this.startDate.value || !this.endDate.value) return 0

        const start = new Date(this.startDate.value)
        const end = new Date(this.endDate.value)

        const diff = end.getTime() - start.getTime()
        const nights = diff / (1000 * 60 * 60 * 24)

        return nights > 0 ? nights : 0
    }

    calculateTotal(): number {
        const nights = this.calculateNights()

        if (nights <= 0) {
            throw new Error("Dates invalides")
        }

        let total = nights * this.pricePerNight.value

        if (this.promoCode.value === "SUMMER10") {
            total *= 0.9
        }

        if (nights > 7) {
            total *= 0.95
        }

        return Math.round(total)
    }


}