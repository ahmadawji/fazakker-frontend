import React, { useState } from 'react';
import { Layout, theme, ConfigProvider, Button, Drawer, Space, Grid } from 'antd';
import { MenuOutlined, GlobalOutlined } from '@ant-design/icons';
import Sidebar from './components/Sidebar';
import Connections from './pages/Connections';
import Schedule from './pages/Schedule';
import AdminPanel from './pages/AdminPanel';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { Hadith } from './types';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

const { Header, Content, Sider } = Layout;
const { useBreakpoint } = Grid;

// Initial Mock Data
const initialHadiths: Hadith[] = [
  {
    id: '1',
    arabicText: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ",
    translation: "Actions are judged by intentions, so each man will have what he intended.",
    source: "Sahih Al-Bukhari",
    grade: "Sahih"
  },
  {
    id: '2',
    arabicText: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",
    translation: "The best among you are those who learn the Qur'an and teach it.",
    source: "Sahih Al-Bukhari",
    grade: "Sahih"
  },
  {
    id: '3',
    arabicText: "لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
    translation: "None of you will have faith till he wishes for his (Muslim) brother what he likes for himself.",
    source: "Sahih Al-Bukhari",
    grade: "Sahih"
  }
];

const AppContent: React.FC = () => {
  const { direction, language, setLanguage, t } = useLanguage();
  const screens = useBreakpoint();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activePage, setActivePage] = useState('connections');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hadiths, setHadiths] = useState<Hadith[]>(initialHadiths);
  
  // Mock User
  const user = {
    name: 'Ahmed Ali',
    email: 'ahmed@example.com',
    id: 'user_123'
  };

  const handleAddHadith = (newHadith: Hadith) => {
    setHadiths([...hadiths, newHadith]);
  };

  const handleDeleteHadith = (id: string) => {
    setHadiths(hadiths.filter(h => h.id !== id));
  };

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard': return <Dashboard />;
      case 'connections': return <Connections hadiths={hadiths} />;
      case 'schedule': return <Schedule />;
      case 'admin': return <AdminPanel hadiths={hadiths} onAddHadith={handleAddHadith} onDeleteHadith={handleDeleteHadith} />;
      default: return <Connections hadiths={hadiths} />;
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  if (!isAuthenticated) {
    return (
      <ConfigProvider
        direction={direction}
        theme={{
          token: {
            colorPrimary: '#059669', // Emerald 600
            borderRadius: 8,
            fontFamily: language === 'ar' ? "'Tajawal', sans-serif" : "'Inter', sans-serif",
          },
        }}
      >
        <div style={{ position: 'absolute', top: 20, right: 20, zIndex: 1000 }}>
             <Button icon={<GlobalOutlined />} onClick={toggleLanguage}>
                {language === 'en' ? 'العربية' : 'English'}
             </Button>
        </div>
        <Login onLogin={() => setIsAuthenticated(true)} />
      </ConfigProvider>
    );
  }

  // Determine if we are on a desktop screen (lg or larger)
  const isDesktop = screens.lg;

  return (
    <ConfigProvider
      direction={direction}
      theme={{
        token: {
          colorPrimary: '#059669', // Emerald 600
          borderRadius: 8,
          fontFamily: language === 'ar' ? "'Tajawal', sans-serif" : "'Inter', sans-serif",
        },
        components: {
          Layout: {
            bodyBg: '#f0f2f5',
            headerBg: '#ffffff',
            siderBg: '#ffffff',
          },
        },
      }}
    >
      <Layout style={{ minHeight: '100vh' }}>
        {/* Desktop Sidebar - Only rendered on Large screens */}
        {isDesktop && (
          <Sider 
            width={280} 
            theme="light"
            style={{ 
              borderInlineEnd: '1px solid #f0f0f0',
              height: '100vh',
              position: 'sticky',
              top: 0,
              left: 0,
            }}
          >
            <Sidebar 
              activePage={activePage} 
              setActivePage={setActivePage} 
              onLogout={() => setIsAuthenticated(false)}
              user={user}
            />
          </Sider>
        )}

        {/* Mobile Drawer - Only rendered on smaller screens */}
        {!isDesktop && (
          <Drawer
            placement={direction === 'rtl' ? "right" : "left"}
            onClose={() => setMobileOpen(false)}
            open={mobileOpen}
            styles={{ body: { padding: 0 } }}
            width={280}
          >
             <Sidebar 
              activePage={activePage} 
              setActivePage={(page) => {
                setActivePage(page);
                setMobileOpen(false);
              }}
              onLogout={() => setIsAuthenticated(false)}
              user={user}
            />
          </Drawer>
        )}

        <Layout>
          <Header style={{ padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {/* Toggle Button - Only visible on mobile/tablet */}
              {!isDesktop && (
                <Button 
                  type="text" 
                  icon={<MenuOutlined />} 
                  onClick={() => setMobileOpen(true)} 
                  style={{ fontSize: '16px', width: 64, height: 64, marginInlineEnd: 16 }} 
                />
              )}
              
              <span style={{ fontSize: '18px', fontWeight: 'bold' }}>
                {activePage === 'connections' && t('previewConnect')}
                {activePage === 'schedule' && t('autoSchedule')}
                {activePage === 'admin' && t('adminPanel')}
                {activePage === 'dashboard' && t('dashboard')}
              </span>
            </div>
            
            <Button icon={<GlobalOutlined />} onClick={toggleLanguage}>
                {language === 'en' ? 'العربية' : 'English'}
            </Button>
          </Header>
          
          <Content style={{ margin: '24px 16px', padding: 0, minHeight: 280, overflow: 'initial' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 12px' }}>
              {renderContent()}
            </div>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  )
}

export default App;