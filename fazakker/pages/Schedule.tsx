import React, { useState } from 'react';
import { Card, Form, Select, TimePicker, Button, Typography, Alert, message, Space } from 'antd';
import { ClockCircleOutlined, SaveOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useLanguage } from '../contexts/LanguageContext';

const { Title, Text } = Typography;
const { Option } = Select;

const Schedule: React.FC = () => {
  const { t } = useLanguage();
  const [form] = Form.useForm();
  const [isSaving, setIsSaving] = useState(false);

  const onFinish = (values: any) => {
    setIsSaving(true);
    // Simulate API save
    setTimeout(() => {
      setIsSaving(false);
      message.success(t('successMsg'));
    }, 1000);
  };

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
       <Alert
        message={t('step2Title')}
        description={t('step2Desc')}
        type="success"
        showIcon
        style={{ borderColor: '#d1fae5', background: '#ecfdf5' }}
      />

      <Card>
        <div style={{ marginBottom: 24 }}>
          <Title level={4} style={{ color: '#064E3B', display: 'flex', alignItems: 'center' }}>
             <div style={{ padding: 8, background: '#eff6ff', borderRadius: 8, marginInlineEnd: 12, display: 'flex' }}>
               <ClockCircleOutlined style={{ color: '#2563eb' }} />
             </div>
             {t('whenPost')}
          </Title>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            frequency: 'daily',
            time: dayjs('18:00', 'HH:mm')
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <Form.Item label={<Text strong style={{ color: '#064E3B' }}>{t('howOften')}</Text>} name="frequency">
              <Select size="large">
                <Option value="daily">{t('everyDay')}</Option>
                <Option value="twice">{t('twiceDay')}</Option>
                <Option value="weekly">{t('weekly')}</Option>
              </Select>
            </Form.Item>

            <Form.Item label={<Text strong style={{ color: '#064E3B' }}>{t('atWhatTime')}</Text>} name="time">
              <TimePicker size="large" format="HH:mm" style={{ width: '100%' }} />
            </Form.Item>
          </div>

          <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
             <Text type="secondary">{t('changeSettings')}</Text>
             
             <Button 
               type="primary" 
               htmlType="submit" 
               size="large" 
               icon={<SaveOutlined />}
               loading={isSaving}
               style={{ minWidth: 160 }}
             >
               {t('saveSettings')}
             </Button>
          </div>
        </Form>
      </Card>
    </Space>
  );
};

export default Schedule;