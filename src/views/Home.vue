<template>
  <div>
    <router-link class="btn btn-primary float-right mb-3" to="/product/new">new</router-link> 
    <table class="table table-hover">
      <thead class="thead-dark">
        <th>Image</th>
        <th>Name</th>
        <th>Description</th>
        <th>Actions</th>
      </thead>
      <tbody>
       <template v-if="!products.length">
         <tr>
           <td colspan="4" class="text-center">Cargando....</td>
         </tr>
       </template>
       <template v-else>
         <tr v-for="(product, index) of products" :key="index">
           <td><img class="img" :src="'https://immense-brook-02311.herokuapp.com/' + product.image"></td>
           <td>{{product.name}}</td>
           <td>{{product.description}}</td>
           <td><router-link :to="`/product/edit/${product.id}`" class="btn btn-info btn-sm mr-1">Edit</router-link> 
           <button @click="deleteProduct({index: index, id: product.id})" 
           class="btn btn-danger btn-sm">Delete</button></td>
         </tr>
       </template>
      </tbody>
    </table>
    <div class="row justify-content-center">
      <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li v-if="pagination.current_page > 1" class="page-item">
          <a @click.prevent="changePage(pagination.current_page - 1)" class="page-link">
          Atras
          </a>
        </li>
        <li v-for="(page, index) in pagesNumber" :key="index" class="page-item" :class="page == isActived ? 'active' : ''">
          <a @click.prevent="changePage(page)" class="page-link">{{ page }}</a>
          </li>
        <li v-if="pagination.current_page < pagination.last_page" class="page-item">
          <a @click.prevent="changePage(pagination.current_page + 1)" class="page-link">Siguiente</a>
        </li>
      </ul>
    </nav>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
export default {
  name: 'Home',
  created(){
    this.getProducts();
  },
  computed:{
    ...mapState(['products', 'pagination', 'offset']),
    isActived() {
      return this.pagination.current_page;
    },

    pagesNumber() 
    {
      if(!this.pagination.to){
        return [];
      }

      let from = this.pagination.current_page - this.offset; 
      if(from < 1){
        from = 1;
      }

      let to = from + (this.offset * 2); 
      if(to >= this.pagination.last_page){
        to = this.pagination.last_page;
      }

      let pagesArray = [];
      while(from <= to){
        pagesArray.push(from);
        from++;
      }
      return pagesArray;
    }

  },
  methods:{
    ...mapActions(['getProducts', 'deleteProduct', 'editProduct']),
    changePage(page) {
      this.pagination.current_page = page;
      this.getProducts(page);
    }
  },
}
</script>

<style scoped>
.img{
  max-width: 50px;
}
</style>