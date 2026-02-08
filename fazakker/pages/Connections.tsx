import React, { useState, useEffect } from 'react';
import { Card, Button, Typography, Row, Col, Badge, Tag, Space, Grid } from 'antd';
import { CheckCircleOutlined, SyncOutlined, CalendarOutlined } from '@ant-design/icons';
import { SocialAccount, SocialPlatform, Hadith } from '../types';
import { Facebook, Instagram, Phone, Smartphone, Monitor, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const { Title, Text, Paragraph } = Typography;
const { useBreakpoint } = Grid;

interface ConnectionsProps {
  hadiths: Hadith[];
}

const Connections: React.FC<ConnectionsProps> = ({ hadiths }) => {
  const { t, direction } = useLanguage();
  const screens = useBreakpoint();
  
  const [accounts, setAccounts] = useState<SocialAccount[]>([
    { id: '1', platform: SocialPlatform.FACEBOOK, connected: true, handle: 'Noor Daily Page', lastSync: '2 hours ago' },
    { id: '2', platform: SocialPlatform.INSTAGRAM, connected: true, handle: '@noor.daily', lastSync: '2 hours ago' },
    { id: '3', platform: SocialPlatform.WHATSAPP, connected: false },
  ]);

  const getDailyIndex = () => {
    if (hadiths.length === 0) return 0;
    const today = new Date();
    const start = new Date(today.getFullYear(), 0, 0);
    const diff = today.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    return dayOfYear % hadiths.length;
  };

  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<'portrait' | 'landscape'>('portrait');
  const [hadithIndex, setHadithIndex] = useState(0);

  useEffect(() => {
    setHadithIndex(getDailyIndex());
  }, [hadiths.length]);

  const toggleConnection = (id: string, platform: SocialPlatform) => {
    setLoadingId(id);
    setTimeout(() => {
      setAccounts(prev => prev.map(acc => {
        if (acc.id === id) {
          return {
            ...acc,
            connected: !acc.connected,
            handle: !acc.connected ? `Demo ${platform} User` : undefined,
            lastSync: !acc.connected ? 'Just now' : undefined
          };
        }
        return acc;
      }));
      setLoadingId(null);
    }, 1500);
  };

  const nextHadith = () => {
    if (hadiths.length > 0) {
      setHadithIndex((prev) => (prev + 1) % hadiths.length);
    }
  };

  const getIcon = (platform: SocialPlatform) => {
    switch (platform) {
      case SocialPlatform.FACEBOOK: return <Facebook size={24} color="#1877F2" />;
      case SocialPlatform.INSTAGRAM: return <Instagram size={24} color="#E1306C" />;
      case SocialPlatform.WHATSAPP: return <Phone size={24} color="#25D366" />;
    }
  };

  const safeIndex = hadiths.length > 0 ? hadithIndex % hadiths.length : 0;
  const currentHadith = hadiths.length > 0 ? hadiths[safeIndex] : null;

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      {/* Live Preview Card */}
      <Card 
        title={<Title level={4} style={{ margin: 0 }}>{t('livePreview')}</Title>}
        extra={
          <Space>
            <Button 
              type={previewMode === 'portrait' ? 'primary' : 'default'} 
              icon={<Smartphone size={16} />}
              onClick={() => setPreviewMode('portrait')}
            >
              {t('story')}
            </Button>
            <Button 
              type={previewMode === 'landscape' ? 'primary' : 'default'}
              icon={<Monitor size={16} />}
              onClick={() => setPreviewMode('landscape')}
            >
              {t('post')}
            </Button>
          </Space>
        }
      >
        <div style={{ 
          background: '#f9fafb', 
          padding: 32, 
          borderRadius: 8, 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          position: 'relative',
          minHeight: 500
        }}>
          <Button 
            icon={<CalendarOutlined />} 
            onClick={nextHadith}
            style={{ position: 'absolute', top: 16, [direction === 'rtl' ? 'left' : 'right']: 16, zIndex: 10 }}
            disabled={hadiths.length <= 1}
          >
            {t('previewNext')}
          </Button>

          <div style={{
            transition: 'all 0.5s ease',
            background: 'linear-gradient(135deg, #10b981 0%, #0f766e 100%)',
            borderRadius: 16,
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            overflow: 'hidden',
            width: previewMode === 'portrait' ? 320 : '100%',
            maxWidth: previewMode === 'portrait' ? 320 : 600,
            aspectRatio: previewMode === 'portrait' ? '9/16' : '16/9',
            padding: 32,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            color: 'white',
            textAlign: 'center'
          }}>
             {/* Simple pattern overlay simulation */}
             <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1, backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
             
             <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Text strong style={{ color: '#d1fae5', letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: 12 }}>{t('dailyReminder')}</Text>
                
                {currentHadith ? (
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <p style={{ fontSize: previewMode === 'portrait' ? 24 : 30, marginBottom: 24, lineHeight: 1.6, direction: 'rtl', fontFamily: 'serif' }}>
                      {currentHadith.arabicText}
                    </p>
                    <p style={{ fontSize: previewMode === 'portrait' ? 14 : 18, fontStyle: 'italic', color: '#ecfdf5', direction: 'ltr' }}>
                      "{currentHadith.translation}"
                    </p>
                  </div>
                ) : (
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', color: '#d1fae5' }}>
                    <p>{t('noHadith')}</p>
                  </div>
                )}

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: 16 }}>
                  <Text strong style={{ color: 'white' }}>{currentHadith?.source || 'NoorShare'}</Text>
                </div>
             </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Space align="center">
            <Badge status="processing" color="green" />
            <Text type="secondary">{t('previewing')} {previewMode === 'portrait' ? t('story') : t('post')} {t('previewingLayout')}</Text>
          </Space>
        </div>
      </Card>

      {/* Accounts List */}
      <div>
        <Title level={4}>{t('connectAccounts')}</Title>
        <Paragraph type="secondary">{t('connectSubtitle')}</Paragraph>
        
        <Row gutter={[16, 16]}>
          {accounts.map((account) => (
            <Col xs={24} key={account.id}>
              <Card hoverable style={{ borderColor: account.connected ? undefined : '#f0f0f0' }}>
                <Row align="middle" justify="space-between">
                  <Col>
                    <Space size="middle">
                      <div style={{ padding: 12, background: '#f5f5f5', borderRadius: '50%' }}>
                        {getIcon(account.platform)}
                      </div>
                      <div>
                        <Title level={5} style={{ margin: 0 }}>{account.platform}</Title>
                        {account.connected ? (
                          <Space size={4}>
                             <CheckCircleOutlined style={{ color: '#10b981' }} />
                             <Text type="secondary" style={{ fontSize: 12 }}>{t('connectedAs')} <Text strong>{account.handle}</Text></Text>
                          </Space>
                        ) : (
                          <Space size={4}>
                             <AlertCircle size={14} color="#9ca3af" />
                             <Text type="secondary" style={{ fontSize: 12 }}>{t('notConnected')}</Text>
                          </Space>
                        )}
                      </div>
                    </Space>
                  </Col>
                  <Col>
                    <Space>
                      {account.connected && (
                        <Button icon={<SyncOutlined />}>{t('sync')}</Button>
                      )}
                      <Button 
                        type={account.connected ? 'default' : 'primary'} 
                        danger={account.connected}
                        loading={loadingId === account.id}
                        onClick={() => toggleConnection(account.id, account.platform)}
                      >
                        {account.connected ? t('disconnect') : t('connectNow')}
                      </Button>
                    </Space>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Space>
  );
};

export default Connections;