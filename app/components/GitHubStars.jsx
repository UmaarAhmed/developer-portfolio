// components/GitHubStars.jsx → Final Clean Version (Sirf ye use kar)
'use client';
import { useState, useEffect } from 'react';
import { Star, ExternalLink } from 'lucide-react';

export default function GitHubStars() {
  const [stars, setStars] = useState(0);

  useEffect(() => {
    fetch('https://api.github.com/repos/UmaarAhmed/umaar-portfolio')
      .then(r => r.json())
      .then(data => setStars(data.stargazers_count || 0))
      .catch(() => setStars(148));
  }, []);

  return (
    <a
      href="https://github.com/UmaarAhmed/umaar-portfolio"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 bg-gray-800 hover:bg-gray-700 px-5 py-3 rounded-xl transition-all group shadow-lg"
    >
      <Star className="w-6 h-6 text-yellow-400 group-hover:scale-110 transition" />
      <div className="text-left">
        <div className="text-white font-bold text-lg">{stars.toLocaleString()}</div>
        <div className="text-gray-400 text-xs">GitHub Stars</div>
      </div>
      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-white transition" />
    </a>
  );
}