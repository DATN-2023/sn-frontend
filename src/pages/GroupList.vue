<script>
import {defineComponent} from 'vue'
import UserDetail from "@/features/components/UserDetail.vue";
import AppShell from "@/features/components/AppShell.vue";
import Header from "@/features/components/Header.vue";
import Feed from "@/features/feed/Feed.vue";
import Navbar from "@/features/components/Navbar.vue";
import GroupThumb from "@/features/components/GroupThumb.vue";
import GroupCreation from "@/features/components/GroupCreation.vue";

export default defineComponent({
  name: "Group",
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
      groups: [],
      recommendGroups: [],
      responsiveOptions: [
        {
          breakpoint: '1536px',
          numVisible: 2,
          numScroll: 1
        },
        {
          breakpoint: '1280px',
          numVisible: 2,
          numScroll: 1
        },
        {
          breakpoint: '1024px',
          numVisible: 1,
          numScroll: 1
        },
        {
          breakpoint: '767px',
          numVisible: 1,
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
      this.groups = res || []
    }
  },
  mounted() {
    this.getRecommendGroups()
    this.getJoiningGroups()
  },
  watch: {
    // showLeftNavbar(newVal, oldVal) {
    //   console.log('this.responsiveOptions', this.responsiveOptions)
    //   if (newVal) {
    //     this.responsiveOptions[0].numVisible = 2
    //   } else {
    //     this.responsiveOptions[0].numVisible = 3
    //   }
    //   console.log('this.responsiveOptions', this.responsiveOptions)
    // }
  }
})
</script>

<template>
  <AppShell :navbarExpanded="showLeftNavbar" :rightNavbarExpanded="showRightNavbar" :full-sidebar="true"
            :showNavBar="showNavBar">
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
              @on-close-navbar="(v) => { showLeftNavbar = v }" :activate-index="1" :show-add-feed="0"
              :show-add-group="1">
      </Navbar>
      <Dialog :visible="groupVisible" modal header="Tạo nhóm" @update:visible="setUp" :style="{ width: '50vw' }">
        <GroupCreation></GroupCreation>
      </Dialog>
    </template>
    <template #body>
      <div class="2xl:w-1200px <sm:w-380px sm:w-400px lg:w-800px xl:w-750px 2xl:w-1090px mx-auto">
        <div
            class="w-full mx-auto text-gray-800 dark:text-gray-300 border-b-1 border-ll-base dark:border-ld-border my-2">
          <div class="text-2xl bold ml-10">Các nhóm bạn theo dõi</div>
          <div v-if="groups.length" class="w-full">
            <Carousel :value="groups" :num-visible="3" :num-scroll="1" :responsive-options="responsiveOptions">
              <template #item="slotProps">
                <GroupThumb :item="slotProps"></GroupThumb>
              </template>
            </Carousel>
          </div>
          <div v-else class="text-center text-md p-2 w-full">Bạn chưa theo dõi nhóm nào</div>
        </div>
        <div class="w-full mx-auto text-gray-800 dark:text-gray-300 my-2">
          <div class="text-2xl bold ml-10">Các nhóm đề xuất</div>
          <div class="mx-auto w-full">
            <Carousel :value="recommendGroups" :num-visible="3" :num-scroll="1" :responsive-options="responsiveOptions">
              <template #item="slotProps">
                <GroupThumb :item="slotProps"></GroupThumb>
              </template>
            </Carousel>
          </div>
        </div>
      </div>
    </template>
  </AppShell>
</template>

<style scoped>

</style>
