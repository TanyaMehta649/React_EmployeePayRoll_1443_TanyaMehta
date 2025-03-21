import {render , screen} from '@testing-library/react';

describe('employee payroll registration',()=>{
    test('renders ',()=>{
        render(<EmployeePayrollRegistration/>);
        const text=screen.getByText(/Employee Payroll Registration/);
        expect(text).toBeInTheDocument();
    })
})