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

class Authentication implements authTypes{
    
    constructor(usrId: number, apiKey: string, subscriptionKey: string){

    }

    requestToPay(): void{

    }

    getTransactionStatus(): void{

    }

    getAccountBalance(): void{

    }

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