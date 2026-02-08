import React, { useEffect, useState } from 'react';
import { generateDailyBugleNews } from '../services/geminiService';
import { NewsItem } from '../types';
import { Newspaper } from 'lucide-react';

const DailyBugleFeed: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchNews = async () => {
      const jsonStr = await generateDailyBugleNews();
      if (mounted) {
        try {
          const parsed = JSON.parse(jsonStr);
          if (Array.isArray(parsed)) {
            setNews(parsed);
          }
        } catch (e) {
          console.error("Failed to parse news", e);
        }
        setLoading(false);
      }
    };
    fetchNews();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="bg-gray-100 text-black p-6 rounded-sm shadow-xl border-t-8 border-spidey-red max-w-4xl mx-auto my-12 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
      <div className="flex items-center justify-between border-b-4 border-black pb-4 mb-4">
        <div className="flex items-center gap-3">
            <Newspaper className="w-8 h-8 text-spidey-red" />
            <h2 className="text-4xl font-black uppercase tracking-tight italic">The Daily Bugle</h2>
        </div>
        <span className="text-sm font-bold uppercase tracking-widest">NYC's Finest News</span>
      </div>

      {loading ? (
        <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-spidey-red"></div>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
            {news.map((item, idx) => (
                <div key={idx} className="border-r border-gray-300 last:border-0 pr-4">
                    <h3 className="font-bold text-xl mb-2 leading-tight uppercase">{item.headline}</h3>
                    <p className="text-sm text-gray-700 font-serif">{item.snippet}</p>
                    <p className="text-xs text-gray-500 mt-2 font-mono">{item.date}</p>
                </div>
            ))}
        </div>
      )}
      <div className="mt-4 text-center border-t border-gray-300 pt-2">
        <p className="text-xs font-bold text-gray-500 uppercase">Warning: Spidey is a Menace! - J. Jonah Jameson</p>
      </div>
    </div>
  );
};

export default DailyBugleFeed;