<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="card shadow rounded">
                <div class="card-body">
                    <form @submit.prevent="addProduct()" enctype="multipart/formdata">
                        <div class="form-group">
                            <label>Name</label>
                            <input type="text" class="form-control" v-model="product.name" placeholder="name...">
                            <!-- <span class="text-danger">El nombre es requerido</span> -->
                        </div>
                        <div class="form-group">
                            <label>Content</label>
                            <input type="text" class="form-control" v-model="product.description" placeholder="description...">
                            <!-- <span class="text-danger">La descripcion es requerido</span> -->
                        </div>
                        <div class="form-group">
                            <label>Image</label>
                            <input type="file" class="form-control-file" @change="inputFile">
                            <!-- <span class="text-danger">La imagen es requerido</span> -->
                        </div>
                        <div>
                            <img :src="imagen" class="img">
                        </div>
                        <div class="form-group">
                            <input type="submit" value="Guardar" class="btn btn-dark btn-lg btn-block float-right">
                            <router-link class="btn btn-default btn-lg btn-block mt-2" to="/home">Back</router-link> 
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import {mapState} from 'vuex';

export default {
    name: 'New',
    data() {
        return {
            product:{
                name: null,
                desciption: null,
                image: null
            },
            imageMin: ''
        }
    },
    computed:{
        ...mapState(['token']),
        imagen(){
            return this.imageMin;
        }
    },
    methods:{
        inputFile(e){
            let fileReader = new FileReader();
            fileReader.readAsDataURL(e.target.files[0])
            // console.log(e.target)
            fileReader.onload = (e) =>{
                this.product.image = e.target.result
                this.imageMin = e.target.result
                           
            }
        },
        addProduct(){
            axios.post('https://immense-brook-02311.herokuapp.com/api/auth/products',this.product, 
                { headers: {"Authorization" : `Bearer ${this.token}`} })
                .then(res => {
                    this.$router.push('/home');
            })             
        }
    }
}
</script>

<style scoped>
.img{
    max-width: 200px;
}
</style>