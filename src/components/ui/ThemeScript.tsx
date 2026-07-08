import { THEME_STORAGE_KEY } from "@/config/constants"

export const ThemeScript = () => (
	<script
		type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
		suppressHydrationWarning
		// biome-ignore lint/security/noDangerouslySetInnerHtml: required to run inline before hydration
		dangerouslySetInnerHTML={{
			__html: `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");var d=t==="dark"||(t!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d)}catch(e){}})()`,
		}}
	/>
)
