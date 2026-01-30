export function secureRandomInt(maxExclusive: number): number {
  if (maxExclusive <= 0) return 0
  const cryptoObj = (globalThis as any).crypto
  if (cryptoObj && typeof cryptoObj.getRandomValues === 'function') {
    // rejection sampling to avoid modulo bias
    const range = 0xffffffff
    const limit = range - (range % maxExclusive)
    const buf = new Uint32Array(1)
    let x = range
    while (x >= limit) {
      cryptoObj.getRandomValues(buf)
      x = buf[0]
    }
    return x % maxExclusive
  }
  return Math.floor(Math.random() * maxExclusive)
}

export function shuffleInPlace<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = secureRandomInt(i + 1)
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export function shuffled<T>(arr: T[]): T[] {
  return shuffleInPlace(arr.slice())
}
