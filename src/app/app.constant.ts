export const APP_TITLE = 'APP TITLE';

// export const ZIP_CODE_PATTERN_COMMA_SP = /(^\d{5}$)|(^\d{9}$)|(^\d{5}-\d{4}$)/;
export const ZIP_CODE_PATTERN = /(^\d{5}(, +(\d{5}|\d{9}|\d{5}-\d{4}))*$)|(^\d{9}(, +(\d{5}|\d{9}|\d{5}-\d{4}))*$)|(^\d{5}-\d{4}(, +(\d{5}|\d{9}|\d{5}-\d{4}))*$)/;