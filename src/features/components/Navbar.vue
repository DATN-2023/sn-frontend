<script>

import PostCreation from "@/features/components/PostCreation.vue";
import GroupCreation from "@/features/components/GroupCreation.vue";
import {genImageUrl} from "@/config";

export default {
  components: {GroupCreation, PostCreation},
  data() {
    return {
      menus: {
        active: 0,
        menusList: [
          {
            index: 0,
            name: "Home",
            icon: `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                `,
            path: '/',
            onClick: async () => {
              await this.$router.push('/')
              this.$emit('onPushMain')
            }
          },
          {
            index: 1,
            name: "Group",
            icon: `
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
              </svg>

                  `,
            path: '/group',
            onClick: () => {
              this.$router.push('/group')
            }
          },
          // {
          //     index: 6,
          //     name: "Notifications",
          //     icon: `
          //     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          //     <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
          //     </svg>
          //
          //         `
          // },
          // {
          //     index: 2,
          //     name: "Favorite",
          //     icon: `
          //     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          //     <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          //     </svg>
          //         `
          // },
          {
            index: 2,
            name: "Chat",
            icon: `
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 512 512">
              <path d="M160 368c26.5 0 48 21.5 48 48v16l72.5-54.4c8.3-6.2 18.4-9.6 28.8-9.6H448c8.8 0 16-7.2 16-16V64c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16V352c0 8.8 7.2 16 16 16h96zm48 124l-.2 .2-5.1 3.8-17.1 12.8c-4.8 3.6-11.3 4.2-16.8 1.5s-8.8-8.2-8.8-14.3V474.7v-6.4V468v-4V416H112 64c-35.3 0-64-28.7-64-64V64C0 28.7 28.7 0 64 0H448c35.3 0 64 28.7 64 64V352c0 35.3-28.7 64-64 64H309.3L208 492z"/>
              </svg>
                  `,
            path: '/chat',
            onClick: async () => {
              this.$router.push('/chat')
            }
          },
          {
            index: 3,
            name: "Logout",
            icon: `
                <svg xmlns="http://www.w3.org/2000/svg"  class="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 512 512">
                <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"/>
                </svg>                  `,
            path: '/',
            onClick: async () => {
              const fcmToken = window.$cookies.get('fcmToken')
              await this.$store.dispatch('notification/deleteFcmtoken', {fcmToken})
              await this.$store.dispatch('auth/removeToken')
              this.$router.push('/login')
            }
          },
          // {
          //     index: 5,
          //     name: "Settings",
          //     icon: `
          //     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          //     <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
          //     <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          //     </svg>
          //         `
          // },
        ]
      },
      user: {},
      groupVisible: false
    }
  },
  props: {
    isExpanded: {
      type: Boolean,
      required: true
    },
    activateIndex: {
      type: Number,
      default: 0
    },
    showAddFeed: {
      type: Boolean,
      default: 1
    },
    showAddGroup: {
      type: Boolean,
      default: 0
    }
  },
  methods: {
    genImageUrl,
    onRoutingUser() {
      this.$router.push({path: `/user/${this.user?.customerId}`})
    },
    async getUser() {
      this.user = await this.$store.dispatch('user/getUserById', 'me')
      await this.$store.dispatch('auth/setUserInfo', this.user)
      this.$emit('onGetMe', this.user)
    }
  },
  watch: {
    activateIndex(newVal, oldVal) {
      this.menus.active = newVal
    }
  },
  mounted() {
    this.getUser()
    this.menus.active = this.$props.activateIndex
  }
}


</script>
<template>
  <div
      :class="`w-full h-full flex flex-col ${this.$props.isExpanded ? 'p-10 px-5' : 'p-2'} relative overflow-y-auto overflow-x-hidden`">
    <div class="profile flex flex-col justify-center items-center">
      <div @click="onRoutingUser"
          :class="`cursor-pointer avatar rounded-full bg-ll-base dark:bg-ld-base ${this.$props.isExpanded ? 'w-25 h-25' : 'w-12 h-12'} border-2 border-ll-border dark:border-ld-border relative`">
        <img :src="genImageUrl(user?.avatar || '')" class="w-full h-full  rounded-full object-cover"
             alt="">

