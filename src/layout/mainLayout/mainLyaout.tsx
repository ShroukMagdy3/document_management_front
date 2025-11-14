import React from 'react'
import SideBar from '../../components/sidebar/sideBar';
import { Outlet } from 'react-router-dom';


export default function MainLayout() {
  return (
    <div className="flex ">
      <SideBar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}