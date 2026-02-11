import * as React from "react"

const IS_MOBILE = "(max-width: 768px)"

export function useMobile() {
    const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

    React.useEffect(() => {
        const mql = window.matchMedia(IS_MOBILE)
        const onChange = () => {
            setIsMobile(window.innerWidth < 768)
        }
        mql.addEventListener("change", onChange)
        setIsMobile(window.innerWidth < 768)
        return () => mql.removeEventListener("change", onChange)
    }, [])

    return !!isMobile
}
