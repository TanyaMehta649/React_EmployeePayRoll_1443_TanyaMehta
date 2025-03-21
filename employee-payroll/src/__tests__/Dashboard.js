import {render,screen} from '@testing-library/react';
import Dashboard from '../components/Dashboard/Dashboard';
test("testing for payroll",()=>{
    render(<Dashboard/>);
    const one=screen.getByText(/Dashboard/);
    expect(one).toBeInTheDocument();
})