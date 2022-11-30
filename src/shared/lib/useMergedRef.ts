import { useCallback, MutableRefObject, Ref, RefCallback } from 'react';

export const useMergedRef = <T>(...refs: Ref<T>[]): RefCallback<T> => {
  return useCallback(
    (element: T) => {
      for (let i = 0; i < refs.length; i += 1) {
        const ref = refs[i];
        if (typeof ref === 'function') {
          ref(element);
        } else if (ref && typeof ref === 'object') {
          (ref as MutableRefObject<T>).current = element;
        }
      }
    },
    [refs],
  );
};

export default useMergedRef;
