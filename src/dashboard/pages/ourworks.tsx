import React, { useState } from 'react';

interface Work {
  id: number;
  title: string;
  desc: string;
  img: string;
  category: string;
}

const initialWorks: Work[] = [
  {
    id: 1,
    title: 'Riviera 2023 Graduation',
    desc: 'Riviera High school Class of 2023 15th Graduation',
    img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=600&q=80',
    category: 'Conference Events',
  },
  {
    id: 2,
    title: 'Tech Expo 2024',
    desc: 'Annual technology exhibition for startups and innovators.',
    img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
    category: 'Exhibition',
  },
  {
    id: 3,
    title: 'MTN MoMotima Campaign',
    desc: 'MTN MoMotima Campaign Launch event',
    img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80',
    category: 'Product Launch Events',
  },
  {
    id: 4,
    title: 'CHOGM Kigali, Rwanda',
    desc: 'Commonwealth Sustainable Cities Initiative Side Event',
    img: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=600&q=80',
    category: 'Corporate Events',
  },
  {
    id: 5,
    title: 'Hybrid Tech Expo',
    desc: 'A hybrid event with both in-person and virtual attendees.',
    img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80',
    category: 'Hybrid Events',
  },
  {
    id: 6,
    title: 'Annual Business Exhibition',
    desc: 'Showcasing the best of local business and innovation.',
    img: 'https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?auto=format&fit=crop&w=600&q=80',
    category: 'Exhibitions Events',
  },
  {
    id: 7,
    title: 'Tech Product Launch',
    desc: 'Launch of a new tech product with live demos and media coverage.',
    img: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=600&q=80',
    category: 'Product Launch Events',
  },
];

const OurWorksDashboard = () => {
  const [works, setWorks] = useState<Work[]>(initialWorks);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [currentWork, setCurrentWork] = useState<Work | null>(null);

  const handleDelete = (id: number) => {
    setWorks(works.filter(work => work.id !== id));
  };

  const handleEdit = (work: Work) => {
    setCurrentWork(work);
    setModalMode('edit');
    setShowModal(true);
  };

  const handleAdd = () => {
    setCurrentWork({ id: Date.now(), title: '', desc: '', img: '', category: '' });
    setModalMode('add');
    setShowModal(true);
  };

  const handleModalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!currentWork) return;
    setCurrentWork({ ...currentWork, [e.target.name]: e.target.value });
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentWork) return;
    if (modalMode === 'add') {
      setWorks([...works, currentWork]);
    } else {
      setWorks(works.map(w => (w.id === currentWork.id ? currentWork : w)));
    }
    setShowModal(false);
    setCurrentWork(null);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-end mb-6">
        <button
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200"
          onClick={handleAdd}
        >
          Add Work
        </button>
      </div>
      
      <div className="overflow-x-auto bg-white rounded-xl shadow p-4">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-emsBlue/80">
              <th className="py-2 px-4 font-semibold">Image</th>
              <th className="py-2 px-4 font-semibold">Title</th>
              <th className="py-2 px-4 font-semibold">Description</th>
              <th className="py-2 px-4 font-semibold">Category</th>
              <th className="py-2 px-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {works.map(work => (
              <tr key={work.id} className="border-b border-emsBlue/10 last:border-0">
                <td className="py-2 px-4">
                  <img src={work.img} alt={work.title} className="h-12 w-20 object-cover rounded" />
                </td>
                <td className="py-2 px-4 font-medium text-gray-900">{work.title}</td>
                <td className="py-2 px-4 text-gray-600 max-w-xs truncate">{work.desc}</td>
                <td className="py-2 px-4 text-gray-600">{work.category}</td>
                <td className="py-2 px-4 flex gap-2">
                  <button
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                    onClick={() => handleEdit(work)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                    onClick={() => handleDelete(work.id)}
                  >
                    Delete
                  </button>
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
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">{modalMode === 'add' ? 'Add Work' : 'Edit Work'}</h2>
            <form onSubmit={handleModalSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={currentWork?.title || ''}
                  onChange={handleModalChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  name="desc"
                  value={currentWork?.desc || ''}
                  onChange={handleModalChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <input
                  type="text"
                  name="img"
                  value={currentWork?.img || ''}
                  onChange={handleModalChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <input
                  type="text"
                  name="category"
                  value={currentWork?.category || ''}
                  onChange={handleModalChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded hover:shadow-lg"
                >
                  {modalMode === 'add' ? 'Add' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OurWorksDashboard; 