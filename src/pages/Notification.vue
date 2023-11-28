<script>
import {defineComponent} from 'vue'
import Header from "@/features/components/Header.vue";
import AppShell from "@/features/components/AppShell.vue";
import Feed from "@/features/feed/Feed.vue";
import UserDetail from "@/features/components/UserDetail.vue";
import NotificationList from "@/features/components/NotificationList.vue";
import Navbar from "@/features/components/Navbar.vue";

export default defineComponent({
  name: "Notification",
  components: {Navbar, NotificationList, UserDetail, Feed, AppShell, Header},
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
              @on-close-navbar="(v) => { showLeftNavbar = v }" :show-add-feed="0" :show-add-group="0">
      </Navbar>
    </template>
    <template #body>
      <div class="w-1/2 mx-auto mt-2">
        <NotificationList></NotificationList>
      </div>
    </template>
  </AppShell>
</template>

<style scoped>

</style>