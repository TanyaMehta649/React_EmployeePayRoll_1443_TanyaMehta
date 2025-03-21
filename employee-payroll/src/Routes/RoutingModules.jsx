import React from 'react';

import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

import DashBoardContainer from '../pages/DashBoardContainer';
import Registration from '../pages/Registration';
import HomePage from '../components/HomePage/HomePage';
export default function RoutingModule() {

    const route = createBrowserRouter([
      
        {
            path:'homepage',
            element: (
              
                    <HomePage/>
            
            ),
            children:[
                {
                    path:'dashboard',
                    element:<DashBoardContainer/>
                },
                {
                    path:'register',
                    element:<Registration/>
                }
            ]
        }
    ]);
  return (
        <RouterProvider router={route} />
  )
}