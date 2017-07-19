import Vue from 'vue';
import { mapGetters } from 'vuex';

export const EntryComponent = Vue.component('entry', {
  template:
`<div class="entry">
    <entry-field
        v-for="(fieldobj, index) in images[0].records[0].fields"
        :key="index"
        :fieldobj="fieldobj"
        :properties="template(0)">
    </entry-field>
</div>`,

  computed: {
      ...mapGetters([
          'images',
          'template'
      ])
  },
  methods: {
    doThis() {
      // console.log(this.template(0))
      // console.log(this.$store.state.template);
      // console.log(this.images[0].records)
    }
  }
});