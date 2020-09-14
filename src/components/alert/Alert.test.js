import Alert from "./Alert.vue";
import CheckboxMarked from "mdi-vue/CheckboxMarked.vue";
import { render } from "@testing-library/vue";

describe("Alert component", () => {
  test("matches the success snapshot", () => {
    const { asFragment } = render(Alert, {
      props: {
        styling: "bcgov-success-background",
        element: "This is a success message!",
        alertType: "success",
        icon: CheckboxMarked,
      }
    });

    expect(asFragment).toMatchSnapshot();
  });
});
