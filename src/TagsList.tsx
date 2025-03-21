import { useEffect, useState } from "react";
import { Tag, useTags } from "./useTags";
import { useFormula } from "./store";

export const TagsList = () => {
  const { data = [] } = useTags();
  const inputValue = useFormula((state) => state.inputValue);
  const selectedTags = useFormula((state) => state.selectedTags);
  const setSelectedTags = useFormula((state) => state.setSelectedTags);

  const [filteredTags, setFilteredTags] = useState<Tag[]>([]);

  useEffect(() => {
    const lastPart = getLastPart(inputValue);
    console.log(lastPart);

    const matchedTags = data.filter((tag) =>
      tag.name.toLowerCase().includes(lastPart.toLowerCase())
    );
    setFilteredTags(matchedTags);
  }, [data, inputValue]);

  const getLastPart = (input: string) => {
    const parts = input.split(/[\+\-\*\/\^]/);
    return parts[parts.length - 1].trim();
  };

  const onClickHandler = (clickedTag: Tag) => {
    if (selectedTags.find((singleTag) => singleTag.id === clickedTag.id)) {
      return;
    }
    setSelectedTags([...selectedTags, clickedTag]);
  };

  return (
    <div className="border bg-amber-50 rounded shadow-2xl  w-56 max-h-96 overflow-y-auto absolute top-12 z-10">
      {filteredTags.map((singleTag) => {
        return (
          <p
            className="hover:bg-amber-200 cursor-pointer"
            onClick={() => onClickHandler(singleTag)}>
            {singleTag.name}
          </p>
        );
      })}
    </div>
  );
};
