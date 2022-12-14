import { render, screen } from "@testing-library/react"
import { Login } from "../pages/users/Login"
import { Provider } from "react-redux";
import { store } from "../index";


describe("Test Login Component", () => {
  test("render form with 1 button", async () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    const buttonList = await screen.findAllByRole("button");
    expect(buttonList).toHaveLength(1);
  });
});
