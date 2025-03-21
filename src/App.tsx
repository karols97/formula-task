import "./index.css";
import { useFormula } from "./store";
import * as math from "mathjs";
import { TagsList } from "./TagsList";
import { useEffect, useState } from "react";

function App() {
  const inputValue = useFormula((state) => state.inputValue);
  const result = useFormula((state) => state.result);
  const setInputValue = useFormula((state) => state.setInputValue);
  const setResult = useFormula((state) => state.setResult);
  const selectedTags = useFormula((state) => state.selectedTags);
  console.log(selectedTags);

  const [tagsValues, setTagsValues] = useState<number[]>([]);
  console.log(tagsValues);

  useEffect(() => {
    const newValues: number[] = [];
    selectedTags.map((singleTag) => {
      if (typeof singleTag.value === "number") newValues.push(singleTag.value);
    });
    setTagsValues(newValues);
  }, [selectedTags]);

  const isTagsListVisible = /[a-zA-Z]/.test(inputValue);
  console.log(inputValue, isTagsListVisible);

  const handleBlur = () => {
    const expression = inputValue.startsWith("=") ? inputValue.slice(1).trim() : inputValue.trim();

    try {
      if (!isTagsListVisible) {
        const calculatedResult: number = math.evaluate(expression);
        // + tagsValues.reduce((accumulator, currentValue) => accumulator + currentValue, 0); TODO: uncomment when implementing tags
        setResult(calculatedResult);
      }
    } catch (error) {
      setResult(error as string);
    }
  };

  return (
    <div className="h-screen w-screen bg-amber-100">
      <h1 className="text-xl font-bold h-20 bg-amber-500">Formula task</h1>
      <div className="bg-amber-100 flex flex-col items-center px-20 relative">
        <div>Result: {result}</div>
        <input
          className="h-10 w-full border rounded"
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={handleBlur}></input>
        {isTagsListVisible && <TagsList />}
      </div>
    </div>
  );
}

export default App;
