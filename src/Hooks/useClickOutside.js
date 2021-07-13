import { useEffect, useRef } from 'react';

const useClickOutside = (handler, isActive) => {
  let domNode = useRef();
  useEffect(() => {
    if (!isActive) return;
    let maybeHandler = (event) => {
      if (!domNode.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener('mousedown', maybeHandler);

    return () => {
      document.removeEventListener('mousedown', maybeHandler);
    };
  }, [handler, isActive]);

  return domNode;
};

export default useClickOutside;
