import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

export function useDebounce<T>(value: T, delay: number = 500, callback?: (value: T) => void): T {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(value)
      if (callback) {
        callback(value);
      }
    }, delay);

    // Clear timeout (if value changes before the delay is over):
    return () => {
      clearTimeout(timer); // delete timeout
    }
  }, [value, delay]);

  return debounced;
}

/**
 * Custom hook to use a debounced state
 * @template T
 * @param {T} initialValue - initial value of the state
 * @param {number} [delay=500] - debounce delay, in milliseconds
 * @param {(debouncedValue: T) => void} [callback] – callback function executed after the delay timeout
 * @returns {[ 
 *   state: T,
 *   debouncedState: T,
 *   setState: Dispatch<SetStateAction<T>> 
 * ]}
 */
export function useDebouncedState<T>(initialValue: T, delay: number = 500, callback?: (debouncedValue: T) => void): [state: T, debouncedState: T, setState: Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(initialValue);
  const debouncedState = useDebounce<T>(state, delay, callback);

  return [state, debouncedState, setState];
}