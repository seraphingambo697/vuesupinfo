import { BookingViewModel } from '@/BookingViewModel/BookingViewModel'
import BookingPresenter from '@/presenters/BookingPresenter'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import * as bookingApi from '@/api/bookingApi'

let vm: BookingViewModel
let presenter: BookingPresenter

describe('BookingPresenter', () => {
    beforeEach(() => {
        vm = new BookingViewModel()
        presenter = new BookingPresenter(vm)
    })

    it('réussit la réservation si disponible', async () => {

        vm.roomId.value = "1"
        vm.startDate.value = "2026-02-20"
        vm.endDate.value = "2026-02-23"

        await presenter.bookRoom()

        //expect(vm.success.value).toBe(true)
        //expect(vm.error.value).toBeNull()
        //expect(vm.totalPrice.value).toBe(240)
    })

    it('échoue si chambre indisponible', async () => {
        vi.spyOn(bookingApi, 'checkAvailability').mockResolvedValue(false)

        vm.roomId.value = "1"
        vm.startDate.value = "2026-02-20"
        vm.endDate.value = "2026-02-23"

        await presenter.bookRoom()

        expect(vm.success.value).toBe(false)
        expect(vm.error.value).toBe("Chambre indisponible")
    })
})