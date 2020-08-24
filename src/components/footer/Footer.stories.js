// import Footer from "./Footer.vue";

// const Template = () => ({
//   components: { Footer },
//   template: "<Footer />",
// });

// export const Default = Template.bind({});



import Footer from "./Footer.vue";

export default {
  title: 'Footer',
  component: Footer,
};

const Template = (args, { argTypes }) => ({
  components: { Footer },
  template: '<Footer />',
});

export const Basic = Template.bind({});
