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
          v-for="item in tmlxOptions"
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
          v-model="listCard"
          :options="{ draggable: '.rows' }"
          :move="getdata"
          @update="datadragEnd"
        >
          <div
            class="rows"
            v-for="(item, index) in listCard"
            :key="index"
            style="display: flex"
          >
            <el-card class="box-card">
              <div class="text item">
                <div class="title">
                  {{ item.lx | filterLX }}
                </div>
                <div class="one">
                  <div>
                    <span>{{ item.Id }}、</span>
                    <span>{{ item.question }}</span>
                  </div>
                  <span>( )</span>
                </div>
                <div class="select-answer" v-if="[2, 3].includes(item.lx)">
                  <div>
                    <span>A.</span>
                    <span>{{ item.A }}</span>
                  </div>
                  <div>
                    <span>B.</span>
                    <span>{{ item.B }}</span>
                  </div>
                  <div>
                    <span>C.</span>
                    <span>{{ item.C }}</span>
                  </div>
                  <div>
                    <span>D.</span>
                    <span>{{ item.D }}</span>
                  </div>
                </div>
              </div>
            </el-card>
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
  filters: {
    filterLX(val) {
      if (val === 1) {
        return '判断题'
      } else if (val === 2) {
        return '单选题'
      } else if (val === 3) {
        return '多选题'
      } else if (val === 4) {
        return '填空题'
      } else if (val === 5) {
        return '应用题'
      }
    }
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
            desc: '', name: '操作', width: 100, newBtns: [
              { name: '查看', clickType: 'show' },
            ]
          }]
      },
      selectionObj: {
        selection: []
      },
      listCard: [
        {
          question: '我是题目一', answer: '你是大笨猪', lx: 1, Id: 1
        },
        {
          question: '我是题目二', answer: '你是大肥猪', lx: 2, Id: 2, A: 'ASDAS', B: 'ASDAS', C: 'ASDAS', D: 'ASDAS'
        },
        {
          question: '我是题目三', answer: '你是大懒猪', lx: 3, Id: 3, A: 'ASDAS', B: 'ASDAS', C: 'ASDAS', D: 'ASDAS'
        },
        {
          question: '我是题目四', answer: '你是大傻猪', lx: 4, Id: 4
        },
        {
          question: '我是题目五', answer: '你是大傻猪', lx: 5, Id: 5
        },
        {
          question: '我是题目一', answer: '你是大笨猪', lx: 1, Id: 1
        },
        {
          question: '我是题目二', answer: '你是大肥猪', lx: 2, Id: 2, A: 'ASDAS', B: 'ASDAS', C: 'ASDAS', D: 'ASDAS'
        },
        {
          question: '我是题目三', answer: '你是大懒猪', lx: 3, Id: 3, A: 'ASDAS', B: 'ASDAS', C: 'ASDAS', D: 'ASDAS'
        },
        {
          question: '我是题目四', answer: '你是大傻猪', lx: 4, Id: 4
        },
        {
          question: '我是题目五', answer: '你是大傻猪', lx: 5, Id: 5
        }, {
          question: '我是题目一', answer: '你是大笨猪', lx: 1, Id: 1
        },
        {
          question: '我是题目二', answer: '你是大肥猪', lx: 2, Id: 2, A: 'ASDAS', B: 'ASDAS', C: 'ASDAS', D: 'ASDAS'
        },
        {
          question: '我是题目三', answer: '你是大懒猪', lx: 3, Id: 3, A: 'ASDAS', B: 'ASDAS', C: 'ASDAS', D: 'ASDAS'
        },
        {
          question: '我是题目四', answer: '你是大傻猪', lx: 4, Id: 4
        },
        {
          question: '我是题目五', answer: '你是大傻猪', lx: 5, Id: 5
        },
        {
          question: '我是题目一', answer: '你是大笨猪', lx: 1, Id: 1
        },
        {
          question: '我是题目二', answer: '你是大肥猪', lx: 2, Id: 2, A: 'ASDAS', B: 'ASDAS', C: 'ASDAS', D: 'ASDAS'
        },
        {
          question: '我是题目三', answer: '你是大懒猪', lx: 3, Id: 3, A: 'ASDAS', B: 'ASDAS', C: 'ASDAS', D: 'ASDAS'
        },
        {
          question: '我是题目四', answer: '你是大傻猪', lx: 4, Id: 4
        },
        {
          question: '我是题目五', answer: '你是大傻猪', lx: 5, Id: 5
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

.sort-exame-dialog {
  ::v-deep {
    .el-dialog {
      margin-top: 5vh !important;
      .el-dialog__body {
        height: 560px;
        overflow: auto;
      }
    }
  }
}
.text {
  font-size: 14px;
}
.item {
  padding: 8px 0;
  min-height: 132px;
}
.box-card {
  width: 300px;
}
.list-group {
  display: flex;
  flex-wrap: wrap;
  .rows {
    margin-right: 20px;
    margin-bottom: 10px;
    ::v-deep {
      .el-card__body {
        padding: 10px 20px 20px 20px;
      }
    }
    .title {
      margin-bottom: 10px;
    }
    .one {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }
  }
}
</style>
