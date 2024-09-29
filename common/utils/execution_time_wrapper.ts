import { FunctionExecutionTimeWrapper } from "../types/execution_time_wrapper";

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
