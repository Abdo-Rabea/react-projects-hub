import { useEffect, useRef } from "react";

export function useOutsideClick(
  callback: () => void,
  capturePhase: boolean = true
) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(
    function () {
      function handleCloseModal(e: MouseEvent) {
        const target = e.target;
        if (
          ref.current &&
          target instanceof Node &&
          !ref.current.contains(target)
        ) {
          callback();
        }
      }
      document.addEventListener("click", handleCloseModal, capturePhase);
      return () =>
        document.removeEventListener("click", handleCloseModal, capturePhase);
    },
    [callback, capturePhase]
  );
  return { ref };
}
