import { LogoCloud } from '@monorepo-boilerplate/ui';
import {
  CubeIcon,
  FigmaLogoIcon,
  GitHubLogoIcon,
  NotionLogoIcon,
  VercelLogoIcon,
} from '@radix-ui/react-icons';

/** LogoCloud with five recognisable brand icons as placeholder logos. */
export default function LogoCloudExample() {
  return (
    <LogoCloud
      title="Trusted by teams using"
      logos={[
        { id: 'vercel', logo: <VercelLogoIcon width={80} height={24} />, label: 'Vercel' },
        {
          id: 'github',
          logo: <GitHubLogoIcon width={80} height={24} />,
          label: 'GitHub',
          href: 'https://github.com',
        },
        { id: 'figma', logo: <FigmaLogoIcon width={80} height={24} />, label: 'Figma' },
        { id: 'notion', logo: <NotionLogoIcon width={80} height={24} />, label: 'Notion' },
        { id: 'cube', logo: <CubeIcon width={80} height={24} />, label: 'Cube' },
      ]}
    />
  );
}
