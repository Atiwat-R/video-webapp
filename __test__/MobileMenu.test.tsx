import MobileMenu from "@/components/MobileMenu";
import { fireEvent, render, screen } from "@testing-library/react";

// Mock a router
jest.mock('next/router', () => ({
    useRouter: jest.fn(() => ({
      push: jest.fn(),
    })),
  }));

describe("MobileMenu", () => {

    // Tests

    it("Renders correctly when visible = true", () => {
        const { getByText } = render(<MobileMenu 
            visible={true}
        />)
        let textElement = getByText( 'Home' )
        expect(textElement).toBeInTheDocument()
    })

    it("Does not render when visible = false", () => {
        const { queryByText } = render(<MobileMenu 
            visible={false}
        />)
        let textElement = queryByText( 'Home' )
        expect(textElement).not.toBeInTheDocument()
    })

    it('Navigate to the specified route when clicked', () => {
        const pushMock = jest.fn(); // Mock func to mock router.push

        const useRouterMock = jest.spyOn(require('next/router'), 'useRouter').mockReturnValue({
            push: pushMock,
        });

        // Render in virtual DOM 
        const { getByText } = render(<MobileMenu visible={true} />);

        // simulate clicking
        const toClick = getByText("Upload");
        fireEvent.click(toClick); 
    
        // Assert
        expect(pushMock).toHaveBeenCalledWith("/upload");
        useRouterMock.mockRestore();
    });



  })

