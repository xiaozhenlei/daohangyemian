import React from 'react';
import { Search, Globe, Ghost, Flame, Code2, Coffee, Film, PenTool, Layout, Music } from 'lucide-react';
import { SearchEngine, NavCategory } from './types';

export const SEARCH_ENGINES: SearchEngine[] = [
  {
    id: 'google',
    name: 'Google',
    searchUrl: 'https://www.google.com/search?q=%s',
    icon: <Search className="w-5 h-5" />,
    placeholder: 'Search Google...'
  },
  {
    id: 'bing',
    name: 'Bing',
    searchUrl: 'https://www.bing.com/search?q=%s',
    icon: <Globe className="w-5 h-5" />,
    placeholder: 'Search Bing...'
  },
  {
    id: 'baidu',
    name: 'Baidu',
    searchUrl: 'https://www.baidu.com/s?wd=%s',
    icon: <Flame className="w-5 h-5" />,
    placeholder: '百度一下...'
  },
  {
    id: 'duckduckgo',
    name: 'DuckDuckGo',
    searchUrl: 'https://duckduckgo.com/?q=%s',
    icon: <Ghost className="w-5 h-5" />,
    placeholder: 'Search privately...'
  }
];

export const DEFAULT_BOOKMARKS = [
  {
    id: '1',
    title: 'YouTube',
    url: 'https://www.youtube.com',
    createdAt: Date.now(),
  },
  {
    id: '2',
    title: 'GitHub',
    url: 'https://github.com',
    createdAt: Date.now(),
  },
  {
    id: '3',
    title: 'Gmail',
    url: 'https://mail.google.com',
    createdAt: Date.now(),
  },
  {
    id: '4',
    title: 'ChatGPT',
    url: 'https://chat.openai.com',
    createdAt: Date.now(),
  },
];

export const NAV_CATEGORIES: NavCategory[] = [
  {
    id: 'dev',
    title: 'Developer',
    icon: <Code2 className="w-5 h-5" />,
    links: [
      { title: 'GitHub', url: 'https://github.com' },
      { title: 'Stack Overflow', url: 'https://stackoverflow.com' },
      { title: 'Vercel', url: 'https://vercel.com' },
      { title: 'MDN Web Docs', url: 'https://developer.mozilla.org' },
    ]
  },
  {
    id: 'social',
    title: 'Social',
    icon: <Coffee className="w-5 h-5" />,
    links: [
      { title: 'Twitter / X', url: 'https://twitter.com' },
      { title: 'Reddit', url: 'https://reddit.com' },
      { title: 'Discord', url: 'https://discord.com' },
      { title: 'Instagram', url: 'https://instagram.com' },
    ]
  },
  {
    id: 'media',
    title: 'Entertainment',
    icon: <Film className="w-5 h-5" />,
    links: [
      { title: 'YouTube', url: 'https://youtube.com' },
      { title: 'Netflix', url: 'https://netflix.com' },
      { title: 'Twitch', url: 'https://twitch.tv' },
      { title: 'Spotify', url: 'https://open.spotify.com' },
    ]
  },
  {
    id: 'tools',
    title: 'Tools',
    icon: <PenTool className="w-5 h-5" />,
    links: [
      { title: 'ChatGPT', url: 'https://chat.openai.com' },
      { title: 'DeepL', url: 'https://www.deepl.com' },
      { title: 'Figma', url: 'https://figma.com' },
      { title: 'Notion', url: 'https://notion.so' },
    ]
  },
  {
    id: 'design',
    title: 'Design',
    icon: <Layout className="w-5 h-5" />,
    links: [
        { title: 'Dribbble', url: 'https://dribbble.com' },
        { title: 'Behance', url: 'https://behance.net' },
        { title: 'Unsplash', url: 'https://unsplash.com' },
        { title: 'Pinterest', url: 'https://pinterest.com' },
    ]
  },
  {
    id: 'music',
    title: 'Audio',
    icon: <Music className="w-5 h-5" />,
    links: [
        { title: 'SoundCloud', url: 'https://soundcloud.com' },
        { title: 'Apple Music', url: 'https://music.apple.com' },
        { title: 'Tidal', url: 'https://tidal.com' },
        { title: 'Bandcamp', url: 'https://bandcamp.com' },
    ]
  }
];