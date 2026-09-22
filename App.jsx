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
