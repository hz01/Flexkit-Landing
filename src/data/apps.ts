import swiprLogo from '../../logos/swipr.png'
import subtrakrLogo from '../../logos/subtrakr.png'
import scribrLogo from '../../logos/scribr.png'

export interface AppData {
  id: string
  name: string
  tagline: string
  description: string
  logo: string
  color: string
  gradient: string
  glowColor: string
  playStoreUrl: string
  appStoreUrl?: string
}

export const apps: AppData[] = [
  {
    id: 'swipr',
    name: 'Swipr',
    tagline: 'Clean your gallery, one swipe at a time',
    description:
      'Swipe to keep or delete photos, just like Tinder. Declutter your gallery fast, and find duplicates with one tap.',
    logo: swiprLogo,
    color: '#20C997',
    gradient: 'linear-gradient(135deg, #20C997, #E84040)',
    glowColor: 'rgba(32, 201, 151, 0.25)',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.flexkit.swipr',
    appStoreUrl: 'https://apps.apple.com/us/app/swipr-smart-gallery-cleaner/id6762634232',
  },
  {
    id: 'subtrakr',
    name: 'SubTrakr',
    tagline: 'Know where your money goes',
    description:
      'Track every subscription in one place. Monitor spending, get renewal reminders, and stay in control.',
    logo: subtrakrLogo,
    color: '#4A6CF7',
    gradient: 'linear-gradient(135deg, #4A6CF7, #7B2FFF)',
    glowColor: 'rgba(74, 108, 247, 0.25)',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.flexkit.subtrakr',
  },
  {
    id: 'scribr',
    name: 'Scribr',
    tagline: 'Voice to text, instantly',
    description:
      'Transcribe your voice in real time with precision. Capture meetings, ideas, and notes hands-free.',
    logo: scribrLogo,
    color: '#8B5CF6',
    gradient: 'linear-gradient(135deg, #8B5CF6, #EC4899)',
    glowColor: 'rgba(139, 92, 246, 0.25)',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.flexkit.scribr',
  },
]
