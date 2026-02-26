import React, { useState, useEffect } from 'react';
import { X, BookOpen, Users, Clock, Target, Loader2, CheckCircle, Plus } from 'lucide-react';

interface LaunchProgramModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ProgramFormData {
  name: string;
  description: string;
  category: string;
  duration: string;
  maxParticipants: string;
  startDate: string;
  instructor: string;
}

const LaunchProgramModal: React.FC<LaunchProgramModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<ProgramFormData>({
    name: '',
    description: '',
    category: '',
    duration: '',
    maxParticipants: '',
    startDate: '',
    instructor: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleChange = (
    field: keyof ProgramFormData,
    value: string
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Program name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Program description is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.duration) {
      newErrors.duration = 'Duration is required';
    }

    if (!formData.maxParticipants) {
      newErrors.maxParticipants = 'Max participants is required';
    } else if (isNaN(Number(formData.maxParticipants)) || Number(formData.maxParticipants) < 1) {
      newErrors.maxParticipants = 'Must be a valid number';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    } else {
      const selectedDate = new Date(formData.startDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.startDate = 'Start date must be in the future';
      }
    }

    if (!formData.instructor.trim()) {
      newErrors.instructor = 'Instructor name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Program launched:', formData);
      setShowSuccess(true);

      // Close after success
      setTimeout(() => {
        setShowSuccess(false);
        handleClose();
      }, 2500);
    } catch (error) {
      console.error('Error launching program:', error);
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      description: '',
      category: '',
      duration: '',
      maxParticipants: '',
      startDate: '',
      instructor: ''
    });
    setErrors({});
    setShowSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  // Success state
  if (showSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in" onClick={handleClose}></div>
        <div className="relative bg-white rounded-3xl p-12 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-300 text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-emerald-600" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 mb-3">Program Launched!</h3>
          <p className="text-slate-600 mb-2">Your new program <span className="font-bold">{formData.name}</span> has been successfully created.</p>
          <p className="text-sm text-slate-500">Navigate to the programs list to manage enrollment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={handleClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-8 duration-500 my-8">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-all z-10"
        >
          <X size={24} className="text-slate-600" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white p-8 rounded-t-3xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Plus size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-black">Launch New Program</h2>
              <p className="text-emerald-100 font-medium">Create and deploy specialized transition tracks</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Program Name */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 uppercase tracking-wider">
              <BookOpen size={16} className="text-emerald-600" />
              Program Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="e.g., Advanced Cybersecurity Bootcamp"
              className={`w-full px-4 py-3 border-2 rounded-2xl font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 transition-all ${
                errors.name ? 'border-rose-500 bg-rose-50' : 'border-slate-200'
              }`}
            />
            {errors.name && <p className="text-rose-600 text-sm font-bold">{errors.name}</p>}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 uppercase tracking-wider">
              <Target size={16} className="text-emerald-600" />
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Describe the program objectives and outcomes..."
              rows={4}
              className={`w-full px-4 py-3 border-2 rounded-2xl font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 transition-all resize-none ${
                errors.description ? 'border-rose-500 bg-rose-50' : 'border-slate-200'
              }`}
            />
            {errors.description && <p className="text-rose-600 text-sm font-bold">{errors.description}</p>}
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 uppercase tracking-wider">
              <Target size={16} className="text-emerald-600" />
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className={`w-full px-4 py-3 border-2 rounded-2xl font-semibold text-slate-800 focus:outline-none focus:border-emerald-500 transition-all ${
                errors.category ? 'border-rose-500 bg-rose-50' : 'border-slate-200'
              }`}
            >
              <option value="">Select a category</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Project Management">Project Management</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Business">Business</option>
              <option value="Finance">Finance</option>
              <option value="Engineering">Engineering</option>
            </select>
            {errors.category && <p className="text-rose-600 text-sm font-bold">{errors.category}</p>}
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Duration */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 uppercase tracking-wider">
                <Clock size={16} className="text-emerald-600" />
                Duration *
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => handleChange('duration', e.target.value)}
                placeholder="e.g., 12 weeks"
                className={`w-full px-4 py-3 border-2 rounded-2xl font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 transition-all ${
                  errors.duration ? 'border-rose-500 bg-rose-50' : 'border-slate-200'
                }`}
              />
              {errors.duration && <p className="text-rose-600 text-sm font-bold">{errors.duration}</p>}
            </div>

            {/* Max Participants */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 uppercase tracking-wider">
                <Users size={16} className="text-emerald-600" />
                Max Participants *
              </label>
              <input
                type="number"
                value={formData.maxParticipants}
                onChange={(e) => handleChange('maxParticipants', e.target.value)}
                placeholder="e.g., 30"
                min="1"
                className={`w-full px-4 py-3 border-2 rounded-2xl font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 transition-all ${
                  errors.maxParticipants ? 'border-rose-500 bg-rose-50' : 'border-slate-200'
                }`}
              />
              {errors.maxParticipants && <p className="text-rose-600 text-sm font-bold">{errors.maxParticipants}</p>}
            </div>
          </div>

          {/* Start Date */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 uppercase tracking-wider">
              <Clock size={16} className="text-emerald-600" />
              Start Date *
            </label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => handleChange('startDate', e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className={`w-full px-4 py-3 border-2 rounded-2xl font-semibold text-slate-800 focus:outline-none focus:border-emerald-500 transition-all ${
                errors.startDate ? 'border-rose-500 bg-rose-50' : 'border-slate-200'
              }`}
            />
            {errors.startDate && <p className="text-rose-600 text-sm font-bold">{errors.startDate}</p>}
          </div>

          {/* Instructor */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 uppercase tracking-wider">
              <Users size={16} className="text-emerald-600" />
              Instructor Name *
            </label>
            <input
              type="text"
              value={formData.instructor}
              onChange={(e) => handleChange('instructor', e.target.value)}
              placeholder="e.g., Col. James Patterson"
              className={`w-full px-4 py-3 border-2 rounded-2xl font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 transition-all ${
                errors.instructor ? 'border-rose-500 bg-rose-50' : 'border-slate-200'
              }`}
            />
            {errors.instructor && <p className="text-rose-600 text-sm font-bold">{errors.instructor}</p>}
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 py-4 border-2 border-slate-200 text-slate-700 rounded-2xl font-bold hover:bg-slate-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex-1 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 ${
                isSubmitting
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-200'
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Launching...
                </>
              ) : (
                'Launch Program'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LaunchProgramModal;
