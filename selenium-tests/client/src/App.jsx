import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Alerts from './pages/Alerts';
import Modals from './pages/Modals';
import Tables from './pages/Tables';
import Upload from './pages/Upload';
import DragDrop from './pages/DragDrop';
import Dynamic from './pages/Dynamic';
import Windows from './pages/Windows';
import IframeContent from './pages/IframeContent';
import NewWindow from './pages/NewWindow';
import Layout from './components/Layout';

// Mock auth check
const ProtectedRoute = ({ children }) => {
  const localAuth = localStorage.getItem('isAuthenticated');
  // Also check cookie just in case logic matches
  const cookieAuth = document.cookie.includes('auth=1');
  
  // #region agent log
  useEffect(() => {
    fetch('http://127.0.0.1:7243/ingest/26ac42de-188a-4eff-8743-3a9a15e6651a', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        location: 'client/src/App.jsx:ProtectedRoute',
        message: 'Checking auth',
        data: { localAuth, cookieAuth, path: window.location.pathname },
        timestamp: Date.now(),
        sessionId: 'debug-session',
        hypothesisId: 'auth-check'
      })
    }).catch(()=>{});
  }, [localAuth, cookieAuth]);
  // #endregion

  if (!localAuth && !cookieAuth) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/iframe-content" element={<IframeContent />} />
      <Route path="/new-window" element={<NewWindow />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="alerts" element={<Alerts />} />
        <Route path="modals" element={<Modals />} />
        <Route path="tables" element={<Tables />} />
        <Route path="upload" element={<Upload />} />
        <Route path="dragdrop" element={<DragDrop />} />
        <Route path="dynamic" element={<Dynamic />} />
        <Route path="windows" element={<Windows />} />
      </Route>
    </Routes>
  );
}

export default App;
