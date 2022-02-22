<template>
  <div id="list">
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
import SubjectApi from '@/api/subject'
export default {
  name: 'List',
  data() {
    return {
      filterText: '',
      data2: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },
  created() {
    this.getSubject()
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.toLowerCase().indexOf(value.toLowerCase()) !== -1
    },
    getSubject() {
      SubjectApi.getSubjectList().then(response => {
        this.data2 = response.data.list
      })
    }
  }
}
</script>

<style scoped>

</style>
