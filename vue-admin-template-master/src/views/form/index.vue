<template>
  <div class="app-container">
    <div class="search-div">
      <el-select
        v-model="listQuery.tdgw"
        :clearable="true"
        :filterable="true"
        placeholder="请选择投递岗位"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-select
        v-model="listQuery.jysp"
        :clearable="true"
        :filterable="true"
        placeholder="请选择经验水平"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>

      <el-select
        v-model="listQuery.xl"
        :clearable="true"
        :filterable="true"
        placeholder="请选择学历"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button type="primary">查询</el-button>
    </div>
    <MTable
      :tableInfo="tableInfo"
      :data="list"
      @handleBtnClick="handleBtnClick"
    />
    <Pagination
      :page="listQuery.page"
      :pageSizes="listQuery.pageSizes"
      :limit="listQuery.limit"
      :total="listQuery.total"
    />
    <el-dialog title="" :visible.sync="dialogVisible" width="70%">
      <el-form ref="form" :model="form" label-width="110px">
        <div class="flex-div">
          <el-form-item label="岗位名称：">
            <el-input v-model="form.companyName"></el-input>
            <span class="text-class"></span>
          </el-form-item>
          <el-form-item label="行业类别：">
            <el-select v-model="form.hylb" clearable="true" filterable="true">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <span class="text-class"></span>
          </el-form-item>
          <el-form-item label="岗位细分：">
            <el-input v-model="form.companyAdd"></el-input>
            <span class="text-class"></span>
          </el-form-item>
        </div>
        <div class="flex-div">
          <el-form-item label="学历要求：">
            <el-input v-model="form.gk"></el-input>
            <span class="text-class"></span>
          </el-form-item>
          <el-form-item label="经验要求：">
            <el-input v-model="form.gm"></el-input>
            <span class="text-class"></span>
          </el-form-item>
          <el-form-item label="薪资水平：">
            <el-select v-model="form.hylb" clearable="true" filterable="true">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <span class="text-class"></span>
          </el-form-item>
        </div>
        <div class="flex-div">
          <el-form-item label="工作地点：">
            <el-input v-model="form.frdb"></el-input>
            <span class="text-class"></span>
          </el-form-item>
          <el-form-item label="招聘联系人：">
            <el-input v-model="form.zczb"></el-input>
            <span class="text-class"></span>
          </el-form-item>
          <el-form-item label="招聘联系电话：">
            <el-input v-model="form.zczb"></el-input>
            <span class="text-class"></span>
          </el-form-item>
        </div>
        <div class="one-div">
          <el-form-item label="招聘要求信息：">
            <el-input
              v-model="form.frdb"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4 }"
            ></el-input>
            <span class="text-class"></span>
          </el-form-item>
        </div>
        <div class="one-div">
          <el-form-item label="工作职责描述：">
            <el-input
              v-model="form.frdb"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4 }"
            ></el-input>
            <span class="text-class"></span>
          </el-form-item>
        </div>
      </el-form>
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
        tdgw: "",
        jysp: "",
        xl: "",
        page: 1,
        limit: 10,
        total: 0,
        pageSizes: [10, 20, 30, 40, 50]
      },
      form: {
        companyName: "",
        companyAdd: '',
        gk: "",
        gm: "",
        hylb: "",
        frdb: '',
        zczb: '',
        date: '',
        xxxx: "",
        imageUrl: ''
      },
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      list: [],
      tableInfo: {
        ref: 'form',
        height: '100%',
        listLoading: false,
        columns: [
          { type: 'index', name: '序号', width: 60 },
          { desc: 'q', name: '投递岗位', tooltip: true },
          { desc: 'qw', name: '姓名', tooltip: true },
          { desc: 'qwe', name: '经验水平', tooltip: true },
          { desc: 'qwer', name: '学历', tooltip: true },
          {
            desc: '', name: '操作', width: 260, newBtns: [
              { name: '查看', clickType: 'show' },
              { name: '通过', clickType: 'pass' },
              { name: '不通过', clickType: 'nopass' }
            ]
          }]
      }
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
        this.tableInfo.listLoading = false;
      });
    },
    add() {
      this.dialogVisible = true
    },
    handleBtnClick(scope) {
      switch (scope.type) {
        case 'show':
          break
        case 'edit':
          this.dialogVisible = true
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
  .el-input {
    width: 220px;
  }
  .el-select {
    margin-right: 10px;
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
