import { useEffect } from "react";
import { renderHook } from "@testing-library/react-hooks";

describe("fake progress react hook", () => {
  beforeEach(() => {
    jest
      .spyOn(globalThis, "requestAnimationFrame")
      .mockImplementation((callback: FrameRequestCallback): number => {
        return callback(new Date().getTime()) as unknown as number;
      });
    jest.useFakeTimers();
    jest.spyOn(globalThis, "setTimeout");
    jest.spyOn(globalThis, "cancelAnimationFrame").mockImplementation(() => {
      jest.resetModules();
    });
  });
  it("basic function", async () => {
    const { useFakeProgress } = await import("../src");
    const useFakeProgressStop = () => {
      const [progress, start, done] = useFakeProgress();
      useEffect(() => {
        start();
        setTimeout(() => {
          done();
        }, 100);
      }, []);
      return { progress };
    };
    const { result, waitFor } = renderHook(() => useFakeProgressStop());
    expect(result.current.progress).toBe(0);
    jest.runOnlyPendingTimers();
    waitFor(
      () => {
        expect(result.current.progress).toEqual(1);
      },
      { timeout: 100 }
    );
  });
});
