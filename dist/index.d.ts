declare class MomoPay {
    environment: string;
    primarySubscriptionKey: string;
    secondarySubscriptionKey: string;
    apiUser: string;
    callBackUrl: string;
    constructor(environment: string, primarySubscriptionKey: string, secondarySubscriptionKey: string, apiUser: string, callBackUrl: string);
    authenticateUser(primarySubscriptionKey: string, apiUser: string): Promise<void>;
}

export { MomoPay };
