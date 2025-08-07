<template>
  <div class="dashboard-container">
    <div class="container">
      <div class="tableBar">
        <label style="margin-right: 10px">セット名：</label>
        <el-input v-model="input"
                  placeholder="セット名を入力してください"
                  style="width: 14%"
                  clearable
                  @clear="init"
                  @keyup.enter.native="initFun" />

        <label style="margin-right: 10px; margin-left: 20px">セット分類：</label>
        <el-select v-model="categoryId"
                   style="width: 14%"
                   placeholder="選択してください"
                   clearable
                   @clear="init">
          <el-option v-for="item in dishCategoryList"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value" />
        </el-select>

        <label style="margin-right: 10px; margin-left: 20px">販売ステータス：</label>
        <el-select v-model="dishStatus"
                   style="width: 14%"
                   placeholder="選択してください"
                   clearable
                   @clear="init">
          <el-option v-for="item in saleStatus"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value" />
        </el-select>
        <el-button class="normal-btn continue"
                   @click="init(true)">
          検索
        </el-button>
        <div class="tableLab">
          <span class="delBut non"
                @click="deleteHandle('批量')">一括削除</span>
          <!-- <span class="blueBug non" @click="statusHandle('1')">一括販売</span>
          <span
            style="border: none"
            class="delBut non"
            @click="statusHandle('0')"
            >一括販売停止</span
          > -->
          <el-button type="primary"
                     style="margin-left: 15px"
                     @click="addSetMeal('add')">
            + 新規セット
          </el-button>
        </div>
      </div>
      <el-table v-if="tableData.length"
                :data="tableData"
                stripe
                class="tableBox"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection"
                         width="25" />
        <el-table-column prop="name"
                         label="セット名" />
        <el-table-column prop="image"
                         label="画像">
          <template slot-scope="{ row }">
            <el-image style="width: 80px; height: 40px; border: none; cursor: pointer"
                      :src="row.image">
              <div slot="error"
                   class="image-slot">
                <img src="./../../assets/noImg.png"
                     style="width: auto; height: 40px; border: none">
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="categoryName"
                         label="セット分類" />
        <el-table-column prop="price"
                         label="セット価格">
          <template slot-scope="scope">
            <span>￥{{ ((scope.row.price ).toFixed(2) * 100) / 100 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="販売ステータス">
          <template slot-scope="scope">
            <div class="tableColumn-status"
                 :class="{ 'stop-use': String(scope.row.status) === '0' }">
              {{ String(scope.row.status) === '0' ? '販売停止' : '販売中' }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="updateTime"
                         label="最終操作時間">
          <!-- <template slot-scope="scope">
            {{ moment(scope.row.lastUpdateTime).format('YYYY-MM-DD h:m:s') }}
          </template> -->
        </el-table-column>
        <el-table-column label="操作"
                         width="250"
                         align="center">
          <template slot-scope="scope">
            <el-button type="text"
                       size="small"
                       class="blueBug"
                       @click="addSetMeal(scope.row)">
              修正
            </el-button>
            <el-button type="text"
                       size="small"
                       class="delBut"
                       @click="deleteHandle('单删', scope.row.id)">
              削除
            </el-button>
            <el-button type="text"
                       size="small"
                       class="blueBug non"
                       :class="{
                         blueBug: scope.row.status == '0',
                         delBut: scope.row.status != '0'
                       }"
                       @click="statusHandle(scope.row)">
              {{ scope.row.status == '0' ? '販売開始' : '販売停止' }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <Empty v-else
             :is-search="isSearch" />
      <el-pagination v-if="counts > 10"
                     class="pageList"
                     :page-sizes="[10, 20, 30, 40]"
                     :page-size="pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="counts"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HeadLable from '@/components/HeadLable/index.vue'
import {
  getSetmealPage,
  editSetmeal,
  deleteSetmeal,
  setmealStatusByStatus,
  dishCategoryList
} from '@/api/setMeal'
import InputAutoComplete from '@/components/InputAutoComplete/index.vue'
import Empty from '@/components/Empty/index.vue'
import { baseUrl } from '@/config.json'

@Component({
  name: 'package',
  components: {
    HeadLable,
    InputAutoComplete,
    Empty
  }
})
export default class extends Vue {
  private input: any = ''
  private counts: number = 0
  private page: number = 1
  private pageSize: number = 10
  private checkList: any[] = []
  private tableData: [] = []
  private dishCategoryList = []
  private categoryId = ''
  private dishStatus = ''
  private isSearch: boolean = false
  private saleStatus: any = [
    {
      value: 0,
      label: '販売停止'
    },
    {
      value: 1,
      label: '販売中'
    }
  ]

  created() {
    this.init()
    this.getDishCategoryList()
  }

  initProp(val) {
    this.input = val
    this.initFun()
  }

  initFun() {
    this.page = 1
    this.init()
  }

  private async init(isSearch?) {
    this.isSearch = isSearch
    await getSetmealPage({
      page: this.page,
      pageSize: this.pageSize,
      name: this.input || undefined,
      categoryId: this.categoryId || undefined,
      status: this.dishStatus
    })
      .then(res => {
        if (res && res.data && res.data.code === 1) {
          this.tableData = res.data.data.records
          this.counts = Number(res.data.data.total)
        } else {
          this.$message.error(res.data.msg)
        }
      })
      .catch(err => {
        this.$message.error('リクエストエラー：' + err.message)
      })
  }

  // 追加修正
  private addSetMeal(st: any) {
    if (st === 'add') {
      this.$router.push({ path: '/setmeal/add' })
    } else {
      this.$router.push({ path: '/setmeal/add', query: { id: st.id } })
    }
  }

  // 削除
  private deleteHandle(type: string, id: any) {
    if (type === '批量' && id === null) {
      if (this.checkList.length === 0) {
        return this.$message.error('削除対象を選択してください')
      }
    }
    this.$confirm('このセットを削除しますか?', '削除の確認', {
      confirmButtonText: '削除',
      cancelButtonText: 'キャンセル',
      type: 'warning'
    }).then(() => {
      deleteSetmeal(type === '批量' ? this.checkList.join(',') : id)
        .then(res => {
          if (res.data.code === 1) {
            this.$message.success('削除成功！')
            this.init()
          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          this.$message.error('リクエストエラー：' + err.message)
        })
    })
  }

  //状態変更
  private statusHandle(row: any) {
    let params: any = {}
    if (typeof row === 'string') {
      if (this.checkList.length == 0) {
        this.$message.error('一括操作は、まず操作する料理にチェックを入れてください！')
        return false
      }
      params.ids = this.checkList.join(',')
      params.status = row
    } else {
      params.ids = row.id
      params.status = row.status ? '0' : '1'
    }

    this.$confirm('このセットのステータスを変更しますか?', 'ヒント', {
      confirmButtonText: '確認',
      cancelButtonText: 'キャンセル',
      type: 'warning'
    }).then(() => {
      setmealStatusByStatus(params)
        .then(res => {
          if (res.data.code === 1) {
            this.$message.success('セットのステータスが変更されました！')
            this.init()
          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          this.$message.error('リクエストエラー：' + err.message)
        })
    })
  }

  //セット分類ドロップダウンデータを取得
  private getDishCategoryList() {
    dishCategoryList({
      type: 2
    })
      .then(res => {
        if (res && res.data && res.data.code === 1) {
          this.dishCategoryList = (
            res.data &&
            res.data.data &&
            res.data.data
          ).map(item => {
            return { value: item.id, label: item.name }
          })
        }
      })
      .catch(() => {})
  }

  // すべての操作
  private handleSelectionChange(val: any) {
    let checkArr: string[] = []
    val.forEach((n: any) => {
      checkArr.push(n.id)
    })
    this.checkList = checkArr
  }

  private handleSizeChange(val: any) {
    this.pageSize = val
    this.init()
  }

  private handleCurrentChange(val: any) {
    this.page = val
    this.init()
  }
}
</script>
<style lang="scss">
.el-table-column--selection .cell {
  padding-left: 10px;
}
</style>
<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;

    .container {
      background: #fff;
      position: relative;
      z-index: 1;
      padding: 30px 28px;
      border-radius: 4px;

      .tableBar {
        margin-bottom: 20px;
        .tableLab {
          float: right;
          span {
            cursor: pointer;
            display: inline-block;
            font-size: 14px;
            padding: 0 20px;
            color: $gray-2;
          }
        }
      }

      .tableBox {
        width: 100%;
        border: 1px solid $gray-5;
        border-bottom: 0;
      }

      .pageList {
        text-align: center;
        margin-top: 30px;
      }
      //検索黒ボタンのスタイル
      .normal-btn {
        background: #333333;
        color: white;
        margin-left: 20px;
      }
    }
  }
}
</style>
