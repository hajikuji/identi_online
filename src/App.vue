<template>
  <div id="app" :style="{ 'background-image': 'url(' + bgSrc + ')' }">
    <!--顶部-->
    <top-module>
      <div class="top-module" :class="{ 'top-module-resize': !success }">
        <div class="top-module-left" v-show="success">
          <cube-module>
            <img :src="sightMirror" alt="" />
            <div class="content">请在区域中进行识别...</div>
          </cube-module>
        </div>
        <div class="top-module-right">
          <cube-module>
            <div class="top-module-date">
              <div class="week">{{ week }}</div>
              <div class="date">{{ date }}</div>
            </div>
            <div class="time">{{ time }}</div>
          </cube-module>
        </div>
        <title-logo v-show="!success"></title-logo>
      </div>
    </top-module>
    <!--内容区-->
    <middle-module>
      <div style="display: flex">
        <scan-module :isSuccess="success" :userImage="userImage"></scan-module>
        <middle-info v-show="success" :dataList="dataList"></middle-info>
      </div>
    </middle-module>
  </div>
</template>

<script>
import TopModule from "@/components/top/TopModule.vue";
import MiddleModule from "@/components/middle/MiddleModule.vue";
import CubeModule from "@/components/top/CubeModule.vue";
import ScanModule from "@/components/scan/ScanModule.vue";
import TitleLogo from "@/components/titlelogo/TitleLogo.vue";
import MiddleInfo from "@/components/middle/MiddleInfo.vue";
import { baseUrl } from "@/config/https.js";
export default {
  data() {
    return {
      bgSrc: require("@/assets/bg.jpg"),
      sightMirror: require("@/assets/images/topNav/sight-mirror.png"),
      success: false,
      nowDate: "",
      dataList: [
        { labels: "姓名", info: "" },
        { labels: "性别", info: "" },
        { labels: "准考证号", info: "" },
        { labels: "考试科目", info: "" },
        { labels: "座位号", info: "" },
      ], //
      userImage: "",
    };
  },
  created() {
    this.getNowTime();
  },
  mounted() {
    this.loopExe(this.getNowTime);
    this.loopExe(this.getList, 3000);
    this.loopExe(this.toFail, 5000);
  },
  methods: {
    // 获取当前时间
    getNowTime() {
      this.nowDate = new Date();
      return this.nowDate;
    },
    // 循环执行
    loopExe(fn, interval = 1000) {
      timer && clearTimeout(timer);
      let timer = null,
        args = arguments;
      timer = setInterval(function () {
        fn.apply(this, arguments);
      }, interval);
    },
    toFail() {
      this.success = false;
    },
    // 初始化
    async getList() {
      //
      this.dataList = [
        { labels: "姓名", info: "" },
        { labels: "性别", info: "" },
        { labels: "准考证号", info: "" },
        { labels: "考试科目", info: "" },
        { labels: "座位号", info: "" },
      ]; //

      let result = await this.$post(baseUrl + "/getFaceRecognitionInfo.do");
      let { data } = result;
      console.log("获得刷脸数据", data);
      let {
        response_info: { status },
      } = data;
      console.log(status);
      if (data.response_info.data != null) {
        this.success = status === 200;
        /**
         * @param user_id 准考证号
         * @param user_image 照片URL
         * @param lines 字段名称
         */
        let { user_id, user_image, lines } = data.response_info.data;
        this.userImage = user_image;
        let output = lines.map((item, index) => {
          return item["show_value"];
        });
        this.dataList = [
          { labels: "姓名", info: output[4] },
          { labels: "性别", info: output[5] },
          { labels: "准考证号", info: output[6] },
          { labels: "考试科目", info: output[1] },
          { labels: "座位号", info: output[7] },
        ];
        return false;
      } else {
        return true;
      }
    },
  },
  computed: {
    week() {
      let _result = [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
      ];
      return _result[this.nowDate.getDay()];
    },
    date() {
      return this.nowDate.toLocaleDateString();
    },
    time() {
      let _hours = this.nowDate.getHours(),
        _minutes = this.nowDate.getMinutes();
      _hours < 10 && (_hours = "0" + _hours);
      _minutes < 10 && (_minutes = "0" + _minutes);
      return `${_hours}:${_minutes}`;
    },
  },
  components: {
    TopModule,
    MiddleModule,
    CubeModule,
    ScanModule,
    TitleLogo,
    MiddleInfo,
  },
};
</script>

<style lang="less">
html,
body {
  margin: 0;
  padding: 0;
}
* {
  transition: 0.3s;
}
/* 设置滚动条的样式 */
::-webkit-scrollbar {
  width: 0px;
}
/* 滚动槽 */
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.3);
  border-radius: 10px;
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.5);
}
::-webkit-scrollbar-thumb:window-inactive {
  background: #00c2ff;
}

#app {
  font-family: "Microsoft YaHei", Arial, sans-serif;
  width: 100vw;
  min-height: 100vh;
  background-attachment: fixed;
  background-position: top left;
  background-repeat: no-repeat;
  background-size: cover;
  box-sizing: border-box;
  padding: 38px 21px;
  padding-right: 86px;
  color: #ffffff;
  .top-module {
    display: flex;
    margin-bottom: 28px;
    &-left {
      .content {
        padding-left: 12px;
      }
    }
  }
  .top-module-resize {
    justify-content: space-between;
  }
  .top-module-date {
    font-size: 18px;
  }
  .time {
    margin-left: 16px;
    font-size: 70px;
    font-family: "Ds Digital";
  }
}
</style>
