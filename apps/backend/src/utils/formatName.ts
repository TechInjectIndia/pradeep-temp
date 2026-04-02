function capitalizeWord(word: string): string {
  if (!word) return '';
  return word.charAt(0).toUpperCase() + word.slice(1);
}

/**
 * Formats a name string with proper capitalization.
 * Handles initials (s.n → S.N), hyphenated (raj-kumar → Raj-Kumar),
 * apostrophe (o'connor → O'Connor), and regular words.
 */
export function formatName(str: string | null | undefined): string {
  if (!str || typeof str !== 'string') return '';

  return str
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map((word) => {
      // Handle initials like s.n or s.n.k or s.n.
      if (/^[a-z](\.[a-z])+\.?$/.test(word)) {
        return word
          .split('.')
          .filter(Boolean)
          .map((ch) => ch.toUpperCase())
          .join('.');
      }

      // Handle words with hyphen (e.g., raj-kumar)
      if (word.includes('-')) {
        return word.split('-').map(capitalizeWord).join('-');
      }

      // Handle apostrophe (e.g., o'connor)
      if (word.includes("'")) {
        return word.split("'").map(capitalizeWord).join("'");
      }

      return capitalizeWord(word);
    })
    .join(' ');
}
