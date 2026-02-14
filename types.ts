import React from 'react';

export interface ServiceItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface PackageItem {
  title: string;
  priceRange: string;
  description: string;
  features: string[];
  idealFor: string;
  isPremium?: boolean;
}

export interface Testimonial {
  text: string;
  author: string;
  location: string;
}