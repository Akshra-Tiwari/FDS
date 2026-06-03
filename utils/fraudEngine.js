const calculateRiskScore =
  async (
    transaction,
    recentTransactionCount,
    lastTransaction
  ) => {

    let riskScore = 0;

    // HIGH AMOUNT
    if (
      transaction.amount > 50000
    ) {

      riskScore += 40;

    }

    // UNKNOWN LOCATION
    if (
      transaction.location ===
      "Unknown"
    ) {

      riskScore += 30;

    }

    // RAPID TRANSACTIONS
    if (
      recentTransactionCount >= 3
    ) {

      riskScore += 25;

    }

    // IMPOSSIBLE TRAVEL
    if (
      lastTransaction &&
      lastTransaction.location !==
      transaction.location
    ) {

      riskScore += 20;

    }

    // SUSPICIOUS DEVICE
    if (
      transaction.device ===
      "Unknown"
    ) {

      riskScore += 15;

    }

    // FAILED ATTEMPTS
    if (
      transaction.failedAttempts >= 3
    ) {

      riskScore += 20;

    }

    // LIMIT SCORE
    if (riskScore > 100) {

      riskScore = 100;

    }

    return riskScore;

};

module.exports =
  calculateRiskScore;