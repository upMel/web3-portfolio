'use client';

import Link from 'next/link';
import { useIsOwner } from '@/hooks/usePortfolio';
import { ConnectWalletButton } from '@/components/ConnectWalletButton';

export function Navbar() {
  const isOwner = useIsOwner();

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg tracking-tight text-gray-900">
          Web3 Portfolio
        </Link>
        <div className="flex items-center gap-4">
          {isOwner && (
            <Link
              href="/admin"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Admin
            </Link>
          )}
          <ConnectWalletButton />
        </div>
      </div>
    </nav>
  );
}
