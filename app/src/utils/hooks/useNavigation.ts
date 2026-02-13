import { useState } from "react";
import type { NavSection } from "../../types/navigation.types";

export function useNavigation() {
  const [activeSection, setActiveSection] = useState<NavSection>("dashboard");

  const navigate = (section: NavSection) => {
    setActiveSection(section);
  };

  return { activeSection, navigate };
}
