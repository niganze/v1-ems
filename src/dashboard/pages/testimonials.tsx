import React, { useState } from 'react';

interface Testimonial {
  id: number;
  title: string;
  description: string;
  author: string;
  date: string;
  rating: number;
}

const initialTestimonials: Testimonial[] = [
  {
    id: 1,
    title: 'Amazing Event Experience',
    description: 'The event was well organized and exceeded my expectations. Highly recommended!',
    author: 'Jane Doe',
    date: '2024-06-10',
    rating: 5,
  },
  {
    id: 2,
    title: 'Great Support',
    description: 'The team was very supportive and responsive throughout the event.',
    author: 'John Smith',
    date: '2024-05-22',
    rating: 4,
  },
];

const TestimonialsDashboard = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [currentTestimonial, setCurrentTestimonial] = useState<Testimonial | null>(null);

  const handleDelete = (id: number) => {
    setTestimonials(testimonials.filter(t => t.id !== id));
  };

  const handleEdit = (t: Testimonial) => {
    setCurrentTestimonial(t);
    setModalMode('edit');
    setShowModal(true);
  };

  const handleAdd = () => {
    setCurrentTestimonial({ id: Date.now(), title: '', description: '', author: '', date: '', rating: 5 });
    setModalMode('add');
    setShowModal(true);
  };

  const handleModalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!currentTestimonial) return;
    setCurrentTestimonial({ ...currentTestimonial, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentTestimonial) return;
    setCurrentTestimonial({ ...currentTestimonial, rating: Number(e.target.value) });
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentTestimonial) return;
    if (modalMode === 'add') {
      setTestimonials([...testimonials, currentTestimonial]);
    } else {
      setTestimonials(testimonials.map(t => (t.id === currentTestimonial.id ? currentTestimonial : t)));
    }
    setShowModal(false);
    setCurrentTestimonial(null);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-end mb-6">
        <button
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200"
          onClick={handleAdd}
        >
          Add Testimonial
        </button>
      </div>
      <div className="overflow-x-auto bg-white rounded-xl shadow p-4">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-emsBlue/80">
              <th className="py-2 px-4 font-semibold">Title</th>
              <th className="py-2 px-4 font-semibold">Description</th>
              <th className="py-2 px-4 font-semibold">Author</th>
              <th className="py-2 px-4 font-semibold">Date</th>
              <th className="py-2 px-4 font-semibold">Rating</th>
              <th className="py-2 px-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map(t => (
              <tr key={t.id} className="border-b border-emsBlue/10 last:border-0">
                <td className="py-2 px-4 font-medium text-gray-900">{t.title}</td>
                <td className="py-2 px-4 text-gray-600 max-w-xs truncate">{t.description}</td>
                <td className="py-2 px-4 text-gray-600">{t.author}</td>
                <td className="py-2 px-4 text-gray-600">{t.date}</td>
                <td className="py-2 px-4 text-yellow-500 font-bold">{'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}</td>
                <td className="py-2 px-4 flex gap-2">
                  <button
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                    onClick={() => handleEdit(t)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                    onClick={() => handleDelete(t.id)}
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
            <h2 className="text-xl font-bold mb-4">{modalMode === 'add' ? 'Add Testimonial' : 'Edit Testimonial'}</h2>
            <form onSubmit={handleModalSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={currentTestimonial?.title || ''}
                  onChange={handleModalChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  value={currentTestimonial?.description || ''}
                  onChange={handleModalChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Author</label>
                <input
                  type="text"
                  name="author"
                  value={currentTestimonial?.author || ''}
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
                  value={currentTestimonial?.date || ''}
                  onChange={handleModalChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Rating (1-5)</label>
                <input
                  type="number"
                  name="rating"
                  min={1}
                  max={5}
                  value={currentTestimonial?.rating || 5}
                  onChange={handleRatingChange}
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

export default TestimonialsDashboard; 