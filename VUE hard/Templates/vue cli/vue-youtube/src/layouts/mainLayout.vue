<template>
  <div class="app-main-layout">

    <navBar @click="isOpen = !isOpen"/>
    <sideBar v-model="isOpen"/>

    <main class="app-content" :class="{full: !isOpen}">
      <div class="app-page">
          <router-view/>
    </div>
    </main>

    <div class="fixed-action-btn">
      <router-link class="btn-floating btn-large blue" to="/record">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import navBar from '@/components/app/navBar'
import sideBar from '@/components/app/sideBar'
export default {
  name: 'main-layout',
  data:()=> ({
    isOpen: true
  }),
  components: {
    navBar, sideBar
  }
}
</script>