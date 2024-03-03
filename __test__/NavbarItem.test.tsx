import NavbarItem from "@/components/NavbarItem";
import { fireEvent, render, screen } from "@testing-library/react";

// Mock a router
jest.mock('next/router', () => ({
    useRouter: jest.fn(() => ({
      push: jest.fn(),
    })),
  }));

describe("NavbarItem", () => {

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
        mockData.forEach((item) => {
        const { getByText } = render(<NavbarItem 
            label={ item.label }
            route={ item.route }
        />)
        let textElement = getByText( item.label )
        expect(textElement).toBeInTheDocument()
      })
    })

    it('Navigate to the specified route when clicked', () => {
        mockData.forEach((item) => {
        const pushMock = jest.fn(); // Mock func to mock router.push

        const useRouterMock = jest.spyOn(require('next/router'), 'useRouter').mockReturnValue({
          push: pushMock,
        });

        // Render in virtual DOM 
        const { getByText } = render(<NavbarItem label={item.label} route={item.route} />);

        // simulate clicking
        const toClick = getByText(item.label);
        fireEvent.click(toClick); 
    
        // Assert
        expect(pushMock).toHaveBeenCalledWith(item.route);
        useRouterMock.mockRestore();
      })
    });

    it('Navigate to default route when route is not specified', () => {
        mockData.forEach((item) => {
        const pushMock = jest.fn(); // Mock func to mock router.push

        const useRouterMock = jest.spyOn(require('next/router'), 'useRouter').mockReturnValue({
          push: pushMock,
        });

        // Render in virtual DOM 
        const { getByText } = render(<NavbarItem label={item.label} />);

        // simulate clicking
        const toClick = getByText(item.label);
        fireEvent.click(toClick); 
    
        // Assert
        expect(pushMock).toHaveBeenCalledWith('/');
        useRouterMock.mockRestore();
      })
    });

  })




// .toHaveBeenCalled(): the mock was called at least once.
// .toHaveBeenCalledTimes(): how many times the mock was called.
// .toHaveBeenCalledWith(): the mock was called with these arguments at least once.
// .toHaveBeenNthCalledWith(): the mock was called with these arguments the nth time it got called.
// .toHaveBeenLastCalledWith(): the mock was called with these arguments the last time it got called.


// it("Renders correctly", () => {
//   mockData.forEach((item) => {
//     render(<NavbarItem 
//         label={ item.label }
//         route={ item.route }
//     />)
//     let textElement = screen.getByText( item.label )
//     expect(textElement).toBeInTheDocument()
//   })
// })

// const pushMock = jest.fn();
// const useRouterMock = jest.spyOn(require('next/router'), 'useRouter').mockReturnValue({
//   push: pushMock,
// });

// const label = 'Home';

// const { getByText } = render(<NavbarItem label={label} />);

// const item = getByText(label);

// fireEvent.click(item);

// expect(pushMock).toHaveBeenCalledWith('/');

// useRouterMock.mockRestore();