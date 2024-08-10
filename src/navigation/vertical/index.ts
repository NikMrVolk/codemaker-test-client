// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { HOME_ROUTE, USERS_ROUTE } from 'src/utils/constants'

const navigation = (): VerticalNavItemsType => {
    return [
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
}

export default navigation
