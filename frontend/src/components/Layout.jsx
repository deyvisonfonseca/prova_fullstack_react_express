import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../services/api';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  LogOut, 
  Menu, 
  X 
} from 'lucide-react';

const Layout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Recupera o usuário logado para exibir no perfil (opcional)
  const userJson = localStorage.getItem('@ProvaFullstack:user');
  const user = userJson ? JSON.parse(userJson) : { name: 'Usuário' };

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  // Itens do menu para evitar repetição de código HTML
  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/usuarios', label: 'Usuários', icon: Users },
    { path: '/itens', label: 'Itens', icon: Package },
  ];

  // Função auxiliar para marcar o link ativo com destaque visual
  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      
      {/* --- NAVBAR MOBILE --- */}
      <header className="bg-slate-900 text-white flex items-center justify-between px-4 py-3 md:hidden shadow-md">
        <span className="font-bold text-lg tracking-wider">Painel FullStack</span>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-slate-300 hover:text-white focus:outline-none"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </header>

      {/* --- MENU MOBILE SUSPENSO --- */}
      {isMobileMenuOpen && (
        <div className="bg-slate-800 text-white md:hidden border-b border-slate-700 animate-fade-in">
          <nav className="px-2 pt-2 pb-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-md text-base font-medium transition-colors ${
                    isActive(item.path) ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-md text-base font-medium text-red-400 hover:bg-slate-700 hover:text-red-300 transition-colors text-left"
            >
              <LogOut className="h-5 w-5" />
              <span>Sair do Sistema</span>
            </button>
          </nav>
        </div>
      )}

      {/* --- SIDEBAR DESKTOP --- */}
      <aside className="hidden md:flex md:w-64 md:flex-col bg-slate-900 text-white shadow-xl min-h-screen">
        {/* Cabeçalho da Sidebar */}
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <span className="font-extrabold text-xl tracking-wider text-blue-400">SisFullStack</span>
        </div>

        {/* Links de Navegação */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  isActive(item.path) 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Rodapé da Sidebar (Info do Usuário e Logout) */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40">
          <div className="flex items-center justify-between">
            <div className="truncate pr-2">
              <p className="text-sm font-semibold text-slate-200 truncate">{user.name || 'Admin'}</p>
              <p className="text-xs text-slate-500 truncate">Conectado</p>
            </div>
            <button
              onClick={handleLogout}
              title="Sair"
              className="p-2 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </aside>

      {/* --- ÁREA DO CONTEÚDO PRINCIPAL --- */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-w-7xl mx-auto w-full">
        {children}
      </main>

    </div>
  );
};

export default Layout;