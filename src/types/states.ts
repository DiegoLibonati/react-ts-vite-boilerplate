export interface CounterState extends Record<string, unknown> {
  counter: number;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}
