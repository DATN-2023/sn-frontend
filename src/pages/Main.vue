<script setup>
import { ref } from 'vue';
import AppShell from '../features/components/AppShell.vue';
import Header from '../features/components/Header.vue';
import Navbar from '../features/components/Navbar.vue';
import NavbarRight from '../features/components/NavbarRight.vue';
import Feed from '../features/feed/Feed.vue';

const warn = (val) => {
}

const showLeftNavbar = ref(true);
const showRightNavbar = ref(true);
const showComposePost = ref(true);

// export default {
//   components: { AppShell, Header, Navbar, Feed, NavbarRight }
// }


</script>
<template >
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
                @on-close-navbar="(v) => { showLeftNavbar = v }">
            </Navbar>
        </template>
        <template #rightNavbar>
            <NavbarRight>
            </NavbarRight>
        </template>
        <template #body>
            <Feed :oneColumn="showLeftNavbar && showRightNavbar" :showPostComposer="showComposePost"
                @on-close-compose-post="showComposePost = !showComposePost"></Feed>
        </template>
    </AppShell>
</template>
<style lang="">
    
</style>