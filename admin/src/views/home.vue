<template>
  <div class="home">
    <NavMenu></NavMenu>
    <div class="main">Welcome to EASY购商城管理系统</div>
  </div>
</template>

<script>
import NavMenu from "../components/NavMenu";
export default {
  name: "home",
  components: {
    NavMenu
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/config.scss";
.home {
  display: flex;
  align-items: center;
  .main {
    width: 100%;
    text-align: center;
  }
}
</style>