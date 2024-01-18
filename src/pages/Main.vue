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
      showLeftNavbar: false,
      showRightNavbar: true,
      showComposePost: true,
      visible: false,
      feeds: [],
      editionPost: {},
      indexEditionPost: null,
      showNavBar: true,
      page: 0,
      isLoadmore: 1,
      textSearch: '',
      total: 0,
      header: 'Đăng bài'
    }
  },
  mounted() {
    this.textSearch = this.$route.query.content || ''
    console.log('route', this.$route.path)
  },
  methods: {
    async getFeeds(q = {}) {
      if (this.textSearch) q.content = this.textSearch
      const feeds = await this.$store.dispatch('feed/getFeed', q)
      this.feeds = this.feeds.concat(feeds.data)
      this.page = feeds.page
      this.isLoadmore = this.feeds.length < feeds.total;
      this.total = feeds?.total || 0
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
      this.header = 'Chỉnh sửa bài viết'
      this.visible = !this.visible
    },
    onUpdatePost() {
      this.editionPost.updated = 1
      this.feeds[this.indexEditionPost] = this.editionPost
      this.editionPost = {}
      this.header = "Đăng bài"
    },
    async loadFeed($state) {
      try {
        if (this.isLoadmore) {
          await this.getFeeds({page: this.page + 1})
          $state.loaded()
        }
        // else $state.loading();
      } catch (e) {
        $state.error()
      }
    },
    async onPushMain() {
      this.page = 0
      this.textSearch = ''
      this.feeds = []
      if (!this.isLoadmore) await this.getFeeds({page: this.page + 1})
      this.isLoadmore = true
    },
    async onSearch() {
      this.page = 0
      this.textSearch = this.$route.query.content || ''
      this.feeds = []
      if (!this.isLoadmore) await this.getFeeds({page: this.page + 1})
      this.isLoadmore = true
    }
  }
}

</script>
<template>
  <AppShell :navbarExpanded="showLeftNavbar" :rightNavbarExpanded="showRightNavbar" :full-sidebar="true"
            :showNavBar="showNavBar">
    <template #header>
      <Header @on-menu-click="
    showLeftNavbar = !showLeftNavbar;
            " @on-right-menu-click="
    showRightNavbar = !showRightNavbar;
            "
              @onSearch="onSearch">
      </Header>
    </template>
    <template #navbar>
      <Navbar :is-expanded="showLeftNavbar" @on-compose-post="showComposePost = !showComposePost"
              @onPostCreation="(data) => visible = data"
              @on-close-navbar="(v) => { showLeftNavbar = v }" :show-add-feed="1" :show-add-group="0"
              @onPushMain="onPushMain">
      </Navbar>
    </template>
    <!--    <template #rightNavbar>-->
    <!--      <NavbarRight>-->
    <!--      </NavbarRight>-->
    <!--    </template>-->
    <template #body>
      <Dialog :visible="visible" modal :header="header" @update:visible="setUp" class="lg:w-[50vw]">
        <PostCreation :post="editionPost" @turnOffVisible="visible = !visible"
                      @onCreatePost="body => onCreatePost(body)" @onUpdatePost="onUpdatePost()"></PostCreation>
      </Dialog>
      <div class="mx-auto sm:w-full md:w-3/4 lg:w-2/3 2xl:w-2/4 dark:text-gray-200 text-gray-700">
        <div v-show="textSearch" class="text-black text-2xl bold">
          Hiển thị
          <span>{{ total }}</span>
          kết quả tìm kiếm cho từ khoá
          <span class="italic text-ll-primary">"{{ textSearch }}"</span>
        </div>
        <Feed :visible="visible" :feedPosts="feeds" :oneColumn="showLeftNavbar && showRightNavbar"
              :showPostComposer="showComposePost"
              @on-close-compose-post="showComposePost = !showComposePost"
              @onEditPost="(index) => onEditPost(index)"></Feed>
      </div>
      <InfiniteLoading @infinite="loadFeed">
        <template #complete>
          <span></span>
        </template>
        <template #spinner>
          <span></span>
        </template>
      </InfiniteLoading>
    </template>
  </AppShell>
</template>
<style lang="">

</style>
