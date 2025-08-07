<template>
  <div class="navbar">
    <div class="statusBox">
      <hamburger id="hamburger-container"
                 :is-active="sidebar.opened"
                 class="hamburger-container"
                 @toggleClick="toggleSideBar" />
      <span v-if="status===1"
            class="businessBtn">営業中</span>
      <span v-else
            class="businessBtn closing">打烊中</span>
    </div>

    <div :key="restKey"
         class="right-menu">
      <div class="rightStatus">
        <audio ref="audioVo"
               hidden>
          <source src="./../../../assets/preview.mp3" type="audio/mp3" />
        </audio>
        <audio ref="audioVo2"
               hidden>
          <source src="./../../../assets/reminder.mp3" type="audio/mp3" />
        </audio>
        <span class="navicon operatingState" @click="handleStatus"><i />営業時間設定</span>
      </div>
      <div class="avatar-wrapper">
        <div :class="shopShow?'userInfo':''"
             @mouseenter="toggleShow"
             @mouseleave="mouseLeaves">
          <el-button type="primary"
                     :class="shopShow?'active':''">
            {{ name }}<i class="el-icon-arrow-down" />
          </el-button>
          <div v-if="shopShow"
               class="userList">
            <p class="amendPwdIcon"
               @click="handlePwd">
              パスワードを変更<i />
            </p>
            <p class="outLogin"
               @click="logout">
              ログアウト<i />
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- 営業時間設定ポップアップ -->
    <el-dialog title="営業時間設定"
               :visible.sync="dialogVisible"
               width="25%"
               :show-close="false">
      <el-radio-group v-model="setStatus">
        <el-radio :label="1">
          営業中
          <span>現在のレストランは営業中です。すべての注文を自動的に受け付けます。「閉店」をクリックすると店舗の閉店状態に切り替わります。</span>
        </el-radio>
        <el-radio :label="0">
          打烊中
          <span>現在のレストランは閉店しています。営業時間内の予約注文のみ受け付けます。「営業中」をクリックすると手動で営業状態に戻すことができます。</span>
        </el-radio>
      </el-radio-group>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">キャンセル</el-button>
        <el-button type="primary"
                   @click="handleSave">確認</el-button>
      </span>
    </el-dialog>
    <!-- end -->
    <!-- パスワードを変更 -->
    <Password :dialog-form-visible="dialogFormVisible"
              @handleclose="handlePwdClose" />
    <!-- end -->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { AppModule } from '@/store/modules/app'
import { UserModule } from '@/store/modules/user'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import Hamburger from '@/components/Hamburger/index.vue'
import { getStatus, setStatus } from '@/api/users'
import Cookies from 'js-cookie'
import { debounce, throttle } from '@/utils/common'
import { setNewData, getNewData } from '@/utils/cookies'

// インターフェース
import { getCountUnread } from '@/api/inform'
// パスワード変更ポップアップ
import Password from '../components/password.vue'

@Component({
  name: 'Navbar',
  components: {
    Breadcrumb,
    Hamburger,
    Password,
  },
})
export default class extends Vue {
  private storeId = this.getStoreId
  private restKey: number = 0
  private websocket = null
  private newOrder = ''
  private message = ''
  private audioIsPlaying = false
  private audioPaused = false
  private statusValue = true
  private audioUrl: './../../../assets/preview.mp3'
  private shopShow = false
  private dialogVisible = false
  private status = 1
  private setStatus = 1
  private dialogFormVisible = false
  private ountUnread = 0
  // get ountUnread() {
  //   return Number(getNewData())
  // }
  get sidebar() {
    return AppModule.sidebar
  }

  get device() {
    return AppModule.device.toString()
  }

  getuserInfo() {
    return UserModule.userInfo
  }

  get name() {
    return (UserModule.userInfo as any).name
      ? (UserModule.userInfo as any).name
      : JSON.parse(Cookies.get('user_info') as any).name
  }

  get getStoreId() {
    let storeId = ''
    if (UserModule.storeId) {
      storeId = UserModule.storeId
    } else if ((UserModule.userInfo as any).stores != null) {
      storeId = (UserModule.userInfo as any).stores[0].storeId
    }
    return storeId
  }
  mounted() {
    document.addEventListener('click', this.handleClose)
    //console.log(this.$store.state.app.statusNumber)
    // const msg = {
    //   data: {
    //     type: 2,
    //     content: '注文1653904906519お客様から催促があり、注文後23分経過してもまだ受付されていません。',
    //     details: '434'
    //   }
    // }
    this.getStatus()
  }
  created() {
    this.webSocket()
  }
  onload() {
  }
  destroyed() {
    this.websocket.close() //ルートを離れた後、websocket接続を切断します
  }

