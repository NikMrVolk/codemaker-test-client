// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'
import { HOME_ROUTE, USERS_ROUTE } from 'src/utils/constants'

const navigation = (): HorizontalNavItemsType => [
    {
        title: 'Home',
        path: HOME_ROUTE,
        icon: 'tabler:smart-home',
    },
    {
        title: 'Users',
        path: USERS_ROUTE,
        icon: 'tabler:mail',
    },
]

export default navigation
