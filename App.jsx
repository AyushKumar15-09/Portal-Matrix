// 1. IMPORTING TOOLS
// We bring in React and useState (a tool to help React remember things, like if the sidebar is open).
import React, { useState } from 'react';
// We bring in Auth0 tools to handle user login safely.
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
// We bring in a few simple icons for our buttons.
import { LogOut, Menu, Grid3x3, X } from 'lucide-react';
