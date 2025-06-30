import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

import { ColorPalatte } from "../../Themes";

import Logo from "../../Assets/Images/logo.png";
import Cart from "../../Assets/Images/icon_cart_details.png"
import BasketImg from "../../Assets/Icons/login_basket_img.svg"
import VegetableImg from "../../Assets/Icons/login_veg_img.svg"
import BackIcon from "../../Assets/Icons/back_button.svg"
import UploadIcon from "../../Assets/Icons/upload_icon.svg"
import CloseIcon from "../../Assets/Icons/close_icon.svg"
import SuccessIcon from "../../Assets/Icons/success_img.svg"
import EditIcon from "../../Assets/Icons/edit_icon.svg"
import OtpBg from "../../Assets/Images/otp_bg.jpg"
import LogoIcon from "../../Assets/Icons/logo_icon.svg"
import DecrementIcon from "../../Assets/Icons/decrement_icon.svg"
import IncrementIcon from "../../Assets/Icons/increment_icon.svg"
import SearchIcon from "../../Assets/Icons/search_icon.svg"
import RightIcon from "../../Assets/Icons/right_icon.svg"
import ToastIcon from "../../Assets/Icons/toast_logo.svg"
import UserIcon from "../../Assets/Icons/user_icon.svg"
import OrderIcon from "../../Assets/Icons/order_icon.svg"
import CreditIcon from "../../Assets/Icons/credit_icon.svg"
import SupportIcon from "../../Assets/Icons/support_icon.svg"
import LogoutIcon from "../../Assets/Icons/logout_icon.svg"
import PrimaryRightIcon from "../../Assets/Icons/primary_right.svg"
import DisableDecrementIcon from "../../Assets/Icons/disable_decrement.svg"
import DisableIncrementIcon from "../../Assets/Icons/disable_incerement.svg"
import NoOrder from "../../Assets/Icons/no_order.svg"
import BlackRIght from "../../Assets/Icons/black_right.svg"
import CheckIcon from "../../Assets/Icons/check_icon.svg"
import NoCart from "../../Assets/Icons/no_cart.svg"
import UpIcon from "../../Assets/Icons/up_icon.svg"
import DownIcon from "../../Assets/Icons/down_icon.svg"
import Cash from "../../Assets/Icons/cash.svg"
import NoNotification from "../../Assets/Icons/no_notification.svg"
import NotifyTag from "../../Assets/Icons/notify_tag.svg"
import GoldCoin from "../../Assets/Icons/gold_coin.svg"
import ClearIcon from '../../Assets/Icons/clear_icon.svg'
import OrderDelivered from "../../Assets/Icons/order_delivered.svg"
import OrderOntheway from "../../Assets/Icons/order_ontheway.svg"
import OrderPacked from "../../Assets/Icons/order_packed.svg"

// Home Icon
const HomeIcon = ({ color = ColorPalatte.grey_300, ...props }) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={25}
        height={24}
        fill="none"
        {...props}
    >
        <Path
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12.5 18v-3M10.57 2.82 3.64 8.37c-.78.62-1.28 1.93-1.11 2.91l1.33 7.96c.24 1.42 1.6 2.57 3.04 2.57h11.2c1.43 0 2.8-1.16 3.04-2.57l1.33-7.96c.16-.98-.34-2.29-1.11-2.91l-6.93-5.54c-1.07-.86-2.8-.86-3.86-.01Z"
        />
    </Svg>
)

//Notification Icon
const NotificationIcon = ({ color = ColorPalatte.grey_300, ...props }) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={25}
        height={24}
        fill="none"
        {...props}
    >
        <Path
            stroke={color}
            strokeLinecap="round"
            strokeMiterlimit={10}
            strokeWidth={1.5}
            d="M12.52 2.91c-3.31 0-6 2.69-6 6v2.89c0 .61-.26 1.54-.57 2.06L4.8 15.77c-.71 1.18-.22 2.49 1.08 2.93 4.31 1.44 8.96 1.44 13.27 0 1.21-.4 1.74-1.83 1.08-2.93l-1.15-1.91c-.3-.52-.56-1.45-.56-2.06V8.91c0-3.3-2.7-6-6-6Z"
        />
        <Path
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit={10}
            strokeWidth={1.5}
            d="M14.37 3.2a6.754 6.754 0 0 0-3.7 0c.29-.74 1.01-1.26 1.85-1.26.84 0 1.56.52 1.85 1.26Z"
        />
        <Path
            stroke={color}
            strokeMiterlimit={10}
            strokeWidth={1.5}
            d="M15.52 19.06c0 1.65-1.35 3-3 3-.82 0-1.58-.34-2.12-.88a3.01 3.01 0 0 1-.88-2.12"
        />
    </Svg>
);

