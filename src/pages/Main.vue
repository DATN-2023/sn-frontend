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
      feeds: [],
      editionPost: {},
      indexEditionPost: null,
      showNavBar: true
    }
  },
  mounted() {
    this.getFeeds()
  },
  methods: {
    async getFeeds() {
      const feeds = await this.$store.dispatch('feed/getFeed')
      this.feeds = feeds.data
    },
    onCreatePost(body) {
      const userInfo = this.$store.getters['auth/userInfo']
      // console.log('userInfo', userInfo)
      // console.log('post', body)
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
              @on-close-navbar="(v) => { showLeftNavbar = v }">
      </Navbar>
    </template>
    <!--    <template #rightNavbar>-->
    <!--      <NavbarRight>-->
    <!--      </NavbarRight>-->
    <!--    </template>-->
    <template #body>
      <Dialog :visible="visible" modal header="Header" @update:visible="setUp" :style="{ width: '50vw' }">
        <PostCreation :post="editionPost" @turnOffVisible="visible = !visible" @onCreatePost="body => onCreatePost(body)" @onUpdatePost="onUpdatePost()"></PostCreation>
      </Dialog>
      <div class="mx-auto md:w-full 2xl:w-2/4">
        <Feed :visible="visible" :feedPosts="feeds" :oneColumn="showLeftNavbar && showRightNavbar"
              :showPostComposer="showComposePost"
              @on-close-compose-post="showComposePost = !showComposePost"
              @onEditPost="(index) => onEditPost(index)"></Feed>
      </div>
    </template>
  </AppShell>
</template>
<style lang="">

</style>
