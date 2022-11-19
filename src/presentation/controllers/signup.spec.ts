import { SignUpController } from "./signup"

//sut = sistem under test
describe("SignUp Controller", ()=>{
    test("Should return 400 if no name is provided",()=>{
        const sut = new SignUpController()
        const httpRequest = {
            body:{
                email:"any_email@mail.com",
                password:"random_password",
                passwordConfirmation:"random_password"
            }
        }
       const httpResponse =  sut.handle(httpRequest)
       expect(httpResponse.statusCode).toBe(400)
    })
})