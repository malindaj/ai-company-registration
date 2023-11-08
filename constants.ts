import { Code, ImageIcon, MessageSquare, Music, VideoIcon, LinkIcon } from "lucide-react";

export const MAX_FREE_COUNTS = 50;

export const tools = [
  {
    label: 'Business Name Generator',
    icon: MessageSquare,
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
    color: "text-pink-700",
    bgColor: "text-emerald-500",
    href: '/domain-generator',
  },
];
