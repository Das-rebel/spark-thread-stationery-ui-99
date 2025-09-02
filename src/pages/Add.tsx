import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { UniversalCapture } from '@/components/knowledge/UniversalCapture';

export default function Add() {
  return (
    <AppLayout>
      <div className="min-h-screen bg-gradient-to-br from-background to-washi/30">
        <UniversalCapture />
      </div>
    </AppLayout>
  );
}