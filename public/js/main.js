
var Posts = {
  template: '<div><h1>Постики</h1></div>'
}

var addNewPost = {
  template: '<div><h1>Добававть новый пост</h1></div>'
}

var routes = [
  { path: '/posts', component: Posts },
  { path: '/addNewPost', component: addNewPost }
]

router = new VueRouter({
  routes: routes
})

Vue.component('admin-nav', {
  template: `
    <ul class="nav nav-tabs">
      <li class="nav-item" v-for="navLink in navLinks">
        <router-link
          :to="{ path: navLink.to }"
          class="nav-link"
          active-class="active">
            {{ navLink.title }}
        </router-link>
      </li>
    </ul>`,
  data: function() {
    return {
      navLinks: [
        { title: "Постики", to: 'posts' },
        { title: "Новый пост", to: 'addNewPost' }
      ],
      test: "test"
    }
  }
})

var vm = new Vue({
  router: router
}).$mount('#app')