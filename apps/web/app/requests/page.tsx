'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Request {
  id: string;
  title: string;
  description: string;
  category: string;
  votes: number;
  status: 'pending' | 'planned' | 'in-progress' | 'completed';
  createdAt: string;
}

// Mock data - in production, this would come from a database/API
const mockRequests: Request[] = [
  {
    id: '1',
    title: 'debounce with leading edge option',
    description: 'Add a leading edge option to the debounce utility to execute immediately on the first call',
    category: 'function',
    votes: 24,
    status: 'planned',
    createdAt: '2024-12-01',
  },
  {
    id: '2',
    title: 'Date formatting utility',
    description: 'A lightweight date formatter similar to date-fns format function',
    category: 'date',
    votes: 18,
    status: 'pending',
    createdAt: '2024-12-05',
  },
  {
    id: '3',
    title: 'Deep merge with array concatenation',
    description: 'Extend the merge utility to support array concatenation instead of replacement',
    category: 'object',
    votes: 12,
    status: 'pending',
    createdAt: '2024-12-08',
  },
];

const statusColors = {
  pending: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  planned: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  'in-progress': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  completed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
};

const statusLabels = {
  pending: 'Pending',
  planned: 'Planned',
  'in-progress': 'In Progress',
  completed: 'Completed',
};

export default function RequestsPage() {
  const [requests, setRequests] = useState<Request[]>(mockRequests);
  const [sortBy, setSortBy] = useState<'votes' | 'recent'>('votes');
  const [showForm, setShowForm] = useState(false);
  const [newRequest, setNewRequest] = useState({
    title: '',
    description: '',
    category: 'function',
  });

  const sortedRequests = [...requests].sort((a, b) => {
    if (sortBy === 'votes') {
      return b.votes - a.votes;
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const handleVote = (id: string) => {
    setRequests(prev =>
      prev.map(req =>
        req.id === id ? { ...req, votes: req.votes + 1 } : req
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const request: Request = {
      id: String(Date.now()),
      ...newRequest,
      votes: 1,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setRequests(prev => [request, ...prev]);
    setNewRequest({ title: '', description: '', category: 'function' });
    setShowForm(false);
  };

  return (
    <main className="min-h-screen">
      <div className="border-b border-border bg-background">
        <div className="container mx-auto px-6 py-10">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            ← Back to home
          </Link>
          <h1 className="text-4xl font-bold mb-4">Utility Requests</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Vote for utilities you'd like to see added or submit your own request
          </p>
          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            + Request a Utility
          </button>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Request Form */}
          {showForm && (
            <div className="mb-8 rounded-lg border border-border bg-background p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Submit a Request</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Utility Name
                  </label>
                  <input
                    type="text"
                    value={newRequest.title}
                    onChange={e =>
                      setNewRequest({ ...newRequest, title: e.target.value })
                    }
                    placeholder="e.g., debounce with leading edge"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    value={newRequest.description}
                    onChange={e =>
                      setNewRequest({
                        ...newRequest,
                        description: e.target.value,
                      })
                    }
                    placeholder="Describe what the utility should do and how it would be useful"
                    rows={4}
                    className="w-full rounded-lg border border-border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Category
                  </label>
                  <select
                    value={newRequest.category}
                    onChange={e =>
                      setNewRequest({ ...newRequest, category: e.target.value })
                    }
                    className="w-full rounded-lg border border-border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="array">Array</option>
                    <option value="boolean">Boolean</option>
                    <option value="date">Date</option>
                    <option value="function">Function</option>
                    <option value="json">JSON</option>
                    <option value="number">Number</option>
                    <option value="object">Object</option>
                    <option value="promise">Promise</option>
                    <option value="string">String</option>
                    <option value="url">URL</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    Submit Request
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="inline-flex items-center justify-center rounded-lg border border-border px-6 py-2 text-sm font-medium transition-colors hover:bg-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Sort Options */}
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm text-muted-foreground">
              {requests.length} {requests.length === 1 ? 'request' : 'requests'}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSortBy('votes')}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  sortBy === 'votes'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                Most Voted
              </button>
              <button
                onClick={() => setSortBy('recent')}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  sortBy === 'recent'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                Most Recent
              </button>
            </div>
          </div>

          {/* Requests List */}
          <div className="space-y-4">
            {sortedRequests.map(request => (
              <div
                key={request.id}
                className="rounded-lg border border-border bg-background p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  {/* Vote Button */}
                  <button
                    onClick={() => handleVote(request.id)}
                    className="flex flex-col items-center gap-1 rounded-lg border border-border bg-secondary/40 px-3 py-2 hover:bg-secondary/60 transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                    <span className="text-sm font-semibold">{request.votes}</span>
                  </button>

                  {/* Request Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="text-lg font-semibold">{request.title}</h3>
                      <span
                        className={`px-2.5 py-1 text-xs font-medium rounded-full whitespace-nowrap ${
                          statusColors[request.status]
                        }`}
                      >
                        {statusLabels[request.status]}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {request.description}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <span className="inline-block w-2 h-2 rounded-full bg-primary" />
                        {request.category}
                      </span>
                      <span>•</span>
                      <span>
                        {new Date(request.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* GitHub Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground mb-3">
              Want to contribute directly?
            </p>
            <a
              href="https://github.com/wiesnerbernard/fragmen/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Open an issue on GitHub
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
