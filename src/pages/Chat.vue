<script>
import {defineComponent} from 'vue'
import Navbar from "@/features/components/Navbar.vue";
import AppShell from "@/features/components/AppShell.vue";
import Header from "@/features/components/Header.vue";
import ChatList from "@/features/components/ChatList.vue";
import ChatDetail from "@/features/components/ChatDetail.vue";
import {socket} from "@/plugins/socket";

export default defineComponent({
  name: "Chat",
  components: {ChatDetail, ChatList, Navbar, AppShell, Header},
  data() {
    return {
      showLeftNavbar: true,
      showRightNavbar: true,
      showComposePost: true,
      visible: false,
      indexEditionPost: null,
      showNavBar: true,
      channels: [],
      channelActive: {},
      user: {},
      messages: []
    }
  },
  methods: {
    connect() {
      socket.connect();
    },
    disconnect() {
      socket.disconnect();
    },
    handleGetChannel(payload) {
      this.channels = this.channels.concat(payload?.data || [])
    },
    onClickChannel(index) {
      this.channels[index].active = 1
      this.channelActive = this.channels[index]
    },
    onGetme(data) {
      this.user = data
      console.log('me', data)
      socket.on(`client:channel:getChannels-${this.user?.customerId || ''}`, payload => this.handleGetChannel(payload))
      socket.on(`client:listener-${this.user?.customerId || ''}`, payload => this.handleMessage(payload))
      socket.emit('channel:getChannels', {page: 1})
    },
    handleMessage(payload) {
      console.log('payload', payload)
      if (payload.channel === this.channelActive._id) {
        this.messages.unshift(payload)
      }
      // let channel
      // for (const index in this.channels) {
      //   channel = this.channels[index]
      // }
    }
  },
  mounted() {
    this.connect()
  }
})
</script>

<template>
  <AppShell :navbarExpanded="showLeftNavbar" :rightNavbarExpanded="showRightNavbar" :full-sidebar="true"
            :showNavBar="showNavBar" :overflow="false">
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
              @on-close-navbar="(v) => { showLeftNavbar = v }" :activate-index="2" :show-add-feed="0"
              :show-add-group="0" @onGetMe="data => onGetme(data)">
      </Navbar>
    </template>
    <template #body>
      <div class="flex h-full w-full bg-ll-neutral dark:bg-ld-neutral text-gray-800 dark:text-gray-300">
        <div
            class="bg-ll-neutral dark:bg-ld-neutral h-full w-350px pl-2 border-r-1 border-ll-border dark:border-ld-border">
          <ChatList :channels="channels" @onClickChannel="onClickChannel"></ChatList>
        </div>
        <div class="h-full flex-1">
          <ChatDetail v-show="Object.keys(channelActive).length" :channel="channelActive" :uid="this.user?.customerId"
                      :messages="messages"></ChatDetail>
        </div>
      </div>
    </template>
  </AppShell>
</template>

<style scoped>

</style>
