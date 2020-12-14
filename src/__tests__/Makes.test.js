import { render, screen, cleanup } from "@testing-library/react";
import Makes from "../components/molecules/Makes";
import React from "react";

afterEach(cleanup);

it("renders the main title", () => {
    render(<Makes />);
    const textElement = screen.getByText(/Please choose the manufacturer:/i);
    expect(textElement).toBeInTheDocument();
});
