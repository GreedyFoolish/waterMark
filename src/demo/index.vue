<template>
  <div class="wrap">
    <div class="demo">
      <Watermark></Watermark>
    </div>
  </div>
</template>

<script setup>
import Watermark from "../watermark/index.vue";

</script>

<style scoped>
.wrap {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.demo {
  width: 180px;
  height: 180px;
  position: relative;
  background-color: #fff;
}
</style>
