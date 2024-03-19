import { dashboard, expenses, trend, user } from './icons';

export const menuItems = [
    {
        id: 1,
        title: 'Profile',
        icon: user,
        link: '/profile'
    },
    {
        id: 2,
        title: 'Dashboard',
        icon: dashboard,
        link: '/dashboard'
    },
    {
        id: 3,
        title: 'Incomes',
        icon: trend,
        link: '/incomes'
    },
    {
        id: 4,
        title: 'Expenses',
        icon: expenses,
        link: '/expenses'
    }
]