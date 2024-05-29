import React, { useState } from 'react';
import { Star } from 'phosphor-react';

const StarIcon = ({ isShortListed }) => {
  const [hovered, setHovered] = useState(false);

  const getWeight = () => {
    if (hovered) return isShortListed ? 'regular' : 'fill';
    return isShortListed ? 'fill' : 'regular';
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="cursor-pointer"
    >
      <Star size={24} weight={getWeight()} />
    </div>
  );
};

export default StarIcon;
