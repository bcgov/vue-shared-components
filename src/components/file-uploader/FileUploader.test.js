import FileUploader, {
  CommonImageProcessingError,
  CommonImage,
  CommonImageScaleFactorsImpl,
  CommonImageError
} from "./FileUploader.vue";
import { mount } from "@vue/test-utils";
import { render, fireEvent } from "@testing-library/vue";
import { jest } from '@jest/globals';
const fs = require('fs');
const sha1 = require('sha1');
import sampleImage from './test-files/sample-id.jpg';

function mockDropData(files) {
  return {
    dataTransfer: {
      files,
      items: files.map((file) => ({
        kind: "file",
        type: file.type,
        getAsFile: () => file,
      })),
      types: ["Files"],
    },
  };
}

const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, {type: contentType});
  return blob;
}

describe("CommonImageProcessingError", () => {
  test("creates a new instance", () => {
    const instance = new CommonImageProcessingError("error");
    expect(instance).toBeDefined();
  });
});

describe("CommonImage", () => {
  test("creates a new instance", () => {
    const instance = new CommonImage("file content");
    expect(instance).toBeDefined();
  });

  test("toJSON()", () => {
    const instance = new CommonImage("file content");
    expect(instance.toJSON()).toBeDefined();
  });
});

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

  test("drop event", async () => {
    const { container } = render(FileUploader, {
      propsData: {
        value: [],
      }
    });
    const file = new File([JSON.stringify({ test: true })], "test.json", {
      type: "application/json"
    });
    const data = mockDropData([file]);
    fireEvent.drop(container.querySelector(".dropzone"), data);
  });

  test("change event", (done) => {
    const { container } = render(FileUploader, {
      propsData: {
        value: [],
        id: 'test'
      }
    });
    const blob = new Blob(fs.readFileSync('src/components/file-uploader/test-files/sample-id.jpg'));
    const file = new File([blob], 'sample-id.jpg');
    console.log("file is File", sampleImage);
    // const file = new File([JSON.stringify({ ping: true })], "ping.json", {
    //   type: "application/json",
    // });
    const changeEventInit = {
      target: {
        files: [file]
      }
    };
    fireEvent.change(container.querySelector("#test"), changeEventInit);
    setTimeout(() => {
      done();
    }, 4000);
  });

  test("change event with empty `files` array", () => {
    const { container } = render(FileUploader, {
      propsData: {
        value: [],
        id: 'test'
      }
    });
    const changeEventInit = {
      target: {
        files: []
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

  test("checkImageExists(): false", () => {
    const wrapper = mount(FileUploader, {});
    const image = new CommonImage("file content")
    const imageExists = wrapper.vm.checkImageExists(image, []);
    expect(imageExists).toBeFalsy();
  });

  test("checkImageExists(): true", () => {
    const wrapper = mount(FileUploader, {});
    const fileContent = "file content";
    const image = new CommonImage(fileContent)
    image.id = sha1(fileContent);

    const imageExists = wrapper.vm.checkImageExists(image, [image]);
    expect(imageExists).toBeTruthy();
  });

  test("resizeImage()", () => {
    jest.mock('blueimp-load-image', () => (image, onload) => {
      onload();
    });
    const wrapper = mount(FileUploader, {});
    const fileContent = "file content";
    // const image = new CommonImage(fileContent)
    const image = document.createElement("img");
    image.src = sampleImage;
    const observer = {
      next: jest.fn()
    }
    wrapper.vm.resizeImage(
      image,
      wrapper.vm,
      new CommonImageScaleFactorsImpl(1,1),
      observer,
      0,
      true
    );
  });

  test("retryStrategy()", () => {
    const wrapper = mount(FileUploader, {});
    const error = {
      errorCode: CommonImageError.TooBig,
      pipe: jest.fn()
    }
    const callback = wrapper.vm.retryStrategy(1);
    callback(error);
  });

  test("readPDF()", (done) => {
    const wrapper = mount(FileUploader, {});
    const pdfContents = fs.readFileSync('src/components/file-uploader/test-files/sample.pdf', {encoding: 'base64'});
    const blob = b64toBlob(pdfContents, 'application/pdf');
    const pdfFile = new File([blob], 'sample.pdf');
    wrapper.vm.readPDF(
      pdfFile,
      new CommonImageScaleFactorsImpl(1,1),
      () => {
        done();
      },
      () => {
        done();
      }
    );
  });

  test("makeGrayScale()", () => {
    const wrapper = mount(FileUploader, {});
    const canvas = document.createElement('canvas');
    canvas.width = 10;
    canvas.height = 10;
    wrapper.vm.makeGrayScale(canvas);
  });

  test("handleImageFile()", () => {
    const wrapper = mount(FileUploader, {});
    const image = new CommonImage("content");
    wrapper.vm.handleImageFile(image);
  });

  test("filterError() TooBig", () => {
    const wrapper = mount(FileUploader, {});
    const error = {
      errorCode: CommonImageError.TooBig,
      image: new CommonImage("content")
    };
    wrapper.vm.filterError(error);
  });

  test("filterError() CannotOpen", () => {
    const wrapper = mount(FileUploader, {});
    const error = {
      errorCode: CommonImageError.CannotOpen,
      rawImageFile: {
        name: 'name.jpg'
      }
    };
    wrapper.vm.filterError(error);
  });

  test("filterError() CannotOpenPDF", () => {
    const wrapper = mount(FileUploader, {});
    const error = {
      errorCode: CommonImageError.CannotOpenPDF,
      image: new CommonImage("content")
    };
    wrapper.vm.filterError(error);
  });

  test("filterError() other error", () => {
    const wrapper = mount(FileUploader, {});
    const error = {
      errorCode: CommonImageError.AlreadyExists,
      image: new CommonImage("content")
    };
    expect(() => {
      wrapper.vm.filterError(error);
    }).toThrow();
  });

  test("handleError() handle empty image model", () => {
    const wrapper = mount(FileUploader, {});
    wrapper.vm.handleError(null, null, null);
  });

  test("getErrorMessage()", () => {
    const wrapper = mount(FileUploader, {});
    expect(wrapper.vm.getErrorMessage(CommonImageError.WrongType)).toBe('Wrong file type.');
    expect(wrapper.vm.getErrorMessage(CommonImageError.TooSmall)).toBe('File too small.');
    expect(wrapper.vm.getErrorMessage(CommonImageError.TooBig)).toBe('File too large.');
    expect(wrapper.vm.getErrorMessage(CommonImageError.AlreadyExists)).toBe('File already exists.');
    expect(wrapper.vm.getErrorMessage(CommonImageError.Unknown)).toBe('Unknown error.');
    expect(wrapper.vm.getErrorMessage(CommonImageError.CannotOpen)).toBe('Cannot open file.');
    expect(wrapper.vm.getErrorMessage(CommonImageError.PDFnotSupported)).toBe('This PDF file is not supported.');
    expect(wrapper.vm.getErrorMessage(CommonImageError.CannotOpenPDF)).toBe('Cannot open PDF file.');
    expect(wrapper.vm.getErrorMessage(null)).toBe('An error has occurred.');
  });

  test("deleteImage()", () => {
    const wrapper = mount(FileUploader, {});
    const image = new CommonImage("content");
    wrapper.vm.$emit('input', [image]);
    wrapper.vm.deleteImage(image);
    expect(wrapper.vm.images.length).toBe(0);
  });

  test("checkImageDimensions()", () => {
    const wrapper = mount(FileUploader, {});
    expect(wrapper.vm.checkImageDimensions({
      naturalWidth: 10,
      naturalHeight: 10
    })).toBeTruthy();

    expect(wrapper.vm.checkImageDimensions({
      naturalWidth: -10,
      naturalHeight: 10
    })).toBeFalsy();

    expect(wrapper.vm.checkImageDimensions({
      naturalWidth: 10,
      naturalHeight: -10
    })).toBeFalsy();
  });

  
});
