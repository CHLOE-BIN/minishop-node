<template>
  <div class="phone">
    <NavMenu></NavMenu>
    <div class="list">
      <div class="list-hd">
        <div class="addbtn">
          <el-button type="primary" size="small" @click="handleAdd">添加</el-button>
        </div>
      </div>
      <div class="list-bd">
        <div class="products">
          <el-table
            :data="phoneList"
            style="width: 150%"
            :default-sort="{prop: 'productId', order: 'ascending'}"
          >
            <el-table-column prop="productId" label="商品ID" sortable width="180"></el-table-column>
            <el-table-column prop="name" label="商品名称" sortable width="180"></el-table-column>
            <!-- <el-table-column prop="subtitle" label="商品介绍" sortable width="180"></el-table-column> -->
            <el-table-column prop="mainImg" label="商品图片" sortable width="180"></el-table-column>
            <el-table-column prop="price" label="商品价格" sortable width="180"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button @click="handleEdit(scope.row)" type="text">编辑</el-button>
                <el-button @click="handleDelete(scope.row)" type="text">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <DialogBox :dialogBox="dialogBox" :productsForm="productsForm"></DialogBox>
  </div>
</template>

<script>
import NavMenu from "../components/NavMenu";
import DialogBox from "../components/DialogBox";
export default {
  name: "phone",
  components: {
    NavMenu,
    DialogBox
  },
  data() {
    return {
      phoneList: [],
      dialogBox: {
        show: false,
        title: "",
        option: ""
      },
      productsForm: {
        categoryId: "",
        productId: "",
        name: "",
        subtitle: "",
        mainImg: "",
        price: ""
      }
    };
  },
  mounted() {
    this.getProductsList();
  },
  methods: {
    getProductsList() {
      this.$axios.get("/products").then(res => {
        for (let i = 0; i < res.length; i++) {
          if (res[i].categoryId == 1) {
            this.phoneList.push(res[i]);
          }
        }
        console.log(this.phoneList);
      });
    },
    handleEdit(row) {
      this.dialogBox = {
        show: true,
        title: "修改商品信息",
        option: "edit"
      };
      this.productsForm = {
        categoryId: row.categoryId,
        productId: row.productId,
        name: row.name,
        subtitle: row.subtitle,
        mainImg: row.mainImg,
        price: row.price
      };
    },
    handleDelete(row) {
      this.$confirm("此操作将删除选中的内容, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //点击确定的操作(调用接口)
          this.$axios.delete(`/products/delete/${row.productId}`).then(res => {
            this.$message({
              message: "商品删除成功",
              type: "success",
              duration: 1000
            });
            location.reload();
          });
        })
        .catch(() => {
          //几点取消的提示
        });
    },
    handleAdd() {
      this.dialogBox = {
        show: true,
        title: "添加商品信息",
        option: "add"
      };
      this.productsForm = {
        categoryId: "",
        productId: "",
        name: "",
        subtitle: "",
        mainImg: "",
        price: ""
      };
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