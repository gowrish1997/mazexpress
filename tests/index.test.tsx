import Home from "../pages/index";
import { useRouter } from "next/router";
import Footer from "@/components/LandingPage/Footer";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

jest.mock("next/router", () => ({
    useRouter: jest.fn(),
}));
jest.mock("@/components/LandingPage/About");
jest.mock("@/components/LandingPage/Service");
jest.mock("@/components/LandingPage/ShipmentCostCalculator");
jest.mock("@/components/LandingPage/MazCommunityForm");
jest.mock("@/components/LandingPage/Footer");
jest.mock("../public/locales/en/common.json",
 () => ({
    useTranslation: () => ({
        t: (key: string) => key,
        i18n: { language: "en" },
    }),
}));

describe("checking home page", () => {
    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({ locale: "en" });
    });
    afterEach(() => {
        (useRouter as jest.Mock).mockReset();
    });

    it("checking rendering of home page", () => {
        // const mockRouter = {
        //     route: "/test",
        //     query: {},
        //     asPath: "/test",
        //     push: jest.fn(),
        //     replace: jest.fn(),
        // };

        // (useRouter as jest.Mock).mockReturnValueOnce(mockRouter);
        render(<Home />);
        // expect(screen.getByText("Welcome")).toBeInTheDocument();
        // expect(screen.queryByText("Child Component")).not.toBeInTheDocument();
        expect(screen.getByText("Welcome to MAZ Express")).toBeInTheDocument();
    });
});
