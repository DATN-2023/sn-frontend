<script>
import AppShell from '../features/components/AppShell.vue';
import Header from '../features/components/Header.vue';
import Navbar from '../features/components/Navbar.vue';
import NavbarRight from '../features/components/NavbarRight.vue';
import Feed from '../features/feed/Feed.vue';
import PostCreation from "@/features/components/PostCreation.vue";
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";

export default {
  components: {PostCreation, AppShell, Header, Navbar, Feed, NavbarRight, Dialog, Button, InfiniteLoading},
  data() {
    return {
      showLeftNavbar: true,
      showRightNavbar: true,
      showComposePost: true,
      visible: false,
      feeds: [],
      editionPost: {},
      indexEditionPost: null,
      showNavBar: true,
      page: 0
    }
  },
  mounted() {
    // this.getFeeds()
  },
  methods: {
    async getFeeds(q = {}) {
      const feeds = await this.$store.dispatch('feed/getFeed', q)
      this.feeds = this.feeds.concat(feeds.data)
      this.page = feeds.page
      return feeds
    },
    onCreatePost(body) {
      const userInfo = this.$store.getters['auth/userInfo']
      body.user = {
        name: userInfo?.name || 'anonymous',
        avatar: userInfo?.avatar || ''
      }
      this.feeds.unshift(body)
    },
    setUp(visible) {
      if (!visible) {
        this.visible = false;
      }
    },
    onEditPost(index) {
      this.editionPost = JSON.parse(JSON.stringify(this.feeds[index]))
      this.indexEditionPost = index
      this.visible = !this.visible
    },
    onUpdatePost() {
      this.editionPost.updated = 1
      this.feeds[this.indexEditionPost] = this.editionPost
      this.editionPost = {}
    },
    async loadFeed($state) {
      try {
        const feeds = await this.getFeeds({page: this.page + 1})
        if (feeds.data && !feeds.data.length) $state.complete()
        else $state.loaded();
      } catch (e) {
        $state.error()
      }
    }
  }
}

</script>
<template>
  <AppShell :navbarExpanded="showLeftNavbar" :rightNavbarExpanded="showRightNavbar" :full-sidebar="true"
            @on-change-theme="warn" :showNavBar="showNavBar">
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
              @on-close-navbar="(v) => { showLeftNavbar = v }" :show-add-feed="1" :show-add-group="0">
      </Navbar>
    </template>
    <!--    <template #rightNavbar>-->
    <!--      <NavbarRight>-->
    <!--      </NavbarRight>-->
    <!--    </template>-->
    <template #body>
      <Dialog :visible="visible" modal header="Header" @update:visible="setUp" :style="{ width: '50vw' }">
        <PostCreation :post="editionPost" @turnOffVisible="visible = !visible"
                      @onCreatePost="body => onCreatePost(body)" @onUpdatePost="onUpdatePost()"></PostCreation>
      </Dialog>
      <div class="mx-auto md:w-full 2xl:w-2/4">
        <Feed :visible="visible" :feedPosts="feeds" :oneColumn="showLeftNavbar && showRightNavbar"
              :showPostComposer="showComposePost"
              @on-close-compose-post="showComposePost = !showComposePost"
              @onEditPost="(index) => onEditPost(index)"></Feed>
      </div>
      <InfiniteLoading @infinite="loadFeed">
        <template #complete>
          <span></span>
        </template>
      </InfiniteLoading>
    </template>
  </AppShell>
</template>
<style lang="">

</style>
