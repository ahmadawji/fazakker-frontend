import React from 'react';
import { Card, Row, Col, Statistic, Typography, Space, Tag, Divider } from 'antd';
import { ArrowUpOutlined, CheckCircleFilled } from '@ant-design/icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Share2, Users, TrendingUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const { Title, Text, Paragraph } = Typography;

const data = [
  { name: 'Mon', fb: 400, ig: 240, wa: 240 },
  { name: 'Tue', fb: 300, ig: 139, wa: 221 },
  { name: 'Wed', fb: 200, ig: 980, wa: 229 },
  { name: 'Thu', fb: 278, ig: 390, wa: 200 },
  { name: 'Fri', fb: 189, ig: 480, wa: 218 },
  { name: 'Sat', fb: 239, ig: 380, wa: 250 },
  { name: 'Sun', fb: 349, ig: 430, wa: 210 },
];

const Dashboard: React.FC = () => {
  const { t, direction } = useLanguage();

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <div>
        <Title level={2} style={{ margin: 0 }}>{t('dashTitle')}</Title>
        <Text type="secondary">{t('dashSubtitle')}</Text>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false}>
            <Statistic 
              title={t('totalPosts')}
              value={1284} 
              prefix={<Share2 size={18} style={{ marginInlineEnd: 8, color: '#059669' }} />}
            />
            <Text type="success" style={{ fontSize: 12 }}><ArrowUpOutlined /> 12% {t('thisMonth')}</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
           <Card bordered={false}>
            <Statistic 
              title={t('totalReach')}
              value={45200} 
              formatter={(val) => `${(Number(val) / 1000).toFixed(1)}k`}
              prefix={<Users size={18} style={{ marginInlineEnd: 8, color: '#059669' }} />}
            />
            <Text type="success" style={{ fontSize: 12 }}><ArrowUpOutlined /> 5.4% {t('thisWeek')}</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false}>
            <Statistic 
              title={t('engagementRate')} 
              value={4.8} 
              precision={1} 
              suffix="%" 
              prefix={<TrendingUp size={18} style={{ marginInlineEnd: 8, color: '#059669' }} />}
            />
            <Text type="success" style={{ fontSize: 12 }}><ArrowUpOutlined /> 0.2%</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false}>
            <Statistic 
              title={t('activeSchedules')}
              value={3} 
              prefix={<CheckCircleFilled style={{ marginInlineEnd: 8, color: '#059669' }} />}
            />
             <Text type="secondary" style={{ fontSize: 12 }}>{t('systemRunning')}</Text>
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Card title={t('engagementOverview')} bordered={false}>
            <div style={{ height: 320, width: '100%', direction: 'ltr' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    cursor={{ fill: '#f8fafc' }}
                  />
                  <Bar dataKey="fb" name="Facebook" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="ig" name="Instagram" fill="#e1306c" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="wa" name="WhatsApp" fill="#25d366" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title={t('nextScheduled')} bordered={false} bodyStyle={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
             <div style={{ background: '#f9fafb', padding: 16, borderRadius: 8, border: '1px solid #f0f0f0' }}>
               <Space style={{ marginBottom: 12 }}>
                 <Tag color="blue">Facebook</Tag>
                 <Tag color="magenta">Instagram</Tag>
               </Space>
               <Paragraph italic style={{ marginBottom: 8, color: '#1f2937' }}>
                 "The best among you are those who have the best manners and character."
               </Paragraph>
               <Text type="secondary" style={{ fontSize: 12 }}>- Sahih Al-Bukhari</Text>
               
               <Divider style={{ margin: '16px 0' }} />
               
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <Text type="secondary" style={{ fontSize: 12 }}>Today, 18:00</Text>
                 <a href="#" style={{ color: '#059669', fontSize: 14 }}>{t('edit')}</a>
               </div>
             </div>

             <div style={{ marginTop: 24 }}>
               <Title level={5}>{t('systemStatus')}</Title>
               <Space direction="vertical" style={{ width: '100%' }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text type="secondary">Facebook API</Text>
                    <Space size={4}><div style={{ width: 8, height: 8, background: '#22c55e', borderRadius: '50%' }}></div> <Text type="success">{t('operational')}</Text></Space>
                 </div>
                 <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text type="secondary">Instagram Graph</Text>
                    <Space size={4}><div style={{ width: 8, height: 8, background: '#22c55e', borderRadius: '50%' }}></div> <Text type="success">{t('operational')}</Text></Space>
                 </div>
                 <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text type="secondary">WhatsApp Business</Text>
                    <Space size={4}><div style={{ width: 8, height: 8, background: '#22c55e', borderRadius: '50%' }}></div> <Text type="success">{t('operational')}</Text></Space>
                 </div>
               </Space>
             </div>
          </Card>
        </Col>
      </Row>
    </Space>
  );
};

export default Dashboard;