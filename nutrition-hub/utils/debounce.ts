// utils/debounce.ts
// Debounce utility function for delaying function execution

/**
 * Creates a debounced version of a function that delays invoking fn
 * until after delay milliseconds have elapsed since the last invocation
 *
 * @param fn - The function to debounce
 * @param delay - The delay in milliseconds (default: 300)
 * @returns The debounced function
 *
 * @example
 * const debouncedSearch = debounce(searchFoods, 300)
 * input.addEventListener('input', (e) => debouncedSearch(e.target.value))
 */
export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  fn: T,
  delay: number = 300
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  const debouncedFn = (...args: Parameters<T>): void => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      fn(...args)
      timeoutId = null
    }, delay)
  }

  return debouncedFn
}
