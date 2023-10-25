<script>
import AppShell from '../features/components/AppShell.vue';
import Header from '../features/components/Header.vue';
import Navbar from '../features/components/Navbar.vue';
import NavbarRight from '../features/components/NavbarRight.vue';
import Feed from '../features/feed/Feed.vue';

export default {
  components: {AppShell, Header, Navbar, Feed, NavbarRight},
  data() {
    return {
      showLeftNavbar: true,
      showRightNavbar: true,
      showComposePost: true,
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
      <Navbar :is-expanded="showLeftNavbar" @on-compose-post="showComposePost = !showComposePost"
              @on-close-navbar="(v) => { showLeftNavbar = v }">
      </Navbar>
    </template>
    <template #rightNavbar>
      <NavbarRight>
      </NavbarRight>
    </template>
    <template #body>
      <Feed :feedPosts="feeds" :oneColumn="showLeftNavbar && showRightNavbar" :showPostComposer="showComposePost"
            @on-close-compose-post="showComposePost = !showComposePost" ></Feed>
    </template>
  </AppShell>
</template>
<style lang="">

</style>