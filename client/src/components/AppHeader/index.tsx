import React from "react";
import { Link } from "react-router-dom";
import {Avatar, Layout, Menu } from "antd";
import {User} from "../../lib/types";
import {displayErrorMessage, displaySuccessNotification} from "../../lib/utils";
import { useMutation } from "react-apollo";
import {LogoutOutlined, SettingOutlined, UserOutlined} from "@ant-design/icons/lib";
import {SIGN_OUT} from "../../lib/graphql/mutations/SignOut";
import {SignOut as SignOutData} from "../../lib/graphql/mutations/SignOut/__generated__/SignOut";


interface Props {
  user: User;
  setUser: (user: User) => void;
}

interface MenuItem {
    path: string,
    title: string,
}

const { Header } = Layout;
const { Item, SubMenu } = Menu;

const authorizedUserMenuItems: MenuItem[] = [
    { path: "/apartments", title: "Apartments" },
    { path: "/vouchers", title: "Vouchers" },
    { path: "/orders", title: "Orders" },
    { path: "/bookings", title: "Bookings" },
];
const generalMenuItems: MenuItem[] = [
    { path: "/client/apartments", title: "Apartments" },
    { path: "/client/vouchers", title: "Vouchers" },
    { path: "/sign-in", title: "Sign In" },
    { path: "/sign-up", title: "Sign Up" },
];

export const AppHeader = ({ user, setUser }: Props) => {

  const [signOut] = useMutation<SignOutData>(SIGN_OUT, {
    onCompleted: data => {
      if (data && data.signOut) {
        setUser(data.signOut);
        sessionStorage.removeItem("token");
        displaySuccessNotification("You've successfully signed out!");
      }
    },
    onError: () => {
      displayErrorMessage(
          "Sorry! We weren't able to sign you out. Please try again later!"
      );
    }
  });

  const handleLogOut = () => {
    signOut();
  };

  const subMenuLogin =
      user && user._id ? (
          <SubMenu title={<Avatar icon={<UserOutlined />} />}>
            <Item key="/user">
              <Link to={``}>
                <SettingOutlined />
                Profile
              </Link>
            </Item>
            <Item key="/sign-out">
              <div onClick={handleLogOut}>
                <LogoutOutlined />
                Sign Out
              </div>
            </Item>
          </SubMenu>
      ) : null;

  const renderMenuItems = (menuItems: {path: string, title: string }[]) => {
      return menuItems.map(item => {
          return (
              <Item key={item.path} className="menu__item">
                  <Link to={item.path}>
                      {item.title}
                  </Link>
              </Item>
          );
      })
  };

  return (
    <Header className="app-header">
        <Menu mode="horizontal" selectable={true} className="menu">
            { user._id && user.role === "SELLER" ?
                renderMenuItems(authorizedUserMenuItems) : renderMenuItems(generalMenuItems)
            }
            { subMenuLogin }
        </Menu>
    </Header>
  );
};
