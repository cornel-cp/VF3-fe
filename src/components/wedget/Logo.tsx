import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export const Logo = ({ className = '', width = 50, height = 50 }: LogoProps) => {
  return (
    <Link href="/" className={`block ${className}`}>
      <div className="relative">
        <Image
          src="/images/animate-logo.gif"
          alt="PromptWar Logo"
          width={width}
          height={height}
          className="object-contain rounded-lg"
          priority
        />
      </div>
    </Link>
  );
};

export default Logo;
