import { FaStar, FaRegStar, FaStarHalf } from 'react-icons/fa';
import { FC } from "react";

interface Props {
    rating: number;
}

const RatingToStars: FC<Props> = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 > 0 ? 1 : 0;  // Adjusted this line
    const emptyStars = 5 - fullStars - halfStar;

    return (
        <div className="flex">
            {Array(fullStars).fill(0).map((_, i) => (
                <FaStar key={`full${i}`} className="text-white font-extralight" />
            ))}
            {halfStar === 1 && <FaStarHalf className="text-white font-extralight" />}
            {Array(emptyStars).fill(0).map((_, i) => (
                <FaRegStar key={`empty${i}`} className="text-white font-extralight" />
            ))}
        </div>
    );
};

export default RatingToStars;
