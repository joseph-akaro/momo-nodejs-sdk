import { MomoConfig } from './types';
import { ApiClient } from './core/api-client';
import { Collections } from './module/collection';
// import { Disbursements } from './modules/disbursements'; // To be added later

/**
 * The main entry point for the MTN MoMo SDK.
 */
export class MomoClient {
  public collections: Collections;
  // public disbursements: Disbursements;

  private apiClient: ApiClient;

  constructor(config: MomoConfig) {
    this.apiClient = new ApiClient(config);

    // Each product uses a different subscription key.
    // We pass the primary one here as it's often used for Collections.
    this.collections = new Collections(this.apiClient, config.primarySubscriptionKey);
    // this.disbursements = new Disbursements(this.apiClient, config.secondarySubscriptionKey);
  }
}