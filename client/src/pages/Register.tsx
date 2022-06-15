import React from "react";
import { useState } from "react";
import Nav from "../component/Nav";
import Footer from "../component/Footer";
import { Button, Checkbox, Form, Input } from "antd";
import { LockOutlined, UserOutlined, PhoneOutlined ,MailOutlined  } from '@ant-design/icons';

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [secondPassword, setSecondPassword] = useState<string>("");

  async function registerUser(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    const response = await fetch("http://localhost:1337/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        surname,
        phone,
        email,
        password,
      }),
    });

    const data = await response.json();
    if (data.status === "error") {
      alert("Ten email juz istnieje");
      return;
    }

    if (data.status === "ok") {
      return "ok";
    }
  }

  return (
    <>
      <Nav />
      <div className="login">

    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={registerUser}
    >
      <h1>Rejestracja</h1>
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Proszę wpisać poprawny email!' }]}
      >
        <Input prefix={<MailOutlined  className="site-form-item-icon" />} placeholder="Email" />
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
      <Form.Item
        name="confirm"
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Hasła muszą być takie same!'));
            },
          }),
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Powtórz hasło"
        />
      </Form.Item>
      <Form.Item
        name="name"
        rules={[{ required: true, message: 'Proszę wpisać imię!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Imię" />
      </Form.Item>
      <Form.Item
        name="phoneNumber"
        rules={[{ required: true, message: 'Proszę wpisać poprawny numer telefonu!' }]}
      >
        <Input prefix={<PhoneOutlined  className="site-form-item-icon" />} placeholder="Numer telefonu" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
         Zarejestruj się
        </Button>
         <a className="register_button" href="http://localhost:3000/login">Masz już konto?</a>
      </Form.Item>
    </Form>
    <Footer />
    </div>
    </>
  );
};

export default Register;
