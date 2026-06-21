import CrudPage from './CrudPage.jsx';

export default function Cars() {
  return (
    <CrudPage
      title="Carros"
      description="CRUD de carros armazenados no MongoDB."
      endpoint="/cars"
      idField="_id"
      emptyForm={{
        modelo: '',
        marca: '',
        ano: 2020,
        cor: '',
        preco: 0
      }}
      columns={[
        { key: 'modelo', label: 'Modelo' },
        { key: 'marca', label: 'Marca' },
        { key: 'ano', label: 'Ano' },
        { key: 'cor', label: 'Cor' },
        { key: 'preco', label: 'Preço' }
      ]}
      fields={[
        { name: 'modelo', label: 'Modelo' },
        { name: 'marca', label: 'Marca' },
        { name: 'ano', label: 'Ano', type: 'number' },
        { name: 'cor', label: 'Cor' },
        { name: 'preco', label: 'Preço', type: 'number' }
      ]}
    />
  );
}