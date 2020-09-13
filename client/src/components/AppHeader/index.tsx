import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import {Avatar, Button, Layout, Menu} from "antd";
import {User} from "../../lib/types";
import {displayErrorMessage, displaySuccessNotification} from "../../lib/utils";
import { useMutation } from "react-apollo";
import SubMenu from "antd/es/menu/SubMenu";
import {LogoutOutlined, SettingOutlined, UserOutlined} from "@ant-design/icons/lib";
import Item from "antd/es/list/Item";
import {SIGN_OUT} from "../../lib/graphql/mutations/SignOut";
import {SignOut as SignOutData} from "../../lib/graphql/mutations/SignOut/__generated__/SignOut";

interface Props {
  user: User;
  setUser: (user: User) => void;
}

const { Header } = Layout;

export const AppHeader = ({ user, setUser }: Props) => {
  const history = useHistory();
  const location = useLocation();

  const [logOut] = useMutation<SignOutData>(SIGN_OUT, {
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
    logOut();
  };

  const subMenuLogin =
      user._id ? (
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
      ) : (
        <>
          <Item>
            <Link to="/sign-in">
              <Button type="link">Sign In</Button>
            </Link>
          </Item>
          <Item>
            <Link to="/sign-up">
              <Button type="primary">Sign Up</Button>
            </Link>
          </Item>
        </>
      );


  return (
    <Header className="app-header">
      <div className="app-header__menu-section">
        <Menu mode="horizontal" selectable={false} className="menu">
          {subMenuLogin}
        </Menu>
      </div>
    </Header>
  );
};
