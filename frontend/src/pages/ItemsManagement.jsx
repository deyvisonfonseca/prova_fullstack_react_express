import React, { useState, useEffect } from 'react';
import { crudService } from '../services/api';
import { Package, Plus, Edit2, Trash2, X, Loader2, AlertCircle, CheckCircle } from 'lucide-react';

const ItemsManagement = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  
  // Estados para alertas de feedback
  const [alert, setAlert] = useState({ type: '', message: '' });

  // Estados para o controle do Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null); // null = Novo Item, objeto = Editando

  // Estado dos campos do formulário
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    quantidade: 0,
    preco: 0
  });

  // Carrega os itens ao abrir a tela
  const fetchItems = async () => {
    try {
      setLoading(true);
      const data = await crudService.getAll('itens');
      setItems(data || []);
    } catch (err) {
      showAlert('error', 'Erro ao carregar a lista de itens do banco de dados.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Função auxiliar para disparar alertas temporários
  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert({ type: '', message: '' }), 4000);
  };

  // Abre o modal configurando se é criação ou edição
  const openModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        nome: item.nome,
        descricao: item.descricao || '',
        quantidade: item.quantidade,
        preco: item.preco
      });
    } else {
      setEditingItem(null);
      setFormData({ nome: '', descricao: '', quantidade: 0, preco: 0 });
    }
    setIsModalOpen(true);
  };

  // Envia os dados (Salvar ou Atualizar)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    try {
      if (editingItem) {
        // Modo Edição
        await crudService.update('itens', editingItem.id || editingItem._id, formData);
        showAlert('success', 'Item atualizado com sucesso!');
      } else {
        // Modo Cadastro
        await crudService.create('itens', formData);
        showAlert('success', 'Novo item cadastrado com sucesso!');
      }
      setIsModalOpen(false);
      fetchItems(); // Atualiza a lista
    } catch (err) {
      showAlert('error', 'Falha ao processar a requisição no servidor.');
    } finally {
      setSubmitLoading(false);
    }
  };

  // Remove um item
  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza de que deseja remover este item permanentemente?')) {
      try {
        await crudService.delete('itens', id);
        showAlert('success', 'Item removido do inventário.');
        fetchItems();
      } catch (err) {
        showAlert('error', 'Não foi possível excluir o item selecionado.');
      }
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* --- TOPO DA TELA --- */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-lg">
            <Package className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Gerenciamento de Itens</h1>
            <p className="text-xs text-slate-500">Controle completo do inventário físico de produtos</p>
          </div>
        </div>
        <button
          onClick={() => openModal()}
          className="inline-flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-4 py-2.5 rounded-lg transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Novo Item</span>
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
                  <th className="px-6 py-4">Nome / Descrição</th>
                  <th className="px-6 py-4">Qtd. em Estoque</th>
                  <th className="px-6 py-4">Preço Unitário</th>
                  <th className="px-6 py-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm text-slate-700">
                {items.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-10 text-slate-400 font-medium">
                      Nenhum item encontrado no sistema.
                    </td>
                  </tr>
                ) : (
                  items.map((item) => (
                    <tr key={item.id || item._id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-900">{item.nome}</div>
                        <div className="text-xs text-slate-400 max-w-xs truncate">{item.descricao || 'Sem descrição'}</div>
                      </td>
                      <td className="px-6 py-4 font-medium">
                        <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                          item.quantidade > 5 ? 'bg-slate-100 text-slate-700' : 'bg-amber-50 text-amber-700'
                        }`}>
                          {item.quantidade} un
                        </span>
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-950">
                        R$ {Number(item.preco).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button
                          onClick={() => openModal(item)}
                          className="p-1.5 text-slate-500 hover:text-blue-600 rounded-md hover:bg-slate-100 transition-all inline-flex"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id || item._id)}
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
                {editingItem ? 'Editar Registro' : 'Cadastrar Novo Item'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Nome do Item</label>
                <input
                  type="text"
                  required
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: Teclado Mecânico RGB"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Descrição</label>
                <textarea
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Breve descrição sobre o item..."
                  rows="2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Quantidade</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.quantidade}
                    onChange={(e) => setFormData({ ...formData, quantidade: parseInt(e.target.value) || 0 })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Preço (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    min="0"
                    value={formData.preco}
                    onChange={(e) => setFormData({ ...formData, preco: parseFloat(e.target.value) || 0 })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
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
                  <span>{editingItem ? 'Salvar Alterações' : 'Cadastrar'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ItemsManagement;