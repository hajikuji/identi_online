<template>
  <div class="title-logo">
    <img class="title-img" v-if="showLogo" :src="imgSrc" alt="东方实验智考人脸识别系统" />
    <p class="title-text">东方实验智考人脸识别系统</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgSrc: require("@/assets/logo.png"),
    };
  },
  props:{
    showLogo:{
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="less" scoped>
.title-logo {
  display: flex;
  align-items: center;
  .title-img {
    margin-right: 20px;
  }
  .title-text {
    margin: 0;
    font-size: 25px;
    color: #ffffff;
  }
}
</style>
