import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Card, Typography, Layout, Divider } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Leaf } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const { Title, Text } = Typography;

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const { t, direction } = useLanguage();
  const [isLogin, setIsLogin] = useState(true);

  const onFinish = (values: any) => {
    console.log('Received values:', values);
    onLogin();
  };

  return (
    <Layout style={{ minHeight: '100vh', justifyContent: 'center', alignItems: 'center', background: '#f0f2f5' }}>
      <div style={{ maxWidth: 400, width: '100%', padding: 20 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
           <div style={{ 
             width: 48, 
             height: 48, 
             background: '#d1fae5', 
             borderRadius: 12, 
             display: 'flex', 
             alignItems: 'center', 
             justifyContent: 'center',
             margin: '0 auto 16px'
           }}>
             <Leaf size={32} color="#059669" />
           </div>
           <Title level={2}>{isLogin ? t('signInTitle') : t('createAccountTitle')}</Title>
           <Text type="secondary">{t('automateSadaqah')}</Text>
        </div>

        <Card bordered={false} style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
            size="large"
          >
            <Form.Item
              name="email"
              label={t('email')}
              rules={[{ required: true, message: 'Please input your Email!' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="you@example.com" style={{ direction: 'ltr' }} />
            </Form.Item>

            <Form.Item
              name="password"
              label={t('password')}
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="••••••••" style={{ direction: 'ltr' }} />
            </Form.Item>

            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>{t('rememberMe')}</Checkbox>
              </Form.Item>

              <a style={{ float: direction === 'rtl' ? 'left' : 'right' }} href="">
                {t('forgotPassword')}
              </a>
            </Form.Item>

            <Form.Item style={{ marginBottom: 0 }}>
              <Button type="primary" htmlType="submit" block>
                {isLogin ? t('signInBtn') : t('createAccountBtn')}
              </Button>
            </Form.Item>
          </Form>

          <Divider plain>{t('or')}</Divider>
          
          <Button block onClick={() => setIsLogin(!isLogin)}>
             {isLogin ? t('registerNow') : t('signInInstead')}
          </Button>
        </Card>
      </div>
    </Layout>
  );
};

export default Login;