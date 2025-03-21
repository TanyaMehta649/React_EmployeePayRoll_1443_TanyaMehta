import {render , screen} from '@testing-library/react';
import Dashboard from '../components/Dashboard/Dashboard';
import NavBar from '../components/NavBar/NavBar';
describe('test cases for navbar',()=>{
    test('renders Employee' , () =>{
        render(<Dashboard />);
        const linkElement = screen.getByText(/EMPLOYEE/i);
        expect(linkElement).toBeInTheDocument();
    });
    
    test('renders PayRoll' , () =>{
        render(<Dashboard />);
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
