import Vue from 'vue'
import axios from 'axios'

// axios.defaults.baseURL = 'https://bsite.net/MarcoWeb/api/'
axios.defaults.baseURL = 'https://localhost:44345/api/'
Vue.prototype.$axios = axios
