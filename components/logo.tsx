import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Logomark from "./logomark";
import Logotype from "./logotype";
import Slogan from "./slogan";

interface LogoProps {
  layout?: "column" | "row";
  showSlogan?: boolean;

  className?: string;
  variant?: "default" | "light" | "dark" | "emerald" | "azure" | "salmon" | "custom";
  customColor?: string;

  logomarkProps?: Omit<React.ComponentProps<typeof Logomark>, "variant" | "customColor" | "className">;
  logotypeProps?: Omit<React.ComponentProps<typeof Logotype>, "variant" | "customColor" | "className">;
  sloganProps?: Omit<React.ComponentProps<typeof Slogan>, "variant" | "customColor" | "className">;

  gap?: string | number;

  href?: string;
  linkProps?: Omit<React.ComponentProps<typeof Link>, "href" | "className">;
}

const Logo: React.FC<LogoProps> = ({
  layout = "column",
  showSlogan = false,
  className = "",
  variant = "default",
  customColor,
  logomarkProps = {},
  logotypeProps = {},
  sloganProps = {},
  gap,
  href,
  linkProps = {},
}) => {
  const defaultLogomarkSize = layout === "column" ? 75 : 50;
  const defaultLogotypeSize = layout === "column" ? "2rem" : "1.75rem";
  const defaultSloganSize = layout === "column" ? "0.85rem" : "0.775rem";

  const defaultGap = layout === "column" ? "0.5rem" : "1rem";
  const gapStyle = { gap: gap || defaultGap };

  const logoContent = (
    <div className={cn("flex items-center", layout === "column" ? "flex-col" : "flex-row", className)} style={gapStyle}>
      <Logomark variant={variant} customColor={customColor} width={logomarkProps.width || defaultLogomarkSize} height={logomarkProps.height || defaultLogomarkSize} {...logomarkProps} />

      <div className={cn("flex flex-col", layout === "column" ? "items-center" : "items-start")}>
        <Logotype variant={variant} customColor={customColor} fontSize={logotypeProps.fontSize || defaultLogotypeSize} {...logotypeProps} />

        {showSlogan && <Slogan variant={variant} customColor={customColor} fontSize={sloganProps.fontSize || defaultSloganSize} {...sloganProps} />}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} {...linkProps} className={cn("no-underline", linkProps)}>
        {logoContent}
      </Link>
    );
  }

  return logoContent;
};

export default Logo;
