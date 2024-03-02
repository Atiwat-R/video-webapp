import NavbarItem from "@/components/NavbarItem";
import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from 'next/router';

// Mock a router
jest.mock('next/router', () => ({
    useRouter: jest.fn(() => ({
      push: jest.fn(),
    })),
  }));

  describe("NavbarItems", () => {

    const mockData = [
        { label: 'Home', route: '/' },
        { label: 'About', route: '/' },
        { label: 'Trending', route: '/' },
        { label: 'Pages', route: '/' },
        { label: 'Clickables', route: '/' },
    ];


    test("Rendering NavbarItem", () => {
      mockData.forEach((item) => {
        render(<NavbarItem 
            label={ item.label }
            route={ item.route }
        />)
        let textElement = screen.getByText( item.label )
        expect(textElement).toBeInTheDocument()
      })
    })

    // it('should navigate to the correct route when clicked', () => {
    //   const mockPush = jest.fn();
  
    //   const label = 'Home';
    //   const route = '/home';
  
    //   const { getByText } = render(<NavbarItem label={label} route={route} />);
  
    //   // Simulate click
    //   fireEvent.click(getByText(label));
  
    //   // Expect push to have been called with the correct route
    //   expect(mockPush).toHaveBeenCalledWith(route);
    // });


// for (let i=0 ; i<mockData.length ; i++) {
//   render(<NavbarItem 
//       label={ mockData[i].label }
//       route={ mockData[i].route }
//   />)
//   let textElement = screen.getByText( mockData[i].label )
//   expect(textElement).toBeInTheDocument()
// }

  //   test("NavbarItem Links", () => {
  //       for (let i=0 ; i<mockData.length ; i++) {
  //           render(<NavbarItem 
  //               label={ mockData[i].label }
  //               route={ mockData[i].route }
  //           />)

  //           const mockPush = jest.fn();
  //           jest.mocked('next/router').mockReturnValue({ push: mockPush });

  //           const navItem = screen.getByText("/Home/i");
  //           fireEvent.click(navItem);

  //           expect(mockPush).toHaveBeenCalledWith('/home');
  //       }
  //   })

  })



//   test("Rendering NavbarItem", () => {
//     render(<NavbarItem label='Home' />)
//     const textElement = screen.getByText("Home")
//     expect(textElement).toBeInTheDocument()
// })


// .toHaveBeenCalled(): the mock was called at least once.
// .toHaveBeenCalledTimes(): how many times the mock was called.
// .toHaveBeenCalledWith(): the mock was called with these arguments at least once.
// .toHaveBeenNthCalledWith(): the mock was called with these arguments the nth time it got called.
// .toHaveBeenLastCalledWith(): the mock was called with these arguments the last time it got called.