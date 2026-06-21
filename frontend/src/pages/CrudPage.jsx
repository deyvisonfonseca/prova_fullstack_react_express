import { useEffect, useMemo, useState } from 'react';
import Alert from '../components/Alert.jsx';
import DataTable from '../components/DataTable.jsx';
import FormField from '../components/FormField.jsx';
import Modal from '../components/Modal.jsx';
import PageHeader from '../components/PageHeader.jsx';
import api from '../services/api.js';
import { formatError } from '../utils/formatError.js';

export default function CrudPage({
  title,
  description,
  endpoint,
  columns,
  fields,
  emptyForm,
  idField = '_id'
}) {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const formTitle = useMemo(() => (
    editing ? `Editar ${title}` : `Cadastrar ${title}`
  ), [editing, title]);

  async function loadItems() {
    setLoading(true);
    try {
      const response = await api.get(endpoint);
      setItems(Array.isArray(response.data) ? response.data : response.data.data || []);
    } catch (error) {
      setAlert({ type: 'error', message: formatError(error) });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadItems();
  }, [endpoint]);

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEdit(item) {
    setEditing(item);
    const nextForm = { ...emptyForm };

    fields.forEach((field) => {
      nextForm[field.name] = item[field.name] ?? '';
    });

    setForm(nextForm);
    setModalOpen(true);
  }

  function handleChange(event) {
    const { name, value, type } = event.target;
    setForm({
      ...form,
      [name]: type === 'number' ? Number(value) : value
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setAlert({ type: '', message: '' });

    try {
      if (editing) {
        await api.put(`${endpoint}/${editing[idField] || editing.id}`, form);
        setAlert({ type: 'success', message: 'Registro atualizado com sucesso.' });
      } else {
        await api.post(endpoint, form);
        setAlert({ type: 'success', message: 'Registro cadastrado com sucesso.' });
      }

      setModalOpen(false);
      await loadItems();
    } catch (error) {
      setAlert({ type: 'error', message: formatError(error) });
    }
  }

  async function handleDelete(item) {
    const confirmed = window.confirm('Deseja realmente remover este registro?');

    if (!confirmed) return;

    try {
      await api.delete(`${endpoint}/${item[idField] || item.id}`);
      setAlert({ type: 'success', message: 'Registro removido com sucesso.' });
      await loadItems();
    } catch (error) {
      setAlert({ type: 'error', message: formatError(error) });
    }
  }

  return (
    <>
      <PageHeader
        title={title}
        description={description}
        actionLabel="Cadastrar"
        onAction={openCreate}
      />

      <Alert
        type={alert.type || 'info'}
        message={alert.message}
        onClose={() => setAlert({ type: '', message: '' })}
      />

      {loading ? (
        <div className="rounded-2xl border bg-white p-8 text-center text-slate-600 shadow-sm">
          Carregando registros...
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={items}
          onEdit={openEdit}
          onDelete={handleDelete}
          idField={idField}
        />
      )}

      {modalOpen && (
        <Modal title={formTitle} onClose={() => setModalOpen(false)}>
          <form onSubmit={handleSubmit} className="grid gap-4">
            {fields.map((field) => (
              <FormField
                key={field.name}
                label={field.label}
                name={field.name}
                value={form[field.name]}
                type={field.type || 'text'}
                options={field.options}
                required={field.required !== false}
                onChange={handleChange}
              />
            ))}

            <div className="flex justify-end gap-3 border-t pt-4">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Salvar
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}
