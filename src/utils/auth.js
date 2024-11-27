export const hasPermission = (user, requiredPermission) => {
    return user.permissions.includes(requiredPermission);
  };
  