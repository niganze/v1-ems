import React, { useState } from 'react';

interface News {
  id: number;
  title: string;
  date: string;
  location: string;
  desc: string;
  video: string;
}

const initialNews: News[] = [
  {
    id: 1,
    title: 'Summer Music Festival',
    date: '2025-08-10',
    location: 'Kigali Arena',
    desc: 'Join us for a day of music, food, and fun with top artists and DJs.',
    video: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
  },
  {
    id: 2,
    title: 'Business Expo 2025',
    date: '2025-09-05',
    location: 'Kigali Convention Center',
    desc: 'Network with industry leaders and discover new business opportunities.',
    video: 'https://www.youtube.com/watch?v=I1EkMUWNz-4',
  },
];

const NewsDashboard = () => {
  const [news, setNews] = useState<News[]>(initialNews);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [currentNews, setCurrentNews] = useState<News | null>(null);

  const handleDelete = (id: number) => {
    setNews(news.filter(n => n.id !== id));
  };

  const handleEdit = (n: News) => {
    setCurrentNews(n);
    setModalMode('edit');
    setShowModal(true);
  };

  const handleAdd = () => {
    setCurrentNews({ id: Date.now(), title: '', date: '', location: '', desc: '', video: '' });
    setModalMode('add');
    setShowModal(true);
  };

  const handleModalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!currentNews) return;
    setCurrentNews({ ...currentNews, [e.target.name]: e.target.value });
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentNews) return;
    if (modalMode === 'add') {
      setNews([...news, currentNews]);
    } else {
      setNews(news.map(n => (n.id === currentNews.id ? currentNews : n)));
    }
    setShowModal(false);
    setCurrentNews(null);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-end mb-6">
        <button
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200"
          onClick={handleAdd}
        >
          Add News
        </button>
      </div>
      <div className="overflow-x-auto bg-white rounded-xl shadow p-4">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-emsBlue/80">
              <th className="py-2 px-4 font-semibold">Title</th>
              <th className="py-2 px-4 font-semibold">Date</th>
              <th className="py-2 px-4 font-semibold">Location</th>
              <th className="py-2 px-4 font-semibold">Description</th>
              <th className="py-2 px-4 font-semibold">Video</th>
              <th className="py-2 px-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {news.map(n => (
              <tr key={n.id} className="border-b border-emsBlue/10 last:border-0">
                <td className="py-2 px-4 font-medium text-gray-900">{n.title}</td>
                <td className="py-2 px-4 text-gray-600">{n.date}</td>
                <td className="py-2 px-4 text-gray-600">{n.location}</td>
                <td className="py-2 px-4 text-gray-600 max-w-xs truncate">{n.desc}</td>
                <td className="py-2 px-4 text-blue-600 underline">
                  <a href={n.video} target="_blank" rel="noopener noreferrer">Video</a>
                </td>
                <td className="py-2 px-4 flex gap-2">
                  <button
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                    onClick={() => handleEdit(n)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                    onClick={() => handleDelete(n.id)}
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
            <h2 className="text-xl font-bold mb-4">{modalMode === 'add' ? 'Add News' : 'Edit News'}</h2>
            <form onSubmit={handleModalSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={currentNews?.title || ''}
                  onChange={handleModalChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  value={currentNews?.date || ''}
                  onChange={handleModalChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={currentNews?.location || ''}
                  onChange={handleModalChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  name="desc"
                  value={currentNews?.desc || ''}
                  onChange={handleModalChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Video URL</label>
                <input
                  type="text"
                  name="video"
                  value={currentNews?.video || ''}
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

export default NewsDashboard; 