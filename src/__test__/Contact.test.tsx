import { render,screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom";
import Contact from "../pages/books/Contact";

describe("Test Contact Component", () => {
    test("render form with 3 button", async () => {
        render(<BrowserRouter><Contact /></BrowserRouter>);
        const buttonList = await screen.findAllByRole("button");
        expect(buttonList).toHaveLength(4);
    })
})
