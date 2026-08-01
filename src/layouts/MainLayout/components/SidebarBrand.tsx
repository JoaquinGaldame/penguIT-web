import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

import { paths } from '../../../app/router/paths';
import compactLogo from '../../../assets/logos/Logotipo.png';
import expandedLogo from '../../../assets/logos/penguintech-logotipo.png';

interface SidebarBrandProps {
  expanded: boolean;
  onNavigate: () => void;
}

export function SidebarBrand({ expanded, onNavigate }: SidebarBrandProps) {
  return (
    <Box
      component={Link}
      to={paths.dashboard}
      onClick={onNavigate}
      aria-label="Ir al panel principal"
      sx={{
        position: 'relative',
        display: 'grid',
        placeItems: 'center',
        flexShrink: 0,
        height: 76,
        overflow: 'hidden',
      }}
    >
      <Box
        component="img"
        src={expandedLogo}
        alt="PenguinTech"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 220,
          maxWidth: 'none',
          opacity: expanded ? 1 : 0,
          transform: expanded
            ? 'translate(-50%, -50%) scale(1)'
            : 'translate(-50%, -50%) scale(0.96)',
          transition: 'opacity 140ms ease-out, transform 200ms ease-out',
        }}
      />

      <Box
        component="img"
        src={compactLogo}
        alt=""
        aria-hidden="true"
        sx={{
          position: 'absolute',
          width: 56,
          height: 56,
          objectFit: 'contain',
          opacity: expanded ? 0 : 1,
          transform: expanded ? 'scale(0.9)' : 'scale(1)',
          transition: 'opacity 140ms ease-out, transform 200ms ease-out',
        }}
      />
    </Box>
  );
}
