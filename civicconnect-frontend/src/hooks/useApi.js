import { useState, useEffect, useCallback, useRef } from "react";

// Generic async-call hook: run(fn) fires a request and tracks
// data/loading/error, and immediate=true (default) fires once on mount.
export function useApi(fetcher, deps = [], { immediate = true } = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  const run = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetcherRef.current(...args);
      setData(result);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (immediate) run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error, run, setData };
}
