<template>
  <div class="cubic">
    <div
      class="cubic-left"
      :style="{ 'background-image': 'url(' + lSrc + ')' }"
    ></div>
    <div
      class="cubic-center"
      :style="{ 'background-image': 'url(' + cSrc + ')' }"
    >
      <slot></slot>
    </div>
    <div
      class="cubic-right"
      :style="{ 'background-image': 'url(' + rSrc + ')' }"
    ></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lSrc: require("@/assets/images/cubeModule/cube-l.png"),
      cSrc: require("@/assets/images/cubeModule/cube-c.png"),
      rSrc: require("@/assets/images/cubeModule/cube-r.png"),
    };
  },
};
</script>

<style lang="less" scoped>
.bgResize {
  height: 100%;
  background-position: top left;
  background-repeat: no-repeat;
  background-size: cover;
}
.cubic {
  display: flex;
  height: 96px;

  &-left {
    width: 16px;
    .bgResize;
  }
  &-center {
    .bgResize;
    min-width: 12px;
    background-size: contain;
    background-repeat: repeat-x;
    display: flex;
    font-size: 30px;
    align-items: center;
  }
  &-right {
    width: 28px;
    .bgResize;
  }
}
</style>
