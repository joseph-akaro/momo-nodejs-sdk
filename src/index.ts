import axios from "axios"

// Momo Client Instance
export class MomoPay{
    environment: string
    primarySubscriptionKey: string
    secondarySubscriptionKey: string
    apiUser: string
    callBackUrl:string

    constructor(environment: string, primarySubscriptionKey:string, secondarySubscriptionKey:string, apiUser:string, callBackUrl:string){
            this.environment = environment
            this.primarySubscriptionKey = primarySubscriptionKey
            this.secondarySubscriptionKey = secondarySubscriptionKey
            this.apiUser = apiUser
            this.callBackUrl = callBackUrl
    }

    async authenticateUser(primarySubscriptionKey:string, apiUser:string){
        this.primarySubscriptionKey = primarySubscriptionKey
        this.apiUser = apiUser
        try {
            switch(this.environment){
                case 'sandbox':
                    const token = await axios(
                       {
                        url: "https://sandbox.momodeveloper.mtn.com/collection/oauth2/token/",
                        data:{
                            primarySubscriptionKey: primarySubscriptionKey,
                            apiUser: apiUser
                        }
                       }
                    ).catch(
                        (error) => {
                            throw new Error("Error:", error.message)
                        }
                    ).then(
                        (data) =>{
                            console.log(data)
                        }
                    )
                case 'production':
                default:
                    throw new Error('No working environment identified i.e sandbox, production')
                    break;
            }
        } catch (error) {
            throw console.error("Error:", error)
        }
    }
}