import { useCallback, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { findNavigationTrail } from '../../../app/router/navigationConfig';

interface NavigationExpansionState {
  pathname: string;
  openItems: string[];
}

function getRouteOpenItems(pathname: string) {
  return findNavigationTrail(pathname)
    .filter((item) => item.children?.length)
    .map((item) => item.id);
}

export function useSidebarNavigation() {
  const { pathname } = useLocation();
  const routeOpenItems = useMemo(() => getRouteOpenItems(pathname), [pathname]);
  const [expansionState, setExpansionState] =
    useState<NavigationExpansionState>(() => ({
      pathname,
      openItems: routeOpenItems,
    }));
  const openItems =
    expansionState.pathname === pathname
      ? expansionState.openItems
      : routeOpenItems;

  const toggleItem = useCallback(
    (itemId: string, level: number) => {
      setExpansionState({
        pathname,
        openItems:
          openItems[level] === itemId
            ? openItems.slice(0, level)
            : [...openItems.slice(0, level), itemId],
      });
    },
    [openItems, pathname],
  );

  return {
    openItems,
    toggleItem,
  };
}
