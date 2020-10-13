import FileUploader from "./FileUploader.vue";
import { mount } from "@vue/test-utils";

describe("FileUploader component", () => {
  test("matches the success snapshot", () => {
    const wrapper = mount(FileUploader, {
      propsData: {}
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
