"use client";

import Recipe from "@/components/Recipe/Recipe";
import { recipes } from ".";
import { useState } from "react";
import { Recipe as RecipeType } from "@/lib";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [recipeList, setRecipeList] = useState<RecipeType[]>(recipes);
  const [newRecipeModal, setNewRecipeModal] = useState<boolean>(false);
  const [activeRecipe, setActiveRecipe] = useState<number>(-1);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [ingredients, setIngredients] = useState<string>("");

  const search = () => {
    const filteredRecipes = recipes.filter((recipe: RecipeType) =>
      [recipe.title, recipe.description, ...recipe.ingredients].some((text) =>
        text.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setRecipeList(filteredRecipes);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === "Backspace") {
      search();
    }
  };

  const addNewRecipe = () => {
    const formattedIngredients = ingredients.split(",");
    const newRecipe = {
      title,
      description,
      image,
      ingredients: formattedIngredients,
    };

    setRecipeList([...recipeList, newRecipe]);

    setTitle("");
    setDescription("");
    setImage("");
    setIngredients("");
  };

  return (
    <main className="flex flex-col items-center justify-between p-12">
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          className="bg-slate-200 rounded p-2"
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={onKeyDown}
        />
        <button
          className="bg-slate-200 rounded p-2 hover:bg-slate-300"
          onClick={search}
        >
          Search
        </button>
        <button
          className="bg-slate-200 rounded p-2 hover:bg-slate-300"
          onClick={() => setNewRecipeModal(!newRecipeModal)}
        >
          Add new Recipe
        </button>
      </div>
      {newRecipeModal && (
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-slate-200 rounded p-2"
          />
          <input
            type="text"
            placeholder="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-slate-200 rounded p-2"
          />
          <input
            type="text"
            placeholder="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="bg-slate-200 rounded p-2"
          />
          <input
            type="text"
            placeholder="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="bg-slate-200 rounded p-2"
          />
          <button
            className="bg-slate-200 rounded p-2 hover:bg-slate-300"
            onClick={addNewRecipe}
          >
            Add
          </button>
        </div>
      )}

      <div className="grid grid-cols-4 gap-5">
        {recipeList.map((recipe, index) => (
          <div
            className="cursor-pointer"
            onClick={() =>
              activeRecipe === index
                ? setActiveRecipe(-1)
                : setActiveRecipe(index)
            }
          >
            <Recipe
              key={index}
              title={recipe.title}
              description={recipe.description}
              ingredients={recipe.ingredients}
              image={recipe.image}
              active={activeRecipe === index}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
