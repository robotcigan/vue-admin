<template lang="jade">
  .main-header
    header
      nav.navbar.navbar-default
        .container
          .navbar-header
            button.navbar-toggle.collapsed(type='button', data-toggle='collapse', data-target='#bs-example-navbar-collapse-1', aria-expanded='false')
              span.sr-only Toggle navigation
              span.icon-bar
              span.icon-bar
              span.icon-bar
            a.navbar-brand(href='#') Админка
          #bs-example-navbar-collapse-1.collapse.navbar-collapse
            ul.nav.navbar-nav
              li(v-for="navLink in navLinks" active-class="active")
                router-link(:to="{ path: '/admin/' + navLink.to }") {{ navLink.title }}
</template>

<script>
  export default {
    name: 'admin-header',
    data: function() {
      return {
        navLinks: [
          { title: "Постики", to: '' },
          { title: "Новый пост", to: 'add-new-post' }
        ]
      }
    }
  }
</script>

<style scoped></style>