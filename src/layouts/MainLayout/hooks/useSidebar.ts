import { useCallback, useState } from 'react';

const SIDEBAR_STORAGE_KEY = 'penguintech-sidebar-collapsed';

function getInitialCollapsedState() {
  const storedValue = window.localStorage.getItem(SIDEBAR_STORAGE_KEY);

  if (storedValue !== null) {
    return storedValue === 'true';
  }

  return window.matchMedia('(min-width: 900px) and (max-width: 1199.95px)')
    .matches;
}

export function useSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(getInitialCollapsedState);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleCollapsed = useCallback(() => {
    setIsCollapsed((currentValue) => {
      const nextValue = !currentValue;

      window.localStorage.setItem(SIDEBAR_STORAGE_KEY, String(nextValue));

      return nextValue;
    });
  }, []);

  const openMobile = useCallback(() => {
    setIsMobileOpen(true);
  }, []);

  const closeMobile = useCallback(() => {
    setIsMobileOpen(false);
  }, []);

  return {
    isCollapsed,
    isMobileOpen,
    toggleCollapsed,
    openMobile,
    closeMobile,
  };
}
