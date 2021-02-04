<template>
    <div id="nav" class="text-center">
        <template v-if="token">
            <router-link to="/home">Home</router-link> |
            <router-link to="/about">About</router-link> |
            <router-link to="/logout">Logout</router-link> 
        </template>
        <template v-else>
            <router-link to="/register">Register</router-link> |
            <router-link to="/">Login</router-link>
        </template>
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
    name: 'Navbar',
    computed:{
        ...mapState(['token'])
    }
}
</script>
<style>
    
</style>