<template>
  <div class="index">
    <div class="container">
      <div class="box-hd">
        <div class="title">EASY购商城管理系统</div>
      </div>
      <div class="box-bd">
        <div class="left">
          <img src="/imgs/bg-1.png" alt />
        </div>
        <div class="right">
          <div class="login" v-show="change">
            <el-form
              :model="loginForm"
              status-icon
              :rules="loginRules"
              ref="loginForm"
              label-width="100px"
              hide-required-asterisk
            >
              <el-form-item label="用户名" prop="username">
                <el-input type="text" v-model="loginForm.username" placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input
                  type="password"
                  v-model="loginForm.password"
                  show-password
                  placeholder="请输入密码"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" class="login-btn" @click="submitForm('loginForm')">登录</el-button>
                <el-button @click="changeTab">去注册</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="register" v-show="!change">
            <el-form
              :model="registerForm"
              status-icon
              :rules="registerRules"
              ref="registerForm"
              label-width="100px"
              hide-required-asterisk
            >
              <el-form-item label="邮箱" prop="email">
                <el-input type="text" v-model="registerForm.email" placeholder="请输入邮箱"></el-input>
              </el-form-item>
              <el-form-item label="用户名" prop="username">
                <el-input type="text" v-model="registerForm.username" placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="registerForm.password" placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="password2">
                <el-input type="password" v-model="registerForm.password2" placeholder="再次输入密码"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  class="register-btn"
                  @click="submitForm('registerForm')"
                >注册</el-button>
                <el-button @click="changeTab">去登陆</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  components: {},
  data() {
    // 验证password2是否等于password
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // publicURL: "http://localhost:8081",
      change: true,
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          }
        ]
      },
      registerForm: {
        email: "",
        username: "",
        password: "",
        password2: ""
      },
      registerRules: {
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        username: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          },
          {
            min: 6,
            max: 20,
            message: "密码长度应在6-20之间"
          }
        ],
        password2: [
          {
            required: true,
            message: "确认密码不能为空",
            trigger: "blur"
          },
          { validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },
  mounted() {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (formName === "loginForm") {
            // 请求登录接口
            this.$axios.post("/admins/login", this.loginForm).then(res => {
              this.$message({
                type: "success",
                message: "登录成功",
                duration: 1000
              });
              this.$router.push("/home");
            });
          } else if (formName === "registerForm") {
            // 请求注册接口
            this.$axios
              .post("/admins/register", this.registerForm)
              .then(res => {
                console.log("注册成功");
                this.change = !this.change;
              });
          }
        }
      });
    },
    changeTab() {
      this.change = !this.change;
    }
  }
};
</script>

<style scoped lang="scss">
@import "../assets/config.scss";
.index {
  .container {
    width: 100%;
    .box-hd {
      .title {
        text-align: center;
        padding-top: 10px;
        margin-bottom: 20px;
        font-size: $fontD;
      }
    }
    .box-bd {
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #eeeeee;
      .left {
        width: 50%;
      }
      .right {
        width: 50%;
        .login {
          width: 70%;
          .login-btn {
            width: 50%;
            margin: 0 auto;
          }
        }
        .register {
          width: 70%;
          .register-btn {
            width: 50%;
            margin: 0 auto;
          }
        }
      }
    }
  }
}
</style>