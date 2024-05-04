import { ScreenType } from "types/screen";

export const formatScreenType = (type: ScreenType)=> {
    const formatedType = type === "indoor" ? "Indoor" : "Outdoor"
    return formatedType
}