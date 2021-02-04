<template>
    <div>
        
    </div>
</template>
<script>
import {mapActions, mapMutations} from 'vuex';
export default {
    name: 'Logout',
    created(){
        this.logout();
    },
    methods:{
        ...mapMutations(['setToken']),
        logout(){
            this.setToken(null);
            localStorage.removeItem('token');
            this.$router.push('/');
        }
    }

}
</script>