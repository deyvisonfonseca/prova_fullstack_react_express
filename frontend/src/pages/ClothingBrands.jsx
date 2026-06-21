import CrudPage from './CrudPage.jsx';

export default function ClothingBrands() {
  return (
    <CrudPage
      title="Marcas de Roupa"
      description="CRUD de marcas de roupa armazenadas no MongoDB."
      endpoint="/clothing-brands"
      idField="_id"
      emptyForm={{
        nome: '',
        segmento: '',
        paisOrigem: '',
        anoFundacao: 2000
      }}
      columns={[
        { key: 'nome', label: 'Nome' },
        { key: 'segmento', label: 'Segmento' },
        { key: 'paisOrigem', label: 'País de Origem' },
        { key: 'anoFundacao', label: 'Ano de Fundação' }
      ]}
      fields={[
        { name: 'nome', label: 'Nome' },
        { name: 'segmento', label: 'Segmento' },
        { name: 'paisOrigem', label: 'País de Origem' },
        { name: 'anoFundacao', label: 'Ano de Fundação', type: 'number' }
      ]}
    />
  );
}