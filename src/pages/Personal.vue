<script>
import Feed from "@/features/feed/Feed.vue";
import Header from "@/features/components/Header.vue";
import Navbar from "@/features/components/Navbar.vue";
import AppShell from "@/features/components/AppShell.vue";
import UserDetail from "@/features/components/UserDetail.vue";
import {Posts} from "@/features/feed/processFeedPosts";

export default {
  name: "Personal",
  components: {UserDetail, AppShell, Navbar, Header, Feed},
  data() {
    return {
      showLeftNavbar: true,
      showRightNavbar: true,
      showComposePost: true,
      visible: false,
      feeds: Posts,
      editionPost: {},
      indexEditionPost: null,
      showNavBar: false
    }
  },
  methods: {
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
  <AppShell :navbarExpanded="showLeftNavbar" :rightNavbarExpanded="showRightNavbar" :full-sidebar="false"
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
    <template #body>
      <div class="flex flex-col h-[350px] mt-2">
        <img class="self-center w-5/6 h-full object-cover rounded"
             src="https://cdn-v2.carpla.vn/1920x/customer/avatar/unnamed-1693453845.387.jpg" alt="banner">
        <div class="w-2/3 self-center flex gap-x-8">
          <div class="basis-1/3">
            <UserDetail></UserDetail>
          </div>
          <div class="basis-2/3">
            <Feed :visible="visible" :feedPosts="feeds" :oneColumn="showLeftNavbar && showRightNavbar"
                  :showPostComposer="showComposePost"
                  @on-close-compose-post="showComposePost = !showComposePost"
                  @onEditPost="(index) => onEditPost(index)"></Feed>
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
