import CrudPage from './CrudPage.jsx';

export default function Motos() {
  return (
    <CrudPage
      title="Motos"
      description="CRUD de motos armazenadas no MongoDB."
      endpoint="/motos"
      idField="_id"
      emptyForm={{
        modelo: '',
        marca: '',
        cilindradas: 150,
        ano: 2024,
        preco: 0
      }}
      columns={[
        { key: 'modelo', label: 'Modelo' },
        { key: 'marca', label: 'Marca' },
        { key: 'cilindradas', label: 'Cilindradas' },
        { key: 'ano', label: 'Ano' },
        { key: 'preco', label: 'Preço' }
      ]}
      fields={[
        { name: 'modelo', label: 'Modelo' },
        { name: 'marca', label: 'Marca' },
        { name: 'cilindradas', label: 'Cilindradas', type: 'number' },
        { name: 'ano', label: 'Ano', type: 'number' },
        { name: 'preco', label: 'Preço', type: 'number' }
      ]}
    />
  );
}