// 权限控制Hook
import { useState, useEffect } from 'react';

interface Permission {
  module: string;
  actions: string[];
}

const usePermissions = () => {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // 模拟获取权限
    setTimeout(() => {
      setPermissions([
        { module: 'orders', actions: ['read', 'write', 'delete'] },
        { module: 'inventory', actions: ['read', 'write'] },
        { module: 'users', actions: ['read'] }
      ]);
      setLoading(false);
    }, 500);
  }, []);
  
  const hasPermission = (module: string, action: string) => {
    const permission = permissions.find(p => p.module === module);
    return permission ? permission.actions.includes(action) : false;
  };
  
  return { permissions, loading, hasPermission };
};

export default usePermissions;
