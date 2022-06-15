import React from "react";
import { useState, useEffect} from "react";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import Nav from "../component/Nav";
import Footer from "../component/Footer";

const NewLogin: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function loginUser(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();

    const response = await fetch("https://localhost:3000/api/login", {
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

    if (data.user) {
      localStorage.setItem("token", data.user);
      localStorage.setItem("phoneToken", data.phones);
      localStorage.setItem("surnameToken", data.surname);
      localStorage.setItem("admin", data.admin);
      window.location.href = "/termin";
    }
    
  }
  const onFinish = (values: any) => {
    console.log('Finish:', values);
  };


  return (
    <div className="login">
      <Nav />
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
            <h1>Login</h1>
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Proszę wpisać poprawny email!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Proszę wpisać poprawne hasło!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Hasło"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
         Zaloguj
        </Button>
         <a className="register_button" href="http://localhost:3000/register">Zarejestruj się!</a>
      </Form.Item>
    </Form>
    <Footer />
    </div>
  );
};

export default NewLogin;
