import { render,screen } from "@testing-library/react"
import ReservateHistory, { ReservedTitle, UnReserveTitle } from "../pages/books/ReservateHistory";

describe("Test ReservateHistory Component", () => {
    test("render UnReserveTitle with 1 button", async () => {
        render(<UnReserveTitle />);
        const buttonList = await screen.findAllByRole("button");
        expect(buttonList).toHaveLength(1);
    })

    test("render ReservedTitle with 1 button", async () => {
        render(<ReservedTitle />);
        const buttonList = await screen.findAllByRole("button");
        expect(buttonList).toHaveLength(1);
    })
})
