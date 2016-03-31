'use strict'

import Vue from 'vue';
import template from './<%= name %>.template.html';

const <%= nameCapitalized %>Component = Vue.extend({
  template,
  props: {
    title: String
  }
});

export default <%= nameCapitalized %>Component;
