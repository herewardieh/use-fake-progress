import { useRef, useState } from "react";
import { useMemoizedFn } from "ahooks";
import { flushSync } from "react-dom";

export const useFakeProgress = (
  timeConstant = 3000
): [number, () => void, () => void, () => void] => {
  const [progress, setProgress] = useState<number>(0);

  const timeCounter = useRef<number>(0);

  const animateId = useRef<number>();

  const countStep = useMemoizedFn(() => {
    animateId.current = requestAnimationFrame(() => {
      timeCounter.current += 100;
      const currentProgress =
        1 - Math.exp((-1 * timeCounter.current) / timeConstant);
      setProgress(currentProgress);
      if (currentProgress !== 1) {
        if (animateId.current) cancelAnimationFrame(animateId.current);
        countStep();
      }
    });
  });

  const stop = useMemoizedFn(() => {
    if (animateId.current) cancelAnimationFrame(animateId.current);
  });

  const start = useMemoizedFn(() => {
    timeCounter.current = 0;
    flushSync(() => setProgress(0));
    countStep();
  });

  const done = useMemoizedFn(() => {
    stop();
    setProgress(1);
  });

  return [progress, start, done, stop];
};
