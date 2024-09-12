import {defineStore} from "pinia";
import {createWatermark} from "../utils/index.js";

export const globalStore = defineStore("globalStore", {
    state: () => ({
        watermark: {
            content: "",
            fontSize: 14,
            fontFamily: "PingFang SC, sans-serif",
            rotate: 30,
            color: "rgba(156, 156, 156, 1)",
            single: true,
            visible: true,
            opacity: 1,
            density: 1.5,
        }
    }),
    getters: {
        getWatermarkUrl(state) {
            return createWatermark(state.watermark);
        },
    },
});
