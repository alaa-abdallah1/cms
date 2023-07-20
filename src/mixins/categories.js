// import Vue from "vue";

export const categories = {
  data: () => ({
    categoriesItems: []
  }),
  methods: {
    fetchAllCategories() {
      return new Promise(resolve => {
        let allCategories = []
        this.fetchCategoriesPerPage(1).then(({categories, pages}) => {
          allCategories = categories
          let promises = []

          for (let page = 2; page <= pages; page++) {
            promises.push(this.fetchCategoriesPerPage(page))
          }

          Promise.all(promises).then(data => {
            data.forEach(({categories}) => {
              allCategories = [...allCategories, ...categories]
            })
            resolve(allCategories)
          })
        })
      })
    },
    fetchCategoriesPerPage(page) {
      return new Promise((resolve, reject) => {
        this.axios
          .get('/categories', {
            params: {
              page
            }
          })
          .then(({data}) => {
            resolve({
              categories: data.data,
              pages: Math.ceil(data.meta.total / data.meta.per_page)
            })
          })
          .catch(reject)
      })
    }
  },
  created() {
    this.loader = true
    this.fetchAllCategories().then(allCategories => {
      this.categoriesItems = allCategories
      this.loader = false
    })
  }
}
