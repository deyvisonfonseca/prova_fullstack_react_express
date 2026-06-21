export default function DataTable({ columns, data, onEdit, onDelete, idField = 'id' }) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-600">
                  {column.label}
                </th>
              ))}
              <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-wide text-slate-600">
                Ações
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 bg-white">
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-4 py-8 text-center text-sm text-slate-500">
                  Nenhum registro encontrado.
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item[idField] || item._id} className="hover:bg-slate-50">
                  {columns.map((column) => (
                    <td key={column.key} className="whitespace-nowrap px-4 py-3 text-sm text-slate-700">
                      {item[column.key]}
                    </td>
                  ))}
                  <td className="whitespace-nowrap px-4 py-3 text-right text-sm">
                    <button
                      onClick={() => onEdit(item)}
                      className="mr-2 rounded-lg border border-blue-200 px-3 py-1 font-medium text-blue-700 hover:bg-blue-50"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => onDelete(item)}
                      className="rounded-lg border border-red-200 px-3 py-1 font-medium text-red-700 hover:bg-red-50"
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
