"use client";

import { useAddFrame, useMiniKit } from "@coinbase/onchainkit/minikit";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  type ReactNode,
} from "react";

interface MiniAppContextType {
  isFrameReady: boolean;
  setFrameReady: () => void;
  addFrame: () => Promise<{ url: string; token: string } | null>;
}

const MiniAppContext = createContext<MiniAppContextType | undefined>(undefined);

export function MiniAppProvider({ children }: { children: ReactNode }) {
  const { isFrameReady, setFrameReady, context } = useMiniKit();
  const addFrame = useAddFrame();

  const handleAddFrame = useCallback(async () => {
    try {
      // Check if addFrame is available (might not be in local dev)
      if (!addFrame) {
        console.log("[info] addFrame not available - likely running outside MiniKit context");
        return null;
      }

      const result = await addFrame();
      if (result && typeof result === 'object' && 'url' in result) {
        return result as { url: string; token: string };
      }
      return null;
    } catch (error) {
      console.error("[error] adding frame", error);
      return null;
    }
  }, [addFrame]);

  useEffect(() => {
    // on load, set the frame as ready
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [isFrameReady, setFrameReady]);

  useEffect(() => {
    // when the frame is ready, if the frame is not added, prompt the user to add the frame
    // Only attempt in MiniKit context (when addFrame is available)
    if (isFrameReady && addFrame && !context?.client?.added) {
      handleAddFrame();
    }
  }, [context?.client?.added, handleAddFrame, isFrameReady, addFrame]);

  return (
    <MiniAppContext.Provider
      value={{
        isFrameReady,
        setFrameReady,
        addFrame: handleAddFrame,
      }}
    >
      {children}
    </MiniAppContext.Provider>
  );
}

export function useMiniApp() {
  const context = useContext(MiniAppContext);
  if (context === undefined) {
    throw new Error("useMiniApp must be used within a MiniAppProvider");
  }
  return context;
}
