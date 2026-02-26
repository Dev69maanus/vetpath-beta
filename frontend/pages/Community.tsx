
import React, { useState, useEffect } from 'react';
import { MessageSquare, ThumbsUp, Reply, MoreVertical, PlusCircle, X } from 'lucide-react';
import { apiService, ForumPost } from '../services/apiService';
import { MOCK_POSTS } from '../constants';

const Community: React.FC = () => {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await apiService.getForumPosts();
        if (data.length === 0) {
          setPosts(MOCK_POSTS);
        } else {
          setPosts(data);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPosts(MOCK_POSTS);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault();
    const post: Omit<ForumPost, 'id'> = {
      author: 'Alex Thompson (You)',
      title: newTitle,
      content: newContent,
      date: new Date().toISOString(),
      likes: 0,
      replies: 0
    };

    try {
      const created = await apiService.createForumPost(post);
      setPosts([created, ...posts]);
    } catch (error) {
      console.error('Error creating post:', error);
      const localPost: ForumPost = { id: `local-${Date.now()}`, ...post };
      setPosts([localPost, ...posts]);
    } finally {
      setNewTitle('');
      setNewContent('');
      setIsModalOpen(false);
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading posts...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Community Hub</h2>
          <p className="text-slate-500">Connect, share, and support fellow transitioning veterans.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition-all"
        >
          <PlusCircle size={20} />
          New Discussion
        </button>
      </div>

      <div className="flex gap-4 border-b border-slate-200">
        {['All Posts', 'Career Advice', 'VA Benefits', 'Study Groups'].map((tab, i) => (
          <button key={i} className={`pb-4 px-2 text-sm font-bold transition-all border-b-2 ${i === 0 ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all group">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold shrink-0">
                {post.author.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">{post.title}</h3>
                    <p className="text-sm text-slate-500">By {post.author} • {post.date}</p>
                  </div>
                  <button className="text-slate-400 hover:text-slate-900">
                    <MoreVertical size={20} />
                  </button>
                </div>
                <p className="mt-3 text-slate-600">{post.content}</p>
                <div className="flex items-center gap-6 mt-4 text-sm text-slate-500">
                  <button className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                    <ThumbsUp size={16} />
                    {post.likes} Likes
                  </button>
                  <button className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                    <Reply size={16} />
                    {post.replies} Replies
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-900">Start a Discussion</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-900">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddPost} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="What's on your mind?"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Content</label>
                <textarea
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                  placeholder="Share your thoughts..."
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
              >
                Post Discussion
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Community;