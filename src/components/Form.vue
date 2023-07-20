<template>
  <div>
    <!-- show while data loading -->
    <Loader :loading="loader" />
    <!-- popup shows after customer created -->
    <Popup :popup="popupData" />

    <v-form @submit.prevent="submit">
      <v-container>
        <v-row>
          <v-col
            v-for="(field, index) in computedFields"
            :key="index"
            :md="field.width.md"
            :cols="field.width.col"
          >
            <component
              :is="field.component"
              :label="field.label"
              :name="field.key"
              v-model="field.value"
              v-bind="field.bindOptions"
              dense
            ></component>

            <span v-for="(value, name, index) in errors" :key="index">
              <span v-if="field.key === name" class="error--text">{{
                value[0]
              }}</span>
            </span>
          </v-col>
          <v-col v-if="btnForm" :col="btnForm.width ? btnForm.width : '12'">
            <v-btn
              :color="btnForm.color ? btnForm.color : 'primary'"
              type="submit"
              v-bind="btnForm.bindOptions"
              class="mt-1"
              small
            >
              <v-icon v-if="btnForm" class="mr-2" small>{{
                btnForm.icon
              }}</v-icon>
              {{ btnForm.text ? btnForm.text : "" }}
            </v-btn>
          </v-col>
          <v-col v-else col="12">
            <v-btn color="primary" type="submit" class="mt-4" small>
              send
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import { VTextField, VSelect } from "vuetify/es5/components";
import DatePicker from "@/components/DatePicker";
export default {
  props: {
    fields: {
      type: Array,
      required: true,
    },
    request: {
      type: Object,
      required: true,
    },
    btnForm: {
      type: Object,
    },
    popup: {
      type: Object,
    },
  },
  components: {
    VTextField,
    VSelect,
    DatePicker,
  },
  data() {
    return {
      data: this.fields,
      errors: {},
    };
  },
  computed: {
    computedData() {
      return this.data.reduce((data, { value, key }) => {
        data[key] = value;

        return data;
      }, {});
    },
    computedFields() {
      return this.data.filter(({ show }) => {
        if ([true, false].includes(show)) {
          return show;
        } else if (show && show.constructor === Function) {
          return show(this.computedData);
        }
        return true;
      });
    },
  },
  methods: {
    submit() {
      // Let loader works
      this.loader = true;
      // send xmlHttpRequest using axios
      this.axios({
        method: this.request.method,
        url: this.url(this.computedData),
        data: this.computedData,
      })
        .then(({ data }) => {
          /*
           * if response is successed fire this event
           * you can listen on event on parent to show your data
           */
          this.errors = {};
          this.$emit("success", data);
          // stop Loader
          this.loader = false;
          //show popup
          // this.popupData = {
          //   show: this.popup.show,
          //   text: this.popup.text
          // }
        })
        .catch(({ response }) => {
          /*
           * if response is failed fire this event
           * you can listen on event on parent to show your errors
           */
          this.$emit("error", response.data.errors);
          this.errors = response.data.errors;
          this.loader = false;
        });
    },
    url(data) {
      var url = this.request.url; // main url
      // if this form uses to search bulid this query
      if (this.request.type === "search") {
        // first concat ?
        url += this.request.url.includes("?") ? "&" : "?";
        // loop inside data object to get keys && values
        for (const key in data) {
          // concat the query
          if (data[key] !== null) {
            url += `filter[${key}]=${data[key]}&`;
          }
        }
        //remove && from the last query
        url += "sort=-created_at";
      }
      // return url to use it to get data
      return url;
    },
  },
  watch: {
    fields: {
      // This will let Vue know to look inside the array
      deep: true,

      // We have to move our method to a handler field
      handler() {
        this.data = this.fields;
      },
    },
  },
};
</script>
