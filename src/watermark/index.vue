<template>
  <div class="watermark"
       :style="`background-image:url('${watermarkUrl}');opacity:${getGlobalStore.watermark.opacity};`"
       v-if="getGlobalStore.watermark.visible"
       :class="{single:getGlobalStore.watermark.single}">
  </div>
</template>

<script setup>
import {globalStore} from "../stores/index.js";
import {onMounted, ref} from "vue";
import {base64Url} from "./demo.js"

const getGlobalStore = globalStore();

const watermarkUrl = ref("");
const getDPI = () => {
  const tempNode = document.createElement("div");
  tempNode.style.width = "1in";
  tempNode.style.height = "1in";
  document.body.appendChild(tempNode);
  const dpi = tempNode.offsetWidth;
  document.body.removeChild(tempNode);
  return dpi;
};
const getWatermark = () => {
  // 水印平铺时的密度：MODERATE 适中的 COMPACT 紧凑的 SPARSE 稀疏的
  const densityMap = {
    MODERATE: 1.5,
    COMPACT: 1.2,
    SPARSE: 2,
  };
  let rotate = 0
  setInterval(() => {
    rotate = rotate + 1
    getGlobalStore.watermark.density = 1;
    getGlobalStore.watermark.rotate = rotate
    getGlobalStore.watermark.imgWatermarkBase64 = base64Url;
    getGlobalStore.imgWatermarkBase64 = base64Url;
    getGlobalStore.getWatermarkUrl.then((res) => {
      watermarkUrl.value = res;
    });
  }, 100)

};
onMounted(() => {
  getWatermark();
});
</script>

<style scoped lang="stylus">
.watermark
  width 100%
  height 100%
  position absolute
  left 0
  top 0
  pointer-events none
  background-position: center center;

.single
  background-repeat no-repeat
  background-size contain
</style>
