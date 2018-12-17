import { setStore } from "./utils"

export const loadingStart = setStore("LOADING_START", {loading: true})
export const loadingFinish = setStore("LOADING_FINISH", {loading: false})