// 1. IMPORTING TOOLS
// We bring in React and useState (a tool to help React remember things, like if the sidebar is open).
import React, { useState } from 'react';
// We bring in Auth0 tools to handle user login safely.
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
// We bring in a few simple icons for our buttons.
import { LogOut, Menu, Grid3x3, X } from 'lucide-react';
// ==========================================
// DATA: OUR PORTALS
// ==========================================
// This is a simple list (array) of the different workspaces we can open.
const PORTALS = [
  { 
    id: 'EDU-01', 
    title: 'Teacher Workspace', 
    subtitle: 'Manage rosters, coursework, and grading.', 
    url: 'http://localhost:5174' 
  },
  { 
    id: 'ADM-02', 
    title: 'Admin Tools', 
    subtitle: 'Manager-level controls for the system.', 
    url: 'http://localhost:5175' 
  }
];
// COMPONENT 1: THE USER MENU (Dropdown)
// ==========================================
function UserMenu({ user, onLogout }) {
  // useState remembers if the dropdown is open (true) or closed (false).
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      {/* Clicking the button switches isOpen to the opposite of what it currently is */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{ padding: '8px 12px', cursor: 'pointer', borderRadius: '8px', backgroundColor: '#F3F4F6', color: '#111827', border: '1px solid #E5E7EB', fontWeight: 'bold' }}
      >
        {user?.name || "Guest"}
      </button>

      {/* If isOpen is true, show the dropdown box */}
      {isOpen && (
        <div style={{
          position: 'absolute', top: '45px', right: '0px', 
          background: '#FFFFFF', color: '#111827', padding: '15px', 
          border: '1px solid #E5E7EB', borderRadius: '8px', width: '200px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)' // Adds a soft shadow so it pops off the white background
        }}>
          <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>{user?.name}</p>
          <p style={{ margin: '0 0 15px 0', fontSize: '12px', color: '#6B7280' }}>{user?.email}</p>
          
          {/* Logout button */}
          <button onClick={onLogout} style={{ color: '#EF4444', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', gap: '10px', padding: '0' }}>
            <LogOut size={16} /> Log out
          </button>
        </div>
      )}
    </div>
  );
}
// COMPONENT 2: THE MAIN APP DASHBOARD
// ==========================================
function MainDashboard() {
  // Grab the helpful tools from Auth0
  const { user, isAuthenticated, isLoading, logout, loginWithRedirect } = useAuth0();
  
  // Create a memory variable to track which URL is currently open (starts as null/empty)
  const [activeUrl, setActiveUrl] = useState(null);
  
  // Create a memory variable to track if the side menu is open or closed
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // SCENARIO 1: The app is still checking if the user is logged in
  if (isLoading) return <div style={{ color: '#111827', padding: '50px', textAlign: 'center' }}>Loading system...</div>;
  
  // SCENARIO 2: The user is NOT logged in. Show a simple login screen.
  if (!isAuthenticated) {
    return (
      <div style={{ backgroundColor: '#F9FAFB', color: '#111827', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ padding: '40px', backgroundColor: '#FFFFFF', borderRadius: '10px', textAlign: 'center', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h2 style={{ margin: '0 0 10px 0' }}>Portal Matrix</h2>
          <p style={{ color: '#6B7280', margin: '0 0 20px 0' }}>Please sign in to access your workspaces.</p>
          <button onClick={() => loginWithRedirect()} style={{ padding: '10px 20px', backgroundColor: '#10B981', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
            Sign In
          </button>
        </div>
      </div>
    );
  }

  // SCENARIO 3: User IS logged in. Show the main app.
  return (
    <div style={{ backgroundColor: '#F9FAFB', color: '#111827', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* --- TOP NAVBAR --- */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 30px', borderBottom: '1px solid #E5E7EB', backgroundColor: '#FFFFFF' }}>
        
        {/* Left Side: Logo (Clicking it sends you back to the Hub) */}
        <div onClick={() => setActiveUrl(null)} style={{ cursor: 'pointer', fontWeight: 'bold', fontSize: '18px' }}>
          Portal Matrix
        </div>

        {/* Right Side: Menu Button & User Profile */}
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          
          {/* Only show the Menu button if a portal is actually open */}
          {activeUrl && (
            <button onClick={() => setIsSidebarOpen(true)} style={{ padding: '8px 12px', cursor: 'pointer', display: 'flex', gap: '5px', alignItems: 'center', background: '#FFFFFF', color: '#111827', border: '1px solid #E5E7EB', borderRadius: '5px' }}>
              <Menu size={16} /> Menu
            </button>
          )}

          {/* Render our User Menu component */}
          <UserMenu user={user} onLogout={() => logout({ logoutParams: { returnTo: window.location.origin } })} />
        </div>
      </div>

      {/* --- THE SIDEBAR MENU (Only shows if isSidebarOpen is true) --- */}
      {isSidebarOpen && (
        <div style={{ position: 'fixed', top: '0', right: '0', width: '250px', height: '100vh', backgroundColor: '#FFFFFF', borderLeft: '1px solid #E5E7EB', padding: '20px', zIndex: 100, boxShadow: '-4px 0 15px rgba(0,0,0,0.05)' }}>
          
          {/* Close button for Sidebar */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
            <button onClick={() => setIsSidebarOpen(false)} style={{ background: 'transparent', color: '#111827', border: 'none', cursor: 'pointer' }}><X /></button>
          </div>

          {/* Button to go back to the Main Hub */}
          <button 
            onClick={() => { setActiveUrl(null); setIsSidebarOpen(false); }} 
            style={{ width: '100%', padding: '15px', textAlign: 'left', background: '#F9FAFB', color: '#111827', border: '1px solid #E5E7EB', borderRadius: '8px', cursor: 'pointer', display: 'flex', gap: '10px', fontWeight: 'bold', marginBottom: '15px' }}
          >
            <Grid3x3 size={18} /> Hub Directory
          </button>

          {/* Loop through all our portals and make a button for each one */}
          {PORTALS.map(portal => (
            <button 
              key={portal.id}
              onClick={() => { setActiveUrl(portal.url); setIsSidebarOpen(false); }} 
              style={{ width: '100%', padding: '15px', textAlign: 'left', background: 'transparent', color: '#374151', border: 'none', cursor: 'pointer', marginTop: '5px', borderRadius: '5px' }}
            >
              {portal.title}
            </button>
          ))}
        </div>
      )}

      {/* --- MAIN SCREEN CONTENT --- */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        
        {/* If 'activeUrl' has a link in it, show the iframe. If it's null, show the Hub grid. */}
        {activeUrl ? (
          <iframe 
            src={activeUrl} 
            title="Portal" 
            style={{ width: '100%', height: '100%', border: 'none' }} 
          />
        ) : (
          <div style={{ padding: '50px', maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ color: '#111827' }}>Choose a workspace</h2>
            <p style={{ color: '#6B7280', marginBottom: '30px' }}>Select a portal to open it securely inside the hub.</p>
            
            {/* The Grid of Portal Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              
              {/* We use .map() to turn our PORTALS array data into visual cards on the screen */}
              {PORTALS.map(portal => (
                <div 
                  key={portal.id} 
                  onClick={() => setActiveUrl(portal.url)}
                  style={{ backgroundColor: '#FFFFFF', padding: '25px', borderRadius: '10px', border: '1px solid #E5E7EB', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}
                >
                  <p style={{ fontSize: '12px', color: '#059669', margin: '0 0 10px 0', fontWeight: 'bold' }}>{portal.id}</p>
                  <h3 style={{ margin: '0 0 10px 0', color: '#111827' }}>{portal.title}</h3>
                  <p style={{ margin: 0, color: '#6B7280', fontSize: '14px' }}>{portal.subtitle}</p>
                </div>
              ))}

            </div>
          </div>
        )}
        
      </div>
    </div>
  );
}
/ ==========================================
// COMPONENT 3: THE ROOT (STARTING POINT)
// ==========================================
export default function App() {
  return (
    // The Auth0Provider acts like a security blanket around our whole app.
    <Auth0Provider
      domain="dev-kds27ji4tisy6f7h.us.auth0.com"
      clientId="l3ALaDX6H4yvuKgf6Q0cqOoADBPIl2Yx"
      authorizationParams={{ redirect_uri: window.location.origin }}
    >
      <MainDashboard />
    </Auth0Provider>
  );
}
