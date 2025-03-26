import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mitt from 'mitt'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import 'popper.js'
import '@fortawesome/fontawesome-free/css/all.min.css'

const app = createApp(App)

app.config.globalProperties.emitter = mitt()

app.use(router).mount('#app')
document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelector(".slides");
  let index = 0;

  function nextSlide() {
    index = (index + 1) % 2; // Chỉ có 2 ảnh
    slides.style.transform = `translateX(-${index * 100}%)`;
  }

  setInterval(nextSlide, 3000); // Chuyển slide mỗi 3 giây
});
