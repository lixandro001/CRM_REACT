import React from 'react';
import { useEffect } from 'react';
import { useToken } from '../../../hooks/useToken';
const DashboardSupervisor = () => {
  const { isAuth } = useToken();

  useEffect(() => {
    console.log('VALRO DE IS AUTH');
    console.log(isAuth);
    if (!isAuth) {
      console.log('ESTOY INACTIVO');
      localStorage.clear();
      window.location.href = '/';
    }
  }, [isAuth]);
  return <div>DashboardSupervisor</div>;
};

export default DashboardSupervisor;
