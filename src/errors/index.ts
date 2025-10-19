/**
 * Base error class for all SDK-specific errors.
 */
export class MomoError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

/**
 * Thrown for issues related to authentication (e.g., invalid keys).
 */
export class MomoAuthenticationError extends MomoError {}

/**
 * Thrown when an API call fails due to issues with the transaction itself.
 */
export class MomoTransactionError extends MomoError {
  public response?: any; // The full API error response from MTN

  constructor(message: string, response?: any) {
    super(message);
    this.response = response;
  }
}