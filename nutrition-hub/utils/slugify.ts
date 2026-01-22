/**
 * Convert a string to a URL-safe slug.
 *
 * Converts text to lowercase, removes special characters,
 * replaces spaces with hyphens, and removes duplicate hyphens.
 *
 * @param text - The text to convert to a slug
 * @returns A URL-safe slug string
 *
 * @example
 * slugify('Chicken Breast') // 'chicken-breast'
 * slugify("Trader Joe's") // 'trader-joes'
 * slugify('  Oatmeal  ') // 'oatmeal'
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/'+/g, '') // Remove apostrophes (Trader Joe's → trader joes)
    .replace(/[^\w\s-]/g, '') // Remove special chars except word, space, hyphen
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-+|-+$/g, '') // Trim leading/trailing hyphens
}
