import { v4 as uuidv4 } from "uuid";
import { ApiClient } from '../core/api-client';
import { Transaction, StatusResponse } from '../types';

/**
 * Handles the Collections API product.
 */
export class Collections {
  private apiClient: ApiClient;
  private subscriptionKey: string;

  constructor(apiClient: ApiClient, subscriptionKey: string) {
    this.apiClient = apiClient;
    this.subscriptionKey = subscriptionKey;
  }

  /**
   * Initiates a payment request from a customer.
   * @param transaction The details of the payment request.
   * @returns A unique reference ID for the transaction.
   */
  public async requestToPay(transaction: Transaction): Promise<string> {
    const referenceId = uuidv4();
    
    await this.apiClient.post(
      '/collection/v1_0/requesttopay',
      transaction,
      this.subscriptionKey,
      referenceId
    );
    
    // The referenceId is used to track the transaction status
    return referenceId;
  }

  /**
   * Checks the status of a specific payment request.
   * @param referenceId The reference ID returned from requestToPay.
   * @returns The current status of the transaction.
   */
  public async getTransactionStatus(referenceId: string): Promise<StatusResponse> {
    const response = await this.apiClient.get<StatusResponse>(
      `/collection/v1_0/requesttopay/${referenceId}`,
      this.subscriptionKey,
      uuidv4() // A new UUID is needed for the GET request itself
    );
    return response;
  }
}