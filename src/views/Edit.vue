<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="card shadow rounded">
                <div class="card-body">
                    <form @submit.prevent="updateProduct()" enctype="multipart/formdata">
                        <div class="form-group">
                            <label >Name</label>
                            <input type="text" class="form-control" v-model="data.name">
                        </div>
                        <div class="form-group">
                            <label >Content</label>
                            <input type="text" class="form-control" v-model="data.description">
                        </div>
                        <div class="form-group">
                            <label >Image</label>
                            <input type="file" class="form-control-file" @change="inputFile">
                        </div>
                        <div class="form-group">
                            <input type="submit" class="btn btn-dark btn-lg btn-block" value="Modificar">
                            <router-link class="btn btn-default btn-lg btn-block mt-2" to="/home">Back</router-link> 
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import axios from 'axios'
export default {
    name: 'Edit',
    data() {
        return {
            data: {name: null, descrption: null, image: null}
        }
    },
    computed:{
        ...mapState(['products', 'token'])
    },
    created(){
        this.data = this.products.find(item => item.id == this.$route.params.id)
        // console.log(this.data);
        // console.log(this.products);
    },
    methods:{
        inputFile(e){
            let fileReader = new FileReader();
            fileReader.readAsDataURL(e.target.files[0])
            // console.log(e.target)
            fileReader.onload = (e) =>{
                this.data.image = e.target.result
                // console.log(this.product)                
            }
        },
        updateProduct(){
            axios.put(`https://immense-brook-02311.herokuapp.com/api/auth/products/${this.$route.params.id}`,this.data, 
            { headers: {"Authorization" : `Bearer ${this.token}`} })
            .then(res => {
                this.$router.push('/home')
            })
            // console.log(this.data)
        }
    }

}
</script>