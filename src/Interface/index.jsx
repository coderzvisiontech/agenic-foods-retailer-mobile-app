import { HomeIcon, NotificationIcon, CartIcon, ProfileIcon } from "../Config/ImgConfig";
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