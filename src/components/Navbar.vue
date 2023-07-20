<template>
  <v-card>
    <v-app-bar color="#fff" flat app>
      <v-app-bar-nav-icon
        @click="drawer = true"
        class="d-sm-none d-flex"
      ></v-app-bar-nav-icon>

      <v-toolbar-title class="font-weight-bold">CMS</v-toolbar-title>

      <v-spacer></v-spacer>

      <router-link
        v-for="(link, index) in links"
        :key="index"
        :to="{name: link.routeName}"
        class="d-sm-flex d-none"
      >
        <v-btn class="font-weight-light py-6 rounded-0" text>
          {{ link.text }}
        </v-btn>
      </router-link>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
      class="d-sm-none d-flex"
    >
      <v-list nav dense flat>
        <v-list-item-group>
          <v-list-item
            v-for="(link, index) in links"
            :key="index"
            router
            :to="{name: link.routeName}"
          >
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    links: [
      {
        text: 'Customers',
        routeName: 'customers',
      },
      {
        text: 'Categories',
        routeName: 'categories',
      },
      {
        text: 'Products',
        routeName: 'products',
      },
    ],
  }),
  methods: {
    replace() {
      this.$router.replace('products')
    },
  },
}
</script>

<style>
.active {
  background: #fff !important;
}
</style>
