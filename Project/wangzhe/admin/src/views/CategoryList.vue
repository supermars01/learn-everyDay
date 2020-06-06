<template>
  <div>
    <h1>分类列表</h1>
    <el-table :data="items" border stripe>
      <el-table-column prop="_id" label="ID" width="250"> </el-table-column>
      <el-table-column prop="name" label="分类名称"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <!-- <template slot-scope="scope">
          <el-button @click="look(scope.row._id)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" @click="edit(scope.row._id)" size="small"
            >编辑</el-button
          >
          <el-button type="text" @click="remove(scope.row._id)" size="small"
            >删除</el-button
          >
        </template> -->
        <template slot-scope="scope">
          <el-button
            @click="$router.push(`/categories/edit/${scope.row._id}`)"
            type="text"
            size="small"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const { data } = await this.$http.get("/categories");
      this.items = data;
    }
    // async look(id) {
    //   console.log(id);
    //   const { data } = await this.$http.get(`/categories/${id}`);
    //   console.log(data);
    // },
    // async edit(id) {
    //   const { data } = await this.$http.put(`/categories/${id}/update`);
    //   console.log(data);
    // },
    // remove(id) {
    //   this.open(id);
    // },
    // open(id) {
    //   this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   })
    //     .then(async () => {
    //       await this.$http.delete(`/categories/${id}/delete`);
    //       this.$message({
    //         type: "success",
    //         message: "删除成功!"
    //       });
    //       this.fetch();
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: "已取消删除"
    //       });
    //     });
    // }
  }
};
</script>
