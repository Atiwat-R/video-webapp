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


    // Tests

    it("Renders correctly", () => {
        const { getByText, getByTestId } = render(<Navbar />)

        // Component renders
        const navbar = getByTestId('navbar')
        expect(navbar).toBeInTheDocument()

        // Text renders
        const textElement = getByText( 'Home' )
        expect(textElement).toBeInTheDocument()
    })

    it('Should toggle mobile menu visibility when clicked', () => {
        const { getByText, getByTestId } = render(<Navbar />);

        // Click Browse, show MobileMenu
        const browseButton = getByText('Browse');
        fireEvent.click(browseButton);
    
        // Test if MobileMenu renders
        const mobileMenu = getByTestId('mobile-menu');
        expect(mobileMenu).toBeInTheDocument();
    
        // Close it, MobileMenu should be gone
        fireEvent.click(browseButton);
        expect(mobileMenu).not.toBeInTheDocument();
    });

    it('Should toggle account menu visibility when clicked', () => {
      const { getByTestId } = render(<Navbar />);

      // Click and open AccountMenu
      const accountMenuButton = getByTestId('account-menu-button');
      fireEvent.click(accountMenuButton);
  
      // Test if it renders
      const accountMenu = getByTestId('account-menu');
      expect(accountMenu).toBeInTheDocument();
  
      // Click to close, should disappear
      fireEvent.click(accountMenuButton);
      expect(accountMenu).not.toBeInTheDocument();
    });

    it('Default background when not scrolling', () => {
        const { container } = render(<Navbar />);
        const navbar = container.firstChild?.firstChild; // Background-changing code is in the second layer

        // This code portion change background, should not be in className when not scrolling
        expect(navbar).not.toHaveClass('bg-zinc-900 bg-opacity-90');
    })
    
    it('Change background when scrolling', () => {
        const { container } = render(<Navbar />);
        const navbar = container.firstChild?.firstChild; // Background-changing code is in the second layer
    
        // Simulate scrolling past the defined TOP_OFFSET
        window.scrollY = 100;
        fireEvent(window, new Event('scroll'));
        expect(navbar).toHaveClass('bg-zinc-900 bg-opacity-90');
    
        // Simulate scrolling back to the top
        window.scrollY = 0;
        fireEvent(window, new Event('scroll'));
        expect(navbar).not.toHaveClass('bg-zinc-900 bg-opacity-90');
    });



  })




// .toHaveBeenCalled(): the mock was called at least once.
// .toHaveBeenCalledTimes(): how many times the mock was called.
// .toHaveBeenCalledWith(): the mock was called with these arguments at least once.
// .toHaveBeenNthCalledWith(): the mock was called with these arguments the nth time it got called.
// .toHaveBeenLastCalledWith(): the mock was called with these arguments the last time it got called.