//Cart Icon
const CartIcon = ({ color = ColorPalatte.grey_300, ...props }) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={25}
        height={24}
        fill="none"
        {...props}
    >
        <Path
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit={10}
            strokeWidth={1.5}
            d="M2.5 2h1.74c1.08 0 1.93.93 1.84 2l-.83 9.96a2.796 2.796 0 0 0 2.79 3.03h10.65c1.44 0 2.7-1.18 2.81-2.61l.54-7.5c.12-1.66-1.14-3.01-2.81-3.01H6.32M16.75 22a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM8.75 22a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM9.5 8h12"
        />
    </Svg>
)

//Profile Icon
const ProfileIcon = ({ color = ColorPalatte.grey_300, ...props }) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={25}
        height={24}
        fill="none"
        {...props}
    >
        <Path
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M18.64 21.62c-.88.26-1.92.38-3.14.38h-6c-1.22 0-2.26-.12-3.14-.38.22-2.6 2.89-4.65 6.14-4.65 3.25 0 5.92 2.05 6.14 4.65Z"
        />
        <Path
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15.5 2h-6c-5 0-7 2-7 7v6c0 3.78 1.14 5.85 3.86 6.62.22-2.6 2.89-4.65 6.14-4.65 3.25 0 5.92 2.05 6.14 4.65 2.72-.77 3.86-2.84 3.86-6.62V9c0-5-2-7-7-7Zm-3 12.17c-1.98 0-3.58-1.61-3.58-3.59C8.92 8.6 10.52 7 12.5 7s3.58 1.6 3.58 3.58-1.6 3.59-3.58 3.59Z"
        />
        <Path
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M16.08 10.58c0 1.98-1.6 3.59-3.58 3.59s-3.58-1.61-3.58-3.59C8.92 8.6 10.52 7 12.5 7s3.58 1.6 3.58 3.58Z"
        />
    </Svg>
)

//Delete Icon
const DeleteIcon = ({ color = ColorPalatte.errorclr, ...props }) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={19}
        height={20}
        fill="none"
        {...props}
    >
        <Path
            fill={color}
            d="M7.5 3.25v.25h4v-.25a2 2 0 1 0-4 0Zm-1.25.25v-.25a3.25 3.25 0 0 1 6.5 0v.25h5.625a.625.625 0 1 1 0 1.25h-1.459l-1 11.928A3.625 3.625 0 0 1 12.304 20H6.696a3.625 3.625 0 0 1-3.612-3.322l-1-11.928H.625a.625.625 0 0 1 0-1.25H6.25ZM4.33 16.573a2.375 2.375 0 0 0 2.366 2.177h5.608a2.375 2.375 0 0 0 2.367-2.177l.991-11.823H3.338l.992 11.823Zm3.92-8.448a.625.625 0 0 0-1.25 0v7.25a.625.625 0 0 0 1.25 0v-7.25Zm3.125-.625c.345 0 .625.28.625.625v7.25a.624.624 0 1 1-1.25 0v-7.25c0-.345.28-.625.625-.625Z"
        />
    </Svg>
)

export {
    Logo,
    Cart,
    BasketImg,
    VegetableImg,
    BackIcon,
    UploadIcon,
    CloseIcon,
    SuccessIcon,
    EditIcon,
    OtpBg,
    LogoIcon,
    DecrementIcon,
    IncrementIcon,
    SearchIcon,
    RightIcon,
    ToastIcon,
    UserIcon,
    OrderIcon,
    CreditIcon,
    SupportIcon,
    LogoutIcon,
    PrimaryRightIcon,
    DisableDecrementIcon,
    DisableIncrementIcon,
    NoOrder,
    BlackRIght,
    CheckIcon,
    NoCart,
    UpIcon,
    DownIcon,
    Cash,
    NoNotification,
    NotifyTag,
    GoldCoin,
    ClearIcon,
    OrderDelivered,
    OrderOntheway,
    OrderPacked,
    HomeIcon,
    CartIcon,
    NotificationIcon,
    ProfileIcon,
    DeleteIcon,
}