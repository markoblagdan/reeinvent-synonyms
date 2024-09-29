import { FunctionExecutionTimeWrapper } from "../types/execution_time_wrapper";

export const functionExecutionTimeWrapper = <T>(
  fn: () => T,
  name?: string
): FunctionExecutionTimeWrapper<T> => {
  const start = performance.now();
  const result = fn();
  const end = performance.now();

  console.log(
    `Execution time: ${end - start} milliseconds ${
      name ? `for function name: ${name}` : ""
    }`
  );

  return { executionTime: end - start, result };
};
