<template>
  <div class="login-container">
    <div class="login-left">
      <div class="brand-info">
        <h1 class="brand-title">Eats Project</h1>
        <p class="brand-subtitle">Eats出前・デリバリー管理システム</p>
      </div>
    </div>
    <div class="login-right">
      <div class="login-form-wrapper">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
          <div class="login-form-title">
            <h2 class="title-label">ログイン</h2>
          </div>
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              type="text"
              auto-complete="off"
              placeholder="アカウント"
              prefix-icon="iconfont icon-user"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="パスワード"
              prefix-icon="iconfont icon-lock"
              @keyup.enter.native="handleLogin"
            />
          </el-form-item>
          <el-form-item style="width: 100%">
            <el-button
              :loading="loading"
              class="login-btn"
              size="medium"
              type="primary"
              style="width: 100%"
              @click.native.prevent="handleLogin"
            >
              <span v-if="!loading">ログイン</span>
              <span v-else>ログイン中...</span>
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'
import { Form as ElForm, Input } from 'element-ui'
import { UserModule } from '@/store/modules/user'
import { isValidUsername } from '@/utils/validate'

@Component({
  name: 'Login',
})
export default class extends Vue {
  private validateUsername = (rule: any, value: string, callback: Function) => {
    if (!value) {
      callback(new Error('ユーザー名を入力してください'))
    } else {
      callback()
    }
  }
  private validatePassword = (rule: any, value: string, callback: Function) => {
    if (value.length < 6) {
      callback(new Error('パスワードは6文字以上である必要があります'))
    } else {
      callback()
    }
  }
  private loginForm = {
    username: 'admin',
    password: '123456',
  } as {
    username: String
    password: String
  }

  loginRules = {
    username: [{ validator: this.validateUsername, trigger: 'blur' }],
    password: [{ validator: this.validatePassword, trigger: 'blur' }],
  }
  private loading = false
  private redirect?: string

  @Watch('$route', { immediate: true })
  private onRouteChange(route: Route) {}

  // ログイン
  private handleLogin() {
    ;(this.$refs.loginForm as ElForm).validate(async (valid: boolean) => {
      if (valid) {
        this.loading = true
        await UserModule.Login(this.loginForm as any)
          .then((res: any) => {
            if (String(res.code) === '1') {
              this.$router.push('/')
            } else {
              // this.$message.error(res.msg)
              this.loading = false
            }
          })
          .catch(() => {
            // this.$message.error('ユーザー名またはパスワードが間違っています！')
            this.loading = false
          })
      } else {
        return false
      }
    })
  }
}
</script>

<style lang="scss">
.login-container {
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: #f0f2f5;
  overflow: hidden;
}

.login-left {
  width: 50%;
  background: linear-gradient(135deg, #409eff 0%, #66b1ff 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -10%;
    left: -10%;
    width: 120%;
    height: 120%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
    background-size: 2rem 2rem;
    animation: move 20s linear infinite;
  }

  .brand-info {
    z-index: 1;
  }

  .brand-title {
    font-size: 4rem;
    font-weight: 900;
    margin-bottom: 1rem;
    text-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }

  .brand-subtitle {
    font-size: 1.5rem;
    font-weight: 300;
  }
}

.login-right {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
}

.login-form-wrapper {
  width: 320px;
}

.login-form-title {
  text-align: center;
  margin-bottom: 40px;
  .title-label {
    font-weight: 500;
    font-size: 2rem;
    color: #333333;
  }
}

.login-form {
  .el-form-item {
    margin-bottom: 30px;
  }
  .el-input__inner {
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    height: 40px;
    line-height: 40px;
  }
  .el-input__prefix {
    left: 10px;
    line-height: 40px;
  }
  .el-input--prefix .el-input__inner {
    padding-left: 35px;
  }
}

.login-btn {
  width: 100%;
  border-radius: 20px;
  padding: 12px 20px !important;
  font-size: 1rem;
  font-weight: 500;
  background-color: #409EFF;
  border-color: #409EFF;
  transition: background-color 0.3s;

  &:hover {
    background-color: #66b1ff;
    border-color: #66b1ff;
  }
}

@keyframes move {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(2rem, 2rem);
  }
  100% {
    transform: translate(0, 0);
  }
}
</style>
