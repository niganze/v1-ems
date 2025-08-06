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
    video: 'https://www.youtube.com/embed/ScMzIvxBSi4',
  },
  {
    id: 2,
    title: 'Tech Expo 2025',
    date: '2025-09-01',
    location: 'Kigali Convention Center',
    desc: 'Discover innovations in AI, robotics, and IoT.',
    video: 'https://www.youtube.com/embed/ZTmxKONjz0I',
  },
  {
    id: 3,
    title: 'Green Rwanda Conference',
    date: '2025-10-15',
    location: 'Serena Hotel',
    desc: 'Sustainability and environmental protection talks.',
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    id: 4,
    title: 'Fashion Week Kigali',
    date: '2025-08-25',
    location: 'Kigali City Tower',
    desc: 'A week of fashion, designers, and glam.',
    video: 'https://www.youtube.com/embed/fash456',
  },
  {
    id: 5,
    title: 'Youth Empowerment Summit',
    date: '2025-11-05',
    location: 'Kigali Heights',
    desc: 'Empowering young leaders and entrepreneurs.',
    video: 'https://www.youtube.com/embed/emp789',
  },
  {
    id: 6,
    title: 'Startup Pitch Night',
    date: '2025-09-20',
    location: 'Norrsken House',
    desc: 'Watch top startups pitch their ideas.',
    video: 'https://www.youtube.com/embed/start987',
  },
  {
    id: 7,
    title: 'Cultural Heritage Day',
    date: '2025-10-01',
    location: 'Museum of Rwanda',
    desc: 'Celebrate Rwanda’s rich heritage and traditions.',
    video: 'https://www.youtube.com/embed/cult001',
  },
];

const NewsDashboard = () => {
  const [newsList, setNewsList] = useState<News[]>(initialNews);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [currentNews, setCurrentNews] = useState<News | null>(null);

  const handleDelete = (id: number) => {
    setNewsList(newsList.filter(n => n.id !== id));
  };

  const handleEdit = (item: News) => {
    setCurrentNews(item);
    setModalMode('edit');
    setShowModal(true);
  };

  const handleAdd = () => {
    setCurrentNews({ id: Date.now(), title: '', date: '', location: '', desc: '', video: '' });
    setModalMode('add');
    setShowModal(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!currentNews) return;
    setCurrentNews({ ...currentNews, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentNews) return;
    if (modalMode === 'add') {
      setNewsList([...newsList, currentNews]);
    } else {
      setNewsList(newsList.map(n => (n.id === currentNews.id ? currentNews : n)));
    }
    setShowModal(false);
    setCurrentNews(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
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
            <tr className="text-left text-gray-700">
              <th className="py-2 px-4 font-semibold">Video</th>
              <th className="py-2 px-4 font-semibold">Title</th>
              <th className="py-2 px-4 font-semibold">Date</th>
              <th className="py-2 px-4 font-semibold">Location</th>
              <th className="py-2 px-4 font-semibold">Description</th>
              <th className="py-2 px-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {newsList.map(news => (
              <tr key={news.id} className="border-b last:border-0">
                <td className="py-2 px-4">
                  <iframe
                    src={news.video}
                    title={news.title}
                    className="w-32 h-20 rounded"
                    allowFullScreen
                  />
                </td>
                <td className="py-2 px-4 font-medium text-gray-900">{news.title}</td>
                <td className="py-2 px-4 text-gray-700">{news.date}</td>
                <td className="py-2 px-4 text-gray-700">{news.location}</td>
                <td className="py-2 px-4 text-gray-600 max-w-xs truncate">{news.desc}</td>
                <td className="py-2 px-4 flex gap-2">
                  <button
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                    onClick={() => handleEdit(news)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                    onClick={() => handleDelete(news.id)}
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
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">{modalMode === 'add' ? 'Add News' : 'Edit News'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                value={currentNews?.title || ''}
                onChange={handleChange}
                placeholder="Title"
                required
                className="w-full border rounded px-3 py-2"
              />
              <input
                type="date"
                name="date"
                value={currentNews?.date || ''}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2"
              />
              <input
                type="text"
                name="location"
                value={currentNews?.location || ''}
                onChange={handleChange}
                placeholder="Location"
                required
                className="w-full border rounded px-3 py-2"
              />
              <textarea
                name="desc"
                value={currentNews?.desc || ''}
                onChange={handleChange}
                placeholder="Description"
                required
                className="w-full border rounded px-3 py-2"
              />
              <input
                type="text"
                name="video"
                value={currentNews?.video || ''}
                onChange={handleChange}
                placeholder="YouTube embed URL (https://www.youtube.com/embed/...)"
                required
                className="w-full border rounded px-3 py-2"
              />
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
