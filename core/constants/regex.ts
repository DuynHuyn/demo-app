export const REGEX_PATTERNS = {
  UUID_V4: /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
  CONTAINS_CAPITAL: /[A-Z]/,
  CONTAINS_SPECIAL: /[!@#$%^&*(),.?"'/;\\=+\-_~`:{}|<>]/,
  CONTAINS_ALPHA_AND_NUM: /^(?=.*[a-zA-Z])(?=.*[0-9])/,
  FULL_NAME: /\w+$/,
}
