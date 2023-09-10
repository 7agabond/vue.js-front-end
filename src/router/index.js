import { createRouter, createWebHistory } from 'vue-router'
import DiscoverView from '../views/DiscoverView.vue'
import MyLibraryView from '../views/MyLibraryView.vue'
import playlistModal from '@/components/playlistModal.vue'

const routes = [
  {
    path: '/discover',
    component: DiscoverView,
    children:
    [
      {
        path: 'playlist/:playlistID',
        component: playlistModal
      }
    ]
  },
  {
    path: '/library',
    component: MyLibraryView,
    children:
    [
      {
        path: 'playlist/:playlistID',
        component: playlistModal
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
