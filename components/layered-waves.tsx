import React from "react";

interface LayeredWavesProps {
  className?: string;
  variant?: "default" | "azureDark" | "azureLight" | "emeraldDark" | "emeraldLight" | "salmonDark" | "salmonLight" | "custom";
  customColors?: string[];
}

const LayeredWaves: React.FC<LayeredWavesProps> = ({ className = "", variant = "default", customColors }) => {
  const colorSchemes = {
    default: ["hsl(var(--neutral-100))", "hsl(var(--neutral-200))", "hsl(var(--neutral-300))", "hsl(var(--neutral-400))", "hsl(var(--neutral-500))"],
    azureDark: ["hsl(var(--azure-900))", "hsl(var(--azure-800))", "hsl(var(--azure-700))", "hsl(var(--azure-600))", "hsl(var(--azure-500))"],
    azureLight: ["hsl(var(--azure-100))", "hsl(var(--azure-200))", "hsl(var(--azure-300))", "hsl(var(--azure-400))", "hsl(var(--azure-500))"],
    emeraldDark: ["hsl(var(--emerald-900))", "hsl(var(--emerald-800))", "hsl(var(--emerald-700))", "hsl(var(--emerald-600))", "hsl(var(--emerald-500))"],
    emeraldLight: ["hsl(var(--emerald-100))", "hsl(var(--emerald-200))", "hsl(var(--emerald-300))", "hsl(var(--emerald-400))", "hsl(var(--emerald-500))"],
    salmonDark: ["hsl(var(--salmon-900))", "hsl(var(--salmon-800))", "hsl(var(--salmon-700))", "hsl(var(--salmon-600))", "hsl(var(--salmon-500))"],
    salmonLight: ["hsl(var(--salmon-100))", "hsl(var(--salmon-200))", "hsl(var(--salmon-300))", "hsl(var(--salmon-400))", "hsl(var(--salmon-500))"],
    custom: customColors || ["hsl(var(--neutral-100))", "hsl(var(--neutral-200))", "hsl(var(--neutral-300))", "hsl(var(--neutral-400))", "hsl(var(--neutral-500))"],
  };

  const colors = colorSchemes[variant];

  return (
    <svg id="visual" viewBox="0 0 5120 1440" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" preserveAspectRatio="none" className={className}>
      <path
        d="M0 1096L170.7 1132C341.3 1168 682.7 1240 1024 1296.3C1365.3 1352.7 1706.7 1393.3 2048 1368.2C2389.3 1343 2730.7 1252 3072 1242.5C3413.3 1233 3754.7 1305 4096 1338.3C4437.3 1371.7 4778.7 1366.3 4949.3 1363.7L5120 1361L5120 0L4949.3 0C4778.7 0 4437.3 0 4096 0C3754.7 0 3413.3 0 3072 0C2730.7 0 2389.3 0 2048 0C1706.7 0 1365.3 0 1024 0C682.7 0 341.3 0 170.7 0L0 0Z"
        fill={colors[0]}
      />
      <path
        d="M0 1170L170.7 1164.7C341.3 1159.3 682.7 1148.7 1024 1092.5C1365.3 1036.3 1706.7 934.7 2048 939C2389.3 943.3 2730.7 1053.7 3072 1091.8C3413.3 1130 3754.7 1096 4096 1068.2C4437.3 1040.3 4778.7 1018.7 4949.3 1007.8L5120 997L5120 0L4949.3 0C4778.7 0 4437.3 0 4096 0C3754.7 0 3413.3 0 3072 0C2730.7 0 2389.3 0 2048 0C1706.7 0 1365.3 0 1024 0C682.7 0 341.3 0 170.7 0L0 0Z"
        fill={colors[1]}
      />
      <path
        d="M0 794L170.7 781.7C341.3 769.3 682.7 744.7 1024 743.7C1365.3 742.7 1706.7 765.3 2048 752.5C2389.3 739.7 2730.7 691.3 3072 689.8C3413.3 688.3 3754.7 733.7 4096 775.3C4437.3 817 4778.7 855 4949.3 874L5120 893L5120 0L4949.3 0C4778.7 0 4437.3 0 4096 0C3754.7 0 3413.3 0 3072 0C2730.7 0 2389.3 0 2048 0C1706.7 0 1365.3 0 1024 0C682.7 0 341.3 0 170.7 0L0 0Z"
        fill={colors[2]}
      />
      <path
        d="M0 358L170.7 415.3C341.3 472.7 682.7 587.3 1024 621.5C1365.3 655.7 1706.7 609.3 2048 557.7C2389.3 506 2730.7 449 3072 413.2C3413.3 377.3 3754.7 362.7 4096 346C4437.3 329.3 4778.7 310.7 4949.3 301.3L5120 292L5120 0L4949.3 0C4778.7 0 4437.3 0 4096 0C3754.7 0 3413.3 0 3072 0C2730.7 0 2389.3 0 2048 0C1706.7 0 1365.3 0 1024 0C682.7 0 341.3 0 170.7 0L0 0Z"
        fill={colors[3]}
      />
      <path
        d="M0 110L170.7 159.2C341.3 208.3 682.7 306.7 1024 298.7C1365.3 290.7 1706.7 176.3 2048 120C2389.3 63.7 2730.7 65.3 3072 121.7C3413.3 178 3754.7 289 4096 294.8C4437.3 300.7 4778.7 201.3 4949.3 151.7L5120 102L5120 0L4949.3 0C4778.7 0 4437.3 0 4096 0C3754.7 0 3413.3 0 3072 0C2730.7 0 2389.3 0 2048 0C1706.7 0 1365.3 0 1024 0C682.7 0 341.3 0 170.7 0L0 0Z"
        fill={colors[4]}
      />
    </svg>
  );
};

export default LayeredWaves;
