import React from 'react';
import { Router, Route } from 'react-router';
import Cars from './views/cars';
import Owners from './views/owners';
import Statistics from './views/statistics';
import AddOwner from './components/addOwner';
import DetailedInfo from './components/detailedInfo'

const routes = [
    {
        path: '/cars',
        component: Cars,
    },
    {
        path: '/owners',
        component: Owners,
        routes: [
            {
                path: '/owners/add',
                component: AddOwner
            },
            {
                path: '/owners/:id',
                component: DetailedInfo
            },
        ]
    },
    {
        path: '/statistics',
        component: Statistics,
    }
]