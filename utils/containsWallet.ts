export function containsWallet(
    value: unknown,
    walletAddress: string,
  ): boolean {
    if (typeof value === "string") {
      return value === walletAddress;
    }
  
    if (Array.isArray(value)) {
      return value.some((item) =>
        containsWallet(item, walletAddress),
      );
    }
  
    if (value !== null && typeof value === "object") {
      return Object.values(value).some((item) =>
        containsWallet(item, walletAddress),
      );
    }
  
    return false;
  }