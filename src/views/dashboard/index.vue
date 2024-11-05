<template>
  <div class="dashboard-container">
    <div class="dashboard-text" style="font-size:18px;color:rgb(64, 158, 255);">欢迎登录 在线教育平台后台管理系统</div>
    <div class="dashboard-text" style="font-size:18px;color:#777;">当前用户名: {{ name }}</div>
    <div class="dashboard-text" style="font-size:18px;color:#777;">当前用户角色: <span v-for="role in roles" :key="role">{{ role }}</span></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
