import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./CategoryItem.css";

const CategoryItem = ({ category }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/urunler/${category._id}`);
  };

  return (
    <li className="category-item">
      <a href="#" onClick={handleClick}>
        <img src={category.img} alt={category.name} className="category-image" />
        <span className="category-title">{category.name}</span>
      </a>
    </li>
  );
};

CategoryItem.propTypes = {
  category: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default CategoryItem;
