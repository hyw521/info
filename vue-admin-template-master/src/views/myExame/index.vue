<template>
  <div class="app-container">
    <div class="search-div">
      <el-input
        v-model="listQuery.th"
        placeholder="请输入题号"
        :clearable="true"
      ></el-input>
      <el-select
        v-model="listQuery.tdgw"
        :clearable="true"
        :filterable="true"
        placeholder="请选择科目"
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
        placeholder="请选择题目类型"
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
        placeholder="请选择难度系数"
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
      <el-button type="primary" @click="add" class="operate-button"
        >新增</el-button
      >
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
          <el-form-item label="题号：">
            <el-input v-model="form.companyName" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="科目：">
            <el-input v-model="form.companyAdd"></el-input>
          </el-form-item>
          <el-form-item label="题目类型：">
            <el-select
              v-model="form.tmlx"
              clearable="true"
              filterable="true"
              placeholder=""
            >
              <el-option
                v-for="item in tmlxOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="flex-div">
          <el-form-item label="出题人：">
            <el-input v-model="form.gk" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="出题时间：">
            <el-date-picker
              v-model="form.gm"
              type="date"
              format="yyyy-MM-dd"
              placeholder="请选择出题时间"
              :disabled="true"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="难度系数：">
            <el-select
              v-model="form.hylb"
              clearable="true"
              filterable="true"
              placeholder=""
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="flex-div">
          <el-form-item label="使用频次：">
            <el-input v-model="form.frdb" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="标签信息：">
            <el-input v-model="form.zczb"></el-input>
          </el-form-item>
          <el-form-item label="">
            <span class="text-class"></span
          ></el-form-item>
        </div>
        <div class="one-div">
          <el-form-item label="题干：">
            <el-input
              v-model="form.frdb"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4 }"
            ></el-input>
          </el-form-item>
        </div>
        <div class="flex-div">
          <el-form-item label="A：" v-if="[2, 3].includes(form.tmlx)">
            <el-input v-model="form.A"></el-input>
          </el-form-item>
          <el-form-item label="B：" v-if="[2, 3].includes(form.tmlx)">
            <el-input v-model="form.B"></el-input>
          </el-form-item>
          <el-form-item label="C：" v-if="[2, 3].includes(form.tmlx)">
            <el-input v-model="form.C"></el-input>
          </el-form-item>
        </div>
        <div class="flex-div">
          <el-form-item label="D：" v-if="[2, 3].includes(form.tmlx)">
            <el-input v-model="form.A"></el-input>
          </el-form-item>
        </div>
        <div class="one-div">
          <el-form-item label="参考答案：">
            <el-input
              v-model="form.ckda"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4 }"
            ></el-input>
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
        th: "",
        tdgw: "",
        jysp: "",
        xl: "",
        date: "",
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
        tmlx: '',
        hylb: "",
        frdb: '',
        hd: '',
        ckda: "",
        zczb: '',
        date: '',
        xxxx: "",
        imageUrl: '',
        A: '',
        B: '',
        C: '',
        D: ''
      },
      options: [{
        value: 1,
        label: 1
      }, {
        value: 2,
        label: 2
      }, {
        value: 3,
        label: 3
      }, {
        value: 4,
        label: 4
      }, {
        value: 5,
        label: 5
      }],
      tmlxOptions: [{
        value: 1,
        label: '判断题'
      }, {
        value: 2,
        label: '单选题'
      }, {
        value: 3,
        label: '多选题'
      }, {
        value: 4,
        label: '填空题'
      }, {
        value: 5,
        label: '应用题'
      }],
      list: [],
      tableInfo: {
        ref: 'form',
        height: '100%',
        listLoading: false,
        columns: [
          { type: 'index', name: '序号', width: 60 },
          { desc: 'q', name: '科目', tooltip: true },
          { desc: 'qw', name: '出题人', tooltip: true },
          { desc: 'qwe', name: '题目类型', tooltip: true },
          { desc: 'qwer', name: '题目简称', tooltip: true },
          { desc: 'qw12345', name: '出题时间', tooltip: true },
          { desc: 'qwe5', name: '使用频次', tooltip: true },
          { desc: 'qwer6', name: '难度系数', tooltip: true },
          {
            desc: '', name: '操作', width: 160, newBtns: [
              { name: '编辑', clickType: 'edit' },
              { name: '删除', clickType: 'delete' }
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
    margin-right: 10px;
  }
  .el-select {
    width: 220px;
    margin-right: 10px;
  }
  .el-date {
    width: 220px;
  }
  .operate-button {
    float: right;
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
      .el-date-editor {
        width: 200px;
      }
    }
  }
  .el-form-item {
    .el-form-item__label {
      width: 146px;
    }
    .text-class {
      width: 200px;
      display: inline-block;
      color: rgba($color: #000000, $alpha: 0.6);
    }
  }
}
</style>
