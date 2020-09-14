import Alert from "./Alert.vue";
import CheckboxMarked from "mdi-vue/CheckboxMarked.vue";
import { mount } from "@vue/test-utils";

describe("Alert component", () => {
  test("matches the success snapshot", () => {
    const wrapper = mount(Alert, {
      propsData: {
        styling: "bcgov-success-background",
        element: "This is a success message!",
        alertType: "success",
        icon: CheckboxMarked,
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