  // 新規注文通知ポップアップを追加
  webSocket() {
    const that = this as any
    let clientId = Math.random().toString(36).substr(2)
    let socketUrl = process.env.VUE_APP_SOCKET_URL + clientId
    console.log(socketUrl, 'socketUrl')
    if (typeof WebSocket == 'undefined') {
      that.$notify({
        title: 'ヒント',
        message: '現在のブラウザではリアルタイムのアラーム情報を受信できません。Google Chromeを使用してください！',
        type: 'warning',
        duration: 0,
      })
    } else {
      this.websocket = new WebSocket(socketUrl)
      // socketのオープンを監視
      this.websocket.onopen = function () {
        console.log('ブラウザのWebSocketが開きました')
      }
      // socketメッセージの受信を監視
      this.websocket.onmessage = function (msg) {
        // jsonオブジェクトに変換
        that.$refs.audioVo.currentTime = 0
        that.$refs.audioVo2.currentTime = 0

        console.log(msg, JSON.parse(msg.data), 'msg')
        // const h = this.$createElement
        const jsonMsg = JSON.parse(msg.data)
        if (jsonMsg.type === 1) {
          that.$refs.audioVo.play()
        } else if (jsonMsg.type === 2) {
          that.$refs.audioVo2.play()
        }
        that.$notify({
          title: jsonMsg.type === 1 ? '受注待ち' : '催促',
          duration: 0,
          dangerouslyUseHTMLString: true,
          onClick: () => {
            that.$router
              .push(`/order?orderId=${jsonMsg.orderId}`)
              .catch((err) => {
                console.log(err)
              })
            setTimeout(() => {
              location.reload()
            }, 100)
          },
          // ここで返信情報をmessageに追加して表示することもできます
          message: `${
            jsonMsg.type === 1
              ? `<span>未処理の<span style=color:#419EFF>注文が1件あります</span>,${jsonMsg.content},速やかに対応してください</span>`
              : `${jsonMsg.content}<span style='color:#419EFF;cursor: pointer'>処理する</span>`
          }`,
        })
      }
      // socketエラーを監視
      this.websocket.onerror = function () {
        that.$notify({
          title: 'エラー',
          message: 'サーバーエラー。リアルタイムのアラーム情報を受信できません',
          type: 'error',
          duration: 0,
        })
      }
      // socketのクローズを監視
      this.websocket.onclose = function () {
        console.log('WebSocketが閉じられました')
      }
    }
  }

  private toggleSideBar() {
    AppModule.ToggleSideBar(false)
  }
  // ログアウト
  private async logout() {
    this.$store.dispatch('LogOut').then(() => {
      // location.href = '/'
      this.$router.replace({ path: '/login' })
    })
    // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
  }
  // 未読メッセージを取得
  async getCountUnread() {
    const { data } = await getCountUnread()
    if (data.code === 1) {
      // this.ountUnread = data.data
      AppModule.StatusNumber(data.data)
      // setNewData(data.data)
      // this.$message.success('操作成功！')
    } else {
      this.$message.error(data.msg)
    }
  }
  // 営業時間
  async getStatus() {
    const { data } = await getStatus()
    this.status = data.data
    this.setStatus = this.status
  }
  // ドロップダウンメニューを表示
  toggleShow() {
    this.shopShow = true
  }
  // ドロップダウンメニューを非表示
  mouseLeaves() {
    this.shopShow = false
  }
  // 空白部分をクリックしてドロップダウンメニューを閉じる
  handleClose() {
    // clearTimeout(this.leave)
    // this.shopShow = false
  }
  // 営業時間を設定
  handleStatus() {
    this.dialogVisible = true
  }
  // 営業時間設定
  async handleSave() {
    const { data } = await setStatus(this.setStatus)
    if (data.code === 1) {
      this.dialogVisible = false
      this.getStatus()
    }
  }
  // パスワードを変更
  handlePwd() {
    this.dialogFormVisible = true
  }
  // パスワード編集ポップアップを閉じる
  handlePwdClose() {
    this.dialogFormVisible = false
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 60px;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .statusBox {
    float: left;
    height: 100%;
    align-items: center;
    display: flex;
  }
  .hamburger-container {
    color: #333;
    padding: 0 12px 0 20px;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }
  .right-menu {
    float: right;
    margin-right: 20px;
    color: #333;
    font-size: 14px;

    span {
      padding: 0 10px;
      width: 130px;
      display: inline-block;
      cursor: pointer;
      color: #333;
      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }
    .amendPwdIcon {
      i {
        width: 18px;
        height: 18px;
        background: url(./../../../assets/icons/btn_gaimi@2x.png) no-repeat;
        background-size: contain;
        margin-top: 8px;
      }
    }
    .outLogin {
      i {
        width: 18px;
        height: 18px;
        background: url(./../../../assets/icons/btn_close@2x.png) no-repeat 100%
          100%;
        background-size: contain;
        margin-top: 8px;
      }
    }
    .outLogin {
      cursor: pointer;
    }

    &:focus {
      outline: none;
    }
  }
  .rightStatus {
    height: 100%;
    line-height: 60px;
    display: flex;
    align-items: center;
    float: left;
  }
  .avatar-wrapper {
    margin-top: 14px;
    margin-left: 18px;
    position: relative;
    float: right;
    width: 120px;
    text-align: left;
    .el-button--primary {
      background: transparent;
      border-radius: 4px;
      padding-top: 0px;
      padding-bottom: 0px;
      position: relative;
      color: #333;
      width: 120px;
      padding-left: 12px;
      text-align: left;
      border: 0 none;
      height: 32px;
      line-height: 32px;
      &.active {
        background: transparent;
        border: 0 none;
        .el-icon-arrow-down {
          transform: rotate(-180deg);
        }
      }
    }
  }
  .businessBtn {
    height: 22px;
    line-height: 20px;
    background: #13ce66;
    border: 1px solid #ffffff;
    border-radius: 4px;
    display: inline-block;
    padding: 0 6px;
    color: #fff;
  }
  .closing {
    background: #f56c6c;
  }
  .navicon {
    i {
      display: inline-block;
      width: 18px;
      height: 18px;
      vertical-align: sub;
      margin: 0 4px 0 0;
    }
  }
  .operatingState {
    i {
      background: url('./../../../assets/icons/time.png') no-repeat;
      background-size: contain;
    }
  }
}
</style>
<style lang="scss">
.el-notification {
  // background: rgba(255, 255, 255, 0.71);
  width: 419px !important;
  .el-notification__title {
    margin-bottom: 14px;
    color: #333;
    .el-notification__content {
      color: #333;
    }
  }
}
.navbar {
  .el-dialog {
    min-width: auto !important;
  }
  .el-dialog__header {
    height: 61px;
    line-height: 60px;
    background: #fbfbfa;
    padding: 0 30px;
    font-size: 16px;
    color: #333;
    border: 0 none;
  }
  .el-dialog__body {
    padding: 10px 30px 30px;
    .el-radio,
    .el-radio__input {
      white-space: normal;
    }
    .el-radio__label {
      padding-left: 5px;
      color: #333;
      font-weight: 700;
      span {
        display: block;
        line-height: 20px;
        padding-top: 12px;
        color: #666;
        font-weight: normal;
      }
    }
    .el-radio__input.is-checked .el-radio__inner {
      &::after {
        background: #333;
      }
    }
    .el-radio-group {
      & > .is-checked {
        border: 1px solid #409EFF;
      }
    }
    .el-radio {
      width: 100%;
      background: #fbfbfa;
      border: 1px solid #e5e4e4;
      border-radius: 4px;
      padding: 14px 22px;
      margin-top: 20px;
    }
    .el-radio__input.is-checked + .el-radio__label {
      span {
      }
    }
  }
  .el-badge__content.is-fixed {
    top: 24px;
    right: 2px;
    width: 18px;
    height: 18px;
    font-size: 10px;
    line-height: 16px;
    font-size: 10px;
    border-radius: 50%;
    padding: 0;
  }
  .badgeW {
    .el-badge__content.is-fixed {
      width: 30px;
      border-radius: 20px;
    }
  }
}
.el-icon-arrow-down {
  background: url('./../../../assets/icons/up.png') no-repeat 50% 50%;
  background-size: contain;
  width: 8px;
  height: 8px;
  transform: rotate(0eg);
  margin-left: 16px;
  position: absolute;
  right: 16px;
  top: 12px;
  &:before {
    content: '';
  }
}

.userInfo {
  background: #fff;
  position: absolute;
  top: 0px;
  left: 0;
  z-index: 99;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.14);
  width: 100%;
  border-radius: 4px;
  line-height: 32px;
  padding: 0 0 5px;
  height: 105px;
  color: #333;
  // .active {
  //   top: 0;
  //   left: 0;
  // }
  .userList {
    width: 95%;
    // // margin-top: -5px;
    // position: absolute;
    // top: 35px;
    padding-left: 5px;
  }
  p {
    cursor: pointer;
    height: 32px;
    line-height: 32px;
    padding: 0 5px 0 7px;
    i {
      margin-left: 10px;

      vertical-align: middle;
      margin-top: 4px;
      float: right;
    }
    &:hover {
      background: #ecf5ff;
    }
  }
}
.msgTip {
  color: #419eff;
  padding: 0 5px;
}
</style>
