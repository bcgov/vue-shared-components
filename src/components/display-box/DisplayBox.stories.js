import DisplayBox from "./DisplayBox.vue";
import DisplayBoxTestData from "../../modules/DisplayBoxTestData.vue";
import Account from 'mdi-vue/Account.vue';

export default {
  title: 'DisplayBox',
  component: DisplayBox,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { DisplayBox },
  template: '<DisplayBox v-bind="$props" />',
});

export const WithoutIcon = Template.bind({});
WithoutIcon.args = {
  element: DisplayBoxTestData,
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  icon: Account,
  element: DisplayBoxTestData,
};

export const WithBlueBackground = Template.bind({});
WithBlueBackground.args = {
  icon: Account,
  element: DisplayBoxTestData,
  styling: "bcgov-blue-background",
};

export const WithBorder = Template.bind({});
WithBorder.args = {
  icon: Account,
  element: DisplayBoxTestData,
  styling: "bcgov-border-background",
};
