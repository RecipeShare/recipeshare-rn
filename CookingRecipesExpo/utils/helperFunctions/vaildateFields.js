
export function validateFields(recipe,courses, edit, oldRecipe) {
    //recipe.title, recipe.minutes, recipe.ingredients, recipe.steps
    // console.log('recipe in validateFields', recipe);
    console.log('edit in validateFields', edit);

    const errs = [];

        if (recipe.title === oldRecipe.title) {
          errs.push('Forked recipe must not have the same title as the master recipe');
        }

        if (!recipe.title) {
              errs.push('recipe must have a title');
          }

        if (!recipe.minutes) {
          errs.push('recipe must have cook time specified');
        }

        if(!recipe.ingredients.length) {
          errs.push('recipe must have at least 1 ingredient');
        }

        if(!recipe.steps.length) {
          errs.push('recipe must have at least 1 step');
        }

        let courseTypeCount = 0;

        courses.forEach( type => {
          recipe.categories.includes(type) && courseTypeCount++  //if the courseType has been selected by the user increment a count variable.
        })

        // console.log('courseTypeCount', courseTypeCount);

        if (!courseTypeCount && !edit) {  // if no course types have been chosen by the user, render the error message
          errs.push('recipe must have a Course Type selected ');
        }

        return errs;
    }