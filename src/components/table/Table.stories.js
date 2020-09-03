import Table from "./Table.vue";
import { getTableElementsTestData } from "../../modules/tableTestData.js";

export default {
  title: 'Table',
  component: Table,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Table },
  template: '<Table v-bind="$props" />',
});

const header = "BCeID Info";
const tableData = getTableElementsTestData();

export const WithHeader = Template.bind({});
WithHeader.args = {
  heading: header,
  elements: tableData,
};
