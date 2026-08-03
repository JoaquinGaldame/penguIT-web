import { Box } from '@mui/material';

import { appConfig } from '../../../app/config/appConfig';
import appLogo from '../../../assets/logos/penguintech-logo-xl.svg';

interface BrandLogoProps {
  width?: number;
}

export function BrandLogo({ width = 180 }: BrandLogoProps) {
  return (
    <Box
      component="img"
      src={appLogo}
      alt={appConfig.name}
      sx={{
        display: 'block',
        width,
        maxWidth: '100%',
        height: 'auto',
      }}
    />
  );
}
