import React from "react";
import { source_sans_3 } from "@/app/fonts";
import { cn } from "@/lib/utils";

interface SloganProps {
  className?: string;
  variant?: "default" | "light" | "dark" | "emerald" | "azure" | "salmon" | "custom";
  customColor?: string;
  fontSize?: string | number;
  weight?: "300" | "400" | "500" | "600";
  as?: "div" | "p" | "span" | "h2" | "h3";
}
const Slogan: React.FC<SloganProps> = ({ className = "", variant = "default", customColor, fontSize = "1rem", weight = "400", as: Component = "div" }) => {
  const colorSchemes = {
    default: "text-emerald-500",
    light: "text-white",
    dark: "text-black",
    emerald: "text-emerald-500",
    azure: "text-azure-500",
    salmon: "text-salmon-500",
    custom: "",
  };

  const textColor = variant === "custom" ? "" : colorSchemes[variant];
  const customStyle = variant === "custom" ? { color: customColor || "hsl(var(--emerald-500))" } : {};

  return (
    <Component
      className={cn("select-none leading-relaxed tracking-normal", source_sans_3.className, textColor, className)}
      style={{
        ...customStyle,
        fontSize,
        fontWeight: weight,
      }}
      aria-label="Återbrukslabbet slogan"
    >
      Från labb till lärosal – vetenskapen lever vidare.
    </Component>
  );
};

export default Slogan;
