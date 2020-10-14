import FileUploader from "./FileUploader.vue";

export default {
  title: 'FileUploader',
  component: FileUploader,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FileUploader },
  template: '<FileUploader v-bind="$props"></FileUploader>',
});

export const Example = Template.bind({});
