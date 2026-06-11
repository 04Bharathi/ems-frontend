import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import EmployeeDashboard from './pages/EmployeeDashboard'
import PrivateRoute from './utils/PrivateRoute'
import RoleBasedRoute from './utils/RoleBasedRoute'
import AdminSummary from './components/dashboard/AdminSummary'
import DepartmentList from './components/departments/DepartmentList'
import AddDepartment from './components/departments/AddDepartment'
import EmployeeList from './components/employees/EmployeeList'
import EditEmployee from './components/employees/EditEmployee'
import Add from './components/salary/Add'
import ViewSalary from './components/salary/ViewSalary'
import Summary from './components/employeeDashboard/Summary'
import ViewEmployee from './components/employees/ViewEmployee'
import LeaveList from './components/leaves/LeaveList'
import AddLeave from './components/leaves/AddLeave'
import Settings from './components/employeeDashboard/Settings'
import Leaves from './components/leaves/Leaves'
import LeaveDetails from './components/leaves/LeaveDetails'
import LeavesHistory from './components/leaves/LeavesHistory'
import HomeRedirect from './utils/HomeRedirect'
import Unauthorized from './pages/Unauthorized'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomeRedirect />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin-dashboard' element={
          <PrivateRoute>
            <RoleBasedRoute validRoles={["admin"]}>
              <AdminDashboard />
            </RoleBasedRoute>
          </PrivateRoute>
        } > 
          <Route index element={<AdminSummary />}></Route>
          <Route path='/admin-dashboard/employee' element={<EmployeeList />} />
          <Route path='/admin-dashboard/department' element={<DepartmentList />}></Route>
          <Route path='/admin-dashboard/employee/:id' element={<ViewEmployee />}></Route>
          <Route path='/admin-dashboard/employee/edit/:id' element={<EditEmployee />}></Route>
          <Route path='/admin-dashboard/salary' element={<Add />}></Route>
          <Route path='/admin-dashboard/salary/:id' element={<ViewSalary /> }></Route>
          <Route path='/admin-dashboard/leaves' element={<Leaves /> }></Route>
          <Route path='/admin-dashboard/leaves/id/:id' element={<LeaveDetails /> }></Route>
          <Route path='/admin-dashboard/leaves/history/:id' element={<LeavesHistory /> }></Route>
          <Route path='/admin-dashboard/settings' element={<Settings /> }></Route>
          <Route path="*" element={<Navigate to="/unauthorized" replace />} />
        </Route>
        <Route path='/employee-dashboard' element={
          <PrivateRoute>
            <RoleBasedRoute validRoles={["employee"]}>
              <EmployeeDashboard />
            </RoleBasedRoute>
          </PrivateRoute>
        }>
          <Route index element={<Summary />}></Route>
          <Route path='/employee-dashboard/profile/:id' element={<ViewEmployee />}></Route>
          <Route path='/employee-dashboard/leaves' element={<LeaveList />}></Route>
          <Route path='/employee-dashboard/leaves/request' element={<AddLeave />}></Route>
          <Route path='/employee-dashboard/salary/:id' element={<ViewSalary />}></Route>
          <Route path='/employee-dashboard/settings' element={<Settings />}></Route>
          <Route path="*" element={<Navigate to="/unauthorized" replace />} />

        </Route>
        <Route path="/unauthorized" element={<Unauthorized />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
