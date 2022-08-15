import Vue from 'vue'
import App from './App.vue'
import { Carousel , carouselItem} from 'element-ui'
Vue.config.productionTip = false
Vue.use(Carousel,carouselItem)
new Vue({
  render: h => h(App),
}).$mount('#app')
