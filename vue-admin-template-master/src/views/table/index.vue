<template>
  <div class="app-container">
    <div class="search-div">
      <el-input
        v-model="listQuery.jobName"
        placeholder="请输入职位名称"
      ></el-input>
      <el-button type="primary">查询</el-button>
      <div class="operate-button">
        <el-button type="primary">新增</el-button>
      </div>
    </div>
    <MTable :tableInfo="tableInfo" :data="list" />
  </div>
</template>

<script>
import { getList } from "@/api/table";
import MTable from '@/components/Basic/MTable'
// import animationDialog from '@/components/Basic/animationDialog'
export default {
  components: {
    MTable,
    // animationDialog
  },
  data() {
    return {
      listQuery: {
        jobName: ''
      },
      list: [],
      tableInfo: {
        ref: 'table',
        height: '100%',
        listLoading: false,
        columns: [
          { type: 'index', name: '序号', width: 60 },
          { desc: 'q', name: '职位名称', tooltip: true },
          { desc: 'qw', name: '薪资水平', tooltip: true },
          { desc: 'qwe', name: '计划招聘人数', tooltip: true },
          { desc: 'qwer', name: '学历要求', tooltip: true },
          { desc: 'qwert', name: '工作地点', tooltip: true },
          {
            desc: '', name: '操作', newBtns: [
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
  },
};
</script>
<style lang="scss" scoped>
.search-div {
  .el-input {
    width: 220px;
  }
  & > .el-button {
    margin-left: 10px;
  }
  .operate-button {
    display: flex;
    justify-content: flex-end;
    & > .el-button {
    }
    margin-bottom: 20px;
  }
}
</style>
