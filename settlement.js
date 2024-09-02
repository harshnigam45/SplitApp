exports.minimizeTransactions = (debts) => {
    const result = [];

    debts.sort((a, b) => a.amount - b.amount);

    let i = 0;
    let j = debts.length - 1;

    while (i < j) {
        const debtor = debts[i];
        const creditor = debts[j];

        const minAmount = Math.min(-debtor.amount, creditor.amount);
        result.push({ payer: debtor.user, payee: creditor.user, amount: minAmount });

        debtor.amount += minAmount;
        creditor.amount -= minAmount;

        if (debtor.amount === 0) i++;
        if (creditor.amount === 0) j--;
    }

    return result;
};
