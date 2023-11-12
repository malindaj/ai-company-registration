import { Code, ImageIcon, MessageSquare, Music, VideoIcon, LinkIcon, FolderEdit } from "lucide-react";

export const MAX_FREE_COUNTS = 50;

export const tools = [
  {
    label: 'Company Name Generator',
    icon: FolderEdit,
    href: '/name-generator',
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: 'Logo Generation',
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: '/image',
  },
  {
    label: 'Domain Generation',
    icon: LinkIcon,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    href: '/domain-generator',
  },
];
