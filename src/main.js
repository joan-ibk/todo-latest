import { createApp } from 'vue'
import App from './App.vue'
import draggable from 'vuedraggable';

createApp(App).mount('#app')
.component('draggable', draggable)
