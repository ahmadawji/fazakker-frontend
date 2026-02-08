import React, { useState } from 'react';
import { PostStatus, SocialPlatform, Hadith } from '../types';
import { Check, X, Clock, Sparkles } from 'lucide-react';
import { generateSocialCaption } from '../services/geminiService';

const mockHistory = [
  {
    id: '1',
    hadith: {
      id: 'h1',
      source: 'Sahih Muslim 2586',
      translation: "Do not envy one another, and do not inflate prices for one another, and do not hate one another...",
      arabicText: "لَا تَحَاسَدُوا، وَلَا تَنَاجَشُوا، وَلَا تَبَاغَضُوا...",
      grade: "Sahih"
    },
    postedAt: '2023-10-27T18:00:00',
    platforms: [SocialPlatform.FACEBOOK, SocialPlatform.INSTAGRAM],
    status: PostStatus.POSTED
  },
  {
    id: '2',
    hadith: {
      id: 'h2',
      source: 'Riyad as-Salihin 1',
      translation: "Actions are judged by intentions, so each man will have what he intended.",
      arabicText: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى...",
      grade: "Sahih"
    },
    postedAt: '2023-10-28T18:00:00',
    platforms: [SocialPlatform.FACEBOOK, SocialPlatform.INSTAGRAM, SocialPlatform.WHATSAPP],
    status: PostStatus.SCHEDULED
  }
];

const History: React.FC = () => {
  const [history] = useState(mockHistory);
  const [generatingFor, setGeneratingFor] = useState<string | null>(null);
  const [generatedCaption, setGeneratedCaption] = useState<string | null>(null);

  const getStatusBadge = (status: PostStatus) => {
    switch (status) {
      case PostStatus.POSTED:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"><Check className="w-3 h-3 mr-1" /> Posted</span>;
      case PostStatus.SCHEDULED:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"><Clock className="w-3 h-3 mr-1" /> Scheduled</span>;
      case PostStatus.FAILED:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"><X className="w-3 h-3 mr-1" /> Failed</span>;
    }
  };

  const handleGenerateCaption = async (hadith: Hadith, id: string) => {
    setGeneratingFor(id);
    setGeneratedCaption(null);
    const caption = await generateSocialCaption(hadith, 'Instagram');
    setGeneratedCaption(caption);
    setGeneratingFor(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Post History</h1>
        <p className="text-gray-500 text-sm mt-1">View past posts and upcoming schedules.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <ul className="divide-y divide-gray-100">
          {history.map((item) => (
            <li key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex flex-col md:flex-row justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {getStatusBadge(item.status)}
                    <span className="text-sm text-gray-500">
                      {new Date(item.postedAt).toLocaleDateString()} at {new Date(item.postedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-gray-900 font-arabic text-lg leading-relaxed dir-rtl text-right mb-2">{item.hadith.arabicText}</p>
                    <p className="text-gray-700 italic">"{item.hadith.translation}"</p>
                    <p className="text-xs font-bold text-emerald-600 mt-1 uppercase tracking-wide">{item.hadith.source}</p>
                  </div>

                  <div className="flex items-center space-x-2 mt-4">
                    {item.platforms.map(p => (
                      <span key={p} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded border border-gray-200">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 md:mt-0 md:ml-6 flex flex-col space-y-3 min-w-[200px]">
                  {item.status === PostStatus.SCHEDULED && (
                     <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-lg border border-indigo-100">
                        <h4 className="text-xs font-bold text-indigo-800 flex items-center mb-2">
                          <Sparkles className="w-3 h-3 mr-1" /> AI Caption Assistant
                        </h4>
                        
                        {!generatedCaption ? (
                          <button 
                            onClick={() => handleGenerateCaption(item.hadith, item.id)}
                            disabled={!!generatingFor}
                            className="w-full text-xs bg-white border border-indigo-200 text-indigo-600 py-2 rounded shadow-sm hover:bg-indigo-50"
                          >
                            {generatingFor === item.id ? 'Generating...' : 'Generate Caption'}
                          </button>
                        ) : (
                          <div className="space-y-2">
                            <p className="text-xs text-gray-600 italic border-l-2 border-indigo-300 pl-2 bg-white p-2 rounded">
                              {generatedCaption}
                            </p>
                            <div className="flex gap-2">
                              <button onClick={() => setGeneratedCaption(null)} className="flex-1 text-xs text-gray-500 hover:text-gray-700">Discard</button>
                              <button className="flex-1 text-xs bg-indigo-600 text-white py-1 rounded hover:bg-indigo-700">Use</button>
                            </div>
                          </div>
                        )}
                     </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default History;
