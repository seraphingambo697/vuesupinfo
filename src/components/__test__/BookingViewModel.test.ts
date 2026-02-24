import { BookingViewModel } from '@/BookingViewModel/BookingViewModel'
import { describe, it, expect, beforeEach } from 'vitest'

let vm: BookingViewModel

describe('BookingViewModel', () => {
    beforeEach(() => {
        vm = new BookingViewModel()
    })

    it('doit calculer correctement le prix par nuit selon la chambre', () => {
        vm.roomId.value = "1"
        expect(vm.pricePerNight.value).toBe(80)

        vm.roomId.value = "2"
        expect(vm.pricePerNight.value).toBe(120)
    })

    it('doit calculer le nombre de nuits correctement', () => {
        vm.startDate.value = "2026-02-20"
        vm.endDate.value = "2026-02-23"
        expect(vm.calculateNights()).toBe(3)
    })

    it('doit calculer le total sans promo', () => {
        vm.roomId.value = "1"
        vm.startDate.value = "2026-02-20"
        vm.endDate.value = "2026-02-23"
        expect(vm.calculateTotal()).toBe(240)
    })

    it('doit appliquer le code promo SUMMER10', () => {
        vm.roomId.value = "2"
        vm.startDate.value = "2026-02-20"
        vm.endDate.value = "2026-02-23"
        vm.promoCode.value = "SUMMER10"
        expect(vm.calculateTotal()).toBe(324)
    })
})