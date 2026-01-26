// utils/debounce.test.ts
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { debounce } from './debounce'

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.clearAllMocks()
  })

  it('should delay function execution', () => {
    const fn = vi.fn()
    const debouncedFn = debounce(fn, 300)

    debouncedFn()
    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(300)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should cancel previous calls on new invocation', () => {
    const fn = vi.fn()
    const debouncedFn = debounce(fn, 300)

    debouncedFn()
    debouncedFn()
    debouncedFn()

    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(300)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should pass arguments to the original function', () => {
    const fn = vi.fn()
    const debouncedFn = debounce(fn, 300)

    debouncedFn('search query', 10)

    vi.advanceTimersByTime(300)
    expect(fn).toHaveBeenCalledWith('search query', 10)
  })

  it('should use default delay of 300ms', () => {
    const fn = vi.fn()
    const debouncedFn = debounce(fn)

    debouncedFn()

    vi.advanceTimersByTime(299)
    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(1)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should work with custom delay', () => {
    const fn = vi.fn()
    const debouncedFn = debounce(fn, 500)

    debouncedFn()

    vi.advanceTimersByTime(499)
    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(1)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should handle multiple rapid calls and only execute last one', () => {
    const fn = vi.fn()
    const debouncedFn = debounce(fn, 200)

    for (let i = 0; i < 5; i++) {
      debouncedFn(i)
    }

    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(200)
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith(4) // Last call argument
  })
})
