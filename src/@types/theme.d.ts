declare type SystemTheme = "system" | "dark" | "light";

declare type UsedTheme = Exclude<SystemTheme, "system">;
