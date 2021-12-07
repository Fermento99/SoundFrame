import React from 'react';
import Avatar from '../../components/Avatar';

export default function HomePage() {
  const colors = [
    '#FF0000',
    '#00FF00',
    '#0000FF'
  ];

  return (
    <div>
      <Avatar
        size="70"
        color="#FF00FF"
        colors={colors}
        front="A"
        userId="1" />
    </div>
  );
}
