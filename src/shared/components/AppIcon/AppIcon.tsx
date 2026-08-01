import { Icon, type IconProps } from "@iconify/react";

import { criticalIcons } from "./criticalIcons";

interface AppIconProps extends Omit<IconProps, "icon"> {
  icon: string;
}

export function AppIcon({ icon, ...props }: AppIconProps) {
  return <Icon icon={criticalIcons[icon] ?? icon} {...props} />;
}
