export function formatPrice(price: string | number | undefined | null, lang: string = 'fr'): string {
  if (!price) return "0 DZD";
  const priceStr = String(price);
  
  // Extract just the digits
  const rawPrice = Number(priceStr.replace(/[^0-9]/g, ''));
  
  // If no digits found, just return the original string
  if (isNaN(rawPrice) || rawPrice === 0) {
    if (priceStr.toUpperCase().includes('DZD')) return priceStr;
    return priceStr + ' DZD';
  }
  
  // Arabic formatting: no space separation for thousands
  if (lang === 'ar') {
    return `${rawPrice} DZD`;
  }
  
  // Format with spaces for thousands (French locale standard for numbers)
  // e.g. 1000000 -> "1 000 000"
  const formattedNumber = rawPrice.toLocaleString('fr-FR').replace(/\s/g, ' ');
  
  return `${formattedNumber} DZD`;
}
