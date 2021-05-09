  <template>
  <div class="app-container">
    <div class="search-div">
      <div>
        <div><span>当前身份：</span><span>初级教师</span></div>
        <div><span>已有权限：</span><span>初级教师</span></div>
      </div>
      <el-button type="primary" @click="applyForPermission">申请权限</el-button>
    </div>
    <MTable :tableInfo="tableInfo" :data="list" />
    <Pagination
      :page="listQuery.page"
      :pageSizes="listQuery.pageSizes"
      :limit="listQuery.limit"
      :total="listQuery.total"
    />
    <el-dialog title="" :visible.sync="dialogVisible" width="70%">
      <MTable
        :tableInfo="tableInfoDialog"
        :data="listDialog"
        @handleBtnClick="handleBtnClick"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getList } from "@/api/table";
import MTable from '@/components/Basic/MTable'
import Pagination from '@/components/Pagination/index'
// import animationDialog from '@/components/Basic/animationDialog'
export default {
  components: {
    MTable,
    Pagination
    // animationDialog
  },
  data() {
    return {
      dialogVisible: false,
      listQuery: {
        page: 1,
        limit: 10,
        total: 0,
        pageSizes: [10, 20, 30, 40, 50]
      },
      list: [],
      tableInfo: {
        ref: 'form',
        height: '100%',
        listLoading: false,
        columns: [
          { type: 'index', name: '序号', width: 60 },
          { desc: 'q', name: '申请时间', tooltip: true },
          { desc: 'qw', name: '申请权限', tooltip: true },
          { desc: 'qwe', name: '申请结果', tooltip: true }]
      },
      listDialog: [],
      tableInfoDialog: {
        ref: 'tableInfoDialog',
        height: 'auto',
        listLoading: false,
        columns: [
          { type: 'index', name: '序号', width: 60 },
          { desc: 'q', name: '权限名称', tooltip: true },
          { desc: 'qw', name: '权限内容', tooltip: true },
          {
            desc: '', name: '操作', width: 100, newBtns: [
              { name: '申请', clickType: 'apply' },
            ]
          }
        ]
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.tableInfo.listLoading = true;
      getList().then((response) => {
        this.list = response.data.items;
        this.listDialog = response.data.items.slice(0, 6);
        this.tableInfo.listLoading = false;
      });
    },
    applyForPermission() {
      this.dialogVisible = true
    },
    handleBtnClick(scope) {
      switch (scope.type) {
        case 'apply':
          this.$confirm('是否进行此操作?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '申请成功!'
            });
            this.dialogVisible = false
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作'
            });
          });
          break
        default:
          break
      }
    }
  },
};
</script>
<style lang="scss" scoped>
.search-div {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  & > div:nth-child(1) {
    & > div:nth-child(1) {
      margin-bottom: 4px;
    }
  }
}
.el-form {
  .top-div {
    display: flex;
  }
  .flex-div {
    display: flex;
    justify-content: space-between;
    ::v-deep {
      .el-input__inner {
        width: 200px;
      }
    }
  }
  .el-form-item {
    .el-form-item__label {
      width: 146px;
    }
  }
}
</style>
