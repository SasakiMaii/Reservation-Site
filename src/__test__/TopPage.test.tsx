import { async } from "@firebase/util";
import { render, screen } from "@testing-library/react"
import RoomsIntroduction from "../components/Organisms/RoomIntroductionSection";

test('renders learn react link', () => {
  render(<RoomsIntroduction />);
  const linkElement = screen.getByText(/紹介/i);
  expect(linkElement).toBeInTheDocument();
});
