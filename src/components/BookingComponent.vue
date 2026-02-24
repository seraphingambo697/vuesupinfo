<template>
  <div class="booking">

    <label>Chambre :</label>
    <select v-model="vm.roomId">
      <option 
        v-for="room in vm.rooms.value" 
        :key="room.id" 
        :value="room.id">
        {{ room.name }} - {{ room.price }}€/nuit
      </option>
    </select>

    <label>Date début :</label>
    <input type="date" v-model="vm.startDate.value" />

    <label>Date fin :</label>
    <input type="date" v-model="vm.endDate.value" />

    <label>Code promo :</label>
    <input type="text" v-model="vm.promoCode.value" />

    <button @click="presenter.bookRoom()" :disabled="vm.loading.value">
      {{ vm.loading.value ? "Réservation..." : "Réserver" }}
    </button>

    <p v-if="vm.error" class="error">{{ vm.error }}</p>
    <p v-if="vm.success" class="success">
      Réservation confirmée ! Total : {{ vm.totalPrice.value }} €
    </p>

  </div>
</template>

<script setup lang="ts">
import { BookingViewModel } from '@/BookingViewModel/BookingViewModel';
import BookingPresenter from '@/presenters/BookingPresenter';
import { onMounted } from 'vue';
const vm = new BookingViewModel()
const presenter = new BookingPresenter(vm)



onMounted(() => {
    vm.setSuccess(false)
    vm.setError(null)
    vm.setLoading(false)
})

/*import { checkAvailability, createBooking } from '../api/bookingApi'
import {BookingRequest} from "@/components/BookingRequest.ts";

const roomId = ref<string>("1")
const startDate = ref<string>("")
const endDate = ref<string>("")
const promoCode = ref<string>("")
const loading = ref<boolean>(false)
const error = ref<string | null>(null)
const success = ref<boolean>(false)
const totalPrice = ref<number>(0)

const pricePerNight = computed<number>(() => {
  return roomId.value === "1" ? 80 : 120
})

function calculateNights(): number {
  if (!startDate.value || !endDate.value) return 0

  const start = new Date(startDate.value)
  const end = new Date(endDate.value)

  const diff = end.getTime() - start.getTime()
  const nights = diff / (1000 * 60 * 60 * 24)

  return nights > 0 ? nights : 0
}*/

/*function calculateTotal(): number {
  const nights = calculateNights()

  if (nights <= 0) {
    throw new Error("Dates invalides")
  }

  let total = nights * pricePerNight.value

  if (promoCode.value === "SUMMER10") {
    total *= 0.9
  }

  if (nights > 7) {
    total *= 0.95
  }

  return Math.round(total)
}*/

/*async function bookRoom(): Promise<void> {
  error.value = null
  success.value = false
  loading.value = true

  try {
    const nights = calculateNights()
    if (nights <= 0) {
      throw new Error("Sélectionnez des dates valides")
    }

    const available: boolean = await checkAvailability(
        roomId.value,
        startDate.value,
        endDate.value
    )

    if (!available) {
      throw new Error("Chambre indisponible")
    }

    totalPrice.value = calculateTotal()

    const bookingData: BookingRequest = {
      roomId: roomId.value,
      startDate: startDate.value,
      endDate: endDate.value,
      total: totalPrice.value
    }

    await createBooking(bookingData)

    success.value = true

  } catch (e: unknown) {
    if (e instanceof Error) {
      error.value = e.message
    } else {
      error.value = "Erreur inconnue"
    }
  } finally {
    loading.value = false
  }
}*/
</script>



<style scoped>
.booking {
  display: flex;
  flex-direction: column;
  max-width: 300px;
}

input, select {
  margin-bottom: 10px;
  padding: 5px;
}

button {
  margin-top: 10px;
}

.error {
  color: red;
}

.success {
  color: green;
}
</style>
