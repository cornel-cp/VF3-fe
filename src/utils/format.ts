export const formatWalletAddress = (address: string, start: number = 8, end: number = 8) => {
  return `${address.slice(0, start)}...${address.slice(-end)}`;
};

export const formatBalance = (balance: number) => {
  const formattedBalance = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(balance);

  return isNaN(balance) ? "0.00" : formattedBalance;
};
