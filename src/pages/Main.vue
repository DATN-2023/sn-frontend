<script>
import AppShell from '../features/components/AppShell.vue';
import Header from '../features/components/Header.vue';
import Navbar from '../features/components/Navbar.vue';
import NavbarRight from '../features/components/NavbarRight.vue';
import Feed from '../features/feed/Feed.vue';
import PostCreation from "@/features/components/PostCreation.vue";
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';


export default {
  components: {PostCreation, AppShell, Header, Navbar, Feed, NavbarRight, Dialog, Button},
  data() {
    return {
      showLeftNavbar: true,
      showRightNavbar: true,
      showComposePost: true,
      visible: false,
      feeds: []
    }
  },
  mounted() {
    this.getFeeds()
    console.log('mounted')
  },
  methods: {
    async getFeeds() {
      const feeds = await this.$store.dispatch('feed/getFeed')
      this.feeds = feeds.data
    }
  }
}

</script>
<template>
  <AppShell :navbarExpanded="showLeftNavbar" :rightNavbarExpanded="showRightNavbar" :full-sidebar="true"
            @on-change-theme="warn">
    <template #header>
      <Header @on-menu-click="
    showLeftNavbar = !showLeftNavbar;
            " @on-right-menu-click="
    showRightNavbar = !showRightNavbar;
            ">
      </Header>
    </template>
    <template #navbar>
      <Navbar :is-expanded="showLeftNavbar" @on-compose-post="showComposePost = !showComposePost" @onPostCreation="(data) => visible = data"
              @on-close-navbar="(v) => { showLeftNavbar = v }">
      </Navbar>
    </template>
<!--    <template #rightNavbar>-->
<!--      <NavbarRight>-->
<!--      </NavbarRight>-->
<!--    </template>-->
    <template #body>
      <Dialog v-model:visible="visible" modal header="Header" :style="{ width: '50vw' }">
        <PostCreation @turnOffVisible="visible = !visible"></PostCreation>
      </Dialog>
      <Feed :visible="visible" :feedPosts="feeds" :oneColumn="showLeftNavbar && showRightNavbar" :showPostComposer="showComposePost"
            @on-close-compose-post="showComposePost = !showComposePost" ></Feed>
    </template>
  </AppShell>
</template>
<style lang="">

</style>
