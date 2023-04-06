import Dummy from "../pages/Dummy";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

jest.mock("next/router", () => ({
    useRouter: jest.fn(),
}));
jest.mock("../pages/DummyChild");
jest.mock("next-i18next");

describe("checking home page", () => {
    it("checking rendering of home page", () => {
        // const mockRouter = {
        //     route: "/test",
        //     query: {},
        //     asPath: "/test",
        //     push: jest.fn(),
        //     replace: jest.fn(),
        // };

        // (useRouter as jest.Mock).mockReturnValueOnce(mockRouter);

        render(<Dummy />);
        // expect(screen.getByText("Welcome")).toBeInTheDocument();
        // expect(screen.queryByText("Child Component")).not.toBeInTheDocument();
        // expect((DummyChild as jest.Mock).mock.calls).toHaveLength(1);
        expect(screen.getByText("Hello")).toBeInTheDocument();
    });
});
