"use client"

import { useEffect, useState } from "react"
import { THEME_STORAGE_KEY } from "@/config/constants"
import type { Theme } from "@/types/themeTypes"

const THEME_ORDER: Theme[] = ["system", "light", "dark"]

const getStoredTheme = (): Theme => {
	const stored = localStorage.getItem(THEME_STORAGE_KEY)
	return stored === "light" || stored === "dark" || stored === "system"
		? stored
		: "system"
}

const resolveTheme = (theme: Theme): "light" | "dark" =>
	theme === "system"
		? window.matchMedia("(prefers-color-scheme: dark)").matches
			? "dark"
			: "light"
		: theme

const applyTheme = (theme: Theme) => {
	document.documentElement.classList.toggle(
		"dark",
		resolveTheme(theme) === "dark",
	)
}

export interface UseThemeResult {
	readonly theme: Theme
	readonly isThemeReady: boolean
	readonly toggleTheme: () => void
}

export const useTheme = (): UseThemeResult => {
	// Starts as the same literal on server and on the client's first render —
	// it can't depend on localStorage, or hydration would mismatch. The real
	// value is only known once mounted, see isThemeReady below.
	const [theme, setTheme] = useState<Theme>("system")
	const [isThemeReady, setIsThemeReady] = useState(false)

	useEffect(() => {
		setTheme(getStoredTheme())
		setIsThemeReady(true)
	}, [])

	useEffect(() => {
		if (!isThemeReady) return
		applyTheme(theme)
		localStorage.setItem(THEME_STORAGE_KEY, theme)
	}, [theme, isThemeReady])

	useEffect(() => {
		if (theme !== "system") return

		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
		const handleChange = () => applyTheme("system")

		mediaQuery.addEventListener("change", handleChange)
		return () => mediaQuery.removeEventListener("change", handleChange)
	}, [theme])

	const toggleTheme = () => {
		const currentIndex = THEME_ORDER.indexOf(theme)
		const nextTheme = THEME_ORDER[(currentIndex + 1) % THEME_ORDER.length]
		setTheme(nextTheme)
	}

	return { theme, isThemeReady, toggleTheme }
}
