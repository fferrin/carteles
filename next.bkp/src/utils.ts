export function generateRandomNumber( minVal: number, maxVal: number ): number {
  return Math.random() * ( maxVal - minVal ) + minVal;
}

export const isBrowser = typeof window !== 'undefined'