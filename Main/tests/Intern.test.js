const Intern = require('../lib/Intern')

describe("Intern subclass", () => {
    describe("getSchool method", () => {
        it("returns the intern's school", () => {
            const intern = new Intern('carl', 3, 'carlkarl@owca.org', 'Danville University')
            const school = intern.getSchool()
            expect(school).toBe('Danville University')
        })
    })
    describe("getRole method", () => {
        it("returns the intern's role (intern)", () => {
            const intern = new Intern('carl', 3, 'carlkarl@owca.org', 'Danville University')
            const role = intern.getRole()
            expect(role).toBe('Current role: Intern')
        })
    })
})