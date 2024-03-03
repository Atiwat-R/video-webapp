import Navbar from "@/components/Navbar";
import NavbarItem from "@/components/NavbarItem";
import { fireEvent, render, screen } from "@testing-library/react";

// Mock a router
jest.mock('next/router', () => ({
    useRouter: jest.fn(() => ({
      push: jest.fn(),
    })),
  }));

describe("Navbar", () => {

    const mockData = [
        { label: 'Home', route: '/' },
        { label: 'About', route: '/' },
        { label: 'Trending', route: '/' },
        { label: 'Pages', route: '/' },
        { label: 'Clickables', route: '/' },
        { label: 'Upload', route: '/upload' },
        { label: 'UploadVideos', route: '/upload' },
    ];

    // Tests


    it("Renders correctly", () => {

        const { getByText } = render(<Navbar />)
        let textElement = getByText( 'Home' )
        expect(textElement).toBeInTheDocument()

    })



  })




// .toHaveBeenCalled(): the mock was called at least once.
// .toHaveBeenCalledTimes(): how many times the mock was called.
// .toHaveBeenCalledWith(): the mock was called with these arguments at least once.
// .toHaveBeenNthCalledWith(): the mock was called with these arguments the nth time it got called.
// .toHaveBeenLastCalledWith(): the mock was called with these arguments the last time it got called.


