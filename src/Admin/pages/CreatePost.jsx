import React, { useState } from 'react';
import { Image as ImageIcon, Loader2 } from 'lucide-react';
import { createBlog } from '../../api/Blog';
import { useNavigate } from 'react-router-dom';

const BLOG_CATEGORIES = [
  'Trends',
  'Street Style',
  'Outfit Ideas',
  'Beauty',
  'Accessories',
  'Seasonal Lookbook',
];

export default function CreatePost() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: '',
    category: '',
  });

  const [imageFile, setImageFile] = useState(null);

  // Article sections
  const [sections, setSections] = useState([]);

  const [error, setError] = useState('');
  const [isPending, setIsPending] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setImageFile(file);
    }
  };

  const addSection = () => {
    setSections((prev) => [
      ...prev,
      {
        heading: '',
        description: '',
        image: null,
        linkText: '',
        linkUrl: '',
      },
    ]);
  };

  const removeSection = (index) => {
    setSections((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const handleSectionChange = (index, field, value) => {
    setSections((prev) =>
      prev.map((section, i) =>
        i === index
          ? {
              ...section,
              [field]: value,
            }
          : section
      )
    );
  };

  const handleSectionImageChange = (index, file) => {
    if (!file) return;

    setSections((prev) =>
      prev.map((section, i) =>
        i === index
          ? {
              ...section,
              image: file,
            }
          : section
      )
    );
  };

  const handleInsertSectionLink = (index) => {
    const section = sections[index];
    if (!section.linkUrl) return;

    const displayLabel = section.linkText.trim() || section.linkUrl;
    const markdownLink = ` [${displayLabel}](${section.linkUrl}) `;

    const updatedDescription = (section.description || '') + markdownLink;

    // Update description and reset the temporary link inputs for this section
    setSections((prev) =>
      prev.map((sec, i) =>
        i === index
          ? {
              ...sec,
              description: updatedDescription,
              linkText: '',
              linkUrl: '',
            }
          : sec
      )
    );
  };

  const handlePublish = async () => {
    setError('');

    if (
      !formData.title ||
      !formData.description ||
      !formData.category
    ) {
      setError(
        'Please fill in title, excerpt, and category.'
      );
      return;
    }

    if (!imageFile) {
      setError('Please upload a featured image.');
      return;
    }

    for (const [index, section] of sections.entries()) {
      if (!section.heading || !section.description) {
        setError(
          `Please complete the heading and description for Section ${
            index + 1
          }.`
        );
        return;
      }

      if (!section.image) {
        setError(
          `Please upload an image for Section ${
            index + 1
          }.`
        );
        return;
      }
    }

    const payload = new FormData();

    payload.append('title', formData.title);
    payload.append('description', formData.description);
    payload.append('link', formData.link);
    payload.append('category', formData.category);
    payload.append('image', imageFile);

    payload.append(
      'sections',
      JSON.stringify(
        sections.map((section) => ({
          heading: section.heading,
          description: section.description,
        }))
      )
    );

    sections.forEach((section) => {
      if (section.image) {
        payload.append(
          'sectionImages',
          section.image
        );
      }
    });

    setIsPending(true);

    try {
      await createBlog(payload);
      navigate('/admin/all-post');
    } catch (err) {
      setError(
        err?.message ||
          'Something went wrong while publishing the article.'
      );
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-6">
      {/* Header */}
      <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg sm:text-2xl font-serif font-bold text-[#0a1128]">
            Create New Post
          </h2>

          <p className="text-slate-500 text-sm">
            Craft and publish a new fashion article
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handlePublish}
            disabled={isPending}
            className="px-4 py-2 bg-[#034078] hover:bg-[#001f54] text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <Loader2
                  size={14}
                  className="animate-spin"
                />
                Publishing Article...
              </span>
            ) : (
              'Publish Article'
            )}
          </button>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-2">
          {error}
        </p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          {/* Article title */}
          <div>
            <label className="block text-sm font-semibold text-[#0a1128] mb-2">
              Article Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. The Revival of 90s Minimalist Tailoring"
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-base focus:outline-none focus:border-[#034078]"
            />
          </div>

          {/* Article description */}
          <div>
            <label className="block text-sm font-semibold text-[#0a1128] mb-2">
              Excerpt / Short Summary
            </label>

            <textarea
              name="description"
              rows={12}
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide a brief summary for newsletter previews..."
              className="w-full p-4 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#034078]"
            />
          </div>

          {/* Optional article link */}
          <div>
            <label className="block text-sm font-semibold text-[#0a1128] mb-2">
              Related Link (optional)
            </label>
            <input
              type="url"
              name="link"
              value={formData.link}
              onChange={handleChange}
              placeholder="https://example.com"
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#034078]"
            />
            <p className="mt-1 text-xs text-slate-500">
              Readers will see a clickable link at the end of the article.
            </p>
          </div>

          {/* Category */}
          <div className="w-[70%]">
            <label className="block text-sm font-semibold text-[#0a1128] mb-2">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:border-[#034078]"
            >
              <option value="">
                Select Category
              </option>

              {BLOG_CATEGORIES.map((category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* ARTICLE SECTIONS */}
          <div className="space-y-4 pt-4">
            {/* Section header */}
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold text-[#0a1128]">
                  Article Sections
                </h3>

                <p className="text-xs text-slate-500 mt-1">
                  Add images, headings and descriptions
                  for each part of your article.
                </p>
              </div>

              <button
                type="button"
                onClick={addSection}
                className="px-3 py-2 text-sm font-medium text-white bg-[#034078] hover:bg-[#001f54] rounded-lg transition-colors whitespace-nowrap"
              >
                + Add Section
              </button>
            </div>

            {/* Sections */}
            {sections.map((section, index) => (
              <div
                key={index}
                className="border border-slate-200 rounded-xl p-5 space-y-4 bg-slate-50"
              >
                {/* Section heading */}
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-[#0a1128]">
                    Section {index + 1}
                  </h4>

                  <button
                    type="button"
                    onClick={() =>
                      removeSection(index)
                    }
                    className="text-sm text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>

                {/* Section title */}
                <div>
                  <label className="block text-sm font-semibold text-[#0a1128] mb-2">
                    Section Heading
                  </label>

                  <input
                    type="text"
                    value={section.heading}
                    onChange={(e) =>
                      handleSectionChange(
                        index,
                        'heading',
                        e.target.value
                      )
                    }
                    placeholder="e.g. Keep It Classic"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#034078]"
                  />
                </div>

                {/* Section description */}
                <div>
                  <label className="block text-sm font-semibold text-[#0a1128] mb-2">
                    Section Description
                  </label>

                  <textarea
                    rows={10}
                    value={section.description}
                    onChange={(e) =>
                      handleSectionChange(
                        index,
                        'description',
                        e.target.value
                      )
                    }
                    placeholder="Explain this styling idea..."
                    className="w-full p-4 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#034078]"
                  />

                  {/* Section Link Builder Tool */}
                  <div className="mt-3 p-3 bg-white border border-slate-200 rounded-xl space-y-2">
                    <span className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Embed Link into this Description
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Link text (e.g., Shop this look)"
                        value={section.linkText}
                        onChange={(e) =>
                          handleSectionChange(index, 'linkText', e.target.value)
                        }
                        className="px-3 py-2 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:outline-none focus:border-[#034078]"
                      />
                      <input
                        type="url"
                        placeholder="URL (https://example.com)"
                        value={section.linkUrl}
                        onChange={(e) =>
                          handleSectionChange(index, 'linkUrl', e.target.value)
                        }
                        className="px-3 py-2 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:outline-none focus:border-[#034078]"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleInsertSectionLink(index)}
                      className="px-3 py-1.5 bg-[#034078] text-white rounded-lg text-xs font-medium hover:bg-[#022c54] transition-colors"
                    >
                      Insert Link
                    </button>
                  </div>
                </div>

                {/* Section image */}
                <div>
                  <label className="block text-sm font-semibold text-[#0a1128] mb-2">
                    Section Image
                  </label>

                  <label className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center bg-white flex flex-col items-center justify-center cursor-pointer">
                    <ImageIcon
                      className="text-slate-400 mb-2"
                      size={28}
                    />

                    <p className="text-sm font-medium text-slate-700">
                      {section.image
                        ? section.image.name
                        : 'Click to upload section image'}
                    </p>

                    <span className="text-xs text-slate-400 mt-1">
                      PNG, JPG up to 10MB
                    </span>

                    <input
                      type="file"
                      accept="image/png, image/jpeg"
                      onChange={(e) =>
                        handleSectionImageChange(
                          index,
                          e.target.files?.[0]
                        )
                      }
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            ))}

            {/* Empty state */}
            {sections.length === 0 && (
              <div className="border border-dashed border-slate-300 rounded-xl p-6 text-center">
                <p className="text-sm text-slate-500">
                  No article sections added yet.
                </p>

                <p className="text-xs text-slate-400 mt-1">
                  Click "Add Section" to add content
                  sections to your article.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          {/* Featured image */}
          <div>
            <label className="block text-sm font-semibold text-[#0a1128] mb-2">
              Featured Image
            </label>

            <label className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center bg-slate-50 flex flex-col items-center justify-center cursor-pointer">
              <ImageIcon
                className="text-slate-400 mb-2"
                size={32}
              />

              <p className="text-sm font-medium text-slate-700">
                {imageFile
                  ? imageFile.name
                  : 'Drag image here or click to upload'}
              </p>

              <span className="text-xs text-slate-400 mt-1">
                PNG, JPG up to 10MB
              </span>

              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-semibold text-[#0a1128] mb-2">
              Tags
            </label>

            <input
              type="text"
              placeholder="Paris, Vintage, Accessories (comma separated)"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#034078]"
            />
          </div>

          {/* Subscriber notification */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 text-[#034078] rounded border-slate-300 focus:ring-[#034078]"
              />

              <span className="text-sm font-medium text-[#0a1128]">
                Send directly to subscribers upon publishing
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}