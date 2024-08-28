export const formatAmount = (amount) => {
    // Check if the amount contains a decimal
    const hasDecimal = amount % 1 !== 0;
    const formattedAmount = hasDecimal ? Math.abs(amount).toFixed(2) : Math.abs(amount);
    
    // Return formatted amount with the dollar sign
    return amount < 0 ? `-$${formattedAmount}` : `$${formattedAmount}`;
  };

export const formatDate = (dateTime) => {
    const options = { month: 'short', day: '2-digit', year: 'numeric' };
    return new Date(dateTime).toLocaleDateString('en-US', options).replace(/,/g, '');
  };