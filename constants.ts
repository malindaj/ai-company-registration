import { Code, ImageIcon, MessageSquare, Music, VideoIcon, LinkIcon, FolderEdit, Building2, BookOpenCheck, Hash } from "lucide-react";

export const MAX_FREE_COUNTS = 50;

export const tools = [
  {
    label: 'Incorporate a Company',
    icon: Building2,
    href: '/name-generator',
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: 'Establish a Trust',
    icon: BookOpenCheck,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: '#',
  },
  {
    label: 'Get an ABN',
    icon: Hash,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    href: '#',
  },
  {
    label: 'Register a Business Name',
    icon: FolderEdit,
    color: "text-orange-600",
    bgColor: "bg-orange-700/10",
    href: '#',
  },
  {
    label: 'Secure a Domain',
    icon: LinkIcon,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    href: '/domain-generator',
  },
];
