import React, { Fragment, useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import {Avatar, Button, Layout, Menu, Row} from "antd";
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

const { Header } = Layout;
const { Item, SubMenu } = Menu;
const menuItems = [
    { path: "/sign-in", title: "Sign In", authOnly: false },
    { path: "/sign-up", title: "Sign Up", authOnly: false },
]

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

  const renderMenuItems = () => {
      return menuItems.map(item => {
          const menuItem = (
              <Item key={item.path} className="menu__item">
                  <Link to={item.path}>
                      {item.title}
                  </Link>
              </Item>
          );

          if(item.authOnly){
             return user._id ? menuItem : null
          }

          return user._id ? null: menuItem;
      })
  }

  return (
    <Header className="app-header">
        <Menu mode="horizontal" selectable={true} className="menu">
            { renderMenuItems() }
            { subMenuLogin }
        </Menu>
    </Header>
  );
};
