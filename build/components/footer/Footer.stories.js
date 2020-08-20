import Footer from "./Footer.vue";

var Template = function Template() {
  return {
    components: {
      Footer: Footer
    },
    template: "<Footer />"
  };
};

export var Default = Template.bind({});