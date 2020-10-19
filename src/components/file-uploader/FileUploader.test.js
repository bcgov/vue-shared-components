import FileUploader from "./FileUploader.vue";
import { mount } from "@vue/test-utils";
import { render, fireEvent } from "@testing-library/vue";
import { jest } from '@jest/globals';
const fs = require('fs');

describe("FileUploader component", () => {
  test("matches the success snapshot", () => {
    const wrapper = mount(FileUploader, {});
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("dragover event", () => {
    const { container } = render(FileUploader, {
      propsData: {
        value: [],
      }
    });
    fireEvent.dragOver(container.querySelector(".dropzone"));
  });

  test("drop event", () => {
    const { container } = render(FileUploader, {
      propsData: {
        value: [],
      }
    });
    const dragEventInit = {
      dataTransfer: {}
    };
    fireEvent.drop(container.querySelector(".dropzone"), dragEventInit);
  });

  test("change event", () => {
    const { container } = render(FileUploader, {
      propsData: {
        value: [],
        id: 'test'
      }
    });
    const blob = new Blob(fs.readFileSync('src/components/file-uploader/test-files/sample-id.jpg'));
    const file = new File([blob], 'sample-id.jpg');
    const changeEventInit = {
      target: {
        files: [file]
      }
    };
    fireEvent.change(container.querySelector("#test"), changeEventInit);
  });

  test("Click `add` button.", () => {
    const { container } = render(FileUploader, {
      propsData: {
        value: [],
        id: 'test'
      }
    });
    fireEvent.click(container.querySelector("a.common-thumbnail"));
  });
});
