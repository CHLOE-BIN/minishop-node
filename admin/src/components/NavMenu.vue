<template>
  <div class="left">
    <div class="title">EASY购管理系统</div>
    <div class="options">
      <el-row>
        <el-col>
          <el-menu default-active="1" :default-openeds="['1']">
            <router-link to="/home">
              <el-menu-item index="1">
                <i class="el-icon-document"></i>
                <span slot="title">首页</span>
              </el-menu-item>
            </router-link>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>商品管理</span>
              </template>
              <el-menu-item-group>
                <router-link to="/phone">
                  <el-menu-item index="2-1">
                    <i class="el-icon-mobile-phone"></i>
                    <template slot="title">手机</template>
                  </el-menu-item>
                </router-link>
              </el-menu-item-group>
              <router-link to="/tv">
                <el-menu-item index="2-2">
                  <i class="el-icon-s-platform"></i>
                  <template slot="title">电视</template>
                </el-menu-item>
              </router-link>
            </el-submenu>
            <router-link to="/user">
              <el-menu-item index="3">
                <i class="el-icon-document"></i>
                <span slot="title">用户管理</span>
              </el-menu-item>
            </router-link>
          </el-menu>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "nav-menu",
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.left {
  width: 200px;
  height: 500px;
  .title {
    margin: 10px;
    text-align: center;
  }
  .options {
    margin-top: 20px;
    .el-menu-item {
      padding-left: 0;
    }
  }
}
</style>