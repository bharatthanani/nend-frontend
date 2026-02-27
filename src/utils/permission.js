export function hasPermission(path, method) {
  const permissions = JSON.parse(localStorage.getItem('permissions')) || [];
  return permissions.some(p => p.path === path && p.method === method);
}