import React from "react";
import { jura } from "@/app/fonts";
import { cn } from "@/lib/utils";

interface LogotypeProps {
  className?: string;
  variant?: "default" | "light" | "dark" | "emerald" | "azure" | "salmon" | "custom";
  customColor?: string;
  fontSize?: string | number;
  weight?: "300" | "400" | "500" | "600" | "700";
}

const Logotype: React.FC<LogotypeProps> = ({ className = "", variant = "default", customColor, fontSize = "2rem", weight = "700" }) => {
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
    <div
      className={cn("select-none leading-tight tracking-wide", jura.className, textColor, className)}
      style={{
        ...customStyle,
        fontSize,
        fontWeight: weight,
      }}
      aria-label="Återbrukslabbet logotype"
    >
      Återbrukslabbet
    </div>
  );
};

export default Logotype;
