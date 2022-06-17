import React from "react";
import { useState, useEffect } from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import Nav from "../component/Nav";
import Footer from "../component/Footer";

const NewLogin: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function loginUser(event: React.MouseEvent<HTMLElement>) {

    const response = await fetch("https://bebeautypl.herokuapp.com/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    if(!data.user){
      alert("konto nie istnieje")
    }
    if (data.user) {
      localStorage.setItem("token", data.user);
      localStorage.setItem("phoneToken", data.phones);
      localStorage.setItem("surnameToken", data.surname);
      localStorage.setItem("admin", data.admin);
      window.location.href = "/calendary";
    }
  }

  return (
    <div className="login">
      <Nav />
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={loginUser}
      >
        <h1>Login</h1>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Proszę wpisać poprawny email!" }]}
        >
          <Input
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              setEmail(e.currentTarget.value);
            }}
            prefix={<MailOutlined className="site-form-item-icon" />}
            type="email"
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Proszę wpisać poprawne hasło!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Hasło"
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              setPassword(e.currentTarget.value)
            }}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Zaloguj
          </Button>
          <a className="register_button" href="http://localhost:3000/register">
            Zarejestruj się!
          </a>
        </Form.Item>
      </Form>
      <Footer />
    </div>
  );
};

export default NewLogin;
