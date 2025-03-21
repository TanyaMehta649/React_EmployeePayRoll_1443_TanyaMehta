

describe('employee payroll registration',()=>{
    test('renders ',()=>{
        render(<EmployeePayrollRegistration/>);
        const text=screen.getByText(/Employee Registration/);
        expect(text).toBeInTheDocument();
    })
})