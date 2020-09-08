import DisplayBox from "./DisplayBox.vue";
import DisplayBoxTestData from "../../modules/DisplayBoxTestData.vue";
import Table from "../table/Table.vue";

export default {
  title: 'DisplayBox',
  component: DisplayBox,
};

const elements = [
  {
    name: (
      <p style={{ width: "80%" }}>
        This is the content on the left of the display box. Maybe there will be
        other content on the right too.
      </p>
    ),
    value: (
      <p style={{ width: "80%" }}>
        This is the content on the right of the display box. There already is
        content on the left side of the box.
      </p>
    ),
    isSideBySide: true,
  },
];

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { DisplayBox },
  template: '<DisplayBox v-bind="$props" />',
});

export const WithoutIcon = Template.bind({});
WithoutIcon.args = {
  element: DisplayBoxTestData,
};

export const WithSideBySideContent = Template.bind({});
WithSideBySideContent.args = {
  styling: "bcgov-display-left-element",
  element: 
};
