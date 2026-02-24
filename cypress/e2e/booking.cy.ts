describe('Booking flow', () => {

    beforeEach(() => {
        cy.visit('/')
    })

    it('réservation réussie avec code promo', () => {
        cy.contains('Chambre :').next('select').select('1')
        cy.contains('Date début :').next('input').type('2026-02-20')
        cy.contains('Date fin :').next('input').type('2026-02-23')
        cy.contains('Code promo :').next('input').type('SUMMER10')

        cy.intercept('POST', '/api/check-availability', { available: true }).as('checkAvailability')
        cy.intercept('POST', '/api/booking', { status: 'ok', totalPrice: 216 }).as('createBooking')

        cy.contains('Réserver').click()

        cy.wait('@checkAvailability')
        cy.wait('@createBooking')

        cy.contains('Réservation confirmée')
    })

    it('chambre indisponible', () => {
        cy.contains('Chambre :').next('select').select('1')
        cy.contains('Date début :').next('input').type('2026-02-20')
        cy.contains('Date fin :').next('input').type('2026-02-23')

        cy.intercept('POST', '/api/check-availability', { available: false }).as('checkAvailability')

        cy.contains('Réserver').click()
        cy.wait('@checkAvailability')

        cy.contains('.error', 'Chambre indisponible')
    })
})