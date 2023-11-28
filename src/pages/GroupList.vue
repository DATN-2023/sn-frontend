<script>
import {defineComponent} from 'vue'
import UserDetail from "@/features/components/UserDetail.vue";
import AppShell from "@/features/components/AppShell.vue";
import Header from "@/features/components/Header.vue";
import Feed from "@/features/feed/Feed.vue";
import Navbar from "@/features/components/Navbar.vue";
import GroupThumb from "@/features/components/GroupThumb.vue";
import GroupCreation from "@/features/components/GroupCreation.vue";
import {data} from "autoprefixer";

export default defineComponent({
  name: "Group",
  computed: {
    data() {
      return data
    }
  },
  components: {GroupCreation, GroupThumb, Navbar, Feed, Header, AppShell},
  data() {
    return {
      showLeftNavbar: true,
      showRightNavbar: true,
      showComposePost: true,
      visible: false,
      groupVisible: false,
      feeds: [],
      editionPost: {},
      indexEditionPost: null,
      showNavBar: true,
      user: {},
      groups: [1,2,3,4,5,6],
      recommendGroups: [1,2,3,4,5,6],
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
    setUp(visible) {
      if (!visible) {
        this.groupVisible = false;
      }
    },
    async getRecommendGroups() {
      const res = await this.$store.dispatch('group/getGroups')
      this.recommendGroups = res?.data || []
    },
    async getJoiningGroups() {
      const res = await this.$store.dispatch('group/getJoiningGroups')
      this.groups = res?.data || []
    }
  },
  mounted() {
    this.getRecommendGroups()
    this.getJoiningGroups()
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
              @onPostCreation="(data) => visible = data" @onGroupCreation="data => groupVisible = data"
              @on-close-navbar="(v) => { showLeftNavbar = v }" :activate-index="1" :show-add-feed="0" :show-add-group="1">
      </Navbar>
      <Dialog :visible="groupVisible" modal header="Tạo nhóm" @update:visible="setUp" :style="{ width: '50vw' }">
        <GroupCreation></GroupCreation>
      </Dialog>
    </template>
    <template #body>
      <div class="w-3/4 mx-auto text-gray-800 dark:text-gray-300 border-b-1 border-ll-base dark:border-ld-border my-2">
        <div class="text-2xl bold ml-10">Các nhóm bạn theo dõi</div>
        <div v-if="groups.length" class="h-[350px]">
          <Carousel :value="groups" :num-visible="3" :num-scroll="1" :responsive-options="responsiveOptions">
            <template #item="slotProps">
              <GroupThumb></GroupThumb>
            </template>
          </Carousel>
        </div>
        <div v-else class="text-center text-md p-2 w-full">Bạn chưa theo dõi nhóm nào</div>
      </div>
      <div class="w-3/4 mx-auto text-gray-800 dark:text-gray-300 my-2">
        <div class="text-2xl bold ml-10">Các nhóm đề xuất</div>
        <div class="mx-auto">
          <Carousel :value="recommendGroups" :num-visible="3" :num-scroll="1" :responsive-options="responsiveOptions">
            <template #item="slotProps">
              <GroupThumb :item="slotProps"></GroupThumb>
            </template>
          </Carousel>
        </div>
      </div>
    </template>
  </AppShell>
</template>

<style scoped>

</style>
