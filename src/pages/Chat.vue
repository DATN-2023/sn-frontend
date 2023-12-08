<script>
import {defineComponent} from 'vue'
import Navbar from "@/features/components/Navbar.vue";
import AppShell from "@/features/components/AppShell.vue";
import Header from "@/features/components/Header.vue";

export default defineComponent({
  name: "Chat",
  components: {Navbar, AppShell, Header},
  data() {
    return {
      showLeftNavbar: true,
      showRightNavbar: true,
      showComposePost: true,
      visible: false,
      indexEditionPost: null,
      showNavBar: true
    }
  },
})
</script>

<template>
    <AppShell :navbarExpanded="showLeftNavbar" :rightNavbarExpanded="showRightNavbar" :full-sidebar="true"
              :showNavBar="showNavBar">
      <template #header>
        <Header @on-menu-click="
    showLeftNavbar = !showLeftNavbar;
            " @on-right-menu-click="
    showRightNavbar = !showRightNavbar;
            ">
        </Header>
      </template>
      <template #navbar>
        <Navbar :is-expanded="showLeftNavbar" @on-compose-post="showComposePost = !showComposePost"
                @onPostCreation="(data) => visible = data"
                @on-close-navbar="(v) => { showLeftNavbar = v }" :activate-index="2" :show-add-feed="0" :show-add-group="1">
        </Navbar>
      </template>
      <template #body>
        caidjcoiaimkds
      </template>
    </AppShell>
</template>

<style scoped>

</style>