import Vue from 'vue'
import Router from 'vue-router'
import Hello from 'components/Hello'
import Admin from 'components/Admin'
import ViewPost from 'components/posts/View-post'
import AddNewPost from 'components/posts/Add-new-post'
import EditPost from 'components/posts/Edit-post'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    {
      path: '/admin/post/:id',
      name: 'view-post',
      component: ViewPost
    },
    {
      path: '/admin/add-new-post',
      name: 'add-new-post',
      component: AddNewPost
    },
    {
      path: '/admin/edit-post/:id',
      name: 'edit-post',
      component: EditPost
    }
  ]
})
