<script>
import {defineComponent} from 'vue'
import Navbar from "@/features/components/Navbar.vue";
import Feed from "@/features/feed/Feed.vue";
import AppShell from "@/features/components/AppShell.vue";
import Header from "@/features/components/Header.vue";
import PostCreation from "@/features/components/PostCreation.vue";
import Post from "@/features/components/Post.vue"
import Comment from "@/features/components/Comment.vue"

export default defineComponent({
  name: "DetailFeed",
  components: {PostCreation, Header, AppShell, Feed, Navbar, Post, Comment},
  data() {
    return {
      showLeftNavbar: true,
      showRightNavbar: true,
      showComposePost: true,
      visible: false,
      post: {
        user: {
          avatar: ''
        },
        images: [],
        content: ''
      }
    }
  },
  methods: {
    onCreatePost(body) {
      // const userInfo = this.$store.getters['auth/userInfo']
      // // console.log('userInfo', userInfo)
      // // console.log('post', body)
      // body.user = {
      //   name: userInfo?.name || 'anonymous',
      //   avatar: userInfo?.avatar || ''
      // }
      // this.feeds.unshift(body)
      this.$router.push({path: '/'})
    },
    setUp(visible) {
      if (!visible) {
        this.visible = false;
      }
    },
    async getFeedById() {
      const {title} = this.$route.params
      const id = title.split('-').pop()
      const post = await this.$store.dispatch('feed/getFeedById', id)
      this.post = post
    }
  },
  mounted() {
    this.getFeedById()
  }
})
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
        <PostCreation @turnOffVisible="visible = !visible" @onCreatePost="body => onCreatePost(body)"></PostCreation>
      </Dialog>
      <div class="`w-full grid grid-cols-1 2xl:px-60 sm:px-0 md:px-20 pt-5 transition-all`">
        <div class="flex flex-col px-2">
          <Post :post="post" class=""></Post>
        </div>
      </div>
    </template>
  </AppShell>
</template>

<style scoped>

</style>