class ThemeManager {
    constructor() {
        this.html = document.documentElement
        this.init()
    }

    init() {
        document.addEventListener("DOMContentLoaded", () => this.updateIcons())
    }

    toggle(event) {
        const isDark = this.html.classList.contains("dark")
        const newTheme = isDark ? "light" : "dark"

        this.html.classList.toggle("dark", newTheme === "dark")
        this.html.setAttribute("data-theme", newTheme)
        localStorage.setItem("theme", newTheme)
        this.updateIcons()

        if (event) {
            this.createRipple(event)
        }
    }

    createRipple(event) {
        const button = event.currentTarget
        const circle = document.createElement("span")
        const diameter = Math.max(button.clientWidth, button.clientHeight)
        const radius = diameter / 2

        const rect = button.getBoundingClientRect()

        circle.style.width = circle.style.height = `${diameter}px`
        circle.style.left = `${event.clientX - rect.left - radius}px`
        circle.style.top = `${event.clientY - rect.top - radius}px`
        circle.classList.add("ripple")

        const ripple = button.getElementsByClassName("ripple")[0]

        if (ripple) {
            ripple.remove()
        }

        button.appendChild(circle)
    }

    updateIcons() {
        const isDark = this.html.classList.contains("dark")
        const sunIcon = document.getElementById("sun-icon")
        const moonIcon = document.getElementById("moon-icon")

        if (sunIcon && moonIcon) {
            sunIcon.classList.toggle("hidden", !isDark)
            moonIcon.classList.toggle("hidden", isDark)
        }
    }
}

const themeManager = new ThemeManager()

// Global function for theme toggle button
function toggleTheme(event) {
    themeManager.toggle(event)
}