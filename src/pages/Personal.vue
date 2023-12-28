<script>
import Feed from "@/features/feed/Feed.vue";
import Header from "@/features/components/Header.vue";
import Navbar from "@/features/components/Navbar.vue";
import AppShell from "@/features/components/AppShell.vue";
import UserDetail from "@/features/components/UserDetail.vue";
import {genImageUrl} from "@/config";
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";

export default {
  name: "Personal",
  components: {UserDetail, AppShell, Navbar, Header, Feed, InfiniteLoading},
  data() {
    return {
      showLeftNavbar: true,
      showRightNavbar: true,
      showComposePost: true,
      visible: false,
      feeds: [],
      editionPost: {},
      indexEditionPost: null,
      showNavBar: false,
      user: {},
      page: 0,
      isLoadmore: 0
    }
  },
  methods: {
    genImageUrl,
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
    async getUserById() {
      const {id} = this.$route.params
      if (id === 'me') {
        this.user = await this.$store.dispatch('user/getUserById', 'me')
      } else {
        this.user = await this.$store.dispatch('user/getUserById', id)
      }
    },
    async getFeedsOfUser(q = {}) {
      q.id = this.user.customerId
      console.log('user', this.user)
      const data = await this.$store.dispatch('feed/getFeedsOfUser', q)
      console.log('feedsdata', data)
      this.feeds = this.feeds.concat(data.data || [])
      this.page = data.page || 0
      this.isLoadmore = this.feeds.length < data.total
      console.log('check', this.isLoadmore)
      return data
    },
    async updateUser(id, body) {
      return this.$store.dispatch('user/updateUser', {id, body})
    },
    onUploadFiles() {
      this.$refs.upload.click()
    },
    async changeFileUpload(event) {
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0]
        const {name} = await this.uploadFile(file)
        const body = {
          ...this.user,
          banner: `/${name}`
        }
        const user = await this.updateUser(this.user._id, body)
        this.user.banner = user.banner
      }
    },
    async uploadFile(file) {
      const data = await this.$store.dispatch('upload/getPresignedUrl', {name: file.name})
      await this.$store.dispatch('upload/uploadFile', {url: data.url, file, type: file.type})
      return {name: data.name}
    },
    async loadFeedOfUser($state) {
      console.log('loading...', this.page)
      try {
        if (this.isLoadmore) {
          const feeds = await this.getFeedsOfUser({page: this.page + 1})
          console.log('feeds', feeds)
          $state.loaded()
        }
        console.log('check')
      } catch (e) {
        $state.error()
      }
    }
  },
  async mounted() {
    await this.getUserById()
    await this.getFeedsOfUser()
    this.isLoadmore = 1
  }
}
</script>

<template>
  <AppShell :navbarExpanded="showLeftNavbar" :rightNavbarExpanded="showRightNavbar" :full-sidebar="false"
            :showNavBar="showNavBar">
    <template #header>
      <Header @on-menu-click="
    showLeftNavbar = !showLeftNavbar;
            " @on-right-menu-click="
    showRightNavbar = !showRightNavbar;
            ">
      </Header>
    </template>
    <template #body>
      <div class="flex flex-col">
        <div class="self-center xl:w-5/6 w-full xl:h-full h-280px relative">
          <img class="xl:h-[350px] sm:h-[280px] <sm:h-[350px] border-ll-border shadow-lg w-full object-cover rounded"
               :src="[user?.banner ? genImageUrl(user.banner) : 'http://localhost:9000/social-network/photo-1575936123452-b67c3203c357-1698657350.648.avif'] "
               alt="">
          <div>
            <input type="file" ref="upload" hidden="" @change="changeFileUpload">
          </div>
          <button @click="onUploadFiles"
                  class="absolute -right-2 bottom-0 w-10 h-10 mr-2 border rounded flex justify-center items-center border-ll-border dark:border-ld-border hover:bg-ll-border hover:dark:bg-ld-border dark:text-gray-500 active:scale-95 transition-transform transform">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>
            </svg>
          </button>
        </div>
        <div class="lg:w-4/5 xl:w-2/3 w-full self-center flex lg:flex-row flex-col gap-x-8">
          <div class="lg:basis-1/3">
            <UserDetail :user="user"></UserDetail>
          </div>
          <div class="lg:basis-2/3">
            <Feed :visible="visible" :feedPosts="feeds" :oneColumn="showLeftNavbar && showRightNavbar"
                  :showPostComposer="showComposePost"
                  @on-close-compose-post="showComposePost = !showComposePost"
                  @onEditPost="(index) => onEditPost(index)"></Feed>
            <InfiniteLoading @infinite="loadFeedOfUser">
              <template #spinner>
                <span></span>
              </template>
            </InfiniteLoading>
          </div>
        </div>
      </div>

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
