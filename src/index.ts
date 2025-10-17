/**
 * Collections: For rceiving payments from customers.
 * Disbursements: For sending payments out (e.g payouts, salaries).
 * Remittances: For international money transfers.
 */

interface authTypes{
    userId: number,
    apiKey: string,
    subscriptionKey: string
}

class Authentication{

    constructor(usrId: number, apiKey: string, subscriptionKey: string){

    }
    
    // Request Payment from users
    requestToPay(): void{

    }

    // Get Payment Status
    getTransactionStatus(): void{

    }

    // Get Account Balance
    getAccountBalance(): void{

    }

    // Validate account holder
    validateAccountHolder(): void{
        
    }
}

class Collection{
    constructor(){

    }
}


class Disbursement{
    constructor(){

    }
}

class Remittance{
    constructor(){

    }
}