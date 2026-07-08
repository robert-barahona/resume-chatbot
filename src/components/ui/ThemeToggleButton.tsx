"use client"

import Image from "next/image"
import type { FC } from "react"
import { useTheme } from "@/hooks/useTheme"
import type { Theme } from "@/types/themeTypes"
import { cn } from "@/utils/cn"

const THEME_ICON_SRC: Record<Theme, string> = {
	system: "/theme-system.svg",
	light: "/theme-light.svg",
	dark: "/theme-dark.svg",
}

const THEME_LABEL: Record<Theme, string> = {
	system: "System theme",
	light: "Light mode",
	dark: "Dark mode",
}

export const ThemeToggleButton: FC = () => {
	const { theme, isThemeReady, toggleTheme } = useTheme()

	return (
		<button
			type="button"
			onClick={toggleTheme}
			aria-label="Theme toggle"
			className="flex size-8 items-center justify-center rounded-full bg-surface-secondary transition-colors hover:bg-surface-primary"
		>
			<Image
				className={cn("dark:invert", !isThemeReady && "invisible")}
				src={THEME_ICON_SRC[theme]}
				alt={THEME_LABEL[theme]}
				width={18}
				height={18}
			/>
		</button>
	)
}
