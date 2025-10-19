import axios, { AxiosInstance, AxiosError } from 'axios';
import { MomoConfig, Transaction, StatusResponse } from '../types';
import { MomoAuthenticationError, MomoTransactionError } from '../errors';

// Base URLs for the MTN MoMo API
const BASE_URLS = {
  sandbox: 'https://sandbox.momodeveloper.mtn.com',
  production: 'https://proxy.momoapi.mtn.com',
};

/**
 * Internal class to handle all HTTP communication with the MTN MoMo API.
 * It manages authentication, token refreshing, and request signing.
 * @internal
 */
export class ApiClient {
  private httpClient: AxiosInstance;
  private config: MomoConfig;
  private accessToken: string | null = null;
  private tokenExpiry: Date | null = null;

  constructor(config: MomoConfig) {
    this.config = config;
    this.httpClient = axios.create({
      baseURL: BASE_URLS[this.config.environment],
    });
  }

  /**
   * Generates or refreshes the OAuth 2.0 access token.
   */
  private async authenticate(): Promise<void> {
    // In a real implementation, you would check if the token is null or expired
    console.log('Authenticating...');
    const credentials = Buffer.from(
      `${this.config.apiUser}:${this.config.apiKey}`
    ).toString('base64');

    try {
      const response = await this.httpClient.post(
        '/collection/token/', // This endpoint is for the Collections product
        null,
        {
          headers: {
            'Ocp-Apim-Subscription-Key': this.config.primarySubscriptionKey,
            'Authorization': `Basic ${credentials}`,
          },
        }
      );
      this.accessToken = response.data.access_token;
      // Set expiry to a little before the actual expiry time for safety
      const expiresIn = response.data.expires_in - 300; // 5 mins buffer
      this.tokenExpiry = new Date(Date.now() + expiresIn * 1000);
      console.log('Authentication successful.');
    } catch (error) {
      throw new MomoAuthenticationError('Failed to get access token.');
    }
  }

  /**
   * Executes a request, ensuring a valid access token is present.
   */
  private async request<T>(
    method: 'post' | 'get',
    url: string,
    subscriptionKey: string,
    data: object | null = null,
    referenceId: string
  ): Promise<T> {
    if (!this.accessToken || (this.tokenExpiry && this.tokenExpiry < new Date())) {
      await this.authenticate();
    }

    const headers = {
      'Authorization': `Bearer ${this.accessToken}`,
      'X-Reference-Id': referenceId,
      'X-Target-Environment': this.config.environment,
      'Ocp-Apim-Subscription-Key': subscriptionKey,
      'Content-Type': 'application/json',
    };
    
    if (this.config.callbackUrl) {
      headers['X-Callback-Url'] = this.config.callbackUrl;
    }

    try {
      const response = await this.httpClient.request({
        method,
        url,
        data,
        headers,
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      throw new MomoTransactionError(
        'API request failed',
        axiosError.response?.data
      );
    }
  }

  public post<T>(url: string, data: object, subscriptionKey: string, referenceId: string): Promise<T> {
    return this.request<T>('post', url, subscriptionKey, data, referenceId);
  }

  public get<T>(url: string, subscriptionKey: string, referenceId: string): Promise<T> {
    return this.request<T>('get', url, subscriptionKey, null, referenceId);
  }
}