/**
 * Currency symbol mapping by ISO 4217 three-letter currency codes
 * Returns the appropriate currency symbol for a given currency code
 */

export const getCurrencySymbol = (currencyCode: string): string => {
  const currencyMap: { [key: string]: string } = {
    // Major currencies
    USD: "$", // US Dollar
    EUR: "€", // Euro
    GBP: "£", // British Pound
    JPY: "¥", // Japanese Yen
    CNY: "¥", // Chinese Yuan
    INR: "₹", // Indian Rupee
    KRW: "₩", // South Korean Won
    CAD: "C$", // Canadian Dollar
    AUD: "A$", // Australian Dollar
    CHF: "CHF", // Swiss Franc
    SEK: "kr", // Swedish Krona
    NOK: "kr", // Norwegian Krone
    DKK: "kr", // Danish Krone
    PLN: "zł", // Polish Zloty
    CZK: "Kč", // Czech Koruna
    HUF: "Ft", // Hungarian Forint
    RUB: "₽", // Russian Ruble
    BRL: "R$", // Brazilian Real
    MXN: "$", // Mexican Peso
    ARS: "$", // Argentine Peso
    CLP: "$", // Chilean Peso
    COP: "$", // Colombian Peso
    PEN: "S/", // Peruvian Sol
    ZAR: "R", // South African Rand
    TRY: "₺", // Turkish Lira
    ILS: "₪", // Israeli Shekel
    AED: "د.إ", // UAE Dirham
    SAR: "﷼", // Saudi Riyal
    QAR: "﷼", // Qatari Riyal
    KWD: "د.ك", // Kuwaiti Dinar
    BHD: "د.ب", // Bahraini Dinar
    OMR: "﷼", // Omani Rial
    JOD: "د.ا", // Jordanian Dinar
    LBP: "ل.ل", // Lebanese Pound
    EGP: "£", // Egyptian Pound
    MAD: "د.م.", // Moroccan Dirham
    TND: "د.ت", // Tunisian Dinar
    DZD: "د.ج", // Algerian Dinar
    NGN: "₦", // Nigerian Naira
    GHS: "₵", // Ghanaian Cedi
    KES: "KSh", // Kenyan Shilling
    UGX: "USh", // Ugandan Shilling
    TZS: "TSh", // Tanzanian Shilling
    ETB: "Br", // Ethiopian Birr
    ZMW: "ZK", // Zambian Kwacha
    BWP: "P", // Botswanan Pula
    MUR: "₨", // Mauritian Rupee
    LKR: "₨", // Sri Lankan Rupee
    PKR: "₨", // Pakistani Rupee
    BDT: "৳", // Bangladeshi Taka
    NPR: "₨", // Nepalese Rupee
    AFN: "؋", // Afghan Afghani
    THB: "฿", // Thai Baht
    VND: "₫", // Vietnamese Dong
    IDR: "Rp", // Indonesian Rupiah
    MYR: "RM", // Malaysian Ringgit
    SGD: "S$", // Singapore Dollar
    PHP: "₱", // Philippine Peso
    HKD: "HK$", // Hong Kong Dollar
    TWD: "NT$", // Taiwan Dollar
    NZD: "NZ$", // New Zealand Dollar
    ISK: "kr", // Icelandic Krona
    RON: "lei", // Romanian Leu
    BGN: "лв", // Bulgarian Lev
    HRK: "kn", // Croatian Kuna
    RSD: "дин", // Serbian Dinar
    UAH: "₴", // Ukrainian Hryvnia
    BYN: "Br", // Belarusian Ruble
    MDL: "L", // Moldovan Leu
    GEL: "₾", // Georgian Lari
    AMD: "֏", // Armenian Dram
    AZN: "₼", // Azerbaijani Manat
    KZT: "₸", // Kazakhstani Tenge
    UZS: "лв", // Uzbekistani Som
    KGS: "лв", // Kyrgyzstani Som
    TJS: "SM", // Tajikistani Somoni
    TMT: "T", // Turkmenistani Manat
    MNT: "₮", // Mongolian Tugrik
    LAK: "₭", // Lao Kip
    KHR: "៛", // Cambodian Riel
    MMK: "K", // Myanmar Kyat
    BOB: "Bs", // Bolivian Boliviano
    UYU: "$U", // Uruguayan Peso
    PYG: "₲", // Paraguayan Guarani
    VEF: "Bs.S", // Venezuelan Bolívar
    CRC: "₡", // Costa Rican Colón
    GTQ: "Q", // Guatemalan Quetzal
    HNL: "L", // Honduran Lempira
    NIO: "C$", // Nicaraguan Córdoba
    PAB: "B/", // Panamanian Balboa
    DOP: "RD$", // Dominican Peso
    JMD: "J$", // Jamaican Dollar
    TTD: "TT$", // Trinidad and Tobago Dollar
    BBD: "Bds$", // Barbadian Dollar
    XCD: "EC$", // East Caribbean Dollar
    AWG: "ƒ", // Aruban Florin
    ANG: "ƒ", // Netherlands Antillean Guilder
    SRD: "$", // Surinamese Dollar
    GYD: "G$", // Guyanese Dollar
    FKP: "£", // Falkland Islands Pound
    BZD: "BZ$", // Belize Dollar
    BMD: "$", // Bermudian Dollar
    KYD: "$", // Cayman Islands Dollar
    BSD: "$", // Bahamian Dollar
    BAM: "КМ", // Bosnia and Herzegovina Convertible Mark
    MKD: "ден", // Macedonian Denar
    ALL: "L", // Albanian Lek
    MOP: "MOP$", // Macanese Pataca
    LSL: "L", // Lesotho Loti
    SZL: "L", // Swazi Lilangeni
    NAD: "N$", // Namibian Dollar
    SLL: "Le", // Sierra Leonean Leone
    LRD: "L$", // Liberian Dollar
    GMD: "D", // Gambian Dalasi
    XOF: "CFA", // West African CFA Franc
    XAF: "FCFA", // Central African CFA Franc
    KMF: "CF", // Comorian Franc
    DJF: "Fdj", // Djiboutian Franc
    ERN: "Nfk", // Eritrean Nakfa
    SOS: "S", // Somali Shilling
    AOA: "Kz", // Angolan Kwanza
    MZN: "MT", // Mozambican Metical
    MWK: "MK", // Malawian Kwacha
    SCR: "₨", // Seychellois Rupee
    MGA: "Ar", // Malagasy Ariary
    CDF: "FC", // Congolese Franc
    RWF: "RF", // Rwandan Franc
    BIF: "FBu", // Burundian Franc
    // XAF: "FCFA", // Central African CFA Franc
    // XOF: "CFA", // West African CFA Franc
    STN: "Db", // São Tomé and Príncipe Dobra
    CVE: "$", // Cape Verdean Escudo
    GNF: "FG", // Guinean Franc
    SDG: "ج.س", // Sudanese Pound
    SSP: "£", // South Sudanese Pound
    LYD: "ل.د", // Libyan Dinar
    IQD: "ع.د", // Iraqi Dinar
    IRR: "﷼", // Iranian Rial
    SYP: "£", // Syrian Pound
    YER: "﷼", // Yemeni Rial
    // AFN: "؋", // Afghan Afghani
    // NPR: "₨", // Nepalese Rupee
    BTN: "Nu", // Bhutanese Ngultrum
    MVR: "Rf", // Maldivian Rufiyaa
    BND: "B$", // Brunei Dollar
    FJD: "FJ$", // Fijian Dollar
    PGK: "K", // Papua New Guinean Kina
    SBD: "SI$", // Solomon Islands Dollar
    VUV: "Vt", // Vanuatu Vatu
    WST: "WS$", // Samoan Tala
    TOP: "T$", // Tongan Paʻanga
    XPF: "₣", // CFP Franc
    KID: "$", // Kiribati Dollar
    TVD: "$", // Tuvaluan Dollar
    NAN: "$", // Nauruan Dollar
    // AUD: "A$", // Australian Dollar (also used by some Pacific islands)
  };

  // Return the currency symbol or the currency code itself if not found
  return currencyMap[currencyCode.toUpperCase()] || currencyCode.toUpperCase();
};

