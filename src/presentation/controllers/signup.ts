export class SignUpController{
    handle(httpRequest:any) {
        return {
            body:new Error('Missing param: name'),
            statusCode:400
        }
    }
}