<script>
import {defineComponent} from 'vue'
import UserDetail from "@/features/components/UserDetail.vue";
import AppShell from "@/features/components/AppShell.vue";
import Header from "@/features/components/Header.vue";
import Feed from "@/features/feed/Feed.vue";
import Navbar from "@/features/components/Navbar.vue";
import GroupThumb from "@/features/components/GroupThumb.vue";

export default defineComponent({
  name: "Group",
  components: {GroupThumb, Navbar, Feed, Header, AppShell},
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
      user: {},
      groups: [1,2,3,4,5,6],
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
      <div class="w-3/4 mx-auto text-gray-800 dark:text-gray-300 border-b-1 border-ll-base dark:border-ld-border my-2">
        <div class="text-2xl bold ml-10">Các nhóm bạn theo dõi</div>
        <Carousel :value="groups" :num-visible="3" :num-scroll="1" :responsive-options="responsiveOptions">
          <template #item="slotProps">
            <GroupThumb></GroupThumb>
          </template>
        </Carousel>
      </div>
      <div class="w-3/4 mx-auto text-gray-800 dark:text-gray-300 my-2">
        <div class="text-2xl bold ml-10">Các nhóm đề xuất</div>
        <Carousel :value="groups" :num-visible="3" :num-scroll="1" :responsive-options="responsiveOptions">
          <template #item="slotProps">
            <GroupThumb></GroupThumb>
          </template>
        </Carousel>
      </div>
    </template>
  </AppShell>
</template>

<style scoped>

</style>