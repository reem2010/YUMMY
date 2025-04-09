export default function CategoriesFilter({
  categories,
  selectedCat,
  changeCat,
}) {
  return (
    <div>
      <ul>
        {categories.map((cat) => (
          <li
            onClick={() => changeCat(cat.id)}
            key={cat.id}
            className={`cursor-pointer  p-3.5 border-b-1 border-[#f2f2f2] ${
              cat.id == selectedCat
                ? "bg-amber-700 text-white"
                : "hover:bg-base-300"
            }`}
          >
            {cat.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