<!--        <div-->
<!--            :class="`${this.$props.isExpanded ? 'w-8 h-8 border-4 right-0 bottom-3' : 'w-5 h-5 border-2 -right-2 bottom-0'}  bg-ll-primary rounded-full   absolute  border-ll-base dark:border-ld-base text-white flex justify-center items-center`">-->
<!--          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"-->
<!--               stroke="currentColor" class="w-5 h-5">-->
<!--            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>-->
<!--          </svg>-->

<!--        </div>-->
      </div>
      <p @click="onRoutingUser" v-if="this.$props.isExpanded" class="cursor-pointer text-xl font-bold text-gray-800 dark:text-gray-300">
        {{ user?.name || 'anonymous' }}</p>
      <!--            <p class="-mt-1 text-sm" v-if="this.$props.isExpanded">toi la quy</p>-->
    </div>

    <!--    <div v-if="this.$props.isExpanded"-->
    <!--         class="w-full flex justify-between mt-5 pb-5 border-b border-ll-border dark:border-ld-border">-->
    <!--      <div class="flex flex-col justify-center items-center">-->
    <!--        <p class="text-lg font-bold text-gray-800 dark:text-gray-300">255</p>-->
    <!--        <p class="-mt-1 text-xs">Posts</p>-->
    <!--      </div>-->
    <!--      <div class="flex flex-col justify-center items-center">-->
    <!--        <p class="text-lg font-bold text-gray-800 dark:text-gray-300">298.45K</p>-->
    <!--        <p class="-mt-1 text-xs">Followers</p>-->
    <!--      </div>-->
    <!--      <div class="flex flex-col justify-center items-center">-->
    <!--        <p class="text-lg font-bold text-gray-800 dark:text-gray-300">20.5M</p>-->
    <!--        <p class="-mt-1 text-xs">Following</p>-->
    <!--      </div>-->
    <!--    </div>-->
    <ul :class="`flex flex-col w-full pt-5 ${this.$props.isExpanded ? '' : 'justify-center flex '}`">
      <li v-for="(menu, index) in menus.menusList" :key="menu.name"
          :class="` w-full py-2  flex items-center ${this.$props.isExpanded ? 'mb-2' : 'justify-center mb-4'} ${menu.index === menus.active ? 'text-ll-primary' : ''} cursor-pointer active:scale-95 transform transition-transform select-none`"
          @click="$.emit('onCloseNavbar', false), menus.active = menu.index, menu.onClick()">
        <div v-html="menu.icon" class="fill-ll-primary"></div>
        <p v-if="this.$props.isExpanded" class="ml-5 text-sm">{{ menu.name }}</p>

      </li>
    </ul>

    <button v-show="showAddFeed"
            @click="$.emit('onComposePost'), $.emit('onCloseNavbar', false), $.emit('onPostCreation', true)"
            class="bg-ll-primary dark:bg-ld-primary text-white rounded-lg py-3 px-2 active:scale-95 transform transition-transform flex items-center justify-center">
      <p v-if="this.$props.isExpanded">Đăng bài</p>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
           stroke="currentColor" :class="`${this.$props.isExpanded ? 'w-6 h-6 ml-5' : 'w-full h-full'}`">
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"/>
      </svg>

    </button>

    <button v-show="showAddGroup"
            @click="groupVisible = true, $.emit('onComposePost'), $.emit('onCloseNavbar', false), $.emit('onGroupCreation', true)"
            class="bg-ll-primary dark:bg-ld-primary hover:bg-sky-600 text-white fill-white rounded-lg py-3 px-2 active:scale-95 transform transition-transform flex items-center justify-center">
      <p v-if="this.$props.isExpanded">Tạo Nhóm</p>
      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512" stroke="currentColor" class=""
           :class="`${this.$props.isExpanded ? 'w-6 h-6 ml-5' : 'w-full h-full'}`">
        <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2h61.4C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z"/>
      </svg>
    </button>

    <button @click="$.emit('onCloseNavbar', false)"
            class="md:hidden w-8 h-8 absolute top-2 -right-1 bg-ll-neutral dark:bg-ld-neutral text-sm  border-ll-border dark:border-ld-border border   rounded-full flex items-center mr-2 active:scale-95 transform transition-transform">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
           stroke="currentColor" class="w-full h-full">
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>

    </button>
  </div>
</template>
