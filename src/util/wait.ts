export function seconds(seconds: number): Promise<void> {
  if (seconds > 1000) {
    console.warn(
      'WARNING!: YOU PASSED IN A NUMBER GREATER THAN 1000, Are you sure you want to do this? This function takes in seconds, not milliseconds.'
    );
  }
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

export function ms(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
