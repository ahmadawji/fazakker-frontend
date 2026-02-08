import React from 'react';
import { Card, Form, Input, Select, Button, List, Typography, Row, Col, Tag, Alert, Empty, Space } from 'antd';
import { PlusOutlined, DeleteOutlined, BookOutlined } from '@ant-design/icons';
import { Hadith } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface AdminPanelProps {
  hadiths: Hadith[];
  onAddHadith: (hadith: Hadith) => void;
  onDeleteHadith: (id: string) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ hadiths, onAddHadith, onDeleteHadith }) => {
  const { t } = useLanguage();
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const newHadith: Hadith = {
      id: Date.now().toString(),
      arabicText: values.arabicText,
      translation: values.translation,
      source: values.source,
      grade: values.grade
    };

    onAddHadith(newHadith);
    form.resetFields();
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <Alert
        message={t('contentManagement')}
        description={t('contentDesc')}
        type="info"
        showIcon
        style={{ marginBottom: 24, borderColor: '#e9d5ff', background: '#faf5ff' }}
      />

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={8}>
          <Card title={t('addNewHadith')} bordered={false} style={{ position: 'sticky', top: 24 }}>
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              initialValues={{ grade: 'Sahih' }}
            >
              <Form.Item
                name="arabicText"
                label={t('arabicText')}
                rules={[{ required: true, message: 'Please enter Arabic text' }]}
              >
                <TextArea 
                  rows={4} 
                  placeholder={t('arabicPlaceholder')}
                  style={{ direction: 'rtl', fontSize: 16 }} 
                />
              </Form.Item>

              <Form.Item
                name="translation"
                label={t('englishTranslation')}
                rules={[{ required: true, message: 'Please enter translation' }]}
              >
                <TextArea rows={4} placeholder={t('englishPlaceholder')} style={{ direction: 'ltr' }} />
              </Form.Item>

              <Form.Item
                name="source"
                label={t('source')}
                rules={[{ required: true, message: 'Please enter source' }]}
              >
                <Input placeholder={t('sourcePlaceholder')} />
              </Form.Item>

              <Form.Item
                name="grade"
                label={t('grade')}
                rules={[{ required: true }]}
              >
                <Select>
                  <Option value="Sahih">Sahih (Authentic)</Option>
                  <Option value="Hasan">Hasan (Good)</Option>
                  <Option value="Da'if">Da'if (Weak)</Option>
                </Select>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" icon={<PlusOutlined />} block size="large" style={{ background: '#111827' }}>
                  {t('addToDb')}
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col xs={24} lg={16}>
          <Card 
            title={<span><BookOutlined style={{ marginInlineEnd: 8, color: '#2563eb' }} /> {t('currentDatabase')}</span>}
            extra={<Tag color="default">{hadiths.length} {t('items')}</Tag>}
            bodyStyle={{ padding: 0 }}
          >
            {hadiths.length === 0 ? (
              <Empty description={t('noHadiths')} style={{ padding: 48 }} />
            ) : (
              <List
                itemLayout="horizontal"
                dataSource={[...hadiths].reverse()}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <Button 
                        type="text" 
                        danger 
                        icon={<DeleteOutlined />} 
                        onClick={() => onDeleteHadith(item.id)} 
                      />
                    ]}
                    style={{ padding: 24 }}
                  >
                    <List.Item.Meta
                      title={
                        <Paragraph 
                           style={{ fontSize: 18, direction: 'rtl', textAlign: 'right', marginBottom: 12 }}
                        >
                          {item.arabicText}
                        </Paragraph>
                      }
                      description={
                        <div>
                          <Text italic style={{ display: 'block', marginBottom: 12, direction: 'ltr', textAlign: 'left' }}>"{item.translation}"</Text>
                          <Space style={{ width: '100%', direction: 'ltr' }}>
                             <Tag color="green">{item.source}</Tag>
                             <Tag color={item.grade === 'Sahih' ? 'blue' : 'orange'}>{item.grade}</Tag>
                          </Space>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminPanel;