'use strict'

import Vue from 'vue';
import template from './<%= name %>.template.html';

const <%= nameCapitalized %>Component = Vue.extend({
  template,
  props: {
    title: String
  }
});

// Register component
Vue.component('<%= name %>', <%= nameCapitalized %>Component);

export default <%= nameCapitalized %>Component;
