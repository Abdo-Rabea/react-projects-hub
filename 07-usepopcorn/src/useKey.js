import { useEffect } from "react";

export function useKey(key, callback) {
  useEffect(
    function () {
      function callbackHandle(e) {
        if (e.key.toLowerCase() === key.toLowerCase()) {
          callback?.();
        }
      }
      document.addEventListener("keydown", callbackHandle);
      return () => document.removeEventListener("keydown", callbackHandle);
    },
    [callback, key]
  );
}
