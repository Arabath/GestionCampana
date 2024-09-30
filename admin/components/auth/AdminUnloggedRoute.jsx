import React from 'react';
import { Navigate } from 'react-router-dom';
import { routes } from '../../../utils/paths';
import useAuth from '../../hooks/useAuth';

export default function AdminUnloggedRoute({ children }) {
  const { auth } = useAuth();

  if (auth.token) {
    return <Navigate to={routes.adminPanel} />;
  }

  return children;
}
