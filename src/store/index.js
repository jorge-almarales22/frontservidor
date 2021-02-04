import axios from 'axios';
import { createStore } from 'vuex'

export default createStore({
  state: {
    token: null,
    fails: null,
    products: [],
    pagination: {
      'total': 0,
      'current_page': 0,
      'per_page': 0,
      'last_page': 0,
      'from': 0,
      'to': 0
    },
    offset: 3,
  },
  mutations: {
    setToken(state,payload){
      state.token = payload;
    },
    setFails(state,payload){
      state.fails = payload;
    },
    setProducts(state, payload){
      state.products = payload;
    },
    destroyProduct(state, payload){
      state.products.splice(payload.index, 1);
    },
    setPagination(state, payload){
      state.pagination = payload;
    }

  },
  actions: {
    getToken(context){
      if(localStorage.getItem('token')){
        context.commit('setToken', localStorage.getItem('token'))
      }else{
        context.commit('setToken', null)
      }
    },

    getProducts(context,page){
      axios.get(`https://immense-brook-02311.herokuapp.com/api/auth/products?page=${page}`,
      { headers: {"Authorization" : `Bearer ${context.state.token}`} })
      .then(res => {
        context.commit('setProducts', res.data.products.data);
        context.commit('setPagination', res.data.pagination);
        // console.log(res)
        // console.log(context.state.pagination)
      })
    },

    deleteProduct(context, product){
      context.commit('destroyProduct', product);
      axios.delete(`https://immense-brook-02311.herokuapp.com/api/auth/products/${product.id}`,
      { headers: {"Authorization" : `Bearer ${context.state.token}`} })
      .then(res => console.log('se elimino correctamente'));
    },

    

  },
  modules: {
  }
})
