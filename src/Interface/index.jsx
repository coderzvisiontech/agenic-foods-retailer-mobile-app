import { HomeIcon, NotificationIcon, CartIcon, ProfileIcon, UserIcon, OrderIcon, CreditIcon, SupportIcon, LogoutIcon } from "../Config/ImgConfig";
import { ColorPalatte } from "../Themes";

export const FOOTER_MENU = [
    {
        key: "product",
        name: "Home",
        icon: <HomeIcon />,
        activeIcon: <HomeIcon color={ColorPalatte.primaryClr} />,
    },
    {
        key: "notification",
        name: "Notification",
        icon: <NotificationIcon />,
        activeIcon: <NotificationIcon color={ColorPalatte.primaryClr} />,
    },
    {
        key: "cart",
        name: "Cart",
        icon: <CartIcon />,
        activeIcon: <CartIcon color={ColorPalatte.primaryClr} />,
    },
    {
        key: "profile",
        name: "Profile",
        icon: <ProfileIcon />,
        activeIcon: <ProfileIcon color={ColorPalatte.primaryClr} />,
    }

]

export const PROFILE_MENU = [
    {
        key: 'orders',
        name: 'Orders',
        icon: <OrderIcon />
    },
    {
        key: "credit_points",
        name: "Credit Points",
        icon: <CreditIcon />
    },
    {
        key: 'support',
        name: 'Customer Support',
        icon: <SupportIcon />
    },
    {
        key: 'logout',
        name: 'Logout',
        icon: <LogoutIcon />
    }
]