import FileUploader from "./FileUploader.vue";
import { mount } from "@vue/test-utils";
import { render, fireEvent } from "@testing-library/vue";
import {jest} from '@jest/globals';



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
    //const image = new Image(1,1);
    //const blob = dataURItoBlob('data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==');
    const blob = null;
    const changeEventInit = {
      target: {
        files: [new File([blob], 'test.jpg')]
      }
    };
    // const observableFromFilesSpy = jest.spyOn(FileUploader.methods, 'observableFromFiles');
    // const checkImageExistsSpy = jest.spyOn(FileUploader.methods, 'checkImageExists');
    
    fireEvent.change(container.querySelector("#test"), changeEventInit);
    // expect(observableFromFilesSpy).toHaveBeenCalled();
    // expect(checkImageExistsSpy).toHaveBeenCalled();
  });
});
