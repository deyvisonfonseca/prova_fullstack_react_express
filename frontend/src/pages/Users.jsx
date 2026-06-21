import React, { useState, useEffect } from 'react';
import { crudService } from '../services/api';
import { Users as UsersIcon, Plus, Edit2, Trash2, X, Loader2, AlertCircle, CheckCircle, Shield } from 'lucide-react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  
  // Estados para alertas de feedback
  const [alert, setAlert] = useState({ type: '', message: '' });

  // Estados para o controle do Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null); // null = Novo, objeto = Editando

  // Estado dos campos do formulário
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'User' // Padrão comum de nível de acesso
  });

  // Carrega os usuários ao abrir a tela
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await crudService.getAll('usuarios');
      setUsers(data || []);
    } catch (err) {
      showAlert('error', 'Erro ao carregar a lista de usuários do banco de dados.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Função auxiliar para disparar alertas temporários
  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert({ type: '', message: '' }), 4000);
  };

  // Abre o modal configurando se é criação ou edição
  const openModal = (user = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        name: user.name,
        email: user.email,
        password: '', // Senha em branco por segurança ao editar
        role: user.role || 'User'
      });
    } else {
      setEditingUser(null);
      setFormData({ name: '', email: '', password: '', role: 'User' });
    }
    setIsModalOpen(true);
  };

  // Envia os dados (Salvar ou Atualizar)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    try {
      if (editingUser) {
        // Modo Edição (Removemos a senha do payload se ela estiver vazia)
        const payload = { ...formData };
        if (!payload.password) delete payload.password;

        await crudService.update('usuarios', editingUser.id || editingUser._id, payload);
        showAlert('success', 'Usuário atualizado com sucesso!');
      } else {
        // Modo Cadastro
        if (!formData.password) {
          showAlert('error', 'A senha é obrigatória para novos usuários.');
          setSubmitLoading(false);
          return;
        }
        await crudService.create('usuarios', formData);
        showAlert('success', 'Novo usuário cadastrado com sucesso!');
      }
      setIsModalOpen(false);
      fetchUsers();
    } catch (err) {
      showAlert('error', 'Falha ao processar a requisição de usuário no servidor.');
    } finally {
      setSubmitLoading(false);
    }
  };

  // Remove um usuário
  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza de que deseja remover este usuário permanentemente?')) {
      try {
        await crudService.delete('usuarios', id);
        showAlert('success', 'Usuário removido do sistema.');
        fetchUsers();
      } catch (err) {
        showAlert('error', 'Não foi possível excluir o usuário selecionado.');
      }
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* --- TOPO DA TELA --- */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg">
            <UsersIcon className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Controle de Usuários</h1>
            <p className="text-xs text-slate-500">Gerenciamento de credenciais e níveis de acesso</p>
          </div>
        </div>
        <button
          onClick={() => openModal()}
          className="inline-flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-4 py-2.5 rounded-lg transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Novo Usuário</span>
        </button>
      </div>

      {/* --- MENSAGENS DE NOTIFICAÇÃO --- */}
      {alert.message && (
        <div className={`p-4 rounded-lg flex items-start space-x-3 border ${
          alert.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          {alert.type === 'success' ? <CheckCircle className="h-5 w-5 text-emerald-600" /> : <AlertCircle className="h-5 w-5 text-red-600" />}
          <span className="text-sm font-medium">{alert.message}</span>
        </div>
      )}

      {/* --- TABELA DE LISTAGEM --- */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      ) : (
        <div className="bg-white shadow-sm rounded-xl border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-left">
              <thead className="bg-slate-50 text-slate-500 font-medium text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Nome / E-mail</th>
                  <th className="px-6 py-4">Nível de Permissão</th>
                  <th className="px-6 py-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm text-slate-700">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center py-10 text-slate-400 font-medium">
                      Nenhum usuário cadastrado no sistema.
                    </td>
                  </tr>
                ) : (
                  users.map((userItem) => (
                    <tr key={userItem.id || userItem._id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-900">{userItem.name}</div>
                        <div className="text-xs text-slate-400">{userItem.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-bold ${
                          userItem.role === 'Admin' ? 'bg-purple-50 text-purple-700' : 'bg-slate-100 text-slate-700'
                        }`}>
                          <Shield className="h-3 w-3" />
                          <span>{userItem.role || 'User'}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button
                          onClick={() => openModal(userItem)}
                          className="p-1.5 text-slate-500 hover:text-blue-600 rounded-md hover:bg-slate-100 transition-all inline-flex"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(userItem.id || userItem._id)}
                          className="p-1.5 text-slate-500 hover:text-red-600 rounded-md hover:bg-slate-100 transition-all inline-flex"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- MODAL SUSPENSO (CADASTRAR / EDITAR) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden border border-slate-100">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-slate-900 text-lg">
                {editingUser ? 'Alterar Permissões' : 'Cadastrar Novo Usuário'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Nome Completo</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: João Silva"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">E-mail de Acesso</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="joao@empresa.com"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                  Senha {editingUser && <span className="text-slate-400 font-normal">(Deixe em branco para manter atual)</span>}
                </label>
                <input
                  type="password"
                  required={!editingUser}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Nível de Acesso (Role)</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full border border-slate-300 bg-white rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="User">Usuário Padrão (User)</option>
                  <option value="Admin">Administrador (Admin)</option>
                </select>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={submitLoading}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm flex items-center space-x-2"
                >
                  {submitLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                  <span>{editingUser ? 'Salvar Alterações' : 'Criar Conta'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Users;
