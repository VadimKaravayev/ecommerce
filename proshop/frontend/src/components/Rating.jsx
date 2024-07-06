import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

export default function Rating({ value, text }) {
  return <div className="rating">
    <RatingStars value={value} starsNum={5} />
    <Text text={text} />
  </div>
}

function RatingStars({ value, starsNum = 5 }) {
  const arr = Array.from({ length: starsNum }, (_, i) => i + 1);
  return arr.map(max => (<span key={crypto.randomUUID()}>{showRatingIcon(value, max)}</span>));
}

function showRatingIcon(val, max) {
  const checks = [
    [val >= max, <FaStar />],
    [val >= (max - 0.5), <FaStarHalfAlt />],
    [true, <FaRegStar />],
  ];

  const foundIcon = checks.find(check => check[0]);
  return foundIcon[1];
}

function Text({ text }) {
  return text ? <span className="rating-text">{text}</span> : null;
}
