<template>
  <div class="app-container">
    <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />

    <el-tree
      ref="tree2"
      :data="data2"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all
    />

  </div>
</template>

<script>
import subject from '@/api/edu/subject'
export default {

  data() {
    return {
      filterText: '',// 过滤文本，用户输入的搜索内容
      data2: [],  //返回所有分类数据
      defaultProps: {
        children: 'children',// 定义树形结构中子节点的属性名
        label: 'title'// 定义树形结构中节点的标签属性名
      }
    }
  },
  created() {
      this.getAllSubjectList()
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)//当用户输入时，会触发这个函数
    }
  },

  methods: {
    getAllSubjectList() {
        subject.getSubjectList()
            .then(response => {
                this.data2 = response.data.list
            })
    },
    filterNode(value, data) {
      if (!value) return true     // 如果没有过滤条件，返回所有节点
      return data.title.toLowerCase().indexOf(value.toLowerCase()) !== -1      //是否包含过滤文本，返回布尔值来决定是否显示 
    }
  }
}
</script>