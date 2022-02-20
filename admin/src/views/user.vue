<template>
  <div class="phone">
    <NavMenu></NavMenu>
    <div class="list">
      <div class="list-bd">
        <div class="users">
          <el-table
            :data="userList"
            style="width: 150%"
            :default-sort="{prop: '_id', order: 'ascending'}"
          >
            <el-table-column prop="_id" label="用户ID" sortable width="180"></el-table-column>
            <el-table-column prop="username" label="用户名称" sortable width="180"></el-table-column>
            <el-table-column prop="password" label="用户密码" sortable width="180"></el-table-column>
            <el-table-column prop="email" label="用户邮箱" sortable width="180"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavMenu from "../components/NavMenu";
export default {
  name: "user",
  components: {
    NavMenu
  },
  data() {
    return {
      userList: []
    };
  },
  mounted() {
    this.getUsersList();
  },
  methods: {
    getUsersList() {
      this.$axios.get("/users/all").then(res => {
        for (let i = 0; i < res.length; i++) {
          this.userList.push(res[i]);
        }
        console.log(this.userList);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.phone {
  display: flex;
  justify-content: flex-start;
  .list {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin: 10px;
    .list-hd {
      overflow: hidden;
      .addbtn {
        float: right;
      }
    }
    .list-bd {
      margin-top: 10px;
    }
  }
}
</style>