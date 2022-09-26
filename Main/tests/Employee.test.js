const Employee = require('../lib/Employee')

describe("Employee class", () => {
    describe("getName method", () => {
        it("returns the employee's name", () => {
            const employee = new Employee('test', 1, 'test@test.com')
            const name = employee.getName()
            expect(employee.name).toBe('test')
        })
    })
    describe("getId method", () => {
        it("returns the employee's id", () => {
            const employee = new Employee('test', 1, 'test@test.com')
            const id = employee.getId()
            expect(id).toBe(1)
        })
    })
    describe("getEmail method", () => {
        it("returns the employee's email", () => {
            const employee = new Employee('test', 1, 'test@test.com')
            const email = employee.getEmail()
            expect(email).toBe('test@test.com')
        })
    })
    describe("getRole method", () => {
        it("returns 'Employee'", () => {
            const employee = new Employee('test', 1, 'test@test.com')
            const role = employee.getRole()
            expect(role).toBe('Employee')
        })
    })
})