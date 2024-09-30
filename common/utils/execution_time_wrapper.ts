import { FunctionExecutionTimeWrapper } from "../types/execution_time_wrapper";

/**
 * Wraps a function and measures its execution time using performance.now().
 * @param {Function} fn - The function to be wrapped.
 * @param {string} name - Optional name for the function. Used for logging the execution time.
 * @returns {FunctionExecutionTimeWrapper<T>} An object containing the execution time and the result of the function.
 */
export const functionExecutionTimeWrapper = <T>(
  fn: () => T,
  name?: string
): FunctionExecutionTimeWrapper<T> => {
  const start = performance.now();
  const result = fn();
  const end = performance.now();

  if (name)
    console.info(
      `Execution time: ${end - start} milliseconds for function ${name}`
    );

  return { executionTime: end - start, result };
};
