'use client';

import { useEffect, useState } from 'react';

export default function HomePage() {
  useEffect(() => {
    window.location.href = '/dashboard';
  }, []);

  return (
    <div> </div>
  );
}