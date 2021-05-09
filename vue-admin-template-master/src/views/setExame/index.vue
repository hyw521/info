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
      <el-button type="primary" @click="add">添加试题</el-button>
      <el-button type="primary" @click="sort">试题排序</el-button>
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

    <el-dialog
      title=""
      v-if="dialogVisibleAdd"
      :visible.sync="dialogVisibleAdd"
      width="90%"
      class="add-exame-dialog"
    >
      <showExame :selectionObj="selectionObj" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addQuestion">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title=""
      v-if="dialogVisibleSort"
      :visible.sync="dialogVisibleSort"
      width="90%"
      class="sort-exame-dialog"
    >
      <div>
        <draggable
          class="list-group"
          v-model="tableData"
          :options="{ draggable: '.rows' }"
          :move="getdata"
          @update="datadragEnd"
        >
          <div
            class="rows"
            v-for="(item, index) in tableData"
            :key="index"
            style="display: flex"
          >
            <div>
              <div class="cell">{{ index + 1 }}</div>
            </div>
            <div>
              <div class="cell">{{ item.name }}</div>
            </div>
            <div>
              <div class="cell">{{ item.age }}</div>
            </div>
          </div>
        </draggable>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addQuestion">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="" :visible.sync="dialogVisible" width="70%">
      <el-form ref="form" :model="form" label-width="110px">
        <div class="flex-div">
          <el-form-item label="题号：">
            <span class="text-class">{{ form.companyName }}</span>
          </el-form-item>
          <el-form-item label="科目：">
            <span class="text-class">{{ form.hylb }}</span>
          </el-form-item>
          <el-form-item label="题目类型：">
            <span class="text-class">{{ form.companyAdd }}</span>
          </el-form-item>
        </div>
        <div class="flex-div">
          <el-form-item label="出题人：">
            <span class="text-class">{{ form.gk }}</span>
          </el-form-item>
          <el-form-item label="出题时间：">
            <span class="text-class">{{ form.gm }}</span>
          </el-form-item>
          <el-form-item label="难度系数：">
            <span class="text-class">{{ form.hylb }}</span>
          </el-form-item>
        </div>
        <div class="flex-div">
          <el-form-item label="使用频次：">
            <span class="text-class">{{ form.frdb }}</span>
          </el-form-item>
          <el-form-item label="标签信息：">
            <span class="text-class">{{ form.zczb }}</span>
          </el-form-item>
          <el-form-item label="">
            <span class="text-class"></span
          ></el-form-item>
        </div>
        <div class="one-div">
          <el-form-item label="题干：">
            <span class="text-class">{{ form.frdb }}</span>
          </el-form-item>
        </div>
        <div class="one-div">
          <el-form-item label="参考答案：">
            <span class="text-class">{{ form.frdb }}</span>
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
import showExame from '../showExame/index'
import draggable from 'vuedraggable';
import Sortable from 'sortablejs';
// import animationDialog from '@/components/Basic/animationDialog'
export default {
  components: {
    MTable,
    Pagination,
    showExame,
    draggable,
    Sortable
    // animationDialog
  },
  data() {
    return {
      dialogVisible: false,
      dialogVisibleAdd: false,
      dialogVisibleSort: false,
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
          { desc: 'q', name: '科目', tooltip: true },
          { desc: 'qw', name: '出题人', tooltip: true },
          { desc: 'qwe', name: '题目类型', tooltip: true },
          { desc: 'qwer', name: '题目简称', tooltip: true },
          { desc: 'qw12345', name: '出题时间', tooltip: true },
          { desc: 'qwe5', name: '使用频次', tooltip: true },
          { desc: 'qwer6', name: '难度系数', tooltip: true },
          {
            desc: '', name: '操作', width: 100, newBtns: [
              { name: '查看', clickType: 'show' },
            ]
          }]
      },
      selectionObj: {
        selection: []
      },
      tableData: [
        {
          name: 'hyw', age: 24
        },
        {
          name: 'xl', age: 23
        },
        {
          name: 'hw', age: 24
        },
        {
          name: 'yw', age: 24
        }
      ]
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
      this.dialogVisibleAdd = true
    },
    sort() {
      this.dialogVisibleSort = true
    },
    getdata(data) {
      // console.log('getdata方法');
    },
    datadragEnd(evt) {
      // console.log('datadragEnd方法');
      console.log('拖动前的索引 :' + evt.oldIndex)
      console.log('拖动后的索引 :' + evt.newIndex)
    },
    handleBtnClick(scope) {
      switch (scope.type) {
        case 'show':
          this.dialogVisible = true
          break
        default:
          break
      }
    },
    addQuestion() {
      console.log(this.selectionObj.selection)
      this.dialogVisibleAdd = false
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
  // .el-button {
  //   float: right;
  // }
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
    .text-class {
      width: 200px;
      display: inline-block;
      color: rgba($color: #000000, $alpha: 0.6);
    }
  }
}

.add-exame-dialog {
  z-index: 3000 !important;
  ::v-deep {
    .el-dialog {
      height: 90vh;
      margin-top: 5vh !important;
      display: flex;
      flex-direction: column;
      .el-dialog__body {
        flex: 1;
      }
    }
  }
}
</style>
