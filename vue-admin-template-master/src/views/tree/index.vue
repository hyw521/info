<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="110px">
      <div class="top-div">
        <div class="left">
          <div class="one-div">
            <el-form-item label="公司名称：">
              <el-input v-model="form.companyName"></el-input>
              <span class="text-class"></span>
            </el-form-item>
          </div>
          <div class="one-div">
            <el-form-item label="公司地址：">
              <el-input v-model="form.companyAdd"></el-input>
              <span class="text-class"></span>
            </el-form-item>
          </div>
        </div>
        <div class="right">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </div>

      <h4>公司概况：</h4>
      <div class="flex-div">
        <el-form-item label="概况：">
          <el-input v-model="form.gk"></el-input>
          <span class="text-class"></span>
        </el-form-item>
        <el-form-item label="规模：">
          <el-input v-model="form.gm"></el-input>
          <span class="text-class"></span>
        </el-form-item>
        <el-form-item label="行业类别：">
          <el-select v-model="form.hylb" :clearable="true" :filterable="true">
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
        <el-form-item label="法人代表：">
          <el-input v-model="form.frdb"></el-input>
          <span class="text-class"></span>
        </el-form-item>
        <el-form-item label="注册资本：">
          <el-input v-model="form.zczb"></el-input>
          <span class="text-class"></span>
        </el-form-item>
        <el-form-item label="成立日期：">
          <el-date-picker
            v-model="form.date"
            type="date"
            format="yyyy-MM-dd"
            placeholder="选择日期"
          >
          </el-date-picker>
          <span class="text-class"></span>
        </el-form-item>
      </div>
      <div class="one-div">
        <el-form-item label="详细信息：">
          <el-input
            v-model="form.frdb"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
          ></el-input>
          <span class="text-class"></span>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isLt2M;
    }
  },
};
</script>
<style lang="scss" scoped>
.el-form {
  .top-div {
    display: flex;
    .left {
      flex: 1;
    }
    .right {
      margin-left: 27px;
    }
  }
  .one-div {
  }
  h4 {
    font-size: 14px;
    color: #409eff;
    width: 110px;
    text-align: right;
    padding-right: 12px;
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
      width: 110px;
    }
    .el-date-editor {
      width: 200px;
    }
  }
}
::v-deep {
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
  .avatar {
    width: 150px;
    height: 150px;
    display: block;
  }
}
</style>

