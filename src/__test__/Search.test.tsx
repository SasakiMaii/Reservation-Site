import { render,screen } from "@testing-library/react"
import PrimaryButton from "../components/Atoms/button/PrimaryButton";
import SecondryButton from "../components/Atoms/button/SecondryButton";
import {expect, test} from '@jest/globals';
import RoomPlanSearch from "../components/Templates/Search";
import { Provider } from "react-redux";
import {store} from "../../src/index";

describe("Search", () => {
  test("One Search Button", async () => {
    render(
      <Provider store={store} >
        <RoomPlanSearch />
      </Provider>
    );
    const button = await screen.findAllByRole("PrimaryButton");
    expect(button).toHaveLength(1);
  });
});

describe("test primary component",()=>{
  test("render form with 1 button",async()=>{
    render(<PrimaryButton />);
    const buttonList =await screen.findAllByRole("button")
    expect(buttonList).toHaveLength(1);
  });
})

describe("SecondaryButton",()=>{
  test("render form with 1 button",async()=>{
    render(<SecondryButton />);
    const buttonList =await screen.findAllByRole("button")
    expect(buttonList).toHaveLength(1);
  });
})
