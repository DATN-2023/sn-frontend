<script>
import Feed from "@/features/feed/Feed.vue";
import Header from "@/features/components/Header.vue";
import Navbar from "@/features/components/Navbar.vue";
import PostCreation from "@/features/components/PostCreation.vue";
import AppShell from "@/features/components/AppShell.vue";

export default {
  name: "Personal",
  components: {AppShell, PostCreation, Navbar, Header, Feed},
  data() {
    return {
      showLeftNavbar: true,
      showRightNavbar: true,
      showComposePost: true,
      visible: false,
      feeds: [],
      editionPost: {},
      indexEditionPost: null
    }
  },
}
</script>

<template>
  <AppShell :navbarExpanded="showLeftNavbar" :rightNavbarExpanded="showRightNavbar" :full-sidebar="false"
            @on-change-theme="warn">
    <template #header>
      <Header @on-menu-click="
    showLeftNavbar = !showLeftNavbar;
            " @on-right-menu-click="
    showRightNavbar = !showRightNavbar;
            ">
      </Header>
    </template>
<!--    <template #navbar>-->
<!--      <Navbar :is-expanded="showLeftNavbar" @on-compose-post="showComposePost = !showComposePost"-->
<!--              @onPostCreation="(data) => visible = data"-->
<!--              @on-close-navbar="(v) => { showLeftNavbar = v }">-->
<!--      </Navbar>-->
<!--    </template>-->
  </AppShell>
</template>

<style scoped>

</style>
