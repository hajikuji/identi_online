<template>
  <div
    class="scan-module"
    :style="{ 'background-image': 'url(' + scanSrc + ')' }"
  >
    <div v-show="isSuccess" class="cover">
      <img class="center-pos" :src="coverImage" alt="识别成功" />
      <div class="center-pos">识别成功</div>
    </div>
     <img
      v-show="isSuccess"
     class="avatar"
        :src="userImage"
        alt=""
      />
    <div v-show="!isSuccess" class="title">
      <img :src="sightMirror" alt="" />
      <p class="text">识别中</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scanSrc: require("@/assets/images/scan/scan-bg.png"),
      sightMirror: require("@/assets/images/topNav/sight-mirror.png"),
      coverImage: require("@/assets/images/scan/scan-cover.png"),
    };
  },
  props: {
    isSuccess: {
      type: Boolean,
      default: true,
    },
    userImage: {
      type: String,
      default: "https://p1.music.126.net/xzNXWvhOp--kjMn2ZisHlQ==/109951165389571852.jpg?param=440y440",
    },
  },
};
</script>

<style lang="less" scoped>
.scan-module {
  position: relative;
  font-size: 30px;
  color: #ffffff;
  width: 510px;
  height: 420px;
  background-size: contain;
  background-repeat: no-repeat;
  .cover {
    transition: 0.3s;
  }
  .center-pos {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    .text {
      margin-left: 18px;
    }
  }
  .avatar {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
  }
}
</style>
