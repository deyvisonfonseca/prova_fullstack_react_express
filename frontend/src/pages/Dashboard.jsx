import React, { useState, useEffect } from 'react';
import { crudService } from '../services/api';
import { Users, Package, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({ totalUsers: 0, totalItems: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Recupera as informações do usuário logado salvas no Login
  const userJson = localStorage.getItem('@ProvaFullstack:user');
  const user = userJson ? JSON.parse(userJson) : { name: 'Usuário', role: 'User' };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Consome as rotas protegidas do backend de forma paralela
        const [usersData, itemsData] = await Promise.all([
          crudService.getAll('usuarios'),
          crudService.getAll('itens')
        ]);

        setStats({
          totalUsers: usersData.length || 0,
          totalItems: itemsData.length || 0
        });
      } catch (err) {
        console.error('Erro ao carregar dados do dashboard:', err);
        setError('Não foi possível carregar os dados operacionais em tempo real.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* --- CABEÇALHO DE BOAS-VINDAS --- */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Olá, {user.name}! 👋
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Seja bem-vindo ao painel de controle. Aqui está o resumo do seu sistema.
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-semibold self-start md:self-auto">
          <ShieldCheck className="h-5 w-5" />
          <span>Nível de Acesso: {user.role || 'Administrador'}</span>
        </div>
      </div>

      {/* --- AVISO DE ERRO (Caso o Back esteja offline) --- */}
      {error && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-md flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-amber-800">Aviso do Sistema</h3>
            <p className="mt-1 text-sm text-amber-700">{error}</p>
          </div>
        </div>
      )}

      {/* --- CARDS DE RESUMO OPERACIONAL --- */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="flex flex-col items-center space-y-3 text-slate-500">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-sm font-medium">Sincronizando com o backend...</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2">
          
          {/* Card de Usuários */}
          <div className="bg-white overflow-hidden shadow-sm rounded-xl border border-slate-100 hover:shadow-md transition-shadow">
            <div className="p-5 flex items-center">
              <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
                <Users className="h-6 w-6" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-slate-500 truncate">
                    Usuários Cadastrados
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-3xl font-semibold text-slate-900">
                      {stats.totalUsers}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
            <div className="bg-slate-50/50 px-5 py-3 border-t border-slate-100">
              <span className="text-xs font-medium text-blue-600 hover:text-blue-700">
                Controle de acessos e permissões
              </span>
            </div>
          </div>

          {/* Card de Itens */}
          <div className="bg-white overflow-hidden shadow-sm rounded-xl border border-slate-100 hover:shadow-md transition-shadow">
            <div className="p-5 flex items-center">
              <div className="p-3 rounded-lg bg-emerald-50 text-emerald-600">
                <Package className="h-6 w-6" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-slate-500 truncate">
                    Itens Registrados
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-3xl font-semibold text-slate-900">
                      {stats.totalItems}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
            <div className="bg-slate-50/50 px-5 py-3 border-t border-slate-100">
              <span className="text-xs font-medium text-emerald-600 hover:text-emerald-700">
                Gerenciamento do inventário geral
              </span>
            </div>
          </div>

        </div>
      )}

      {/* --- BOX INFORMATIVO DE EXECUÇÃO --- */}
      <div className="bg-slate-800 text-slate-300 p-6 rounded-xl shadow-sm space-y-3">
        <h3 className="text-base font-semibold text-white">Status de Infraestrutura (Docker)</h3>
        <p className="text-sm text-slate-400">
          Esta interface está rodando em ambiente isolado via container e consumindo os endpoints parametrizados através de variáveis de ambiente de forma transparente.
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          <span className="px-2.5 py-1 text-xs font-medium bg-slate-700 text-slate-200 rounded-md">React 18</span>
          <span className="px-2.5 py-1 text-xs font-medium bg-slate-700 text-slate-200 rounded-md">TailwindCSS 3</span>
          <span className="px-2.5 py-1 text-xs font-medium bg-slate-700 text-slate-200 rounded-md">Vite Server</span>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;