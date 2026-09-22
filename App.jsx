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
