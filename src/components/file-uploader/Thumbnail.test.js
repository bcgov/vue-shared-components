import Thumbnail from "./Thumbnail.vue";
import { render, fireEvent } from "@testing-library/vue";

function getImage(width, height) {
  return {
    naturalWidth: width,
    naturalHeight: height
  };
}

describe("Thumbnail component", () => {
  
  test("matches the success snapshot", () => {
    const image = getImage(100, 100);
    const wrapper = render(Thumbnail, {
      props: {
        imageObject: image
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("large scalled width", () => {
    const image = getImage(1000, 100);
    const wrapper = render(Thumbnail, {
      props: {
        imageObject: image,
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("small scalled width", () => {
    const image = getImage(100, 1000);
    const wrapper = render(Thumbnail, {
      props: {
        imageObject: image,
      }
    });
  });

  test("NaN scalled width", () => {
    const image = getImage(undefined, 1000);
    const wrapper = render(Thumbnail, {
      props: {
        imageObject: image,
      }
    });
  });
  
  test("delete event", () => {
    const image = getImage(100, 100);
    const { container } = render(Thumbnail, {
      props: {
        imageObject: image,
      }
    });
    fireEvent.click(container.querySelector(".action-strip a"));
  });
});
