export const adminMenu = [
    //manage user
    {
        name: 'menu.admin.manage-user', menus: [
            {
                name: 'menu.admin.crud', link: '/system/user-manage'
            },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                // ]
            },
            {
                name: 'menu.admin.manage-doctor', link: '/system/manage-doctor'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                // ]
            },
            //manage schedule
            {
                name: 'Quản lí lịch khám', link: '/doctor/manage-schedule'
            }

        ]
    },
    //manage-clinic
    {
        name: 'menu.admin.clinic', menus: [
            {
                name: 'menu.admin.manage-clinic', link: '/system/clinic-manage'
            },
        ]
    },
    //manage-specialty
    {
        name: 'menu.admin.specialty', menus: [
            {
                name: 'menu.admin.manage-specialty', link: '/system/specialty-manage'
            },
        ]
    },
    //manage-handbook
    {
        name: 'menu.admin.handbook', menus: [
            {
                name: 'menu.admin.manage-handbook', link: '/system/handbook-manage'
            },
        ]
    }
];

export const doctorMenu = [
    //manage schedule
    {
        name: 'menu.doctor.manage-schedule', menus:
            [
                {
                    name: 'Quản lí lịch khám', link: '/doctor/manage-schedule'
                },
                {
                    name: 'Quản lí bệnh nhân', link: '/doctor/manage-patient'
                }
            ]
    }
];

export const userMenu = [
    //manage schedule
    {
        name: 'you are not admin or doctor'
    }
];