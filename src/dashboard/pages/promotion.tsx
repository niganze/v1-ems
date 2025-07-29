import { useState } from 'react';

interface Promotion {
  id: number;
  name: string;
  percentage: number;
}

const initialPromotions: Promotion[] = [
  { id: 1, name: 'Summer Sale', percentage: 20 },
  { id: 2, name: 'VIP Upgrade', percentage: 35 },
];

const PromotionDashboard = () => {
  const [promotions, setPromotions] = useState<Promotion[]>(initialPromotions);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [currentPromotion, setCurrentPromotion] = useState<Promotion | null>(null);

  const handleAdd = () => {
    setCurrentPromotion({ id: Date.now(), name: '', percentage: 0 });
    setModalMode('add');
    setShowModal(true);
  };

  const handleEdit = (promo: Promotion) => {
    setCurrentPromotion(promo);
    setModalMode('edit');
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    setPromotions(promotions.filter(p => p.id !== id));
  };

  const handleModalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentPromotion) return;
    setCurrentPromotion({ ...currentPromotion, [e.target.name]: e.target.value });
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPromotion) return;
    if (modalMode === 'add') {
      setPromotions([...promotions, { ...currentPromotion, percentage: Number(currentPromotion.percentage) }]);
    } else {
      setPromotions(promotions.map(p => (p.id === currentPromotion.id ? { ...currentPromotion, percentage: Number(currentPromotion.percentage) } : p)));
    }
    setShowModal(false);
    setCurrentPromotion(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-2xl w-full flex flex-col items-center text-center">
        <h1 className="text-2xl font-bold text-emsPurple mb-2">Promotion Management</h1>
        <p className="text-gray-600 mb-6">Create, update, or delete your business promotions. Set the promotion name and percentage.</p>
        <div className="w-full flex justify-end mb-4">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200" onClick={handleAdd}>
            + Add Promotion
          </button>
        </div>
        <div className="w-full overflow-x-auto bg-white rounded-xl shadow p-4">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-emsBlue/80">
                <th className="py-2 px-4 font-semibold">Name</th>
                <th className="py-2 px-4 font-semibold">Percentage (%)</th>
                <th className="py-2 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {promotions.map(promo => (
                <tr key={promo.id} className="border-b border-emsBlue/10 last:border-0">
                  <td className="py-2 px-4 font-medium text-gray-900">{promo.name}</td>
                  <td className="py-2 px-4 text-gray-600">{promo.percentage}%</td>
                  <td className="py-2 px-4 flex gap-2">
                    <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200" onClick={() => handleEdit(promo)}>Edit</button>
                    <button className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200" onClick={() => handleDelete(promo.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
              <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-700" onClick={() => setShowModal(false)}>&times;</button>
              <h2 className="text-xl font-bold mb-4">{modalMode === 'add' ? 'Add Promotion' : 'Edit Promotion'}</h2>
              <form onSubmit={handleModalSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Promotion Name</label>
                  <input type="text" name="name" value={currentPromotion?.name || ''} onChange={handleModalChange} className="w-full border border-gray-300 rounded px-3 py-2" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Percentage (%)</label>
                  <input type="number" name="percentage" min={0} max={100} value={currentPromotion?.percentage || 0} onChange={handleModalChange} className="w-full border border-gray-300 rounded px-3 py-2" required />
                </div>
                <div className="flex justify-end gap-2">
                  <button type="button" className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded hover:shadow-lg">{modalMode === 'add' ? 'Add' : 'Save'}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromotionDashboard; 