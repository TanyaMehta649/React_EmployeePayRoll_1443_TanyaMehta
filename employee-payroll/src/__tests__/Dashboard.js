import {render,screen} from '@testing-library/react';
import Dashboard from '../components/Dashboard/Dashboard';
test("testing for payroll",()=>{
    render(<Dashboard/>);
    const one=screen.getByText(/Dashboard/);
    expect(one).toBeInTheDocument();
})
test("testing for image",()=>{
    render(<NavBar/>);
    const img=screen.getByAltText("logo");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src","logo.png");
    const navbartext=screen.getByText(/EMPLOYEE PAYROLL/);
    expect(navbartext).toBeInTheDocument();
})
