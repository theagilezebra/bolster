export default function (accounts) {
  return accounts.map((account) => {
    account.availableBalance = +account.availableBalance;
    account.currentBalance = +account.currentBalance;
    return account;
  });
}
