const Manager = require('../lib/Manager')

describe("Manager subclass", () => {
    describe("getRole method", () => {
        it("returns the manager's role (manager)", () => {
            const manager = new Manager('mark', 1, 'mark@iplier.com', 'markhasagithub')
            const role = manager.getRole()
            expect(role).toBe('Current role: Manager')
        })
    })
})

