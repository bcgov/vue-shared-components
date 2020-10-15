import Thumbnail from "./Thumbnail.vue";
import { mount } from "@vue/test-utils";
import { render, fireEvent } from "@testing-library/vue";
import { jest } from '@jest/globals';

describe("Thumbnail component", () => {
  
  test("matches the success snapshot", () => {
    const image = {
      naturalWidth: 100,
      naturalHeight: 100
    };
    const wrapper = render(Thumbnail, {
      props: {
        imageObject: image
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("large scalled width", () => {
    const image = {
      naturalWidth: 1000,
      naturalHeight: 100
    };
    const wrapper = render(Thumbnail, {
      props: {
        imageObject: image,
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("small scalled width", () => {
    const image = {
      naturalWidth: 100,
      naturalHeight: 1000
    };
    const { container } = render(Thumbnail, {
      props: {
        imageObject: image,
      }
    });
  });

  test("NaN scalled width", () => {
    const image = {
      naturalWidth: undefined,
      naturalHeight: 1000
    };
    const { container } = render(Thumbnail, {
      props: {
        imageObject: image,
      }
    });
  });
  
  test("delete event", () => {
    const image = {
      naturalWidth: 100,
      naturalHeight: 100
    };
    const { container } = render(Thumbnail, {
      props: {
        imageObject: image,
      }
    });
    fireEvent.click(container.querySelector(".action-strip a"));
  });

});
