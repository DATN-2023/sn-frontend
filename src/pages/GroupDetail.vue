<script>
import {defineComponent} from 'vue'
import UserDetail from "@/features/components/UserDetail.vue";
import AppShell from "@/features/components/AppShell.vue";
import Header from "@/features/components/Header.vue";
import Feed from "@/features/feed/Feed.vue";
import Navbar from "@/features/components/Navbar.vue";
import GroupThumb from "@/features/components/GroupThumb.vue";
import GroupTitle from "@/features/components/GroupTitle.vue";
import {Posts} from "@/features/feed/processFeedPosts";
import GroupDescription from "@/features/components/GroupDescription.vue";
import GroupRules from "@/features/components/GroupRules.vue";
import PostCreation from "@/features/components/PostCreation.vue";
import {genImageUrl} from "@/config";

export default defineComponent({
  name: "Group",
  components: {PostCreation, GroupRules, GroupDescription, GroupTitle, GroupThumb, Navbar, Feed, Header, AppShell},
  data() {
    return {
      showLeftNavbar: true,
      showRightNavbar: true,
      showComposePost: true,
      visible: false,
      feeds: Posts,
      editionPost: {},
      indexEditionPost: null,
      showNavBar: true,
      user: {},
      groups: [1, 2, 3, 4, 5, 6],
      responsiveOptions: [
        {
          breakpoint: '1400px',
          numVisible: 2,
          numScroll: 1
        },
        {
          breakpoint: '1199px',
          numVisible: 3,
          numScroll: 1
        },
        {
          breakpoint: '767px',
          numVisible: 2,
          numScroll: 1
        },
        {
          breakpoint: '575px',
          numVisible: 1,
          numScroll: 1
        }
      ]
    }
  },
  methods: {
    genImageUrl,
    setUp(visible) {
      if (!visible) {
        this.visible = false;
      }
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
    onUpdatePost() {
      this.editionPost.updated = 1
      this.feeds[this.indexEditionPost] = this.editionPost
      this.editionPost = {}
    },
    onEditPost(index) {
      this.editionPost = JSON.parse(JSON.stringify(this.feeds[index]))
      this.indexEditionPost = index
      this.visible = !this.visible
    },
    onPostCreation() {
      this.visible = true
    }
  }
})
</script>

<template>
  <AppShell :navbarExpanded="showLeftNavbar" :rightNavbarExpanded="showRightNavbar" :full-sidebar="true"
            :showNavBar="showNavBar"
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
              @onPostCreation="(data) => visible = data"
              @on-close-navbar="(v) => { showLeftNavbar = v }">
      </Navbar>
    </template>
    <template #body>
      <div class="self-center w-5/6 bg-ll-neutral dark:bg-ld-neutral">
        <img class="h-[350px] border-ll-border shadow-lg w-full object-cover rounded"
             :src="[user?.banner ? genImageUrl(user.banner) : 'https://images-cdn.carpla.dev/1920x/HybridErtigajpg-1664383054.jpg'] "
             alt="">
        <!--        <div>-->
        <!--          <input type="file" ref="upload" hidden="" @change="changeFileUpload">-->
        <!--        </div>-->
        <!--        <button @click="onUploadFiles"-->
        <!--                class="absolute -right-2 bottom-0 w-10 h-10 mr-2 border rounded flex justify-center items-center border-ll-border dark:border-ld-border hover:bg-ll-border hover:dark:bg-ld-border dark:text-gray-500 active:scale-95 transition-transform transform">-->
        <!--          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"-->
        <!--               stroke="currentColor" class="w-6 h-6">-->
        <!--            <path stroke-linecap="round" stroke-linejoin="round"-->
        <!--                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>-->
        <!--          </svg>-->
        <!--        </button>-->
      </div>
      <div class="w-2/3 self-center">
        <div class="flex gap-x-8 bg-ll-neutral dark:bg-ld-neutral text-gray-800 dark:text-gray-300 rounded-b-lg">
          <!--        <div class="basis-1/3">-->
          <GroupTitle></GroupTitle>
          <!--        </div>-->
          <!--        <div class="basis-2/3">-->
          <!--          <Feed :visible="visible" :feedPosts="feeds" :oneColumn="showLeftNavbar && showRightNavbar"-->
          <!--                :showPostComposer="showComposePost"-->
          <!--                @on-close-compose-post="showComposePost = !showComposePost"-->
          <!--                @onEditPost="(index) => onEditPost(index)"></Feed>-->
          <!--        </div>-->
        </div>
        <div class="flex space-x-2 text-gray-800 dark:text-gray-300">
          <div class="basis-2/3">
            <div>
              <Dialog :visible="visible" modal header="Đăng bài viết trong Group" @update:visible="setUp" :style="{ width: '50vw' }">
                <PostCreation :post="editionPost" @turnOffVisible="visible = !visible"
                              @onCreatePost="body => onCreatePost(body)" @onUpdatePost="onUpdatePost()"></PostCreation>
              </Dialog>
              <Feed :visible="visible" :feedPosts="feeds" :oneColumn="showLeftNavbar && showRightNavbar"
                    :showPostComposer="showComposePost"
                    @on-close-compose-post="showComposePost = !showComposePost"
                    @onEditPost="(index) => onEditPost(index)"></Feed>
            </div>
          </div>
          <div class="basic-1/3 flex-1">
            <div class="mt-4">
              <button @click="onPostCreation"
                      class="text-xl hover:bg-sky-600 w-full bg-ll-primary dark:bg-ld-primary text-white rounded-lg py-5 px-2 active:scale-95 transform transition-transform flex items-center justify-center">
                <p>Đăng bài</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor" class="w-6 h-6 ml-5">
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"/>
                </svg>
              </button>
            </div>
            <div class="bg-ll-neutral dark:bg-ld-neutral w-full rounded rounded-md mt-4 p-4">
              <GroupDescription></GroupDescription>
            </div>
            <div class="bg-ll-neutral dark:bg-ld-neutral w-full rounded rounded-md mt-4 p-4">
              <GroupRules></GroupRules>
            </div>
          </div>
        </div>
      </div>
    </template>
  </AppShell>
</template>

<style scoped>

</style>