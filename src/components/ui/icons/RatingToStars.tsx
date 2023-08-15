import { FaStar, FaRegStar, FaStarHalf } from 'react-icons/fa';
import { FC } from "react";

interface Props {
    rating: number;
    iconClass: string;
}

const RatingToStars: FC<Props> = ({ rating, iconClass }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 > 0 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
        <div className="flex">
            {Array(fullStars).fill(0).map((_, i) => (
                <FaStar key={`full${i}`} className={`text-white font-extralight ${iconClass}`} />
            ))}
            {halfStar === 1 && <FaStarHalf className={`text-white font-extralight ${iconClass}`} />}
            {Array(emptyStars).fill(0).map((_, i) => (
                <FaRegStar key={`empty${i}`} className={`text-white font-extralight ${iconClass}`} />
            ))}
        </div>
    );
};

export default RatingToStars;
