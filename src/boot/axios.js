import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = 'https://bsite.net/MarcoWeb/api/'
Vue.prototype.$axios = axios
