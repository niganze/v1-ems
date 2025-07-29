import React, { useState } from 'react';

const initialEvents = [
  {
    title: 'Summer Music Festival',
    date: '2025-08-10',
    location: 'Kigali Arena',
    desc: 'Join us for a day of music, food, and fun with top artists and DJs.',
    video: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
  },
  {
    title: 'Business Expo 2025',
    date: '2025-09-05',
    location: 'Kigali Convention Center',
    desc: 'Network with industry leaders and discover new business opportunities.',
    video: 'https://www.youtube.com/watch?v=I1EkMUWNz-4',
  },
  {
    title: 'Charity Gala Night',
    date: '2025-10-12',
    location: 'Serena Hotel',
    desc: 'An elegant evening supporting local charities with live entertainment and auctions.',
    video: 'https://www.youtube.com/watch?v=ysz5S6PUM-U',
  },
  {
    title: 'Tech Innovators Summit',
    date: '2025-11-20',
    location: 'Kigali Tech Park',
    desc: 'Explore the latest in technology and innovation with industry leaders.',
    video: 'https://www.youtube.com/watch?v=ktvTqknDobU',
  },
  {
    title: 'Food & Wine Expo',
    date: '2025-12-05',
    location: 'Downtown Kigali',
    desc: 'Taste the best food and wine from local and international vendors.',
    video: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
  },
  {
    title: 'Art & Culture Fair',
    date: '2026-01-15',
    location: 'Kigali Arts Center',
    desc: 'Celebrate art, music, and culture with exhibitions and live performances.',
    video: 'https://www.youtube.com/watch?v=VYOjWnS4cMY',
  },
  {
    title: 'Green Future Forum',
    date: '2026-02-10',
    location: 'Eco Park',
    desc: 'Join the conversation on sustainability and green innovation.',
    video: 'https://www.youtube.com/watch?v=2Vv-BfVoq4g',
  },
  {
    title: 'Startup Pitch Night',
    date: '2026-03-08',
    location: 'Innovation Hub',
    desc: 'Watch startups pitch their ideas to investors and win prizes.',
    video: 'https://www.youtube.com/watch?v=3JZ_D3ELwOQ',
  },
  {
    title: 'Health & Wellness Expo',
    date: '2026-04-12',
    location: 'Kigali Health Center',
    desc: 'Discover the latest in health, wellness, and fitness trends.',
    video: 'https://www.youtube.com/watch?v=UceaB4D0jpo',
  },
  {
    title: 'Film Festival',
    date: '2026-05-20',
    location: 'Kigali Cinema',
    desc: 'Enjoy screenings of local and international films and meet the filmmakers.',
    video: 'https://www.youtube.com/watch?v=6Dh-RL__uN4',
  },
];

const EventsDashboard = () => {
  const [events, setEvents] = useState(initialEvents);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    title: '',
    date: '',
    location: '',
    desc: '',
    video: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEvents([...events, form]);
    setForm({ title: '', date: '', location: '', desc: '', video: '' });
    setModalOpen(false);
  };

  // Placeholder handlers for edit/delete
  const handleEdit = (idx: number) => {
    const event = events[idx];
    setForm(event);
    setModalOpen(true);
  };
  const handleDelete = (idx: number) => {
    setEvents(events.filter((_, i) => i !== idx));
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-end mb-6">
        <button
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200"
          onClick={() => setModalOpen(true)}
        >
          Add Event
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
            {events.map((event, idx) => (
              <tr key={idx} className="border-b border-emsBlue/10 last:border-0">
                <td className="py-2 px-4 font-medium text-gray-900">{event.title}</td>
                <td className="py-2 px-4 text-gray-600">{event.date}</td>
                <td className="py-2 px-4 text-gray-600">{event.location}</td>
                <td className="py-2 px-4 text-gray-600 max-w-xs truncate">{event.desc}</td>
                <td className="py-2 px-4 text-blue-600 underline">
                  {event.video && (
                    <a href={event.video} target="_blank" rel="noopener noreferrer">Video</a>
                  )}
                </td>
                <td className="py-2 px-4 flex gap-2">
                  <button
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                    onClick={() => handleEdit(idx)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                    onClick={() => handleDelete(idx)}
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
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative">
            <button
              className="absolute top-2 right-2 text-emsPink text-xl font-bold"
              onClick={() => setModalOpen(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold text-emsPurple mb-4">Add New Event</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input name="title" value={form.title} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emsPurple" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input type="date" name="date" value={form.date} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emsPurple" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input name="location" value={form.location} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emsPurple" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea name="desc" value={form.desc} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emsPurple" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Video URL</label>
                <input name="video" value={form.video} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emsPurple" />
              </div>
              <button type="submit" className="bg-emsPurple text-white px-6 py-2 rounded-lg font-semibold hover:bg-emsBlue transition-colors">Add Event</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsDashboard; 