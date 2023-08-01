import { FaStar, FaRegStar, FaStarHalf } from 'react-icons/fa';
import { FC } from "react";

interface Props {
    rating: number;
}

const RatingToStars: FC<Props> = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
        <div className="flex">
            {Array(fullStars).fill(0).map((_, i) => (
                <FaStar key={`full${i}`} color="gold" />
            ))}
            {halfStar === 1 && <FaStarHalf color="gold" />}
            {Array(emptyStars).fill(0).map((_, i) => (
                <FaRegStar key={`empty${i}`} color="gold" />
            ))}
        </div>
    );
};

export default RatingToStars;