/**
 * Get currency symbol with fallback options
 * @param currencyCode - Three-letter currency code
 * @param fallbackToCode - Whether to return the currency code if symbol not found
 * @returns Currency symbol or code
 */
export const getCurrencySymbolWithFallback = (
  currencyCode: string,
  fallbackToCode: boolean = true
): string => {
  const symbol = getCurrencySymbol(currencyCode);
  
  if (fallbackToCode && symbol === currencyCode.toUpperCase()) {
    return currencyCode.toUpperCase();
  }
  
  return symbol;
};

/**
 * Check if a currency code is supported
 * @param currencyCode - Three-letter currency code
 * @returns Boolean indicating if the currency is supported
 */
export const isCurrencySupported = (currencyCode: string): boolean => {
  const currencyMap: { [key: string]: string } = {
    USD: "$", EUR: "€", GBP: "£", JPY: "¥", CNY: "¥", INR: "₹", KRW: "₩",
    CAD: "C$", AUD: "A$", CHF: "CHF", SEK: "kr", NOK: "kr", DKK: "kr",
    PLN: "zł", CZK: "Kč", HUF: "Ft", RUB: "₽", BRL: "R$", MXN: "$",
    ARS: "$", CLP: "$", COP: "$", PEN: "S/", ZAR: "R", TRY: "₺",
    ILS: "₪", AED: "د.إ", SAR: "﷼", QAR: "﷼", KWD: "د.ك", BHD: "د.ب",
    OMR: "﷼", JOD: "د.ا", LBP: "ل.ل", EGP: "£", MAD: "د.م.", TND: "د.ت",
    DZD: "د.ج", NGN: "₦", GHS: "₵", KES: "KSh", UGX: "USh", TZS: "TSh",
    ETB: "Br", ZMW: "ZK", BWP: "P", MUR: "₨", LKR: "₨", PKR: "₨",
    BDT: "৳", NPR: "₨", AFN: "؋", THB: "฿", VND: "₫", IDR: "Rp",
    MYR: "RM", SGD: "S$", PHP: "₱", HKD: "HK$", TWD: "NT$", NZD: "NZ$",
    ISK: "kr", RON: "lei", BGN: "лв", HRK: "kn", RSD: "дин", UAH: "₴",
    BYN: "Br", MDL: "L", GEL: "₾", AMD: "֏", AZN: "₼", KZT: "₸",
    UZS: "лв", KGS: "лв", TJS: "SM", TMT: "T", MNT: "₮", LAK: "₭",
    KHR: "៛", MMK: "K", BOB: "Bs", UYU: "$U", PYG: "₲", VEF: "Bs.S",
    CRC: "₡", GTQ: "Q", HNL: "L", NIO: "C$", PAB: "B/", DOP: "RD$",
    JMD: "J$", TTD: "TT$", BBD: "Bds$", XCD: "EC$", AWG: "ƒ", ANG: "ƒ",
    SRD: "$", GYD: "G$", FKP: "£", BZD: "BZ$", BMD: "$", KYD: "$",
    BSD: "$", BAM: "КМ", MKD: "ден", ALL: "L", MOP: "MOP$", LSL: "L",
    SZL: "L", NAD: "N$", SLL: "Le", LRD: "L$", GMD: "D", XOF: "CFA",
    XAF: "FCFA", KMF: "CF", DJF: "Fdj", ERN: "Nfk", SOS: "S", AOA: "Kz",
    MZN: "MT", MWK: "MK", SCR: "₨", MGA: "Ar", CDF: "FC", RWF: "RF",
    BIF: "FBu", STN: "Db", CVE: "$", GNF: "FG", SDG: "ج.س", SSP: "£",
    LYD: "ل.د", IQD: "ع.د", IRR: "﷼", SYP: "£", YER: "﷼", BTN: "Nu",
    MVR: "Rf", BND: "B$", FJD: "FJ$", PGK: "K", SBD: "SI$", VUV: "Vt",
    WST: "WS$", TOP: "T$", XPF: "₣", KID: "$", TVD: "$", NAN: "$"
  };
  
  return currencyCode.toUpperCase() in currencyMap;
};
