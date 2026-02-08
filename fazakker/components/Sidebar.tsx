import React from 'react';
import { Menu, Avatar, Button, Typography, Space } from 'antd';
import type { MenuProps } from 'antd';
import { Share2, CalendarClock, Leaf, ShieldCheck, LayoutDashboard } from 'lucide-react';
import { LogoutOutlined } from '@ant-design/icons';
import { useLanguage } from '../contexts/LanguageContext';

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  onLogout: () => void;
  user: { name: string; email: string };
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage, onLogout, user }) => {
  const { t, direction } = useLanguage();
  
  const items: MenuProps['items'] = [
    {
      key: 'grp1',
      label: t('gettingStarted'),
      type: 'group',
      children: [
        { key: 'dashboard', label: t('dashboard'), icon: <LayoutDashboard size={18} /> },
        { key: 'connections', label: t('previewConnect'), icon: <Share2 size={18} /> },
        { key: 'schedule', label: t('autoSchedule'), icon: <CalendarClock size={18} /> },
      ],
    },
    {
      type: 'divider',
    },
    {
      key: 'grp2',
      label: t('administration'),
      type: 'group',
      children: [
        { key: 'admin', label: t('adminPanel'), icon: <ShieldCheck size={18} /> },
      ],
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Logo Area */}
      <div style={{ padding: '24px', display: 'flex', alignItems: 'center' }}>
        <div style={{ 
          padding: 8, 
          backgroundColor: '#d1fae5', // emerald-100
          borderRadius: 8, 
          marginInlineEnd: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Leaf size={24} color="#059669" />
        </div>
        <div>
          <Typography.Title level={4} style={{ margin: 0, fontSize: 18 }}>{t('appName')}</Typography.Title>
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>{t('appTagline')}</Typography.Text>
        </div>
      </div>

      {/* Menu */}
      <Menu
        mode="inline"
        selectedKeys={[activePage]}
        onClick={({ key }) => setActivePage(key)}
        style={{ borderRight: 0, flex: 1 }}
        items={items}
      />

      {/* User Profile */}
      <div style={{ padding: 16, borderTop: '1px solid #f0f0f0', backgroundColor: '#fafafa' }}>
        <Space style={{ marginBottom: 12, direction: 'ltr', width: '100%', justifyContent: direction === 'rtl' ? 'flex-end' : 'flex-start' }}>
           {/* Force LTR for email display mostly, but user name might be Arabic. Let's keep it adaptable. */}
           {direction === 'rtl' ? (
             <>
               <div style={{ overflow: 'hidden', textAlign: 'right' }}>
                 <Typography.Text strong style={{ display: 'block', lineHeight: 1.2 }}>{user.name}</Typography.Text>
                 <Typography.Text type="secondary" style={{ fontSize: 11 }}>{user.email}</Typography.Text>
               </div>
               <Avatar 
                size="large" 
                style={{ backgroundColor: '#ffffff', color: '#059669', border: '1px solid #d1fae5', verticalAlign: 'middle', marginLeft: 8 }}
              >
                {user.name.charAt(0)}
              </Avatar>
             </>
           ) : (
             <>
               <Avatar 
                size="large" 
                style={{ backgroundColor: '#ffffff', color: '#059669', border: '1px solid #d1fae5', verticalAlign: 'middle' }}
              >
                {user.name.charAt(0)}
              </Avatar>
              <div style={{ overflow: 'hidden' }}>
                <Typography.Text strong style={{ display: 'block', lineHeight: 1.2 }}>{user.name}</Typography.Text>
                <Typography.Text type="secondary" style={{ fontSize: 11 }}>{user.email}</Typography.Text>
              </div>
             </>
           )}
        </Space>
        
        <Button 
          danger 
          block 
          icon={<LogoutOutlined />} 
          onClick={onLogout}
        >
          {t('signOut')}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;