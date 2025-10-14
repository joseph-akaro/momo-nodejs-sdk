import { Collection } from "./controller/collectionController.js";


const getToken = () => {
    const sandbox = new Collection('https://josephakaro.com')

    const token = sandbox.getToken();

    return token
}

console.log(getToken())