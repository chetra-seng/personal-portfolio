import { ActiveSectionContext } from "@/contexts/ActiveSectionContext";
import { useContext } from "react";

export default function useActiveSection() {
  const context = useContext(ActiveSectionContext);
  if (!context) {
    throw new Error(
      "useActiveSection must be used within a ActiveSectionContextProvider",
    );
  }
  return context;
}
