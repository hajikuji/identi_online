<template>
  <div class="readonly-form">
    <div class="form-title">
      <title-logo :showLogo="false"></title-logo>
    </div>
    <div
      class="form-row"
      v-for="(item, index) in dataList"
      :key="index"
      :class="{ 'form-resize': index === dataList.length - 1 }"
    >
      <div class="form-labels">{{ item.labels }}</div>
      <div class="form-input">{{ item.info }}</div>
    </div>
  </div>
</template>

<script>
import TitleLogo from "@/components/titlelogo/TitleLogo.vue";
export default {
  components: {
    TitleLogo,
  },
  props: {
    dataList: {
      type: Array,
      default: () => [
        { labels: "姓名", info: "" },
        { labels: "性别", info: "" },
        { labels: "准考证号", info: "" },
        { labels: "考试科目", info: "" },
        { labels: "座位号", info: "02" },
      ],
    },
  },
  data() {
    return {
      isSpecial: false,
    };
  },
};
</script>

<style lang="less" scoped>
.readonly-form {
  width: 480px;
  font-size: 18px;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .form-resize {
    flex-direction: column;
    .form-input {
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      width: 254px !important;
      height: 74px !important;
      font-size: 36px;
      margin-left: 0 !important;
    }
  }
  .form-row {
    display: flex;
    margin-top: 28px;
    width: 408px;
    .form-labels {
      padding-right: 4px;
      width: 104px;
      height: 30px;
      text-align: right;
      text-align-last: justify;
      &::after {
        position: absolute;
        content: ":";
      }
    }
    .form-input {
      color: #ffffff;
      font-size: 18px;
      box-sizing: border-box;
      margin-left: 10px;
      padding-left: 10px;
      display: flex;
      align-items: center;
      width: 174px;
      height: 28px;
      border: 1px solid #00c2ff;
    }
  }
}
</style>
