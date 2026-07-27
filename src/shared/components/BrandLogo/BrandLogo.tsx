import { Box } from '@mui/material';

import penguinTechLogo from '../../../assets/logos/penguintech-logo-xl.svg';

interface BrandLogoProps {
  width?: number;
}

export function BrandLogo({
  width = 180,
}: BrandLogoProps) {
  return (
    <Box
      component="img"
      src={penguinTechLogo}
      alt="PenguinTech"
      sx={{
        display: 'block',
        width,
        maxWidth: '100%',
        height: 'auto',
      }}
    />
  );
}