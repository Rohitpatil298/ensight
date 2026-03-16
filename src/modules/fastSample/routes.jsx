import { Route } from 'react-router-dom';
import { FastSampleLayout } from './layout/FastSampleLayout';
import { AddDoctor } from './pages/AddDoctor';
import { Agreement } from './pages/Agreement';
import FastSampleDashboard from './pages/FastSampleDashboard';
import DoctorRequest from './pages/DoctorRequest';
import Users from './pages/Users';
import EditUser from './pages/EditUser';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import UserDashboard from './pages/UserDashboard';

export const fastSampleRoutes = (
  <>
  <Route path="/fast-sample/admin" element={<FastSampleLayout />}>
    <Route path="/fast-sample/admin/dashboard" element={<FastSampleDashboard />} />
    <Route path="/fast-sample/admin/products" element={<Products />} />
    <Route path="/fast-sample/admin/products/create" element={<AddProduct />} />
    <Route path="/fast-sample/admin/products/edit/:id" element={<AddProduct />} />
    <Route path="/fast-sample/admin/requests" element={<DoctorRequest />} />
    <Route path="/fast-sample/admin/user" element={<Users />} />
    <Route path="/fast-sample/admin/user/edit/:id" element={<EditUser />} />
    <Route path="/fast-sample/admin/doctors" element={<AddDoctor />} />
    <Route path="/fast-sample/admin/reports" element={<Agreement />} />
  </Route>
  <Route path="/fast-sample/user" element={<FastSampleLayout />}>
    <Route path="dashboard" element={<UserDashboard />} />
  </Route>
  </>
);
