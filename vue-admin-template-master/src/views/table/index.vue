<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      @row-click="rowClick"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="职位序号" width="95">
        <template slot-scope="scope"> 001</template>
      </el-table-column>
      <el-table-column label="职位名称">
        <template slot-scope="scope"> 前端开发 </template>
      </el-table-column>
      <el-table-column label="工作地点" align="center">
        <template slot-scope="scope">
          <span>杭州-西湖区</span>
        </template>
      </el-table-column>
      <el-table-column label="薪资" align="center">
        <template slot-scope="scope"> 2000 </template>
      </el-table-column>
      <el-table-column
        class-name="status-col"
        label="状态"
        width="110"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{
            scope.row.status
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="结束时间">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from "@/api/table";

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      list: null,
      listLoading: true,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getList().then((response) => {
        this.list = response.data.items;
        this.listLoading = false;
      });
    },
    rowClick(row, column, event) {
      console.log("点击了某一行");
      console.log(row);
      console.log(column);
      console.log(event);
    },
  },
};
</script>
