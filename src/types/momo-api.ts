/**
 * Configuration for the MomoClient.
 */
export interface MomoConfig {
  environment: 'sandbox' | 'production';
  // Primary and secondary keys from your developer portal profile
  primarySubscriptionKey: string;
  secondarySubscriptionKey: string;
  // Credentials generated via the provisioning API
  apiUser: string;
  apiKey: string;
  // Your server's public URL to receive transaction status updates
  callbackUrl?: string;
}

/**
 * Represents the payer in a transaction.
 */
export interface Payer {
  partyIdType: 'MSISDN' | 'EMAIL' | 'ALIAS';
  partyId: string;
}

/**
 * Represents a request-to-pay transaction.
 */
export interface Transaction {
  amount: string;
  currency: string;
  externalId: string; // ID from your system, used for reconciliation
  payer: Payer;
  payerMessage: string;
  payeeNote: string;
}

/**
 * Represents the status of a transaction.
 */
export interface StatusResponse {
  amount: string;
  currency: string;
  financialTransactionId?: string;
  externalId: string;
  payer: Payer;
  status: 'PENDING' | 'SUCCESSFUL' | 'FAILED';
  reason?: string;
}