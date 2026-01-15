'use client';

import dynamic from 'next/dynamic';

const Stories = dynamic(() => import('@/shared/components/shared/stories'), { ssr: false });

export default Stories;