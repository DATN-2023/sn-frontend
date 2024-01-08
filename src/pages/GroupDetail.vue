<script>
import {defineComponent} from 'vue'
import AppShell from "@/features/components/AppShell.vue";
import Header from "@/features/components/Header.vue";
import Feed from "@/features/feed/Feed.vue";
import Navbar from "@/features/components/Navbar.vue";
import GroupThumb from "@/features/components/GroupThumb.vue";
import GroupTitle from "@/features/components/GroupTitle.vue";
import GroupDescription from "@/features/components/GroupDescription.vue";
import GroupRules from "@/features/components/GroupRules.vue";
import PostCreation from "@/features/components/PostCreation.vue";
import {genImageUrl} from "@/config";
import ApproveUser from "@/features/components/ApproveUser.vue";
import config from "@/config/config";

const {joinStatusGroupConfig} = config

export default defineComponent({
  name: "Group",
  components: {
    ApproveUser,
    PostCreation, GroupRules, GroupDescription, GroupTitle, GroupThumb, Navbar, Feed, Header, AppShell
  },
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
      group: {},
      pendingUsers: [],
      activeNavbar: true,
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
      ],
      navBavConfig: {
        active: 0,
        configs: [
          {
            onClick: this.onFeedClick(),
            title: 'Bài đăng',
            show: true,
            total: 0
          },
          {
            onClick: this.onApproveClick(),
            title: 'Phê duyệt',
            show: false,
            total: 0
          }
        ]
      }
    }
  },
  methods: {
    genImageUrl,
    checkMod() {
      return this.group?.isMod || false
    },
    onFeedClick() {

    },
    onApproveClick() {

    },
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
    },
    async getDetailGroup() {
      this.group = await this.$store.dispatch('group/getGroupById', this.$route.params.id)
      await this.getFeeds()
      if (this.group?.isMod) {
        this.navBavConfig.configs[1].show = true
        await this.getPendingUserGroups()
      }
    },
    async getFeeds() {
      const feeds = await this.$store.dispatch('feed/getFeed', {groupId: this.group._id})
      this.feeds = feeds.data
    },
    async getPendingUserGroups() {
      const userGroups = await this.$store.dispatch('group/getUserGroups', {
        status: joinStatusGroupConfig.PENDING,
        group: this.$route.params.id
      })
      this.navBavConfig.configs[1].total = userGroups.total
      this.pendingUsers = userGroups?.data || []
    },
    onApproveAndDeleteUser(index) {
      this.navBavConfig.configs[1].total--
      this.pendingUsers.splice(index, 1)
    },
    onIncMember(index) {
      this.group.memberTotal++
      this.onApproveAndDeleteUser(index)
    },
    onDecMember(index) {
      this.onApproveAndDeleteUser(index)
    },
    onUploadFiles() {
      this.$refs.upload.click()
    },
    async changeFileUpload(event) {
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0]
        const {name} = await this.uploadFile(file)
        const body = {
          ...this.group,
          banner: `/${name}`
        }
        const group = await this.updateGroup(this.group._id, body)
        this.group.banner = group.banner
      }
    },
    async uploadFile(file) {
      const data = await this.$store.dispatch('upload/getPresignedUrl', {name: file.name})
      await this.$store.dispatch('upload/uploadFile', {url: data.url, file, type: file.type})
      return {name: data.name}
    },
    async updateGroup(id, body) {
      return this.$store.dispatch('group/updateGroup', {id, body})
    },
    async uploadThumbnail(body) {
      console.log('body', body)
      const group = await this.updateGroup(this.group._id, body)
      this.group.thumbnail = group.thumbnail
    }
  },
  mounted() {
    this.getDetailGroup()
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
              @on-close-navbar="(v) => { showLeftNavbar = v }" :activate-index="1" :show-add-feed="0"
              :show-add-group="0">
      </Navbar>
    </template>
    <template #body>
      <div class="relative self-center lg:w-5/6">
        <img class="h-[350px] <sm:h-[250px] border-ll-border shadow-lg w-full object-cover rounded-b-lg"
             :src="[group?.banner ? genImageUrl(group?.banner) : 'https://images.egosnet.click/social-network/2975662.jpg'] "
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
      <div class="lg:w-2/3 self-center">
        <div class="gap-x-8 bg-ll-neutral dark:bg-ld-neutral text-gray-800 dark:text-gray-300 rounded-b-lg">
          <GroupTitle :group="group" @uploadThumbnail="uploadThumbnail"></GroupTitle>
          <div class="flex px-4 py-2">
            <button v-for="(value, index) in navBavConfig.configs" v-show="value.show"
                    :class="`${navBavConfig.active === index ? 'p-2 border-b-2 border-neutral-500 font-bold mr-1' : 'p-2 hover:font-bold hover:border-b-2 hover:border-neutral-500 mr-1' }`"
                    @click="navBavConfig.active = index, value.onClick"><p
                :class="`${value.total ? 'text-white bg-red-500 w-4 h-4 rounded-full text-[12px] p-0.5 mr-1 inline-block' : ''}`">
              {{ value.total ? value.total : '' }}</p>{{ `${value.title}` }}
            </button>
          </div>
        </div>
        <div class="flex lg:flex-row flex-col-reverse space-x-2 text-gray-800 dark:text-gray-300">
          <div class="basis-2/3">
            <div>
              <Dialog :visible="visible" modal header="Đăng bài viết trong Group" @update:visible="setUp"
                      class="lg:w-[50vw]">
                <PostCreation :groupId="group._id" :post="editionPost" @turnOffVisible="visible = !visible"
                              @onCreatePost="body => onCreatePost(body)" @onUpdatePost="onUpdatePost()"></PostCreation>
              </Dialog>
              <Feed v-show="navBavConfig.active === 0" :visible="visible" :feedPosts="feeds"
                    :oneColumn="showLeftNavbar && showRightNavbar"
                    :showPostComposer="showComposePost"
                    @on-close-compose-post="showComposePost = !showComposePost"
                    @onEditPost="(index) => onEditPost(index)"></Feed>
              <div v-show="navBavConfig.active === 1" class="mt-4 bg-ll-neutral dark:bg-ld-neutral rounded-md">
                <ApproveUser @onIncMember="data => onIncMember(index)"
                             @onDecMember="data => onDecMember(index)" v-for="(user, index) in pendingUsers"
                             :user="user"></ApproveUser>
              </div>
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
              <GroupDescription :description="group.description"></GroupDescription>
            </div>
            <div class="bg-ll-neutral dark:bg-ld-neutral w-full rounded rounded-md mt-4 p-4">
              <GroupRules :rules="group.rules"></GroupRules>
            </div>
          </div>
        </div>
      </div>
    </template>
  </AppShell>
</template>

<style scoped>

</style>
