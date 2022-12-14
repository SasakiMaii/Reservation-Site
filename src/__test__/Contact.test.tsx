import { async } from "@firebase/util";
import { render, screen } from "@testing-library/react"
import { Login } from "../pages/users/Login"
import { Provider } from "react-redux";
import { store } from "../index";
import Contact from "../pages/books/Contact";
import { BrowserRouter } from "react-router-dom";

describe("Test Contact Component", () => {
  test('renders learn ', () => {
    render(
      <BrowserRouter>
        <Contact />
      </BrowserRouter>
    );
    const linkElement = screen.getByText(/よくあるご質問/i);
    expect(linkElement).toHaveLength(2);
  });
});
