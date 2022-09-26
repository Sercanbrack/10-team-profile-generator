const Engineer = require('../lib/Engineer')

describe("Engineer subclass", () => {
    describe("getGithub method", () => {
        it("returns the engineer's github", () => {
            const engineer = new Engineer('mark', 1, 'mark@iplier.com', 'markhasagithub')
            const github = engineer.getGithub()
            expect(github).toBe('markhasagithub')
        })
    })
    describe("getRole method", () => {
        it("returns the engineer's role (engineer)", () => {
            const engineer = new Engineer('mark', 1, 'mark@iplier.com', 'markhasagithub')
            const role = engineer.getRole()
            expect(role).toBe('Current role: Engineer')
        })
    })
})