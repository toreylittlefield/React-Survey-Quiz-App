import { useEffect, useRef } from 'react';

const useClickOutside = (handler, isActive) => {
  console.log({ isActive });
  let domNode = useRef();
  useEffect(() => {
    let maybeHandler = (event) => {
      if (!isActive) return;
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
