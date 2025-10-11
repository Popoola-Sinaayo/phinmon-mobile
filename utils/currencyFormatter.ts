import { getCurrencySymbol } from './getCurrencySymbol';

/**
 * Currency formatting options
 */
export interface CurrencyFormatOptions {
  currencyCode: string;
  locale?: string;
  showSymbol?: boolean;
  showCode?: boolean;
  decimalPlaces?: number;
  useGrouping?: boolean;
  symbolPosition?: 'before' | 'after';
  customSymbol?: string;
}

/**
 * Format a number as currency with proper localization
 * @param amount - The amount to format
 * @param options - Formatting options
 * @returns Formatted currency string
 */
export const formatCurrency = (
  amount: number,
  options: CurrencyFormatOptions
): string => {
  const {
    currencyCode,
    locale = 'en-US',
    showSymbol = true,
    showCode = false,
    decimalPlaces = 2,
    useGrouping = true,
    symbolPosition = 'before',
    customSymbol,
  } = options;

  // Get the currency symbol
  const symbol = customSymbol || getCurrencySymbol(currencyCode);

  // Format the number
  const formatter = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
    useGrouping: useGrouping,
  });

  const formattedNumber = formatter.format(amount);

  // Build the final string
  let result = formattedNumber;

  if (showSymbol) {
    if (symbolPosition === 'before') {
      result = `${symbol}${formattedNumber}`;
    } else {
      result = `${formattedNumber}${symbol}`;
    }
  }

  if (showCode) {
    result += ` ${currencyCode.toUpperCase()}`;
  }

  return result;
};

/**
 * Format currency with common presets
 * @param amount - The amount to format
 * @param currencyCode - Three-letter currency code
 * @param preset - Preset formatting style
 * @returns Formatted currency string
 */
export const formatCurrencyPreset = (
  amount: number,
  currencyCode: string,
  preset: 'standard' | 'compact' | 'symbol-only' | 'code-only' = 'standard'
): string => {
  const presets = {
    standard: {
      showSymbol: true,
      showCode: false,
      decimalPlaces: 2,
      useGrouping: true,
      symbolPosition: 'before' as const,
    },
    compact: {
      showSymbol: true,
      showCode: false,
      decimalPlaces: 0,
      useGrouping: true,
      symbolPosition: 'before' as const,
    },
    'symbol-only': {
      showSymbol: true,
      showCode: false,
      decimalPlaces: 2,
      useGrouping: true,
      symbolPosition: 'before' as const,
    },
    'code-only': {
      showSymbol: false,
      showCode: true,
      decimalPlaces: 2,
      useGrouping: true,
      symbolPosition: 'before' as const,
    },
  };

  return formatCurrency(amount, {
    currencyCode,
    ...presets[preset],
  });
};

/**
 * Format currency for display in lists/cards (compact format)
 * @param amount - The amount to format
 * @param currencyCode - Three-letter currency code
 * @returns Compact formatted currency string
 */
export const formatCurrencyCompact = (amount: number, currencyCode: string): string => {
  const symbol = getCurrencySymbol(currencyCode);
  
  if (Math.abs(amount) >= 1000000) {
    return `${symbol}${(amount / 1000000).toFixed(1)}M`;
  } else if (Math.abs(amount) >= 1000) {
    return `${symbol}${(amount / 1000).toFixed(1)}K`;
  } else {
    return formatCurrencyPreset(amount, currencyCode, 'standard');
  }
};

/**
 * Format currency with proper spacing and alignment
 * @param amount - The amount to format
 * @param currencyCode - Three-letter currency code
 * @param maxLength - Maximum length for alignment
 * @returns Formatted currency string with proper spacing
 */
export const formatCurrencyAligned = (
  amount: number,
  currencyCode: string,
  maxLength: number = 12
): string => {
  const formatted = formatCurrencyPreset(amount, currencyCode, 'standard');
  return formatted.padStart(maxLength, ' ');
};

/**
 * Parse currency string back to number
 * @param currencyString - Formatted currency string
 * @param currencyCode - Three-letter currency code
 * @returns Parsed number or null if invalid
 */
export const parseCurrency = (
  currencyString: string,
  currencyCode: string
): number | null => {
  const symbol = getCurrencySymbol(currencyCode);
  
  // Remove currency symbol and code
  let cleanString = currencyString
    .replace(symbol, '')
    .replace(currencyCode.toUpperCase(), '')
    .trim();
  
  // Remove grouping separators (commas, spaces)
  cleanString = cleanString.replace(/[,\s]/g, '');
  
  // Parse the number
  const parsed = parseFloat(cleanString);
  
  return isNaN(parsed) ? null : parsed;
};

/**
 * Format currency for different locales
 * @param amount - The amount to format
 * @param currencyCode - Three-letter currency code
 * @param locale - Locale string (e.g., 'en-US', 'fr-FR', 'de-DE')
 * @returns Locale-specific formatted currency string
 */
export const formatCurrencyLocale = (
  amount: number,
  currencyCode: string,
  locale: string = 'en-US'
): string => {
  try {
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
    });
    return formatter.format(amount);
  } catch (error) {
    // Fallback to our custom formatter
    return formatCurrencyPreset(amount, currencyCode, 'standard');
  }
};

/**
 * Format currency with custom decimal places
 * @param amount - The amount to format
 * @param currencyCode - Three-letter currency code
 * @param decimalPlaces - Number of decimal places
 * @returns Formatted currency string
 */
export const formatCurrencyDecimals = (
  amount: number,
  currencyCode: string,
  decimalPlaces: number = 2
): string => {
  return formatCurrency(amount, {
    currencyCode,
    decimalPlaces,
    showSymbol: true,
    useGrouping: true,
  });
};

/**
 * Format currency for input fields (no symbol, just number)
 * @param amount - The amount to format
 * @param decimalPlaces - Number of decimal places
 * @returns Formatted number string for input
 */
export const formatCurrencyInput = (
  amount: number,
  decimalPlaces: number = 2
): string => {
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
    useGrouping: false, // No commas in input fields
  });
  
  return formatter.format(amount);
};

/**
 * Get currency formatting info for a specific currency
 * @param currencyCode - Three-letter currency code
 * @returns Currency formatting information
 */
export const getCurrencyInfo = (currencyCode: string) => {
  const symbol = getCurrencySymbol(currencyCode);
  
  return {
    code: currencyCode.toUpperCase(),
    symbol,
    decimalPlaces: 2, // Most currencies use 2 decimal places
    symbolPosition: 'before', // Most currencies place symbol before amount
    groupingSeparator: ',',
    decimalSeparator: '.',
  };
};
