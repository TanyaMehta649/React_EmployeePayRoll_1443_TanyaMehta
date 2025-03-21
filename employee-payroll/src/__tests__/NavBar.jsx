import {render , screen} from '@testing-library/react';
import NavBar from '../components/NavBar/NavBar';
describe('test cases for navbar',()=>{
    test('renders Employee' , () =>{
        render(<NavBar />);
        const linkElement = screen.getByText(/EMPLOYEE/i);
        expect(linkElement).toBeInTheDocument();
    });
    
    test('renders PayRoll' , () =>{
        render(<NavBar />);
        const linkElement = screen.getByText(/PAYROLL/i);
        expect(linkElement).toBeInTheDocument();
    });
    
    test("Image should render properly", () => {
        render(<NavBar />);
        const imgElement = screen.getByAltText("Company Logo"); 
        expect(imgElement).toBeInTheDocument();
        expect(imgElement).toHaveAttribute("src" , "logo.jpg"); 
      });
})
